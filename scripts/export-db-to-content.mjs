#!/usr/bin/env node
/**
 * Export project metadata and markdown bodies.
 * Reads EN bodies from existing markdown (or legacy PHP if present).
 * Applies gettext PO translations for DE bodies when scripts/archive/messages.po exists.
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

function extractBodyFromMd(mdPath) {
  if (!fs.existsSync(mdPath)) return '';
  const content = fs.readFileSync(mdPath, 'utf8');
  const match = content.match(/^---\n[\s\S]*?\n---\n\n?([\s\S]*)$/);
  return match ? match[1].trim() : '';
}

const poTranslations = parsePoFile(poPath);

const PROJECTS = [
  {
    slug: 'clirioScanViews',
    order: 1,
    name: { en: 'Clirio Scan Views', de: 'Clirio Scan Views' },
    type: { en: 'Unity App Features', de: 'Unity App Features' },
    year: '2024',
    company: 'Clirio',
    roles: ['vr', 'front-end'],
    threeMockup: 'hololens',
    description: {
      en: 'A collection of features in the Clirio View apps for loading and viewing photogrammetry scans. Includes on-map, XR, comparison, and other views.',
      de: 'Eine Sammlung von Funktionen in den Clirio View Apps zum Laden und Anzeigen von Photogrammetrie-Scans. Enthält Karten-, XR-, Vergleichs- und andere Ansichten.',
    },
    links: [
      { label: 'Clirio View Desktop', url: 'https://apps.microsoft.com/store/detail/clirio-view-desktop/9NB14S8DFWFP' },
    ],
    heroAltLayout: false,
  },
  {
    slug: 'clirioScanShare',
    order: 2,
    name: { en: 'Clirio Scan Share', de: 'Clirio Scan Share' },
    type: { en: 'Unity App Feature + Website', de: 'Unity App Feature + Website' },
    year: '2023',
    company: 'Clirio',
    roles: ['blazor', 'back-end', 'front-end'],
    description: {
      en: 'Scan Share is a feature of the Clirio product suite, for sharing photogrammetry scans quickly, and displaying them in a webviewer.',
      de: 'Scan Share ist eine Funktion der Clirio-Produktreihe zum schnellen Teilen von Photogrammetrie-Scans und deren Anzeige in einem Webviewer.',
    },
    links: [
      { label: 'Sample Share', url: 'https://clirioview-viw-dev.azurewebsites.net/guest/f-aVQEv0LytBKHa8vARMx-Nl' },
      { label: 'Clirio View Desktop', url: 'https://apps.microsoft.com/store/detail/clirio-view-desktop/9NB14S8DFWFP' },
    ],
  },
  {
    slug: 'tourguide',
    order: 3,
    inDevelopment: false,
    name: { en: 'Tourguide', de: 'Tourguide' },
    type: { en: 'Flutter App', de: 'Flutter App' },
    year: '2024',
    roles: ['android', 'design'],
    threeMockup: 'phone',
    description: {
      en: 'A crossplatform Flutter app that helps users explore tours with navigation, information on places, and chat with an AI tourguide. A personal project currently in development.',
      de: 'Eine plattformübergreifende Flutter-App, die Nutzern hilft, Touren mit Navigation, Informationen zu Orten und Chat mit einem KI-Reiseführer zu erkunden. Ein persönliches Projekt in Entwicklung.',
    },
    links: [
      { label: 'Google Play Store (Beta)', url: 'https://play.google.com/store/apps/details?id=com.robertmichelsdigitalmedia.tourguideapp' },
      { label: 'Web App (Beta)', url: 'https://tourguide-firebase.web.app' },
      { label: 'Interactive Figma Mockup', url: 'https://www.figma.com/proto/DKwKzxmnYg9oQeuUSmrlN7/Tourguide_App' },
      { label: 'Github Repository', url: 'https://github.com/Robert01101101/tourguide_app' },
    ],
  },
  {
    slug: 'clirioCloud',
    order: 4,
    name: { en: 'Clirio Cloud', de: 'Clirio Cloud' },
    type: { en: 'Blazor Web App', de: 'Blazor Web App' },
    year: '2023',
    company: 'Clirio',
    roles: ['blazor', 'back-end', 'front-end'],
    description: {
      en: 'A web-based collection of tools for managing workspaces in Clirio View. Includes a user dashboard, workspace and observation creation tools, and interactive Bing maps.',
      de: 'Eine webbasierte Sammlung von Tools zur Verwaltung von Arbeitsbereichen in Clirio View. Enthält ein Benutzer-Dashboard, Tools zur Erstellung von Arbeitsbereichen und Beobachtungen sowie interaktive Bing-Karten.',
    },
    links: [{ label: 'Clirio Cloud', url: 'https://cloud.clir.io/' }],
    heroAltLayout: false,
  },
  {
    slug: 'futureEarth',
    order: 5,
    name: { en: 'Future Earth', de: 'Future Earth' },
    type: { en: 'VR Game', de: 'VR-Spiel' },
    year: '2020',
    roles: ['vr', 'game', 'pm', 'design'],
    description: {
      en: 'Future Earth is a VR adventure game set in a dystopian future, where the player has to grow trees, fight droids and collect parts. Achieved over 3,000 downloads and 4 stars on SideQuest.',
      de: 'Future Earth ist ein VR-Abenteuerspiel in einer dystopischen Zukunft, in der der Spieler Bäume pflanzen, Droiden bekämpfen und Teile sammeln muss. Über 3.000 Downloads und 4 Sterne auf SideQuest.',
    },
    links: [
      { label: 'SideQuest', url: 'https://sidequestvr.com/app/2597/future-earth' },
      { label: 'Development Blog', url: 'https://404teamnotfound444314077.wordpress.com/' },
    ],
    heroAltLayout: true,
    teammembers: ['Robert Michels', 'Team Members'],
  },
  {
    slug: 'amae',
    order: 6,
    name: { en: 'Amae', de: 'Amae' },
    type: { en: 'UX / UI', de: 'UX / UI' },
    year: '2019',
    roles: ['design', 'android'],
    description: {
      en: 'Amae is a utility app for busy parents. Amae helps parents to manage their time, learn about parenting and get help easily and quickly.',
      de: 'Amae ist eine Utility-App für vielbeschäftigte Eltern. Amae hilft Eltern, ihre Zeit zu managen, mehr über Erziehung zu lernen und schnell Hilfe zu erhalten.',
    },
    links: [
      { label: 'Interactive Mockup', url: 'https://www.figma.com/proto/MTkTlvyHoJziDU2ZnpaCSs/334_Stage5_v2' },
      { label: 'Product Website', url: 'http://amae.rmichels.com/' },
    ],
    heroAltLayout: true,
  },
  {
    slug: 'harbingersOfDeath',
    order: 7,
    name: { en: 'Harbingers Of Death', de: 'Harbingers Of Death' },
    type: { en: 'LAMP Website', de: 'LAMP Website' },
    year: '2018',
    roles: ['back-end', 'front-end', 'java-dev'],
    description: {
      en: "'Are you going to die?' compiles historic superstitions about death. This project satirizes present-day conspiracy theories, by presenting now-defunct superstitions as if they are real.",
      de: "'Are you going to die?' sammelt historische Aberglauben über den Tod. Dieses Projekt satirisiert heutige Verschwörungstheorien, indem es veraltete Aberglauben als real darstellt.",
    },
    links: [{ label: 'View Website', url: 'http://harbingersofdeath.rmichels.com' }],
  },
  {
    slug: 'portfolio',
    order: 8,
    name: { en: 'Portfolio Website', de: 'Portfolio Website' },
    type: { en: 'Static Website', de: 'Statische Website' },
    year: '2020',
    roles: ['front-end', 'back-end', 'threejs', 'design'],
    description: {
      en: 'A static portfolio site built with Astro, TypeScript islands, Three.js, and Sass.',
      de: 'Eine statische Portfolio-Website mit Astro, TypeScript-Islands, Three.js und Sass.',
    },
    links: [{ label: 'GitHub', url: 'https://github.com/Robert01101101/Portfolio-RMichels' }],
    heroAltLayout: false,
  },
  {
    slug: 'cyberview',
    order: 9,
    name: { en: 'Cyberview', de: 'Cyberview' },
    type: { en: '2D Game', de: '2D-Spiel' },
    year: '2019',
    roles: ['game', 'design'],
    description: {
      en: 'A narrative-driven 2D platformer, which revolves around unit 241, an AI-equipped droid that gains consciousness. Using a range of available body mods, unit 241 has to fight enemies, solve puzzles, and escape the building.',
      de: 'Ein erzählerisches 2D-Platformer-Spiel um Einheit 241, einen KI-ausgestatteten Droiden, der Bewusstsein erlangt.',
    },
    links: [
      { label: 'Itch.io', url: 'https://rmichels.itch.io/cyberview' },
      { label: 'Development Blog', url: 'https://404teamnotfound561902897.wordpress.com/' },
      { label: 'Play Online (WebGL Beta)', url: 'https://cyberview.rmichels.com' },
    ],
  },
  {
    slug: 'chromakeyAndColorMatching',
    order: 10,
    name: { en: 'Chromakey & Color Matching', de: 'Chromakey & Color Matching' },
    type: { en: 'Java App', de: 'Java App' },
    year: '2018',
    roles: ['java-dev', 'design'],
    description: {
      en: 'A digital image compositing process. Automatically creates high-quality composites. Advantages include the ability to deal with any foreground color, preventing color spill and color grading the subject to match the background.',
      de: 'Ein digitales Bild-Compositing-Verfahren. Erstellt automatisch hochwertige Composites.',
    },
    links: [{ label: 'Download app', url: '/assets/other/ChromakeyAndColorMatching.exe' }],
  },
  {
    slug: 'siar',
    order: 11,
    name: { en: 'Semester in Alternate Realities', de: 'Semester in Alternate Realities' },
    type: { en: 'VR Game', de: 'VR-Spiel' },
    year: '2019',
    roles: ['vr', 'game', 'pm', 'design'],
    description: {
      en: 'Semester in Alternate Realities (SIAR) is a program in which interdisciplinary teams tackle real-world problems using xR technologies. With the design challenge of "VR4good", we set out to create transformative experiences with a positive impact.',
      de: 'Semester in Alternate Realities (SIAR) ist ein Programm, in dem interdisziplinäre Teams reale Probleme mit xR-Technologien angehen.',
    },
  },
  {
    slug: 'pavilions',
    order: 12,
    name: { en: 'Pavilions', de: 'Pavilions' },
    type: { en: 'Spatial Design', de: 'Raumgestaltung' },
    year: '2018',
    roles: ['3d-model', 'cad', 'design'],
    description: {
      en: "Pavilions is the result of a spatial design exercise. Three pavilions proposed as a public space in Surrey's Holland Park, featuring abstract, modular, and parametric architecture.",
      de: 'Pavilions ist das Ergebnis einer räumlichen Designübung. Drei Pavillons als öffentlicher Raum in Surreys Holland Park.',
    },
    links: [{ label: 'View 3D Models', url: 'https://sketchfab.com/rmichels/collections/iat233-pavilions' }],
  },
  {
    slug: 'understandingClimateChange',
    order: 13,
    name: { en: 'Understanding Climate Change', de: 'Understanding Climate Change' },
    type: { en: 'D3.js Website', de: 'D3.js Website' },
    year: '2018',
    roles: ['d3js', 'front-end'],
    description: {
      en: 'A website that uses D3.js to visually analyze climate change data. Data visualizations include line charts and stacked area charts of global climate change data, as well as a detailed choropleth map and other visualizations of Canadian weather data.',
      de: 'Eine Website, die D3.js nutzt, um Klimawandeldaten visuell zu analysieren.',
    },
    links: [{ label: 'View Project', url: 'http://understandingclimatechange.rmichels.com/ccImpacts.html' }],
  },
];

function extractProjContent(phpPath) {
  if (!fs.existsSync(phpPath)) return '';
  const src = fs.readFileSync(phpPath, 'utf8');
  const openIdx = src.indexOf('<div id="projContent"');
  if (openIdx === -1) return '';
  const contentStart = src.indexOf('>', openIdx) + 1;
  const closeIdx = src.indexOf('</div>\n\n<?php', contentStart);
  if (closeIdx === -1) {
    const footerIdx = src.indexOf("Partial::build('footer')", contentStart);
    if (footerIdx === -1) return '';
    const slice = src.slice(contentStart, footerIdx);
    const lastDiv = slice.lastIndexOf('</div>');
    if (lastDiv === -1) return '';
    return cleanupHtml(slice.slice(0, lastDiv).trim());
  }
  return cleanupHtml(src.slice(contentStart, closeIdx).trim());
}

/** Extract gettext literals and drop other PHP from case study HTML. */
function stripPhp(html) {
  return html.replace(/<\?php[\s\S]*?\?>/g, (block) => {
    const parts = [...block.matchAll(/_\(\s*["']((?:\\.|[^"'\\])*)["']\s*\)/g)];
    if (parts.length) return parts.map((m) => m[1]).join('');
    if (block.includes("$GLOBALS['d']")) return '';
    return '';
  });
}

