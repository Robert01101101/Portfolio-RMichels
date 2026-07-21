# Architecture — Portfolio-RMichels (Astro)

## Overview

The site is a **static Astro** build. All HTML is generated at build time from:

- **Pages** in `src/pages/` (and `src/pages/de/` for German)
- **Project metadata + body** in `src/content/projects/*.md` (EN) and `src/content/projects-de/*.md` (DE)
- **UI strings** in `src/i18n/ui-en.json` and `ui-de.json`
- **Roles** for filtering in `src/lib/roles.ts`

No MySQL or PHP at runtime after cutover.

## Build Flow

```mermaid
flowchart LR
  MD[src/content/projects/*.md]
  Pages[src/pages]
  MD --> Astro[Astro build]
  Pages --> Astro
  Astro --> Dist[dist/]
  Dist --> GHA[GitHub Actions]
  GHA --> FTPS[Hostinger FTPS]
```

## Routing

| URL | Source |
|-----|--------|
| `/` | `src/pages/index.astro` |
| `/about` | `src/pages/about.astro` |
| `/projects` | `src/pages/projects.astro` |
| `/futureEarth` | `src/pages/[slug].astro` + `slug` frontmatter |
| `/de/about` | `src/pages/de/about.astro` |

`astro.config.mjs` sets `i18n.defaultLocale: 'en'`, `prefixDefaultLocale: false`.

## Layouts

- **BaseLayout** — `<head>` (GA, hreflang, canonical, OG), Header, Footer, global islands
- **ProjectLayout** — case study shell: ProjectLanding, ProjectMeta, markdown body, optional Three.js mockup

## Client Islands

Loaded per page via `<script src="..." client:load|visible|idle>`:

| Island | Pages |
|--------|-------|
| LandingModel | Home |
| ProjectFilter | Home, Projects, About |
| ImageViewer, Lqip | Case studies |
| ThreeMockup | tourguide, clirioScanViews |
| ParticleWaves | All (footer) |
| Menu, LenisSetup | All |

## Content Model

Frontmatter fields (see `src/content/config.ts`):

- `slug` — URL override (camelCase; not in Zod — Astro reserved)
- `name`, `projectType`, `description` — `{ en, de }`
- `year`, `roles`, `links`, `heroAltLayout`, `threeMockup`, `inDevelopment`, `order`

Markdown body = case study HTML sections (former `#projContent`).

## Deploy

- **PR → `main`:** `npm ci` → sync assets → check → test → build → verify → Playwright E2E
- **Merge to `main`:** build → verify → `dist/` via FTPS (`dangerous-clean-slate: false`, dist-specific state file; does not touch `/subdomains/*`)
- `public/.htaccess` → copied to `dist/` for Apache directory index and trailing slashes

## Subdomains

`subdomains/tourguide/` and others are deployed manually via FTPS; not part of Astro `dist/` or CI.
