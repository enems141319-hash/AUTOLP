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
    --review-card-bg: #ffffff;
    --review-card-border: rgba(15,23,42,0.10);
    --review-card-text: #111827;
    --review-card-muted: #6b7280;
    --review-card-accent: #2563eb;
    --review-chip-bg: rgba(37,99,235,0.10);
    --review-chip-text: #1d4ed8;
  }

  [data-lp-shell][data-category="tech"] { --review-card-bg:#132033; --review-card-border:rgba(148,163,184,0.18); --review-card-text:#F8FAFC; --review-card-muted:#94A3B8; --review-card-accent:#7C3AED; --review-chip-bg:rgba(124,58,237,0.14); --review-chip-text:#C4B5FD; }
  [data-lp-shell][data-category="beauty"] { --review-card-bg:#FFF9F6; --review-card-border:rgba(190,138,106,0.20); --review-card-text:#2C1810; --review-card-muted:#9B7E6E; --review-card-accent:#BE8A6A; --review-chip-bg:rgba(190,138,106,0.12); --review-chip-text:#8B5E44; }
  [data-lp-shell][data-category="food"] { --review-card-bg:#FFFFFF; --review-card-border:rgba(74,124,89,0.18); --review-card-text:#1A2E1A; --review-card-muted:#6B7C6B; --review-card-accent:#4A7C59; --review-chip-bg:rgba(244,162,97,0.14); --review-chip-text:#9A5413; }
  [data-lp-shell][data-category="health"] { --review-card-bg:#FFFFFF; --review-card-border:rgba(5,150,105,0.18); --review-card-text:#064E3B; --review-card-muted:#047857; --review-card-accent:#059669; --review-chip-bg:rgba(5,150,105,0.10); --review-chip-text:#047857; }
  [data-lp-shell][data-category="fashion"] { --review-card-bg:#FFFFFF; --review-card-border:rgba(17,17,17,0.12); --review-card-text:#111111; --review-card-muted:#6B7280; --review-card-accent:#C9A96E; --review-chip-bg:rgba(201,169,110,0.12); --review-chip-text:#8B6B35; }
  [data-lp-shell][data-category="design"] { --review-card-bg:#121212; --review-card-border:rgba(255,255,255,0.08); --review-card-text:#F5F5F5; --review-card-muted:rgba(255,255,255,0.50); --review-card-accent:#B08968; --review-chip-bg:rgba(176,137,104,0.14); --review-chip-text:#E7C9AF; }
  [data-lp-shell][data-category="engineering"] { --review-card-bg:#151A20; --review-card-border:rgba(255,255,255,0.10); --review-card-text:#F3F4F6; --review-card-muted:#9CA3AF; --review-card-accent:#F97316; --review-chip-bg:rgba(249,115,22,0.14); --review-chip-text:#FDBA74; }
  [data-lp-shell][data-category="jewelry"] { --review-card-bg:#FFFDF8; --review-card-border:rgba(201,169,110,0.22); --review-card-text:#23180C; --review-card-muted:#8C734A; --review-card-accent:#C9A96E; --review-chip-bg:rgba(201,169,110,0.12); --review-chip-text:#8B6B35; }
  [data-lp-shell][data-category="dining"] { --review-card-bg:#1C1714; --review-card-border:rgba(255,255,255,0.08); --review-card-text:#F8F1E7; --review-card-muted:rgba(248,241,231,0.58); --review-card-accent:#C26A2D; --review-chip-bg:rgba(194,106,45,0.16); --review-chip-text:#F4C191; }
  [data-lp-shell][data-category="beverage"] { --review-card-bg:#16110D; --review-card-border:rgba(255,255,255,0.08); --review-card-text:#F8EDE3; --review-card-muted:rgba(248,237,227,0.56); --review-card-accent:#B46A3C; --review-chip-bg:rgba(180,106,60,0.16); --review-chip-text:#E9BF9F; }
  [data-lp-shell][data-category="legal"] { --review-card-bg:#101827; --review-card-border:rgba(255,255,255,0.10); --review-card-text:#F9FAFB; --review-card-muted:#9CA3AF; --review-card-accent:#D4AF37; --review-chip-bg:rgba(212,175,55,0.14); --review-chip-text:#F3D98A; }
  [data-lp-shell][data-category="hotel"] { --review-card-bg:#FFFCF8; --review-card-border:rgba(165,123,70,0.18); --review-card-text:#24170E; --review-card-muted:#8E6B52; --review-card-accent:#A57B46; --review-chip-bg:rgba(165,123,70,0.12); --review-chip-text:#7A5629; }
  [data-lp-shell][data-category="finance"] { --review-card-bg:#0F172A; --review-card-border:rgba(148,163,184,0.16); --review-card-text:#F8FAFC; --review-card-muted:#94A3B8; --review-card-accent:#22C55E; --review-chip-bg:rgba(34,197,94,0.14); --review-chip-text:#86EFAC; }
  [data-lp-shell][data-category="edu"] { --review-card-bg:#FFFFFF; --review-card-border:rgba(99,102,241,0.18); --review-card-text:#1E1B4B; --review-card-muted:#6366F1; --review-card-accent:#7C3AED; --review-chip-bg:rgba(124,58,237,0.10); --review-chip-text:#6D28D9; }
  [data-lp-shell][data-category="travel"] { --review-card-bg:#FFFFFF; --review-card-border:rgba(14,116,144,0.18); --review-card-text:#083344; --review-card-muted:#0F766E; --review-card-accent:#EA580C; --review-chip-bg:rgba(234,88,12,0.10); --review-chip-text:#C2410C; }

  [data-lp-shell] img {
    max-width: 100%;
  }

  [data-lp-shell] div[style*="display:grid"]:has(> article),
  [data-lp-shell] div[style*="display:flex"]:has(> article) {
    align-items: stretch;
  }

  [data-lp-shell] article[style*="box-shadow"] p[style*="line-height:1.75"] {
    font-style: normal !important;
  }

  [data-lp-shell] div:has(> p[style*="font-style:italic"]):not([style*="display:grid"]):not([style*="display:flex"]) {
    position: relative;
    background: var(--review-card-bg) !important;
    border: 1px solid var(--review-card-border) !important;
    border-radius: 18px !important;
    padding: 22px 22px 18px !important;
    box-shadow: 0 10px 30px rgba(0,0,0,0.06);
    overflow: hidden;
  }

  [data-lp-shell] div:has(> p[style*="font-style:italic"])::before {
    content: "★★★★★";
    display: block;
    color: var(--review-card-accent);
    font-size: 14px;
    line-height: 1;
    letter-spacing: 2px;
    margin-bottom: 14px;
  }

  [data-lp-shell] div:has(> p[style*="font-style:italic"])::after {
    content: "Verified Client";
    position: absolute;
    top: 18px;
    right: 18px;
    background: var(--review-chip-bg);
    color: var(--review-chip-text);
    border-radius: 999px;
    padding: 6px 10px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.04em;
  }

  [data-lp-shell] div:has(> p[style*="font-style:italic"]) > p:first-child {
    color: var(--review-card-text) !important;
    font-style: normal !important;
    font-size: 15px !important;
    line-height: 1.75 !important;
    margin: 0 0 16px !important;
    padding-top: 10px;
  }

  [data-lp-shell] div:has(> p[style*="font-style:italic"]) > p:last-child {
    color: var(--review-card-muted) !important;
    font-size: 13px !important;
    margin: 0 !important;
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
  return `${GLOBAL_RESPONSIVE_CSS}<div data-lp-shell data-category="${m.category}">${renderer(m)}</div>`;
}
