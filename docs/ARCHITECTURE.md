# Architecture

## Request flow

```
Browser → Apache (.htaccess) → {route}.php → Partial::build() → MySQL (metadata)
```

1. **`.htaccess`** rewrites clean URLs (`/futureEarth`) to PHP files (`futureEarth.php`) when no matching file/directory exists.
2. **Page PHP** loads `config.php`, `Partial.php`, and optionally `Project.php`.
3. **`Partial::build()`** extracts args and `require`s `src/partials/{name}.php`.
4. **`header.php`** sets up gettext locale, HTML head, nav, and opens `<main>`.
5. Page body is inline HTML/PHP in the route file.
6. **`footer.php`** closes layout, loads page-specific JS, and renders contact links.

## Data model (hybrid)

| Source | Contents |
|--------|----------|
| **MySQL** | Project metadata: slug, name, type, year, roles, in-development flag |
| **PHP files** | Case study body: sections, images, videos, gists |
| **`assets/img/`** | Hero image (`{slug}.jpg`), gallery images under `{slug}/` |

`Project::buildProjectFromSlug()` loads DB row; page content is not stored in DB.

## Routing

- Root routes: one `.php` file per page (`about.php`, `futureEarth.php`, …).
- `skills/*.php` and `development/*.php` are accessed by path; `development/` pages call `chdir('../')` so partial paths resolve.
- Subdomains (`subdomains/tourguide/`, `subdomains/cyberview/`) are separate mini-apps deployed alongside the main site.

## i18n

Gettext via `_()` in PHP. Locale files in `locale/de_DE/LC_MESSAGES/`. Language toggle posts to `set_language.php`. See `_TRANSLATION_SETUP_.txt`.

## Build & assets

- **SCSS** (`scss/`) → **CSS** (`css/`) via Prepros or `npm run build:css`.
- **JS** source files minified to `*-min.js` by Prepros; footer references minified versions.
- Large/raw assets in `_RawAssets/`; web-ready assets in `assets/`.

## Deploy pipeline

```
push to main → CI (phpstan) → FTPS deploy (Hostinger)
```

**`ci.yaml`**: checkout, PHP 8.2, `composer install`, `phpstan analyse`.

**`deploy.yaml`**: runs after CI passes; FTPS upload via `SamKirkland/FTP-Deploy-Action`. Excludes dev-only paths (`.git`, `scss/`, `_RawAssets/`, `.cursor/`, `database/`, etc.). Secrets via GitHub Actions.

## Security boundaries

- `nopublicaccess/auth.php` — DB credentials (not in repo).
- `database/` — SQL dumps (not in repo).
- Deploy excludes setup docs and encrypted drive references.
