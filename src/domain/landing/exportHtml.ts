import type { LandingModel } from '../brand-analysis/types';
import { renderTemplate } from './templates/index';
import { escapeHtml } from '../../utils/sanitize';

/**
 * Generate a complete standalone HTML document from a LandingModel.
 * Does NOT touch the DOM — pure string generation.
 */
export function exportHtml(model: LandingModel): string {
  const body = renderTemplate(model);
  const title = escapeHtml(model.brandName);

  return `<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,700;1,300;1,400&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@400;500;700;900&family=IBM+Plex+Sans:wght@400;600;700&family=Space+Grotesk:wght@400;600;700&family=Nunito:wght@400;600;700;800&family=Merriweather:ital,wght@0,400;0,700;1,400&family=Source+Serif+4:ital,wght@0,400;0,600;0,700;1,400&family=Lato:wght@400;700&family=Josefin+Sans:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: ${model.font}; background: ${model.palette.bg}; color: ${model.palette.text}; }
    img { display: block; max-width: 100%; }
    a { cursor: pointer; }
    button { font-family: inherit; cursor: pointer; }
  </style>
</head>
<body>
${body}
</body>
</html>`;
}
