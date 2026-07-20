#!/usr/bin/env node
/**
 * Export project metadata and markdown bodies from PHP case study files.
 * Falls back to embedded metadata when no SQL dump is available.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outEn = path.join(root, 'src/content/projects');
const outDe = path.join(root, 'src/content/projects-de');

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
    inDevelopment: true,
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
    type: { en: 'LAMP Website', de: 'LAMP Website' },
    year: '2020',
    roles: ['front-end', 'back-end', 'threejs', 'design'],
    description: {
      en: 'A full-stack website developed using the LAMP stack, utilizing Three.js and Sass.',
      de: 'Eine Full-Stack-Website mit dem LAMP-Stack, Three.js und Sass.',
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
  const match = src.match(/<div id="projContent"[^>]*>([\s\S]*?)<\/div>\s*(?:<\?php|<!--)/);
  if (!match) return '';
  return htmlToMarkdown(match[1].trim());
}

function htmlToMarkdown(html) {
  let md = html;
  md = md.replace(/<\?php[\s\S]*?\?>/g, '');
  md = md.replace(/<script[\s\S]*?<\/script>/gi, (m) => {
    const src = m.match(/src="([^"]+)"/);
    if (src) return `\n<script src="${src[1]}"></script>\n`;
    return '';
  });
  md = md.replace(/<iframe[^>]+src="([^"]+)"[^>]*><\/iframe>/gi, '\n<iframe src="$1" frameborder="0" allowfullscreen></iframe>\n');
  md = md.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '\n## $1\n');
  md = md.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n### $1\n');
  md = md.replace(/<p[^>]*>(.*?)<\/p>/gis, '\n$1\n');
  md = md.replace(/<code>(.*?)<\/code>/gi, '`$1`');
  md = md.replace(/<figure[^>]*onclick="viewImage\(this\)"[^>]*>\s*<img[^>]+src="([^"]+)"[^>]*>\s*<\/figure>/gi, '\n![gallery]($1)\n');
  md = md.replace(/<div class="mediaGrid">([\s\S]*?)<\/div>/gi, '$1');
  md = md.replace(/<div class="auto-resizable-iframe">[\s\S]*?<\/div>/gi, (m) => m);
  md = md.replace(/<[^>]+>/g, '');
  md = md.replace(/&nbsp;/g, ' ');
  md = md.replace(/\n{3,}/g, '\n\n');
  return md.trim();
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
  const body = extractProjContent(phpPath);
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
  fs.writeFileSync(path.join(outDe, `${project.slug}.md`), yaml + body + '\n');
}

console.log(`Exported ${PROJECTS.length} projects to src/content/projects/`);
