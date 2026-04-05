# AGENTS.md - AutoLP Agent Handbook

## What This Repo Does
AutoLP generates standalone landing pages from a brand name.
The core flow is pure-function based:

`input -> analyzeBrand() -> buildLandingModel() -> renderTemplate() -> exportHtml()`

The runtime app is a thin React shell around that domain pipeline.

## Project Layout
```text
src/
  app/                     App root
  components/              Input / Loading / Result screens and shared UI
  data/                    Static category metadata and presets
  domain/
    brand-analysis/        Detection engine and scoring rules
    landing/               Model builder, template registry, HTML export
  store/                   Zustand UI state only
  tests/                   Vitest test suite
  utils/                   Hashing and sanitization helpers
public/                    Static assets such as favicon
```

## Before Changing Anything

1. Read the target file first.
2. Run `npm test`.
3. Keep all 26 tests passing.
4. If the change affects rendering, also run `npm run build`.

## Category System

There are 15 supported categories:

`tech` `beauty` `food` `health` `fashion` `design` `engineering` `jewelry` `dining` `beverage` `legal` `hotel` `finance` `edu` `travel`

Single sources of truth:
- Category list: `src/data/styleOptions.ts`
- Preset content: `src/data/brandPresets.ts`
- Type union: `src/domain/brand-analysis/types.ts`
- Renderer registry: `src/domain/landing/templates/index.ts`

## Brand Analysis Rules

Files:
- `src/domain/brand-analysis/analyzeBrand.ts`
- `src/domain/brand-analysis/scoringRules.ts`

Rule shape:
```ts
{ pattern: RegExp, category: CategoryId, weight: number }
```

Important constraints:
- Rules run against both tokenized and raw lowercase brand names.
- Use `\b...\b` for exact token matches.
- Use prefix patterns like `\bbrew` when suffix variants matter.
- Chinese semantic rules are intentionally high-weight for obvious names.

Chinese category intent:
- `food`: packaged food, ingredients, snacks, meals
- `dining`: restaurants, hotpot, grill, chef-led dining
- `beverage`: tea, coffee, drinks, brewing

Examples that must stay correct:
- `好吃` -> `food`
- `好喝茶飲` -> `beverage`
- `鼎王火鍋` -> `dining`

Do not let obvious Chinese industry words fall through to hash fallback.

## Template Rules

Files:
- `src/domain/landing/templates/*.ts`
- Registry: `src/domain/landing/templates/index.ts`

Each template:
- exports `(m: LandingModel) => string`
- returns inner HTML only
- must escape user-facing strings with `escapeHtml()`
- should keep the brand name in the hero area

Shared rendering responsibilities in `templates/index.ts`:
- global mobile-responsive shell
- shared three-image gallery
- shared premium footer CTA block
- category-specific footer copy map

Current content direction:
- Main commercial copy is centralized in `src/data/brandPresets.ts`
- The latest rewrite makes hero copy, pain/solution blocks, feature bullets, quotes, and footer CTA more sales-focused and brand-specific
- Keep copy concise, concrete, and commercially legible
- Avoid generic filler claims and vague adjectives without a business outcome

Current visual direction notes:
- `design`: dark luxury studio, high whitespace, restrained typography, premium CTA glow
- `fashion`: full-bleed campaign hero with editorial motion
- `beverage`: atmospheric coffee/drink hero, no rotating badge object
- `legal`: trust-first layout with imagery and restrained procedural effects
- `finance`: dark strategy dashboard with tech-forward CTA motion
- `travel`: photographic reason cards without overlaid icons
- `engineering`: multiple industrial photos, stronger proof-of-work presentation
- `dining`: more food photography, still cinematic and premium
- `tech`: aura / grid / luminous CTA treatment

## Image Rules

Preset images live in:
- `src/data/brandPresets.ts`

Requirements:
- every category must expose `hero`
- every category should expose `secondary`
- every category must expose `gallery` with at least 3 image URLs
- image URLs must remain valid

Current baseline:
- 83 image URLs were validated successfully in the latest cleanup pass

## HTML Export Contract

File:
- `src/domain/landing/exportHtml.ts`

Rules:
- output must be a full standalone HTML document
- no DOM access in templates or export logic
- no `window` / `document` use inside domain code

## XSS Safety

File:
- `src/utils/sanitize.ts`

Rule:
- Every user-supplied string rendered into HTML must pass through `escapeHtml()`

## Tests

File:
- `src/tests/core.test.ts`

Current suite count:
- 26 tests total

Coverage includes:
- hash stability and fallback index validity
- manual style override
- English keyword detection
- Chinese semantic detection
- template registry completeness
- export HTML sanity and XSS protection
- category mapping smoke tests

## Deployment

GitHub Pages must be configured like this:
- `Settings -> Pages -> Build and deployment -> Source -> GitHub Actions`

Workflow:
- `.github/workflows/deploy-pages.yml`

Important:
- Deployment must publish `./dist`
- If the live site is loading `/src/main.tsx`, Pages is serving the repo root by mistake

## Static Assets

Current favicon:
- `public/favicon.png`

Head wiring:
- `index.html` uses `/AUTOLP/favicon.png`

## Windows Auto Push

Use:
- `deploy-github-pages.bat`

What it does:
- checks `git` and `npm`
- runs `npm test`
- runs `npm run build`
- stages all files
- creates a timestamped commit
- pushes to `origin/main`

This is the default push path for local manual updates.

## Common Mistakes

- Do not bypass `escapeHtml()` in templates.
- Do not add a category in only one file.
- Do not debug mobile layout by patching one template first when the shared responsive shell can solve it.
- Do not treat the repo root `index.html` as the deployed artifact.
- Do not forget to update shared footer CTA copy if the messaging direction changes.
- Do not use PowerShell npm script execution if policy blocks it; use `cmd /c`.
