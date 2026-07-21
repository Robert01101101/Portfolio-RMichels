---
name: commit-messages
description: >-
  Analyze the working copy, split changes into logical Conventional Commits
  when appropriate, and commit them sequentially one after another. Use when
  the user asks to commit, write commit messages, stage changes, or review
  the working copy before committing.
---

# Commit Messages

Use **[Conventional Commits](https://www.conventionalcommits.org/)** — the de-facto standard used by Angular, semantic-release, and most open-source projects.

## Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Subject line

```
<type>[scope]: <description>
```

| Part | Rule |
|------|------|
| **type** | What kind of change (see table below) |
| **scope** | Optional noun in parentheses — the area affected (e.g. `i18n`, `ci`, `e2e`) |
| **description** | Imperative mood, lowercase, no trailing period, ≤ 72 chars |

### Types

| Type | When to use |
|------|-------------|
| `feat` | New user-facing capability or content |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, whitespace — no logic change |
| `refactor` | Code restructure with no behavior change |
| `perf` | Performance improvement |
| `test` | Add or update tests |
| `build` | Build system, bundler, or dependencies |
| `ci` | CI/CD pipeline or workflow changes |
| `chore` | Maintenance that doesn't fit above (tooling config, housekeeping) |
| `revert` | Revert a prior commit |

### Body (optional)

Separate from the subject with a blank line. Use when the *why* isn't obvious:

- Explain motivation and contrast with previous behavior
- Wrap at ~72 characters
- Do not repeat the subject

### Footer (optional)

```
BREAKING CHANGE: <description of what broke and how to migrate>
Refs: #123
```

- `BREAKING CHANGE` (or `type!:` in the subject, e.g. `feat!:`) signals a major-version bump
- Issue/PR references go in the footer, not the subject

## Writing rules

1. **One logical change per commit** — each commit should build and make sense on its own.
2. **Subject = what + where** — `fix(e2e): correct gallery selector after layout change`
3. **Body = why** — only when the subject alone isn't enough.
4. **Scope is optional but encouraged** when it aids navigation in `git log`.
5. **Never commit secrets** — exclude `nopublicaccess/`, credentials, `.env`, and similar paths.

### Suggested scopes for this repo

| Scope | Area |
|-------|------|
| `content` | Markdown case studies, frontmatter, assets |
| `i18n` | DE/EN routes, `ui-*.json`, translations |
| `ci` | GitHub Actions workflows |
| `e2e` | Playwright tests |
| `islands` | Client-side TypeScript islands |
| `styles` | Sass / CSS |
| `deploy` | FTPS, hosting, `.htaccess` |
| `deps` | `package.json` / lockfile updates |

Omit scope when the change is repo-wide or doesn't fit a single area.

## Split or single commit?

**Default: analyze the full working copy first.** Do not blindly commit everything in one shot.

### Keep a single commit when

- All changes serve **one story** (e.g. a bug fix and its regression test)
- The diff is **small and atomic** (typo, config tweak, single-file change)
- Splitting would leave **intermediate commits broken** (feature without its required companion change in the same push)
- Changes are **tightly coupled** — separating them obscures intent more than it helps review

### Split into multiple commits when

- Changes span **different types** (`feat` + `ci` + `docs`)
- Changes span **unrelated scopes** (`content` case study + unrelated `islands` fix)
- A **refactor** is mixed with feature or fix work — isolate the refactor so the functional commit stays readable
- **Generated or bulk files** (lockfile, `dist/`) should be separate from source changes — or excluded entirely unless intentional
- Any slice would make **`git bisect`** or **`git revert`** painful if kept together

When splitting, **commit sequentially** — finish and verify each commit before starting the next. Do not batch-plan five commits and only run `git commit` once at the end.

### Grouping guide

| Group together | Split apart |
|----------------|-------------|
| Feature + tests for that feature | Feature + unrelated CI workflow change |
| EN content + matching DE translation | Content update + stylesheet refactor |
| Bug fix + minimal fix to the test that caught it | Two unrelated bug fixes |
| Lockfile bump + the dep change that required it | Dep bump + feature work in the same session |

## Workflow

When asked to commit:

### 1. Survey the working copy

Run in parallel:

```bash
git status
git diff          # unstaged
git diff --cached # staged (if any)
git log -5 --oneline
```

Read the full diff. List every changed file and assign it to a logical group (type + scope).

### 2. Plan the commit sequence

Write a short plan before staging — especially when multiple commits are likely:

```
Plan (3 commits):
1. refactor(about): extract experience section into components
2. feat(about): add glossary terms to about page
3. feat(i18n): sync German about page copy
```

**Order commits so each step is valid:**

1. `build` / `ci` / infrastructure others depend on
2. `refactor` that enables later work
3. `feat` / `fix` / `perf` — the functional change
4. `test` — only when tests are a separate, reviewable slice (otherwise keep with the feature/fix)
5. `docs`
6. `chore` / `style` — housekeeping last (unless formatting would obscure an earlier diff)

If unsure whether to split, prefer splitting — but ask the user when groups are ambiguous or equally valid.

### 3. Commit one group at a time

For each planned commit:

```bash
# Stage only the files/hunks for this group
git add path/to/relevant/files

# Verify the staged diff matches the intended commit — critical before every commit
git diff --cached

# Commit
git commit -m "$(cat <<'EOF'
<type>(<scope>): <description>

<optional body>

EOF
)"

# Confirm clean staging area before the next group
git status
```

Use `git add -p` when a single file contains hunks belonging to different commits.

**Never** `git add .` or `git add -A` unless the entire working copy is one logical commit.

After the final commit, `git status` should show a clean working tree (or only intentionally uncommitted files).

### 4. Summarize

Tell the user what was committed:

```
Created 3 commits:
  abc1234 refactor(about): extract experience section into components
  def5678 feat(about): add glossary terms to about page
  ghi9012 feat(i18n): sync German about page copy
```

## Quick checklist

- [ ] Full working copy surveyed before first `git add`
- [ ] Split decision made consciously (single vs multi)
- [ ] Each commit: one type, one story, builds on its own
- [ ] `git diff --cached` reviewed before every `git commit`
- [ ] Commits applied sequentially, not batched at the end
- [ ] Subject matches `type[(scope)]: description` — lowercase, imperative, no period
- [ ] Body explains *why*, not *what*
- [ ] Breaking changes flagged with `!` or `BREAKING CHANGE:` footer
- [ ] No secrets or unintended build artifacts staged

## Additional resources

- Examples, split scenarios, and anti-patterns: [examples.md](examples.md)
- Spec: https://www.conventionalcommits.org/
