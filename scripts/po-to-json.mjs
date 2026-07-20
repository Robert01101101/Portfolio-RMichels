#!/usr/bin/env node
/**
 * Convert locale/de_DE/LC_MESSAGES/messages.po to src/i18n/ui-de.json
 * and generate ui-en.json from msgid keys.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const poPath = path.join(root, 'locale/de_DE/LC_MESSAGES/messages.po');
const outDe = path.join(root, 'src/i18n/ui-de.json');
const outEn = path.join(root, 'src/i18n/ui-en.json');

const po = fs.readFileSync(poPath, 'utf8');
const entries = {};
const blocks = po.split(/\n\n+/);

for (const block of blocks) {
  const msgidMatch = block.match(/^msgid\s+"((?:[^"\\]|\\.)*)"/m);
  const msgstrMatch = block.match(/^msgstr\s+"((?:[^"\\]|\\.)*)"/m);
  if (!msgidMatch || !msgstrMatch) continue;
  const key = unescapePo(msgidMatch[1]);
  const val = unescapePo(msgstrMatch[1]);
  if (!key) continue;
  entries[key] = val || key;
}

function unescapePo(s) {
  return s.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
}

function slugify(key) {
  return key
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '')
    .slice(0, 80);
}

const uiDe = {};
const uiEn = {};

for (const [key, deVal] of Object.entries(entries)) {
  const id = slugify(key) || Buffer.from(key).toString('base64url').slice(0, 16);
  uiDe[id] = deVal;
  uiEn[id] = key;
}

// Nav / footer keys used in components (map friendly ids)
const manual = {
  featured_work: { en: 'Featured Work', de: 'Ausgewählte Arbeiten' },
  about: { en: 'About', de: 'Über Mich' },
  all_projects: { en: 'All Projects', de: 'Alle Projekte' },
  filter_projects: { en: 'Filter Projects', de: 'Projekte filtern' },
  see_more: { en: 'See More', de: 'Mehr anzeigen' },
  type: { en: 'Type', de: 'Typ' },
  year: { en: 'Year', de: 'Jahr' },
  skills_applied: { en: 'Skills Applied', de: 'Angewandte Fähigkeiten' },
  company: { en: 'Company', de: 'Unternehmen' },
  team: { en: 'Team', de: 'Team' },
  personal_project: { en: 'Personal Project', de: 'Eigenes Projekt' },
  resume: { en: 'Resume', de: 'Lebenslauf' },
  privacy_policy: { en: 'Privacy Policy', de: 'Datenschutz' },
  copyright: { en: 'Copyright', de: 'Urheberrecht' },
  rights_reserved: { en: 'Robert Michels. All Rights Reserved.', de: 'Robert Michels. Alle Rechte vorbehalten.' },
  enable_smooth_scrolling: { en: 'Enable Smooth Scrolling', de: 'Sanftes Scrollen aktivieren' },
  copied: { en: 'Copied to Clipboard!', de: 'In die Zwischenablage kopiert!' },
  portfolio_developed: { en: 'This portfolio website was ', de: 'Diese Portfolio-Website wurde ' },
  developed: { en: 'developed', de: 'entwickelt' },
  with_astro: { en: 'with Astro.', de: 'mit Astro.' },
  hi_im_robert: { en: "Hi, I'm Robert Michels.", de: 'Hallo, ich bin Robert Michels.' },
  hi_greeting: { en: 'Hi ', de: 'Hallo ' },
  greeting_suffix: { en: ", I'm Robert Michels.", de: ', ich bin Robert Michels.' },
  i_design: { en: 'I design and program', de: 'Ich designe und programmiere' },
  digital_media: { en: 'digital media.', de: 'digitale Medien.' },
  text_rotate: {
    en: 'full-stack apps.", "games.", "VR experiences.", "mobile apps.", "websites.',
    de: 'Full-Stack-Apps.", "Spiele.", "VR-Erlebnisse.", "Mobile Apps.", "Websites.',
  },
  about_me: { en: 'About Me', de: 'Über Mich' },
  hi_there: { en: "Hi there, I'm Robert!", de: 'Hallo, Ich bin Robert!' },
  say_hi: { en: 'Say Hi:', de: 'Sag Hallo:' },
  skills: { en: 'Skills', de: 'Fähigkeiten' },
  programming: { en: 'Programming', de: 'Programmierung' },
  frameworks: { en: 'Frameworks', de: 'Frameworks' },
  development: { en: 'Development', de: 'Entwicklung' },
  other: { en: 'Other', de: 'Sonstiges' },
  in_development: { en: 'In Development', de: 'In Entwicklung' },
  deutsch: { en: 'Deutsch', de: 'Deutsch' },
  english: { en: 'English', de: 'Englisch' },
};

for (const [id, vals] of Object.entries(manual)) {
  uiEn[id] = vals.en;
  uiDe[id] = vals.de;
}

fs.mkdirSync(path.dirname(outDe), { recursive: true });
fs.writeFileSync(outDe, JSON.stringify(uiDe, null, 2));
fs.writeFileSync(outEn, JSON.stringify(uiEn, null, 2));
console.log(`Wrote ${Object.keys(uiEn).length} UI strings to ui-en.json / ui-de.json`);
