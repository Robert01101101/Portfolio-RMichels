#!/usr/bin/env node
/**
 * @deprecated Markdown collections are the source of truth.
 * Regenerates DE bodies from existing EN markdown, applying PO translations when available.
 * See scripts/README.md.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outEn = path.join(root, 'src/content/projects');
const outDe = path.join(root, 'src/content/projects-de');
const poPath = path.join(root, 'scripts/archive/messages.po');

function unescapePo(s) {
  return s.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
}

/** Parse gettext PO file into msgid → msgstr map (skips empty msgid header). */
function parsePoFile(filePath) {
  if (!fs.existsSync(filePath)) return new Map();
  const po = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
  const map = new Map();
  const blocks = po.split(/\n\n+/);
  for (const block of blocks) {
    const msgid = readPoString(block, 'msgid');
    const msgstr = readPoString(block, 'msgstr');
    if (!msgid || !msgstr) continue;
    map.set(msgid, msgstr);
  }
  return map;
}

function readPoString(block, field) {
  const lines = block.split('\n');
  let value = '';
  let inField = false;
  for (const line of lines) {
    const single = line.match(new RegExp(`^${field}\\s+"((?:[^"\\\\]|\\\\.)*)"`));
    if (single) {
      value = unescapePo(single[1]);
      inField = true;
      continue;
    }
    const cont = line.match(/^"((?:[^"\\]|\\.)*)"$/);
    if (inField && cont) {
      value += unescapePo(cont[1]);
      continue;
    }
    if (inField && line.trim() && !line.startsWith('"')) inField = false;
  }
  return value;
}

function applyPoTranslations(text, translations) {
  const entries = [...translations.entries()]
    .filter(([msgid, msgstr]) => msgstr && text.includes(msgid))
    .sort((a, b) => b[0].length - a[0].length);
  let result = text;
  for (const [msgid, msgstr] of entries) {
    result = result.split(msgid).join(msgstr);
  }
  return result;
}

function splitFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\n\n?([\s\S]*)$/);
  if (!match) return { frontmatter: '', body: content.trim() };
  return { frontmatter: match[1], body: match[2].trim() };
}

const poTranslations = parsePoFile(poPath);

const enFiles = fs
  .readdirSync(outEn)
  .filter((name) => name.endsWith('.md'))
  .sort();

if (!enFiles.length) {
  console.error('No EN project files found in src/content/projects/');
  process.exit(1);
}

fs.mkdirSync(outDe, { recursive: true });

for (const filename of enFiles) {
  const enPath = path.join(outEn, filename);
  const enContent = fs.readFileSync(enPath, 'utf8');
  const { frontmatter, body } = splitFrontmatter(enContent);
  const bodyDe = applyPoTranslations(body, poTranslations);
  const deContent = `---\n${frontmatter}\n---\n\n${bodyDe}\n`;
  fs.writeFileSync(path.join(outDe, filename), deContent);
}

console.log(`Synced ${enFiles.length} DE file(s) from EN markdown (bodies only; frontmatter copied).`);