function cleanupHtml(html) {
  let h = stripPhp(html);
  h = h.replace(/<!--[\s\S]*?-->/g, '');
  h = h.replace(/src="(?:\.\.\/)?assets\//g, 'src="/assets/');
  h = h.replace(/href="(?!https?:|\/|#|mailto:)([a-zA-Z][a-zA-Z0-9]*)"/g, 'href="/$1"');
  h = h.replace(/<p>([^<]*)<p>/gi, '<p>$1</p><p>');
  h = h.replace(/<\/p>\s*<\/p>/g, '</p>');
  // Three.js mockup canvas is injected by ProjectLayout; keep figcaption only.
  h = h.replace(/<section class="sectionText mockup[^"]*">([\s\S]*?)<\/section>/gi, (match, inner) => {
    const cap = inner.match(/<figcaption>([\s\S]*?)<\/figcaption>/i);
    if (!cap) return '';
    const sectionClass = match.match(/<section class="([^"]*)"/i)?.[1] ?? 'sectionText mockup';
    return `<section class="${sectionClass}"><figcaption>${cap[1].trim()}</figcaption></section>`;
  });
  h = h.replace(/\n{3,}/g, '\n\n');
  return h.trim();
}

function toYaml(value, indent = 0) {
  const pad = '  '.repeat(indent);
  if (value === null || value === undefined) return 'null';
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (typeof value === 'number') return String(value);
  if (typeof value === 'string') {
    if (value.includes('\n') || value.includes(':') || value.includes('"')) {
      return `|\n${value.split('\n').map((l) => pad + '  ' + l).join('\n')}`;
    }
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    if (!value.length) return '[]';
    return '\n' + value.map((v) => `${pad}- ${toYaml(v, indent + 1).trimStart()}`).join('\n');
  }
  if (typeof value === 'object') {
    return '\n' + Object.entries(value)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => {
        const rendered = toYaml(v, indent + 1);
        if (rendered.startsWith('\n')) return `${pad}${k}:${rendered}`;
        return `${pad}${k}: ${rendered}`;
      })
      .join('\n');
  }
  return String(value);
}

