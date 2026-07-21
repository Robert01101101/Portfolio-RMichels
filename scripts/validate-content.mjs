#!/usr/bin/env node
/**
 * Pre-build content validation for Astro portfolio.
 * Exit code 1 on failure; emits JSON lines { slug, field, error } per issue.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const PROJECTS_EN = path.join(root, 'src/content/projects');
const PROJECTS_DE = path.join(root, 'src/content/projects-de');
const ROLES_TS = path.join(root, 'src/lib/roles.ts');
const UI_EN = path.join(root, 'src/i18n/ui-en.json');
const UI_DE = path.join(root, 'src/i18n/ui-de.json');
/** Prefer public/assets (runtime); fall back to tracked assets/ when junction is absent (CI). */
function resolveAssetDir(...parts) {
  for (const base of ['public/assets', 'assets']) {
    const dir = path.join(root, base, ...parts);
    if (fs.existsSync(dir)) return dir;
  }
  return path.join(root, 'public/assets', ...parts);
}

const IMG_DIR = resolveAssetDir('img');
const LQIP_DIR = resolveAssetDir('img', 'lqip');
const MODELS_DIR = resolveAssetDir('models');

const THREE_MOCKUP_ASSETS = {
  phone: 'phone.glb',
  hololens: 'hlAndBridgeCombined.glb',
};

/** @type {{ slug: string, field: string, error: string }[]} */
const errors = [];

/**
 * @param {string} slug
 * @param {string} field
 * @param {string} error
 */
function fail(slug, field, error) {
  const entry = { slug, field, error };
  errors.push(entry);
  console.log(JSON.stringify(entry));
}

/**
 * Case-sensitive existence check (Linux deploy / CI safe).
 * @param {string} dir
 * @param {string} filename
 */
function fileExistsExact(dir, filename) {
  if (!fs.existsSync(dir)) return false;
  return fs.readdirSync(dir).includes(filename);
}

/**
 * @param {string} dir
 * @returns {string[]}
 */
function listMarkdownBasenames(dir) {
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith('.md'))
    .sort();
}

/**
 * @param {string} content
 * @returns {{ slug?: string, roles: string[], inDevelopment: boolean, draft: boolean, threeMockup?: string | null }}
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    return { roles: [], inDevelopment: false, draft: false };
  }

  const fm = match[1];
  const slug = fm.match(/^slug:\s*["']?([^"'\n]+)["']?/m)?.[1];

  const inDevelopment = /^inDevelopment:\s*true\s*$/m.test(fm);
  const draft = /^draft:\s*true\s*$/m.test(fm);

  let threeMockup;
  const threeMockupMatch = fm.match(/^threeMockup:\s*(.+)$/m);
  if (threeMockupMatch) {
    const raw = threeMockupMatch[1].trim();
    threeMockup = raw === 'null' ? null : raw.replace(/^["']|["']$/g, '');
  }

  /** @type {string[]} */
  let roles = [];
  const rolesBlock = fm.match(/^roles:\s*\[([^\]]*)\]/m);
  if (rolesBlock) {
    roles = rolesBlock[1]
      .split(',')
      .map((item) => item.trim().replace(/^["']|["']$/g, ''))
      .filter(Boolean);
  }

  return { slug, roles, inDevelopment, draft, threeMockup };
}

/**
 * @param {string} filePath
 * @returns {{ basename: string, slug: string, roles: string[], inDevelopment: boolean, draft: boolean, threeMockup?: string | null }}
 */
function loadProject(filePath) {
  const basename = path.basename(filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  const parsed = parseFrontmatter(content);
  const filenameSlug = basename.replace(/\.md$/i, '');

  return {
    basename,
    slug: parsed.slug ?? filenameSlug,
    roles: parsed.roles,
    inDevelopment: parsed.inDevelopment,
    draft: parsed.draft,
    threeMockup: parsed.threeMockup,
  };
}

/**
 * @returns {Set<string>}
 */
function loadRoleSlugs() {
  const source = fs.readFileSync(ROLES_TS, 'utf8');
  const slugs = new Set();
  const re = /slug:\s*'([^']+)'/g;
  let match;
  while ((match = re.exec(source)) !== null) {
    slugs.add(match[1]);
  }
  return slugs;
}

/**
 * @param {Record<string, unknown>} obj
 * @param {string} [prefix]
 * @returns {string[]}
 */
function collectJsonKeys(obj, prefix = '') {
  /** @type {string[]} */
  const keys = [];
  for (const key of Object.keys(obj).sort()) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    keys.push(fullKey);
    const value = obj[key];
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      keys.push(...collectJsonKeys(/** @type {Record<string, unknown>} */ (value), fullKey));
    }
  }
  return keys;
}

