# New Project Page (Astro)

Checklist for adding a portfolio case study after the Astro migration.

## 1. Content files

Create **both** locale files with matching frontmatter:

- `src/content/projects/{slug}.md` — EN body
- `src/content/projects-de/{slug}.md` — DE body (translated)

```yaml
---
slug: yourSlug
name:
  en: "Project Name"
  de: "Projektname"
projectType:
  en: "VR Game"
  de: "VR-Spiel"
year: "2025"
inDevelopment: false
roles: ["vr", "unity", "game-development"]
description:
  en: "Short summary for the landing area."
  de: "Kurze Zusammenfassung."
links:
  - label: "Live Demo"
    url: "https://example.com"
heroAltLayout: false
order: 1
---

## Section Title

Body markdown converted from case study sections.
```

**Important:** `slug` in frontmatter sets the URL (`/yourSlug`). Do not add `slug` to the Zod schema in `config.ts` — Astro treats it as a reserved routing field.

Frontmatter must match between EN and DE files for the same slug (validated by `npm run test:content`). Only the markdown body differs by locale.

## 2. Images

| Asset | Path |
|-------|------|
| Hero | `public/assets/img/{slug}.jpg` |
| Tile LQIP | `public/assets/img/lqip/{slug}.jpg` |
| Gallery | `public/assets/img/{slug}/lqip/*.jpg` |

Gallery images in markdown use `![gallery](/assets/img/{slug}/lqip/1.jpg)` or HTML figures (ImageViewer binds click handlers).

## 3. Roles

If the project needs new filter tags, add entries to `src/lib/roles.ts` and assign `roles: [...]` in frontmatter.

## 4. Optional flags

| Field | Effect |
|-------|--------|
| `threeMockup: phone` | Phone Three.js mockup island |
| `threeMockup: hololens` | HoloLens mockup |
| `heroAltLayout: true` | Alternate hero image layout |
| `inDevelopment: true` | Dev badge; excluded from `/slug` route; tile → `/development/{slug}` |
| `draft: true` | Excluded from build |

## 5. German body

Add a translated body in `src/content/projects-de/{slug}.md` with the same frontmatter as the EN file. UI strings on listing pages come from frontmatter `name` / `projectType` via `getLocalized()`.

## 6. Verify locally

```bash
npm run dev
```

- [ ] `/yourSlug` and `/de/yourSlug` render
- [ ] Tile appears on `/` and `/projects` with correct filter roles
- [ ] Image viewer works on gallery images
- [ ] LQIP swaps to full-res on load

## 7. Deploy

Push to `main` → CI builds `dist/` → FTPS deploy. No database or new PHP file required.

## Slug coupling (unchanged concept)

```
src/content/projects/yourSlug.md  ↔  slug frontmatter  ↔  public/assets/img/yourSlug.jpg
```

All three must use the same slug string.
