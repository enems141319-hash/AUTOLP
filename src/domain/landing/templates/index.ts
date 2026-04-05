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

const FOOTER_COPY: Record<CategoryId, { eyebrow: string; title: string; body: string; hint: string }> = {
  tech:        { eyebrow: '免費開始使用', title: '今天設定，明天就跑得更快。', body: '14 天完整試用，不需信用卡，三分鐘完成設定，隨時可取消。', hint: '超過 3,000 個團隊已在使用' },
  beauty:      { eyebrow: '立即探索', title: '找到真正適合你肌膚的那一支。', body: '完成肌膚問卷，取得個人化保養建議，首單享 85 折優惠。', hint: '超過 12,000 位顧客好評推薦' },
  food:        { eyebrow: '立即訂購', title: '今天起，吃得更清楚一點。', body: '首週免費配送，隨時調整週期或暫停，無最低訂購限制。', hint: '有機認證 · 產地直送 · 無添加' },
  health:      { eyebrow: '預約免費體驗', title: '第一堂課免費，讓身體告訴你差別在哪。', body: '由認證教練一對一評估體能狀態，設計你專屬的起始計畫。', hint: '超過 800 位學員持續訓練中' },
  fashion:     { eyebrow: '探索新季', title: '找一件真的值得穿十年的衣服。', body: '每季 40 件核心款，尺寸 XS–2XL，90 天無條件退換保障。', hint: '責任採購 · 手工確認版型' },
  design:      { eyebrow: '預約策略會議', title: '30 分鐘，讓我們先了解你的品牌方向。', body: '不收費，不帶提案，只是坐下來認真聊聊你想做什麼。', hint: '已服務超過 60 個品牌專案' },
  engineering: { eyebrow: '索取技術報價', title: '把你的規格給我們，五天內給你答案。', body: '5 個工作天快速打樣，附完整 QC 報告，無最低訂單量限制。', hint: 'ISO 9001 認證 · 準時交付率 98.7%' },
  jewelry:     { eyebrow: '預約私人鑑賞', title: '親眼看見工藝，才知道值不值得。', body: '預約工作室參觀，由首席工藝師親自介紹材質與製程，完全免費。', hint: '每件作品附工藝師親筆鑑定書' },
  dining:      { eyebrow: '立即預約', title: '選一個值得記住的夜晚，讓我們來準備。', body: '全預約制小桌服務，限量座位，建議提前三天預訂。', hint: '季節菜單 · 在地食材 · 主廚親制' },
  beverage:    { eyebrow: '訂閱本月豆單', title: '這個月最值得喝的豆子，現在上架了。', body: '訂閱首月 85 折，每月精選單品豆直送，隨時可暫停。', hint: '直接貿易 · 烘焙師監控 · 氮氣封裝' },
  legal:       { eyebrow: '預約初次諮詢', title: '先聊三十分鐘，再決定要不要合作。', body: '初次諮詢不收費，由合夥律師親自接談，了解狀況再說。', hint: '20 年商業法律 · 合夥律師主責' },
  hotel:       { eyebrow: '查看空房', title: '今晚有空房，明天可以不一樣。', body: '直接訂房享最低價保障，含免費早餐，Late Check-out 至 4PM。', hint: '24 小時管家 · Frette 寢具 · 城市核心' },
  finance:     { eyebrow: '預約資產健檢', title: '你的資產，是時候認真看一次了。', body: '30 分鐘資產健檢，完全免費，沒有義務，由 CFA 顧問親自進行。', hint: 'CFA 認證顧問 · 無佣金透明收費' },
  edu:         { eyebrow: '免費試聽一堂課', title: '先聽，再決定要不要投入。', body: '試聽後若不符合期待，全額退款，不需要任何理由。', hint: '業界導師 · 實作課程 · 小班 20 人' },
  travel:      { eyebrow: '開始規劃旅程', title: '說說你想去哪，我們安排其餘的事。', body: '一對一行程規劃，限 8 人小團，全程在地嚮導陪伴，不用擔心品質。', hint: '深度小團 · 在地嚮導 · 無走馬看花' },
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
            <div style="font-size:12px;color:${m.palette.muted};letter-spacing:0.06em;">${copy.hint}</div>
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
  @keyframes diffuseFloat {
    0%,100% { transform: scale(1)   translate(0px, 0px); }
    33%      { transform: scale(1.07) translate(20px, -16px); }
    66%      { transform: scale(0.95) translate(-16px, 14px); }
  }
  @keyframes lpBtnPulse {
    0%,100% { filter: brightness(1)    drop-shadow(0 0 0px  transparent); }
    50%      { filter: brightness(1.08) drop-shadow(0 0 14px rgba(255,255,255,0.35)) drop-shadow(0 0 28px rgba(255,255,255,0.15)); }
  }
  @keyframes lpBtnSweep {
    from { transform: translateX(-140%); }
    to   { transform: translateX(140%); }
  }
  .lp-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    pointer-events: none;
    z-index: 0;
  }
  [data-lp-shell] button:not([data-no-glow]) {
    position: relative;
    overflow: hidden;
    animation: lpBtnPulse 3s ease-in-out infinite;
    transition: transform 0.18s ease, filter 0.18s ease !important;
  }
  [data-lp-shell] button:not([data-no-glow]):hover {
    transform: translateY(-3px) scale(1.03) !important;
    filter: brightness(1.14) drop-shadow(0 0 18px rgba(255,255,255,0.55)) drop-shadow(0 0 40px rgba(255,255,255,0.25)) !important;
    animation-play-state: paused !important;
  }
  [data-lp-shell] button:not([data-no-glow])::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.36) 50%, transparent 80%);
    transform: translateX(-140%);
    animation: lpBtnSweep 2.6s ease-in-out infinite;
    pointer-events: none;
  }
</style>`;

export function renderTemplate(m: LandingModel): string {
  const renderer = TEMPLATE_REGISTRY[m.category];
  return `${GLOBAL_RESPONSIVE_CSS}${GLOBAL_KEYFRAMES}<div data-lp-shell data-category="${m.category}">${renderer(m)}${renderSharedGallery(m)}${renderSharedFooterCta(m)}</div>`;
}

