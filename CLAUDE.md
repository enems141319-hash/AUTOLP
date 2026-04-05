# CLAUDE.md - AutoLP Project Guide

## Overview
AutoLP is a Vite + React + TypeScript landing page generator.
Users enter a brand name, optionally choose a category, and the app generates a full standalone landing page.

## Stack
- Vite 5
- React 18
- TypeScript 5
- Zustand
- Vitest

## Commands
```bash
npm test
npm run build
npm run dev
```

If PowerShell blocks npm scripts, use:
```bash
cmd /c npm test
cmd /c npm run build
cmd /c npm run dev
```

## Architecture

```text
InputScreen
  -> analyzeBrand()
  -> buildLandingModel()
  -> renderTemplate()
  -> exportHtml()
```

Main folders:
```text
src/
  app/
  components/
  data/
  domain/
  store/
  tests/
  utils/
public/
```

## Domain Rules

### Brand Analysis
Files:
- `src/domain/brand-analysis/analyzeBrand.ts`
- `src/domain/brand-analysis/scoringRules.ts`

Notes:
- Analysis is pure and UI-independent.
- Manual category selection overrides auto detection.
- Fallback category assignment uses deterministic hashing.
- Chinese semantic rules have been added and should remain strong.

Examples that should map correctly:
- `好吃` -> `food`
- `好喝茶飲` -> `beverage`
- `鼎王火鍋` -> `dining`

### Templates
Files:
- `src/domain/landing/templates/*.ts`
- `src/domain/landing/templates/index.ts`

Rules:
- Each template returns inner HTML only.
- Use `escapeHtml()` for all user-provided strings.
- Keep templates focused on structure, not app state.
- Shared mobile behavior is injected in `templates/index.ts`.
- Shared gallery and shared footer CTA are also injected there.

Current content priorities:
- `src/data/brandPresets.ts` is the main copywriting source of truth.
- Hero, pain, solution, features, quotes, and CTA copy should stay commercially sharp.
- Prefer concise, persuasive business language over decorative wording.

Current visual priorities:
- `design`: dark premium studio tone with whitespace and refined CTA effects
- `fashion`: full-bleed editorial hero imagery
- `beverage`: warm atmospheric hero without novelty badge graphics
- `legal`: stronger trust framing with images and subtle motion
- `finance`: more tech-forward CTA treatment
- `travel`: photographic benefit cards without icons
- `engineering` and `dining`: more supporting imagery
- `tech`: cool high-contrast motion accents

### Export
File:
- `src/domain/landing/exportHtml.ts`

Rules:
- Must return full standalone HTML
- Must not depend on DOM capture

## Testing

Current baseline:
- 26 tests

Before finishing any change:
1. run `npm test`
2. if rendering changed, run `npm run build`

## Images And Assets

- Every category must have at least 3 gallery images in `src/data/brandPresets.ts`
- The latest image validation pass confirmed 83 image URLs resolve
- Current favicon asset is `public/favicon.png`

## Deployment

GitHub Pages must use:
- `Settings -> Pages -> Source -> GitHub Actions`

Workflow:
- `.github/workflows/deploy-pages.yml`

Deployment artifact:
- `dist/`

If the live site tries to load `/src/main.tsx`, Pages is misconfigured and serving the repo root instead of the built output.

## Local Push Workflow

Double-click:
- `deploy-github-pages.bat`

It will:
- run tests
- run build
- stage changes
- create a timestamped commit
- push to `main`

## Maintenance Priorities

When making changes, prioritize:
1. Correct brand detection
2. Strong commercial copy
3. Safe HTML rendering
4. Mobile readability
5. Stable GitHub Pages deployment
