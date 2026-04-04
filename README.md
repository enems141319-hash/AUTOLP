# AutoLP

AutoLP is a brand landing page generator built with Vite, React, TypeScript, and Zustand.

Users enter a brand name, choose auto-detect or a fixed category, and the app generates a standalone landing page with category-specific layout and content.

## Features

- 15 landing page categories
- Pure-function brand analysis pipeline
- Standalone HTML export
- Chinese and English brand name detection
- Shared mobile-responsive rendering layer
- GitHub Pages deployment via Actions

## Commands

```bash
npm test
npm run build
npm run dev
```

If PowerShell blocks npm execution:

```bash
cmd /c npm test
cmd /c npm run build
cmd /c npm run dev
```

## Project Structure

```text
src/
  app/
  components/
  data/
  domain/
  store/
  tests/
  utils/
```

## Detection Notes

The naming logic is rule-based, not random-first.

Examples:
- `好吃` -> `food`
- `好喝茶飲` -> `beverage`
- `鼎王火鍋` -> `dining`
- `SteelForge Solutions` -> `engineering`
- `LexGroup` -> `legal`

If no rule matches, the app falls back to a deterministic hash so the same name stays in the same category.

## Mobile Support

Responsive behavior is applied globally in:

- `src/domain/landing/templates/index.ts`

This layer prevents large multi-column templates from breaking on phone screens.

## Deployment

GitHub Pages must be configured to use:

- `Settings -> Pages -> Source -> GitHub Actions`

Workflow file:

- `.github/workflows/deploy-pages.yml`

The deployed artifact is:

- `dist/`

If the live site loads `/src/main.tsx`, Pages is serving the repo root instead of the built output.

## Auto Push

Double-click:

- [deploy-github-pages.bat](/c:/Users/USER/Desktop/AUTOLP/deploy-github-pages.bat)

It will automatically:
- run tests
- run build
- stage all changes
- create a timestamped commit
- push to GitHub

## Verification

Current baseline:
- 26 tests passing

Before deploying changes:
1. run tests
2. run build
3. push
