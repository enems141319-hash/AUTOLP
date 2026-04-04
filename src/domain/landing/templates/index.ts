import type { CategoryId, LandingModel } from '../../brand-analysis/types';
import { renderTech } from './tech';
import { renderBeauty } from './beauty';
import { renderFood } from './food';
import { renderHealth } from './health';
import { renderFashion } from './fashion';
import { renderDesign } from './design';
import { renderEngineering } from './engineering';
import { renderJewelry } from './jewelry';
import { renderDining } from './dining';
import { renderBeverage } from './beverage';
import { renderLegal } from './legal';
import { renderHotel } from './hotel';
import { renderFinance } from './finance';
import { renderEdu } from './edu';
import { renderTravel } from './travel';

/** Registry: category → render function. Adding a new category = adding one entry here. */
export const TEMPLATE_REGISTRY: Record<CategoryId, (m: LandingModel) => string> = {
  tech: renderTech,
  beauty: renderBeauty,
  food: renderFood,
  health: renderHealth,
  fashion: renderFashion,
  design: renderDesign,
  engineering: renderEngineering,
  jewelry: renderJewelry,
  dining: renderDining,
  beverage: renderBeverage,
  legal: renderLegal,
  hotel: renderHotel,
  finance: renderFinance,
  edu: renderEdu,
  travel: renderTravel,
};

const GLOBAL_RESPONSIVE_CSS = `
<style>
  [data-lp-shell] {
    width: 100%;
    overflow-x: hidden;
  }

  [data-lp-shell] img {
    max-width: 100%;
  }

  @media (max-width: 900px) {
    [data-lp-shell] nav[style] {
      padding: 16px 20px !important;
      gap: 14px !important;
      flex-wrap: wrap !important;
    }

    [data-lp-shell] nav[style] > div[style*="display:flex"] {
      width: 100% !important;
      gap: 12px !important;
      flex-wrap: wrap !important;
      justify-content: flex-start !important;
    }

    [data-lp-shell] [style*="display:grid"][style*="grid-template-columns"] {
      grid-template-columns: 1fr !important;
    }

    [data-lp-shell] [style*="display:grid"][style*="grid-template-columns:repeat(4,1fr)"] {
      grid-template-columns: repeat(2, 1fr) !important;
    }

    [data-lp-shell] [style*="display:grid"][style*="grid-template-columns:1fr 1fr 1fr"] {
      grid-template-columns: 1fr !important;
    }

    [data-lp-shell] [style*="display:flex"][style*="justify-content:space-between"] {
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 16px !important;
    }

    [data-lp-shell] [style*="display:flex"][style*="align-items:center"] {
      flex-wrap: wrap !important;
    }

    [data-lp-shell] [style*="padding:100px 80px"],
    [data-lp-shell] [style*="padding:100px 60px"],
    [data-lp-shell] [style*="padding:80px 80px"],
    [data-lp-shell] [style*="padding:80px 60px"],
    [data-lp-shell] [style*="padding:80px 40px"],
    [data-lp-shell] [style*="padding:60px 60px"],
    [data-lp-shell] [style*="padding:60px 40px"] {
      padding: 28px 20px !important;
    }

    [data-lp-shell] [style*="margin:80px auto"],
    [data-lp-shell] [style*="margin:100px auto"] {
      margin: 40px auto !important;
    }

    [data-lp-shell] [style*="right:80px"] {
      right: 20px !important;
    }

    [data-lp-shell] [style*="width:140px;height:140px"] {
      width: 88px !important;
      height: 88px !important;
    }

    [data-lp-shell] [style*="height:600px"] {
      height: 420px !important;
    }

    [data-lp-shell] [style*="height:580px"] {
      min-height: 0 !important;
      height: auto !important;
    }

    [data-lp-shell] [style*="height:360px"],
    [data-lp-shell] [style*="height:340px"],
    [data-lp-shell] [style*="height:300px"] {
      height: 240px !important;
    }

    [data-lp-shell] h1[style] {
      font-size: clamp(28px, 10vw, 44px) !important;
      line-height: 1.1 !important;
    }

    [data-lp-shell] h2[style] {
      font-size: clamp(22px, 7vw, 32px) !important;
      line-height: 1.2 !important;
    }

    [data-lp-shell] p[style] {
      word-break: break-word;
    }

    [data-lp-shell] button[style] {
      width: auto;
      max-width: 100%;
    }
  }

  @media (max-width: 560px) {
    [data-lp-shell] [style*="display:grid"][style*="grid-template-columns:repeat(4,1fr)"] {
      grid-template-columns: 1fr !important;
    }

    [data-lp-shell] [style*="display:flex"][style*="gap:32px"],
    [data-lp-shell] [style*="display:flex"][style*="gap:24px"],
    [data-lp-shell] [style*="display:flex"][style*="gap:14px"] {
      gap: 10px !important;
    }

    [data-lp-shell] [style*="padding:32px 40px"],
    [data-lp-shell] [style*="padding:32px 32px"] {
      padding: 20px !important;
    }
  }
</style>`;

/** Render inner HTML for a given landing model */
export function renderTemplate(m: LandingModel): string {
  const renderer = TEMPLATE_REGISTRY[m.category];
  return `${GLOBAL_RESPONSIVE_CSS}<div data-lp-shell>${renderer(m)}</div>`;
}
