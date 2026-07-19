# Agent Guide — Portfolio-RMichels

Personal portfolio site for [rmichels.com](https://rmichels.com). Classic **LAMP** stack (PHP + MySQL + Apache), **no framework**, custom partial templating.

## Stack

| Layer | Technology |
|-------|------------|
| Backend | PHP 8.x, mysqli |
| Database | MySQL/MariaDB (project metadata only) |
| Frontend | Sass → CSS (Prepros), vanilla JS, Three.js |
| i18n | PHP gettext (`_()`) — EN/DE |
| Deploy | GitHub Actions → FTPS (Hostinger) |
| Local dev | XAMPP (Apache + MySQL) |

## Dev Tooling

- Run `composer install` (XAMPP users may need `extension=zip` uncommented in `php.ini`).
- Run `composer analyse` for PHPStan static analysis.
- PHPStan uses `phpstan-baseline.neon` for legacy code; new code in `src/` should not add baseline entries; fix issues instead.
- Optional: `npm install` and `npm run build:css` to compile Sass without Prepros.
- Commit `composer.lock`; `vendor/` is gitignored.



## Directory Map

```
/
├── index.php, about.php, projects.php, {slug}.php   # One PHP file per route
├── config.php                                       # Sets $GLOBALS['d'] path prefix
├── .htaccess                                        # Clean URLs (hide .php)
├── src/
│   ├── Partial.php                                  # Template loader
│   ├── objects/Project.php, Role.php              # DB-backed models
│   └── partials/                                    # header, footer, projectTile, etc.
├── skills/                                          # PHP showcase pages (NOT Cursor agent skills)
├── development/                                     # In-progress project pages
├── scss/ → css/                                     # Edit SCSS; Prepros compiles to CSS
├── js/                                              # Source + *-min.js pairs
├── assets/img/, assets/icon/, assets/models/        # Web images & 3D models
├── locale/de_DE/LC_MESSAGES/                        # German translations (.po/.mo)
├── subdomains/                                      # Separate mini-apps (Unity WebGL, etc.)
├── _RawAssets/                                      # Raw design/source files (large, gitignored from AI)
├── database/                                        # SQL dumps (gitignored)
├── nopublicaccess/                                  # DB credentials (gitignored)
├── docs/                                            # Architecture & how-to guides
└── .cursor/rules/                                   # Cursor agent rules
```

## Page Creation Pattern

Every page follows: **config → Partial → header → content → footer**.

### Root page (e.g. `about.php`)

```php
<?php
require "config.php";
require "src/Partial.php";
require "src/objects/Project.php";

Partial::build('header', ["about" => TRUE]);
?>
<!-- page HTML -->
<?php
Partial::build('footer', ["projects" => TRUE]);
?>
```

### Project case study (e.g. `futureEarth.php`)

```php
<?php
require "config.php";
require "src/Partial.php";
require "src/objects/Project.php";

$project = Project::buildProjectFromSlug('futureEarth');

Partial::build('header', ["project" => $project]);
Partial::build('projectPageLanding', [
  "project" => $project,
  "description" => _("Short project summary."),
  "primaryLink" => "https://example.com",
  "primaryLinkText" => "Link Label",
]);
Partial::build('projectPageMeta', ["project" => $project]);
?>
<div id="projContent">
  <section class="sectionText"><h2>Section</h2><p>Content</p></section>
  <section class="sectionMedia"><!-- images --></section>
</div>
<?php Partial::build('footer'); ?>
```

### Subdirectory pages (`skills/`, `development/`)

Use `__DIR__` requires. Pages in `development/` also need `chdir('../')` before requires.

```php
require_once __DIR__ . "/../config.php";
require_once __DIR__ . "/../src/Partial.php";
```

See `docs/NEW_PROJECT_PAGE.md` for the full new-project checklist.

## Page Context Flags

Passed to `header`/`footer` via `Partial::build()` args (become variables via `extract()`):

| Flag | Effect |
|------|--------|
| `$project` | Project-specific title/meta; home icon in nav |
| `$projects` | "All Projects" title; loads `projectFilter-min.js` |
| `$about` | About title; nav highlight |
| `$index` | Loads landing 3D model + text animation JS |
| `$skills` | Passed by skills pages but **not yet handled** in header |

## i18n Workflow

- Wrap user-facing strings in `_()` for translatable pages.
- Locale setup runs in `src/partials/header.php` (session + browser detection).
- German PO file: `locale/de_DE/LC_MESSAGES/messages.po`
- Full workflow: `_TRANSLATION_SETUP_.txt`
- **Known issue:** gettext may not work on Windows/XAMPP; works on Hostinger.

Extract strings:
```bash
xgettext -n about.php -n index.php -n src/partials/header.php ...
msgfmt messages.po   # compile to .mo
```

## Build Workflow

- **Sass:** Edit `scss/`, compile with **Prepros** (`prepros.config`). Output: `css/main.css`.
- **JS:** Edit source files in `js/`; Prepros produces `*-min.js`. Footer loads minified versions.
- **Deploy excludes `scss/`** — only compiled `css/` ships to production.
- Do **not** edit `css/main.css` directly; always change SCSS and recompile.

## Local Dev Setup

1. Install [XAMPP](https://www.apachefriends.org/); place repo in `htdocs/`.
2. Start Apache + MySQL in XAMPP Control Panel.
3. Mount VeraCrypt drive for secrets (see `_DATABASE_SETUP_.txt`).
4. Import DB from `database/` dump via phpMyAdmin.
5. Ensure `nopublicaccess/auth.php` exists (DB credentials).
6. Run Prepros to compile Sass/JS.
7. Browse `http://localhost/` (or `https://` if configured).

## MCP / Cursor Secrets

`.cursor/mcp.json` uses environment variable placeholders — **never commit real API keys**.

Set Trello (or other MCP) credentials in **Cursor Settings → MCP → Environment**, not in the repo:
- `TRELLO_API_KEY`
- `TRELLO_TOKEN`
- `TRELLO_BOARD_ID`

## Never Edit or Commit

| Path | Reason |
|------|--------|
| `nopublicaccess/` | DB credentials |
| `database/` | SQL dumps with data |
| `backups/` | Local backups |
| `.cursor/mcp.json` | MCP secrets (gitignored) |
| `_RawAssets/`, `_PreAssets/` | Large raw design files |
| `encryptedDrive*` | VeraCrypt volumes |
| `css/main.css` | Generated — edit `scss/` instead |
| `js/*-min.js` | Generated — edit source `.js` instead |

## Common Tasks

| Task | Steps |
|------|-------|
| **Add a page** | Create `{name}.php` at root; follow page pattern; `.htaccess` auto-routes `/name` |
| **Add a project** | DB row + `{slug}.php` + images in `assets/img/{slug}/` — see `docs/NEW_PROJECT_PAGE.md` |
| **Update skills** | Edit `skills/*.php` (these are PHP pages, not Cursor skills) |
| **Change styles** | Edit `scss/`, run Prepros |
| **Add translation** | Wrap string in `_()`, run xgettext, update `messages.po`, msgfmt |
| **Add partial** | Create `src/partials/{name}.php`, call `Partial::build('{name}', $args)` |

## Important Conventions

- **Slug coupling:** Each project needs aligned PHP filename, DB `project_slug`, and `assets/img/{slug}.jpg`.
- **Asset paths:** Root pages often use bare `assets/img/...`; subdirectory pages use `$GLOBALS['d']` prefix. Match the surrounding file's pattern.
- **DB content vs page content:** MySQL stores metadata (name, type, year, roles); case study body is hardcoded in each `{slug}.php`.
- **Do not refactor application logic** unless explicitly asked — this repo values minimal, focused diffs.

## Further Reading

- `docs/ARCHITECTURE.md` — request flow, routing, data layer
- `docs/NEW_PROJECT_PAGE.md` — step-by-step new project guide
- `_TRANSLATION_SETUP_.txt` — gettext commands
- `_DATABASE_SETUP_.txt` — DB import (encrypted)
