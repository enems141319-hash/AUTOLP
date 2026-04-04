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
import { escapeHtml } from '../../../utils/sanitize';

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

  [data-lp-shell] div[style*="display:grid"]:has(> article),
  [data-lp-shell] div[style*="display:flex"]:has(> article) {
    align-items: stretch;
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

function renderSharedGallery(m: LandingModel): string {
  const images = (m.imgs.gallery ?? []).slice(0, 3);
  if (images.length < 3) return '';

  return `
    <section style="padding:0 20px 40px;background:${m.palette.bg};">
      <div style="max-width:1200px;margin:0 auto;border-top:1px solid ${m.palette.muted}26;padding-top:28px;">
        <div style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:${m.palette.accent};margin-bottom:16px;">品牌視覺延伸</div>
        <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;">
          ${images.map((src, index) => `<img src="${escapeHtml(src)}" alt="${escapeHtml(m.brandName)} 視覺 ${index + 1}" style="width:100%;height:260px;object-fit:cover;border-radius:20px;display:block;" />`).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderSharedFooterCta(m: LandingModel): string {
  return `
    <section style="padding:40px 20px 80px;background:${m.palette.bg};">
      <div style="max-width:1200px;margin:0 auto;position:relative;overflow:hidden;border-radius:32px;padding:40px;border:1px solid ${m.palette.muted}26;background:
        radial-gradient(circle at 15% 20%, ${m.palette.accent}26 0, transparent 38%),
        radial-gradient(circle at 85% 25%, ${m.palette.primary}22 0, transparent 34%),
        linear-gradient(135deg, ${m.palette.surface} 0%, ${m.palette.bg} 100%);
        box-shadow:0 30px 80px rgba(0,0,0,0.12);">
        <div style="position:absolute;inset:auto -40px -50px auto;width:220px;height:220px;border-radius:50%;background:${m.palette.accent}18;filter:blur(18px);"></div>
        <div style="position:absolute;inset:-80px auto auto -60px;width:220px;height:220px;border-radius:50%;background:${m.palette.primary}14;filter:blur(24px);"></div>
        <div style="position:relative;display:grid;grid-template-columns:1.4fr auto;gap:24px;align-items:end;">
          <div>
            <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:${m.palette.accent};margin-bottom:14px;">下一步</div>
            <h2 style="font-size:clamp(30px,4vw,48px);line-height:1.08;margin:0 0 14px;color:${m.palette.text};">讓 ${escapeHtml(m.brandName)} 的下一版首頁，不只好看，還更有成交力。</h2>
            <p style="margin:0;color:${m.palette.muted};font-size:16px;line-height:1.8;max-width:760px;">把品牌定位、視覺氣質與轉換動線一次整理好，讓頁面真正替品牌說話，也替業務工作。</p>
          </div>
          <div style="display:flex;align-items:center;justify-content:flex-end;">
            <button style="position:relative;overflow:hidden;background:${m.palette.text};color:${m.palette.bg};border:none;border-radius:999px;padding:16px 30px;font-size:15px;font-weight:700;cursor:pointer;box-shadow:0 16px 40px ${m.palette.primary}33;">
              <span style="position:absolute;inset:0;background:linear-gradient(120deg,transparent 20%,rgba(255,255,255,0.32) 48%,transparent 78%);transform:translateX(-130%);animation:lpFooterSweep 4.2s ease-in-out infinite;"></span>
              <span style="position:relative;z-index:1;">${escapeHtml(m.cta)}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  `;
}

const GLOBAL_KEYFRAMES = `
<style>
  @keyframes lpFooterSweep {
    0% { transform: translateX(-130%); }
    55%, 100% { transform: translateX(130%); }
  }
</style>`;

export function renderTemplate(m: LandingModel): string {
  const renderer = TEMPLATE_REGISTRY[m.category];
  return `${GLOBAL_RESPONSIVE_CSS}${GLOBAL_KEYFRAMES}<div data-lp-shell data-category="${m.category}">${renderer(m)}${renderSharedGallery(m)}${renderSharedFooterCta(m)}</div>`;
}