function checkEnDeParity() {
  const enFiles = listMarkdownBasenames(PROJECTS_EN);
  const deFiles = listMarkdownBasenames(PROJECTS_DE);
  const enSet = new Set(enFiles);
  const deSet = new Set(deFiles);

  for (const file of enFiles) {
    if (!deSet.has(file)) {
      fail(file.replace(/\.md$/i, ''), 'locale', `missing DE counterpart: ${file}`);
    }
  }

  for (const file of deFiles) {
    if (!enSet.has(file)) {
      fail(file.replace(/\.md$/i, ''), 'locale', `missing EN counterpart: ${file}`);
    }
  }
}

function checkProjects() {
  const roleSlugs = loadRoleSlugs();
  const enFiles = listMarkdownBasenames(PROJECTS_EN).map((name) => path.join(PROJECTS_EN, name));
  const deFiles = listMarkdownBasenames(PROJECTS_DE).map((name) => path.join(PROJECTS_DE, name));
  /** @type {Map<string, { slug: string, inDevelopment: boolean, draft: boolean, threeMockup?: string | null }>} */
  const projectsBySlug = new Map();

  for (const filePath of [...enFiles, ...deFiles]) {
    const project = loadProject(filePath);
    const filenameSlug = project.basename.replace(/\.md$/i, '');

    if (project.slug !== filenameSlug) {
      fail(filenameSlug, 'slug', `frontmatter slug "${project.slug}" does not match filename "${filenameSlug}"`);
    }
  }

  for (const filePath of enFiles) {
    const project = loadProject(filePath);
    for (const role of project.roles) {
      if (!roleSlugs.has(role)) {
        fail(project.slug, 'roles', `unknown role "${role}"`);
      }
    }

    if (!project.draft) {
      const heroName = `${project.slug}.jpg`;
      if (!fileExistsExact(IMG_DIR, heroName)) {
        fail(
          project.slug,
          'heroImage',
          `missing file: public/assets/img/${heroName} (also checked assets/img/)`,
        );
      }

      const lqipName = `${project.slug}.jpg`;
      if (!fileExistsExact(LQIP_DIR, lqipName)) {
        fail(
          project.slug,
          'lqipImage',
          `missing file: public/assets/img/lqip/${lqipName} (also checked assets/img/lqip/)`,
        );
      }
    }

    if (project.threeMockup) {
      const assetName = THREE_MOCKUP_ASSETS[project.threeMockup];
      if (!assetName) {
        fail(project.slug, 'threeMockup', `unknown threeMockup value "${project.threeMockup}"`);
      } else {
        if (!fileExistsExact(MODELS_DIR, assetName)) {
          fail(project.slug, 'threeMockup', `missing model: public/assets/models/${assetName} (also checked assets/models/)`);
        }
      }
    }

    projectsBySlug.set(project.slug, project);
  }

  return projectsBySlug;
}

/**
 * @param {Map<string, { slug: string, inDevelopment: boolean, draft: boolean }>} projectsBySlug
 */
function checkInDevelopmentRouting(_projectsBySlug) {
  // inDevelopment projects are excluded from [slug] via Astro getStaticPaths filters.
}

function checkUiKeyParity() {
  const en = JSON.parse(fs.readFileSync(UI_EN, 'utf8'));
  const de = JSON.parse(fs.readFileSync(UI_DE, 'utf8'));
  const enKeys = new Set(collectJsonKeys(en));
  const deKeys = new Set(collectJsonKeys(de));

  for (const key of enKeys) {
    if (!deKeys.has(key)) {
      fail('i18n', key, `missing in ui-de.json`);
    }
  }

  for (const key of deKeys) {
    if (!enKeys.has(key)) {
      fail('i18n', key, `missing in ui-en.json`);
    }
  }
}

function main() {
  checkEnDeParity();
  const projectsBySlug = checkProjects();
  checkInDevelopmentRouting(projectsBySlug);
  checkUiKeyParity();

  console.log(`\nSummary: ${errors.length} error(s)`);
  process.exit(errors.length > 0 ? 1 : 0);
}

main();
