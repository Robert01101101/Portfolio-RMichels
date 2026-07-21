# LAMP Legacy Artifacts

These files are from the pre-Astro PHP/LAMP portfolio stack. They are **not used** by the current static site.

| Path | Former role | Superseded by |
|------|-------------|---------------|
| `js/` | Client-side scripts (menu, filters, Three.js, LQIP, etc.) | `src/islands/` TypeScript islands |
| `phpunit.xml` | PHP unit test config | Vitest (`src/lib/*.test.ts`) + Playwright E2E |
| `prepros.config` | Prepros asset preprocessor | Vite (Astro build) |
| `_DATABASE_SETUP_.txt` | MySQL setup notes for PHP CMS | Markdown collections in `src/content/projects/` |

The live site is built from `dist/` via Astro. Do not restore these to the repo root.

**Still active elsewhere (not archived):** `nopublicaccess/`, `database/`, `backups/` — local-only secrets and dumps; never commit.
