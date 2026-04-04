# AGENTS.md — AutoLP Agent Handbook

## What This Repo Does
AutoLP generates standalone HTML landing pages from a brand name.
The pipeline is fully pure-function: input → analysis → model → template → HTML string.
No server, no database, no runtime dependencies in the output.

## Project Layout (read before touching anything)
```
src/
  domain/brand-analysis/   Analysis engine (pure TS, no React)
  domain/landing/          Model builder + template renderer + HTML export
  data/                    Static presets and category list
  store/                   Zustand UI state only
  utils/                   hash + sanitize helpers
  tests/                   Vitest test suite
  components/              React UI (screens + ui primitives)
  app/                     App root + screen routing
```

## Before Making Any Change

1. **Run tests first**: `npm test` — all 23 must pass before and after your change.
2. **Read the target file** before editing. Never guess at structure.
3. **Check `ALL_CATEGORY_IDS`** in `src/data/styleOptions.ts` — it is the single source of truth for the category list.

## How to Add a New Template

1. Create `src/domain/landing/templates/<category>.ts`
   - Export `export function render<Category>(m: LandingModel): string`
   - Use `const H = escapeHtml` and call `H()` on every `m.*` string rendered into HTML
   - Include at least one CSS `@keyframes` animation in an embedded `<style>` block
   - Put the brand name inside the hero `<h1>`

2. Register in `src/domain/landing/templates/index.ts`:
   ```ts
   import { render<Category> } from './<category>';
   // add to TEMPLATE_REGISTRY:
   <category>: render<Category>,
   ```

3. Add to `CategoryId` union in `src/domain/brand-analysis/types.ts`

4. Add to `ALL_CATEGORY_IDS` array in `src/data/styleOptions.ts`

5. Add a `CategoryPreset` entry in `src/data/brandPresets.ts`

6. Add a scoring rule entry in `src/domain/brand-analysis/scoringRules.ts`

7. Add a brand-detection test case in `src/tests/core.test.ts`

## How to Edit an Existing Template

- Templates are in `src/domain/landing/templates/<category>.ts`
- The function signature is always `(m: LandingModel) => string` returning inner HTML only
- Dark templates (design, engineering, legal, finance) maintain a local `D` palette — do not switch them to `m.palette`
- Light templates use `m.palette.*` directly

## Scoring Rules (src/domain/brand-analysis/scoringRules.ts)

Each rule is `{ category, pattern, weight }`. The `pattern` is tested against:
- The **tokenized** brand name (camelCase split, lowercased)
- The **raw lowercased** brand name

Word boundary rules:
- Use `\b...\b` for tokens that should not match as substrings: `\bsteel\b`, `\bcloud\b`
- Use prefix-only `\bword` (no trailing `\b`) for roots with common suffixes: `\bbrew`, `\bjewel`
- Short tokens (2–3 chars) like `\bai\b`, `\bfin\b` require both boundaries

## XSS Safety Contract

`escapeHtml()` in `src/utils/sanitize.ts` must be called on **every** user-supplied value before it is interpolated into a template string. This is tested in `core.test.ts` (`does not contain raw script tags`). Never bypass it.

## exportHtml Contract

`src/domain/landing/exportHtml.ts` wraps `renderTemplate(model)` in a full HTML document.
- Input: `LandingModel`
- Output: complete standalone HTML string (no external deps, no scripts)
- No DOM access allowed inside this function or any template

## Test Suite Reference (src/tests/core.test.ts)

| Suite | Count | What it checks |
|---|---|---|
| `hashString` | 3 | Stability, uniqueness, unsigned output |
| `analyzeBrand override` | 5 | Manual override, auto-detect, hash fallback |
| `TEMPLATE_REGISTRY` | 1 | All 15 categories have a renderer |
| `exportHtml` | 3 | Valid HTML, XSS sanitization, all-category smoke |
| `Brand detection cases` | 10 | Specific brand → expected category |

**Total: 23 tests. All must pass.**

## UI Component Conventions

- All styling is **inline style objects** — no CSS files, no Tailwind
- Dark theme color tokens (InputScreen): `#050505` bg, `#FF4D2E` primary, `#F2F2F2` bone
- Screen routing is controlled by `currentScreen` in the Zustand store (`'input' | 'loading' | 'result'`)
- `StyleSelector` renders pills for all 16 options (`auto` + 15 categories)

## Common Mistakes to Avoid

| Mistake | Why it breaks |
|---|---|
| Using `grep`/`cat` to read `.pen` files | `.pen` files are encrypted; use Pencil MCP tools |
| Touching DOM in templates | `exportHtml` output must work without a browser |
| Adding a category to only 1–2 of the 4 required files | Tests will fail on registry completeness |
| Using `\bbrew\b` instead of `\bbrew` | "brewed" won't match |
| Forgetting `H()` on a template field | XSS test will fail |
| Running npm in PowerShell without workaround | Execution policy blocks scripts; use cmd.exe |
