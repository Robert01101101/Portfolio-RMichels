# Agent Guide — Portfolio-RMichels

Personal portfolio site for [rmichels.com](https://rmichels.com). **Astro** static site with content collections, bilingual routes (EN root / DE `/de/`), and client islands for Three.js and filtering.

> **Migration note:** PHP/LAMP files remain in the repo during validation on `feat/astro-migration`. Production cutover deploys `dist/` via GitHub Actions → FTPS.

## Stack

| Layer | Technology |
|-------|------------|
| Site generator | Astro 5 (static output) |
| Content | Markdown collections in `src/content/projects/` |
| Styles | Sass in `src/styles/` (Vite build) |
| Client JS | TypeScript islands in `src/islands/` |
| 3D | Three.js (per-page islands) |
| i18n | Locale-prefixed routes + `src/i18n/ui-*.json` |
| Deploy | GitHub Actions → FTPS (`dist/`) to Hostinger |
| Local dev | `npm run dev` (port 4321); legacy PHP still on XAMPP |

## Dev Tooling

```bash
npm install
npm run dev      # Astro dev server
npm run build    # Output to dist/
npm run check    # astro check
```

- Content export: `npm run export:content` (PHP/SQL → markdown), `npm run export:i18n` (gettext PO → JSON)
- Legacy PHP: `composer install` + `composer analyse` (until cutover)
- Commit `package-lock.json`; `node_modules/` is gitignored

## Directory Map

```
/
├── astro.config.mjs
├── package.json
├── public/
│   ├── assets/              # Images, icons, models (junction/copy from assets/)
│   └── css/normalize.css
├── src/
│   ├── content/
│   │   ├── config.ts        # Zod schemas
│   │   └── projects/        # Case study frontmatter + markdown body
│   ├── i18n/ui-en.json, ui-de.json
│   ├── layouts/BaseLayout.astro, ProjectLayout.astro
│   ├── components/          # Header, Footer, ProjectTile, etc.
│   ├── islands/             # Client TS: Menu, Lenis, Three.js, filters
│   ├── lib/projects.ts, roles.ts, i18n.ts
│   ├── pages/               # EN routes
│   └── pages/de/            # DE routes
├── scripts/
│   ├── export-db-to-content.mjs
│   └── po-to-json.mjs
├── subdomains/              # Separate deploy (tourguide, etc.)
└── docs/
```

## Page Pattern

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
const locale = 'en';
---
<BaseLayout title="..." description="..." locale={locale} pageType="about">
  <!-- content -->
</BaseLayout>
```

## Case Study Pattern

1. Add `src/content/projects/{slug}.md` with frontmatter (`slug`, `name`, `projectType`, `roles`, etc.) and markdown body
2. Add hero `public/assets/img/{slug}.jpg` and gallery under `public/assets/img/{slug}/lqip/`
3. Astro generates `/slug` and `/de/slug` via `src/pages/[slug].astro`

## i18n

| Page | EN | DE |
|------|----|----|
| Home | `/` | `/de/` |
| About | `/about` | `/de/about` |
| Projects | `/projects` | `/de/projects` |
| Case study | `/futureEarth` | `/de/futureEarth` |

UI strings: `t('key', locale)` from `src/lib/i18n.ts`. Language toggle links to equivalent path (no session).

## URL Preservation

- Case study slugs use camelCase via `slug:` frontmatter (e.g. `futureEarth`)
- Homepage filter: `/?filter=vr` sets `visitorFilter` cookie
- `tourguide` is `inDevelopment` — tile links to `/development/tourguide` (PHP until migrated)

## Deploy

- `main` branch: CI runs `npm ci`, `npm run check`, `npm run build`
- Deploy uploads `./dist/` only; `subdomains/tourguide/` has separate FTPS step

## Never Edit or Commit

Same as before: `nopublicaccess/`, `database/`, `.cursor/mcp.json`, `_RawAssets/`, etc.

## Further Reading

- `docs/ARCHITECTURE.md` — Astro request/build flow
- `docs/NEW_PROJECT_PAGE.md` — add a project via markdown
