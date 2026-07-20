#!/usr/bin/env node
/**
 * Post-build verification — run after `npm run build`.
 * Confirms expected routes exist in dist/ and no forbidden paths were emitted.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const projectsDir = path.join(root, 'src/content/projects');

const errors = [];

function requirePath(relPath) {
  const full = path.join(dist, ...relPath.split('/'));
  if (!fs.existsSync(full)) {
    errors.push(relPath);
  }
}

function forbidPath(relPath) {
  const full = path.join(dist, ...relPath.split('/'));
  if (fs.existsSync(full)) {
    errors.push(`must not exist: ${relPath}`);
  }
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};

  const fm = {};
  for (const line of match[1].split('\n')) {
    const m = line.match(/^([a-zA-Z_][\w-]*):\s*(.+)$/);
    if (!m) continue;

    let val = m[2].trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    } else if (val === 'true') {
      val = true;
    } else if (val === 'false') {
      val = false;
    }

    fm[m[1]] = val;
  }
  return fm;
}

function getPublishedProjectSlugs() {
  if (!fs.existsSync(projectsDir)) {
    errors.push('src/content/projects/ (content source missing)');
    return [];
  }

  const slugs = [];
  for (const file of fs.readdirSync(projectsDir)) {
    if (!file.endsWith('.md')) continue;

    const content = fs.readFileSync(path.join(projectsDir, file), 'utf8');
    const fm = parseFrontmatter(content);

    if (fm.inDevelopment || fm.draft) continue;

    const slug = fm.slug || file.replace(/\.md$/, '');
    slugs.push(slug);
  }

  return slugs.sort();
}

if (!fs.existsSync(dist)) {
  console.error('verify-build: dist/ does not exist — run `npm run build` first');
  process.exit(1);
}

const requiredPaths = [
  'index.html',
  'projects/index.html',
  'about/index.html',
  'futureEarth/index.html',
  'development/tourguide/index.html',
  'de/index.html',
  'de/futureEarth/index.html',
  'de/development/tourguide/index.html',
];

for (const relPath of requiredPaths) {
  requirePath(relPath);
}

const hasSitemap =
  fs.existsSync(path.join(dist, 'sitemap-index.xml')) ||
  fs.existsSync(path.join(dist, 'sitemap-0.xml'));

if (!hasSitemap) {
  errors.push('sitemap-index.xml or sitemap-0.xml');
}

forbidPath('tourguide');

const publishedSlugs = getPublishedProjectSlugs();
for (const slug of publishedSlugs) {
  requirePath(`${slug}/index.html`);
  requirePath(`de/${slug}/index.html`);
}

if (errors.length > 0) {
  console.error('verify-build: missing or invalid paths in dist/:');
  for (const err of errors) {
    console.error(`  - ${err}`);
  }
  process.exit(1);
}

console.log(
  `verify-build: OK (${requiredPaths.length} core routes, ${publishedSlugs.length} published project slugs EN+DE, sitemap present)`,
);
