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

## Body layout (HTML in markdown)

Project bodies are rendered with `@astrojs/markdown-remark`. Most case studies use **raw HTML blocks** for sections, galleries, embeds, and gist code samples — not pure markdown sections.

### Critical: no blank lines inside HTML blocks

A blank line **between HTML tag lines** terminates HTML mode. The parser then treats following markup as markdown, which renders it as a dark Shiki code block instead of live HTML.

```html
<!-- BAD: blank line between tags breaks rendering -->
<section class="sectionText">
  <p>First paragraph.</p>

  <p>Second paragraph.</p>
</section>

<!-- GOOD: consecutive tag lines, no blank lines inside the block -->
<section class="sectionText">
  <p>First paragraph.</p>
  <p>Second paragraph.</p>
</section>
```

`npm run test:content` flags these in source. After build, `npm run test:verify` also checks that no project page contains accidental `data-language="plaintext"` blocks.

Use `<p></p>` for vertical spacing inside a section if needed (see `futureEarth.md`).

### Section patterns

| Purpose | Wrapper | Notes |
|---------|---------|-------|
| Text | `<section class="sectionText">` | Headings, paragraphs, links |
| Media | `<section class="sectionMedia">` | Galleries, embeds, code |
| Intro in media | `<div class="divText">` | Centered heading + copy above a gallery |

### Image galleries

| Layout class | Use when |
|--------------|----------|
| `mediaGrid` | Many images, centered grid |
| `mediaRow` | Horizontal row; add `-equalWidth`, `-equalHeight`, `-zigzag`, etc. |
| `mediaSquare` | 2×2-style layout |
| `mediaColumn` | Stacked blocks; `-fullWidth` for full bleed |

Always wrap gallery images in `<figure><img …><figcaption>…</figcaption></figure>`. Clicking any figure opens the page-wide PhotoSwipe lightbox. Add `ignorecarousel` on outer `<figure>` when the wrapper should not be a slide itself (e.g. layout containers with nested figures).

Gallery paths: `/assets/img/{slug}/lqip/*` (LQIP island swaps to full-res on load).

### Video and iframe embeds

Wrap YouTube, Figma, and similar embeds in the responsive wrapper:

```html
<div class="auto-resizable-iframe">
  <div>
    <iframe src="..." allowfullscreen></iframe>
  </div>
</div>
```

For side-by-side embeds, place each `auto-resizable-iframe` inside a `mediaRow mediaRow-equalWidth`.

### Code snippets

Use GitHub gist embeds — **not** markdown fenced code blocks for layout HTML:

```html
<section class="sectionMedia">
  <div class="divText">
    <h2>Code Sample</h2>
    <p>Short description of the snippet.</p>
  </div>
  <script src="https://gist.github.com/{user}/{gist-id}.js"></script>
</section>
```

At build time, `remark-gist-embed` fetches the gist and renders styled `.code-snippet` figures (Shiki + Monokai).

## 2. Images

| Asset | Path |
|-------|------|
| Hero | `public/assets/img/{slug}.jpg` |
| Tile LQIP | `public/assets/img/lqip/{slug}.jpg` |
| Gallery | `public/assets/img/{slug}/lqip/*.jpg` |

Gallery images in markdown use `![gallery](/assets/img/{slug}/lqip/1.jpg)` or HTML figures (ProjectLightbox binds click handlers automatically).

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
- [ ] No raw HTML appears as dark code blocks (run `npm run build && npm run test:verify`)

## 7. Deploy

Push to `main` → CI builds `dist/` → FTPS deploy. No database or new PHP file required.

## Slug coupling (unchanged concept)

```
src/content/projects/yourSlug.md  ↔  slug frontmatter  ↔  public/assets/img/yourSlug.jpg
```

All three must use the same slug string.
