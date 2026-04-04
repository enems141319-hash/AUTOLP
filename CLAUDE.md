# CLAUDE.md — AutoLP Project Guide

## Project Overview
AutoLP is a **brand landing page generator** built with Vite + React + TypeScript + Zustand.
Input a brand name → auto-detect industry category → render a full standalone HTML landing page.

## Stack
| Layer | Tech |
|---|---|
| Build | Vite 5, TypeScript 5 (`"type": "module"`) |
| UI | React 18, inline styles only (no CSS files) |
| State | Zustand (`src/store/useGeneratorStore.ts`) |
| Tests | Vitest (`npm test`) — 23 tests, all must pass |
| Export | Pure string HTML generation (no DOM, no ReactDOM/server) |

## Running the Project
```bash
# Dev server (use cmd.exe on Windows, not PowerShell)
npm run dev

# Build
npm run build

# Tests
npm test
```
> PowerShell may block npm scripts due to execution policy. Use `cmd /c "npm run dev"` or open cmd.exe directly.

## Architecture

### Data Flow
```
Input (brandName + selectedStyle)
  → analyzeBrand()          src/domain/brand-analysis/analyzeBrand.ts
  → buildLandingModel()     src/domain/landing/buildLandingModel.ts
  → renderTemplate()        src/domain/landing/templates/index.ts
  → exportHtml()            src/domain/landing/exportHtml.ts
  → standalone HTML string
```

### Key Files
```
src/
  domain/
    brand-analysis/
      types.ts          Core interfaces: CategoryId, LandingModel, BrandAnalysis
      analyzeBrand.ts   Pure function, no UI deps. Tokenizes camelCase, scores, hash fallback
      scoringRules.ts   Regex rules (word-boundary safe) → category weights
    landing/
      buildLandingModel.ts  BrandAnalysis → LandingModel (flat)
      exportHtml.ts         Wraps rendered HTML in full <!DOCTYPE html> document
      templates/
        index.ts        TEMPLATE_REGISTRY: Record<CategoryId, (m) => string>
        tech.ts         15 templates, one per category
        beauty.ts
        ... (15 total)
  data/
    brandPresets.ts     PRESETS: Record<CategoryId, CategoryPreset> — all 15 presets
    styleOptions.ts     ALL_CATEGORY_IDS array — single source of truth for category list
  store/
    useGeneratorStore.ts  Zustand store: Screen flow + analysis results
  utils/
    hash.ts             djb2-style hashString() for deterministic fallback
    sanitize.ts         escapeHtml() — MUST be used on all user-supplied strings in templates
  tests/
    core.test.ts        23 Vitest tests
```

## Categories (15)
`tech` `beauty` `food` `health` `fashion` `design` `engineering` `jewelry` `dining` `beverage` `legal` `hotel` `finance` `edu` `travel`

Adding a new category requires changes in exactly 4 places:
1. `types.ts` — add to `CategoryId` union
2. `data/styleOptions.ts` — add to `ALL_CATEGORY_IDS`
3. `data/brandPresets.ts` — add `CategoryPreset` entry
4. `templates/index.ts` — add to `TEMPLATE_REGISTRY`

## Template Rules
- Every template is a function `(m: LandingModel) => string` returning inner HTML (no `<html>` wrapper)
- **Always** call `escapeHtml()` (aliased as `H`) on every user-supplied string: `H(m.brandName)`, `H(m.tagline)`, etc.
- Brand name must appear in the hero `<h1>`
- Each template must include at least one CSS `@keyframes` web effect
- Dark-themed templates (design, engineering, legal, finance) use a local `D = { bg, surface, card, border, text, muted, primary, accent }` palette object — do NOT rely on `m.palette.bg`
- Light-themed templates use `m.palette.*` directly

## Scoring Rules (scoringRules.ts)
- Use `\b` word boundaries for multi-char tokens: `\bcloud\b`, `\bsteel\b`
- Use prefix-only for words with common suffixes: `\bbrew` (catches brewed/brewery), `\bjewel` (catches jewelry/jewels)
- Always test BOTH tokenized AND raw lower-case strings in `scoreCategories()`
- camelCase like `DataFlowAI` is split by `tokenize()` before matching

## UI Color Tokens (InputScreen / dark theme)
```
obsidian: #050505   (page background)
bone:     #F2F2F2   (labels, secondary text)
accent:   #EBEBEB
primary:  #FF4D2E   (CTA, focus ring, active states)
surface:  #F3F4F4
muted:    rgba(255,255,255,0.6)
mutedDark:rgba(255,255,255,0.25)
```

## Testing Checklist
Run `npm test` before any commit. All 23 tests must pass:
- Hash stability (3 tests)
- Style override + auto-detect + hash fallback (5 tests)
- Template registry completeness (1 test)
- exportHtml correctness + XSS safety + all-categories smoke (3 tests)
- Brand detection cases (10 tests)

## What NOT to Do
- Do not use `document`, `window`, or any DOM API in templates or exportHtml
- Do not add CSS class files or Tailwind — all styling is inline
- Do not use `switch` statements for category dispatch — use the registry map
- Do not skip `escapeHtml()` on user input in templates
- Do not add new features beyond what is asked