fs.mkdirSync(outEn, { recursive: true });
fs.mkdirSync(outDe, { recursive: true });

for (const project of PROJECTS) {
  const phpPath = path.join(root, `${project.slug}.php`);
  const enMdPath = path.join(outEn, `${project.slug}.md`);
  const body =
    extractProjContent(phpPath) ||
    extractBodyFromMd(enMdPath);
  const bodyDe = applyPoTranslations(body, poTranslations);
  const frontmatter = { ...project };
  delete frontmatter.links;
  const links = project.links;
  let yaml = '---\n';
  yaml += `slug: ${JSON.stringify(project.slug)}\n`;
  yaml += `name:\n  en: ${JSON.stringify(project.name.en)}\n  de: ${JSON.stringify(project.name.de)}\n`;
  yaml += `projectType:\n  en: ${JSON.stringify(project.type.en)}\n  de: ${JSON.stringify(project.type.de)}\n`;
  yaml += `year: ${JSON.stringify(project.year)}\n`;
  if (project.company) yaml += `company: ${JSON.stringify(project.company)}\n`;
  yaml += `inDevelopment: ${project.inDevelopment ? 'true' : 'false'}\n`;
  yaml += `roles: [${project.roles.map((r) => JSON.stringify(r)).join(', ')}]\n`;
  if (project.teammembers) yaml += `teammembers: [${project.teammembers.map((t) => JSON.stringify(t)).join(', ')}]\n`;
  yaml += `description:\n  en: ${JSON.stringify(project.description.en)}\n  de: ${JSON.stringify(project.description.de)}\n`;
  if (links?.length) {
    yaml += 'links:\n';
    for (const link of links) {
      yaml += `  - label: ${JSON.stringify(link.label)}\n    url: ${JSON.stringify(link.url)}\n`;
    }
  }
  if (project.heroAltLayout !== undefined) yaml += `heroAltLayout: ${project.heroAltLayout}\n`;
  if (project.threeMockup) yaml += `threeMockup: ${JSON.stringify(project.threeMockup)}\n`;
  if (project.order) yaml += `order: ${project.order}\n`;
  yaml += '---\n\n';
  fs.writeFileSync(path.join(outEn, `${project.slug}.md`), yaml + body + '\n');
  fs.writeFileSync(path.join(outDe, `${project.slug}.md`), yaml + bodyDe + '\n');
}

console.log(`Exported ${PROJECTS.length} projects to src/content/projects/`);
