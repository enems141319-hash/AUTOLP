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

const FOOTER_COPY: Record<CategoryId, { eyebrow: string; title: string; body: string }> = {
  tech: { eyebrow: '開始成交', title: '讓產品價值，一開口就更有說服力。', body: '把定位、功能與信任整合成更能推動預約的首頁。' },
  beauty: { eyebrow: '品牌升級', title: '讓高級感先成立，轉單才會更自然。', body: '把質地、故事與信任感收成更完整的品牌結尾。' },
  food: { eyebrow: '立即轉單', title: '把想吃的衝動，推進成真正下單。', body: '讓風味、產地與購買理由在最後一屏一起成立。' },
  health: { eyebrow: '開始轉換', title: '把成果講明白，行動就不再拖延。', body: '讓方法、差異與報名理由在結尾一次到位。' },
  fashion: { eyebrow: '系列上線', title: '讓風格先打中人，價格才站得住。', body: '把品牌氣質與購買慾望在最後一屏一起拉滿。' },
  design: { eyebrow: '下一步', title: '讓作品被喜歡，也被放心交付。', body: '把品味、方法與合作價值收成更強的接案訊號。' },
  engineering: { eyebrow: '提升信任', title: '把硬實力，說成客戶敢直接詢價的理由。', body: '把規格、交期與驗證收成更有商務說服力的結尾。' },
  jewelry: { eyebrow: '預約鑑賞', title: '讓珍貴感先到位，價值自然被看懂。', body: '把工藝、材質與收藏感收進更高級的最後一屏。' },
  dining: { eyebrow: '立即訂位', title: '讓人還沒入座，就先想把位子訂下來。', body: '把料理、氣氛與訂位動機收成更迷人的最後一屏。' },
  beverage: { eyebrow: '本季主打', title: '讓風味更有畫面，點單就更自然。', body: '把氣氛、味覺聯想與行動理由收得更完整。' },
  legal: { eyebrow: '預約諮詢', title: '先建立信任，再談重要決定。', body: '把專業判斷、服務範圍與聯繫理由收成更穩的結尾。' },
  hotel: { eyebrow: '立即入住', title: '讓入住的期待，在最後一屏就開始升溫。', body: '把氛圍、房型與預約動機收成更有吸引力的結尾。' },
  finance: { eyebrow: '立即預約', title: '把專業講清楚，客戶才敢把資產交給你。', body: '讓策略、信任與行動在最後一屏形成更強的決策推力。' },
  edu: { eyebrow: '開始學習', title: '把課程價值講明白，報名就更自然。', body: '用更清楚的學習路徑與行動設計，把興趣推進成報名。' },
  travel: { eyebrow: '規劃旅程', title: '讓人看到結尾，就開始想排假出發。', body: '用更有情緒的收尾，把嚮往推進成真正的出發動機。' },
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
  const copy = FOOTER_COPY[m.category];
  return `
    <section style="padding:36px 20px 88px;background:${m.palette.bg};">
      <div style="max-width:1200px;margin:0 auto;position:relative;overflow:hidden;border-radius:36px;padding:46px;border:1px solid ${m.palette.muted}22;background:
        radial-gradient(circle at 12% 18%, ${m.palette.accent}32 0, transparent 34%),
        radial-gradient(circle at 88% 18%, ${m.palette.primary}24 0, transparent 32%),
        linear-gradient(135deg, ${m.palette.surface} 0%, ${m.palette.bg} 100%);
        box-shadow:0 30px 90px rgba(0,0,0,0.15);">
        <div style="position:absolute;inset:-30% auto auto -6%;width:280px;height:280px;border-radius:50%;background:${m.palette.primary}1A;filter:blur(28px);"></div>
        <div style="position:absolute;inset:auto -4% -26% auto;width:320px;height:320px;border-radius:50%;background:${m.palette.accent}22;filter:blur(30px);"></div>
        <div style="position:absolute;inset:0;background:linear-gradient(115deg,transparent 0%,rgba(255,255,255,0.10) 42%,transparent 58%);transform:translateX(-120%);animation:lpFooterSweep 5.2s ease-in-out infinite;"></div>
        <div style="position:relative;display:grid;grid-template-columns:1.35fr auto;gap:28px;align-items:end;">
          <div>
            <div style="display:inline-flex;align-items:center;gap:10px;padding:8px 14px;border-radius:999px;background:${m.palette.primary}14;border:1px solid ${m.palette.primary}26;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${m.palette.accent};margin-bottom:16px;">${copy.eyebrow}</div>
            <h2 style="font-size:clamp(30px,4vw,48px);line-height:1.08;margin:0 0 14px;color:${m.palette.text};max-width:820px;">${copy.title}</h2>
            <p style="margin:0;color:${m.palette.muted};font-size:16px;line-height:1.85;max-width:760px;">${copy.body}</p>
          </div>
          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:14px;min-width:220px;">
            <button style="position:relative;overflow:hidden;background:${m.palette.text};color:${m.palette.bg};border:none;border-radius:999px;padding:17px 32px;font-size:15px;font-weight:700;cursor:pointer;box-shadow:0 18px 44px ${m.palette.primary}33;min-width:180px;">
              <span style="position:absolute;inset:0;background:linear-gradient(120deg,transparent 20%,rgba(255,255,255,0.34) 48%,transparent 78%);transform:translateX(-130%);animation:lpFooterButtonSweep 4.2s ease-in-out infinite;"></span>
              <span style="position:relative;z-index:1;">${escapeHtml(m.cta)}</span>
            </button>
            <div style="font-size:12px;color:${m.palette.muted};letter-spacing:0.06em;">從這一屏，把決策往前推一步</div>
          </div>
        </div>
      </div>
    </section>
  `;
}

const GLOBAL_KEYFRAMES = `
<style>
  @keyframes lpFooterSweep {
    0% { transform: translateX(-120%); }
    58%, 100% { transform: translateX(120%); }
  }
  @keyframes lpFooterButtonSweep {
    0% { transform: translateX(-130%); }
    55%, 100% { transform: translateX(130%); }
  }
</style>`;

export function renderTemplate(m: LandingModel): string {
  const renderer = TEMPLATE_REGISTRY[m.category];
  return `${GLOBAL_RESPONSIVE_CSS}${GLOBAL_KEYFRAMES}<div data-lp-shell data-category="${m.category}">${renderer(m)}${renderSharedGallery(m)}${renderSharedFooterCta(m)}</div>`;
}

