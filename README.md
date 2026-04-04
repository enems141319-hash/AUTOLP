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
- Distinct visual templates with category-specific imagery and motion

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
- `¦n¦Y` -> `food`
- `¦n³Ü¯ù¶¼` -> `beverage`
- `¹©¤ý¤õÁç` -> `dining`
- `SteelForge Solutions` -> `engineering`
- `LexGroup` -> `legal`

If no rule matches, the app falls back to a deterministic hash so the same name stays in the same category.

## Visual Notes

Recent direction updates:
- `design` uses a dark luxury studio style
- `fashion` uses full-bleed campaign imagery
- `beverage` uses warmer coffee/drink photography and atmospheric effects
- `legal` and `finance` use stronger premium motion cues
- `travel` uses photographic reason cards without icons
- `engineering` and `dining` include additional supporting imagery
- `tech` includes cooler glow / grid / aurora-style effects

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

- `deploy-github-pages.bat`

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
