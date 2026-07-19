# New Project Page

Checklist for adding a portfolio case study. Reference: `futureEarth.php` (published) and `development/samplePageInDevelopment.php` (in-dev template).

## 1. Database

Add a row to the `projects` table (and related role rows). Required fields include `project_slug`, name, type, year. Slug must match the PHP filename.

Import/update via phpMyAdmin per `_DATABASE_SETUP_.txt`.

## 2. Hero image

Add `assets/img/{slug}.jpg` — used by `projectPageLanding` partial. Slug must match DB and PHP filename.

## 3. Gallery images (optional)

Create `assets/img/{slug}/lqip/` for gallery images. Use `onclick="viewImage(this)"` on `<figure>` elements (see `futureEarth.php`).

## 4. PHP page

Copy `futureEarth.php` → `{slug}.php` at repo root (or start from `development/samplePageInDevelopment.php` for in-dev pages).

```php
<?php
require "config.php";
require "src/Partial.php";
require "src/objects/Project.php";

$project = Project::buildProjectFromSlug('yourSlug');

Partial::build('header', ["project" => $project]);
Partial::build('projectPageLanding', [
  "project" => $project,
  "description" => _("Short summary."),
  "primaryLink" => "https://example.com",
  "primaryLinkText" => "Label",
  // "secondaryLink" / "secondaryLinkText" optional
  // "alt" => TRUE for alternate hero layout
]);
Partial::build('projectPageMeta', ["project" => $project]);
?>

<div id="projContent">
  <section class="sectionText">
    <h2><?php echo _("Section Title"); ?></h2>
    <p><?php echo _("Body text."); ?></p>
  </section>
  <section class="sectionMedia">
    <div class="mediaGrid">
      <figure onclick="viewImage(this)">
        <img src="assets/img/yourslug/lqip/1.jpg">
      </figure>
    </div>
  </section>
</div>

<?php Partial::build('footer'); ?>
```

### In-development page

Place in `development/`, add `chdir('../');` before requires, and set `inDevelopment` in DB so the tile shows the dev badge.

## 5. Routing

No config change needed — `.htaccess` maps `/yourSlug` → `yourSlug.php` automatically.

## 6. Translations

Wrap new user-facing strings in `_()`. Update `locale/de_DE/LC_MESSAGES/messages.po` per `_TRANSLATION_SETUP_.txt`.

## 7. Verify

- [ ] Slug matches: PHP filename, DB row, `assets/img/{slug}.jpg`
- [ ] Page loads at `/yourSlug`
- [ ] Appears on index/projects with correct filter
- [ ] Image viewer works on gallery images
- [ ] German translation updated (if applicable)

## Triple coupling reminder

```
yourSlug.php  ↔  DB project_slug  ↔  assets/img/yourSlug.jpg
```

All three must use the same slug string.
