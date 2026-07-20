# Agent Guide — Portfolio-RMichels

Personal portfolio site for [rmichels.com](https://rmichels.com). **Astro** static site with content collections, bilingual routes (EN root / DE `/de/`), and client islands for Three.js and filtering.

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
| Local dev | `npm run dev` (port 4321) |

## Dev Tooling

```bash
npm install
npm run dev      # Astro dev server
npm run build    # Output to dist/
npm run check    # astro check
npm run test:unit      # Vitest (src/lib/*)
npm run test:content   # Content/asset/i18n validation
npm run test:verify    # Post-build dist/ route checks (run after build)
npm run test:e2e       # Playwright (after build)
```

- Content export (dev helper): `npm run export:content` — regenerates markdown from embedded metadata; applies PO translations for DE when `scripts/archive/messages.po` is present
- Commit `package-lock.json`; `node_modules/` is gitignored

## Directory Map

```
/
├── astro.config.mjs
├── package.json
├── public/
│   ├── assets/              # Images, icons, models (junction/copy from assets/)
│   ├── .htaccess            # Static hosting rules (copied to dist/)
│   └── css/normalize.css
├── src/
│   ├── content/
│   │   ├── config.ts        # Zod schemas
│   │   ├── projects/        # EN case study frontmatter + body
│   │   └── projects-de/     # DE case study bodies (translated)
│   ├── i18n/ui-en.json, ui-de.json
│   ├── layouts/BaseLayout.astro, ProjectLayout.astro
│   ├── components/          # Header, Footer, ProjectTile, etc.
│   ├── islands/             # Client TS: Menu, Lenis, Three.js, filters
│   ├── lib/projects.ts, roles.ts, i18n.ts
│   ├── pages/               # EN routes
│   └── pages/de/            # DE routes
├── scripts/
│   └── export-db-to-content.mjs
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
- `tourguide` is `inDevelopment` — tile links to `/development/tourguide`

## Testing

After code changes, run the agent verification loop (fast tier, < 3 min):

```bash
npm run check && npm run test:unit && npm run test:content && npm run build && npm run test:verify
```

Before changes touching islands, filters, or i18n routing, also run:

```bash
npm run test:e2e
```

Content-only changes (new case study markdown + images):

```bash
npm run test:content && npm run build && npm run test:verify
```

**Single-command alias:** `npm run test:fast && npm run build && npm run test:verify` covers the common agent loop without E2E.

**Failure diagnostics:** Vitest reports file:line; `validate-content.mjs` emits `{ slug, field, error }` JSON lines; Playwright captures screenshots on failure in `playwright-report/`.

## Deploy

- `main` branch: CI runs `npm ci`, sync assets, `npm run check`, `npm run test:unit`, `npm run test:content`, `npm run build`, `npm run test:verify`, Playwright E2E
- Deploy uploads `./dist/`; remove stale PHP files on the server root manually once after cutover (`dangerous-clean-slate` is off to protect `/subdomains/*`)
- `subdomains/tourguide/` has a separate FTPS step

## Never Edit or Commit

Same as before: `nopublicaccess/`, `database/`, `.cursor/mcp.json`, `_RawAssets/`, etc.

## Further Reading

- `docs/ARCHITECTURE.md` — Astro request/build flow
- `docs/NEW_PROJECT_PAGE.md` — add a project via markdown
