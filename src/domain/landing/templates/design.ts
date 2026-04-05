import type { LandingModel } from '../../brand-analysis/types';
import { escapeHtml } from '../../../utils/sanitize';
import { renderReviewCards } from './reviews';

/** Design: dark luxury studio with generous whitespace and luminous CTA. */
export function renderDesign(m: LandingModel): string {
  const H = escapeHtml;

  const D = {
    bg: '#0B0B0C',
    panel: '#121315',
    line: 'rgba(255,255,255,0.10)',
    text: '#F4F0EA',
    muted: 'rgba(244,240,234,0.58)',
    primary: '#C4A484',
    accent: '#8A6A4B',
  };

  const caseImages = [
    'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=1200&auto=format&fit=crop&q=80',
  ];

  const caseCards = m.features.map((feature, index) => `
    <article style="background:${D.panel};border:1px solid ${D.line};display:flex;flex-direction:column;min-height:420px;overflow:hidden;">
      <img src="${caseImages[index] ?? caseImages[caseImages.length - 1]}" alt="${H(m.brandName)} 案例 ${index + 1}" style="width:100%;height:240px;object-fit:cover;display:block;filter:brightness(0.84) saturate(0.9);" />
      <div style="padding:28px 30px 30px;display:flex;flex-direction:column;justify-content:space-between;flex:1;">
        <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:${D.muted};margin-bottom:22px;">案例 0${index + 1}</div>
        <p style="font-size:22px;line-height:1.5;color:${D.text};margin:0;font-weight:600;">${H(feature)}</p>
        <div style="margin-top:28px;width:60px;height:1px;background:${D.primary};"></div>
      </div>
    </article>
  `).join('');

  return `
  <style>
    @keyframes designFadeUp {
      from { opacity: 0; transform: translateY(26px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes ctaGlow {
      0%, 100% { box-shadow: 0 0 18px rgba(196,164,132,0.0), 0 0 0px rgba(196,164,132,0.0); }
      50%       { box-shadow: 0 0 38px rgba(196,164,132,0.55), 0 0 80px rgba(196,164,132,0.22); }
    }
    @keyframes borderSweep {
      from { transform: translateX(-140%); }
      to   { transform: translateX(140%); }
    }
    @keyframes diffuseFloat {
      0%,100% { transform: scale(1) translate(0px, 0px); }
      33%      { transform: scale(1.06) translate(18px, -14px); }
      66%      { transform: scale(0.96) translate(-14px, 12px); }
    }
    .design-enter { animation: designFadeUp 0.9s ease both; }
    .design-cta {
      position: relative;
      overflow: hidden;
      animation: ctaGlow 3s ease-in-out infinite;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .design-cta:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 52px rgba(196,164,132,0.7), 0 0 110px rgba(196,164,132,0.28) !important;
    }
    .design-cta::after {
      content: '';
      position: absolute;
      inset: -1px;
      background: linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.38) 50%, transparent 80%);
      transform: translateX(-140%);
      animation: borderSweep 2.8s ease-in-out infinite;
    }
    .design-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(90px);
      pointer-events: none;
    }
    .lp-noise { position: relative; }
    .lp-noise::before {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 100;
      opacity: 0.78;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      background-repeat: repeat;
      background-size: 180px 180px;
      mix-blend-mode: overlay;
    }
  </style>

  <section class="lp-noise" style="background:${D.bg};font-family:${m.font};color:${D.text};min-height:100vh;overflow:hidden;">
    <div class="design-orb" style="width:640px;height:640px;background:radial-gradient(circle,${D.primary}28 0%,transparent 70%);top:-180px;left:-160px;animation:diffuseFloat 14s ease-in-out infinite;"></div>
    <div class="design-orb" style="width:500px;height:500px;background:radial-gradient(circle,${D.accent}22 0%,transparent 70%);top:40px;right:-120px;animation:diffuseFloat 18s ease-in-out infinite reverse;"></div>
    <div class="design-orb" style="width:420px;height:420px;background:radial-gradient(circle,${D.primary}18 0%,transparent 70%);bottom:200px;left:30%;animation:diffuseFloat 22s ease-in-out infinite 4s;"></div>
    <div class="design-orb" style="width:360px;height:360px;background:radial-gradient(circle,${D.accent}20 0%,transparent 70%);bottom:-80px;right:8%;animation:diffuseFloat 16s ease-in-out infinite 2s;"></div>

    <nav style="position:relative;z-index:1;padding:30px 58px;border-bottom:1px solid ${D.line};display:flex;align-items:center;justify-content:space-between;backdrop-filter:blur(12px);background:${D.bg}90;">
      <div>
        <div style="font-size:12px;letter-spacing:0.20em;text-transform:uppercase;color:${D.muted};margin-bottom:8px;">設計工作室</div>
        <div style="font-size:20px;font-weight:700;color:${D.text};">${H(m.brandName)}</div>
      </div>
      <div style="display:flex;gap:28px;align-items:center;">
        <a style="font-size:13px;color:${D.muted};text-decoration:none;">作品案例</a>
        <a style="font-size:13px;color:${D.muted};text-decoration:none;">合作方式</a>
        <a style="font-size:13px;color:${D.muted};text-decoration:none;">客戶評價</a>
        <button class="design-cta" style="background:${D.primary};color:#0B0B0C;border:none;padding:13px 24px;font-size:13px;font-weight:700;letter-spacing:0.06em;cursor:pointer;">${H(m.cta)}</button>
      </div>
    </nav>

    <div style="position:relative;z-index:1;padding:84px 58px 54px;display:grid;grid-template-columns:7fr 5fr;gap:56px;align-items:end;">
      <div class="design-enter">
        <div style="font-size:12px;letter-spacing:0.22em;text-transform:uppercase;color:${D.primary};margin-bottom:20px;">品牌方向 / 數位系統 / 高意圖轉換頁</div>
        <h1 style="font-size:clamp(48px,7vw,102px);line-height:0.96;margin:0;color:${D.text};font-weight:800;max-width:860px;">
          ${H(m.tagline)}
        </h1>
        <div style="height:1px;background:${D.primary};max-width:300px;margin:36px 0 28px;"></div>
        <p style="font-size:18px;line-height:1.95;color:${D.muted};max-width:640px;margin:0 0 38px;">${H(m.subheadline)}</p>
        <div style="display:flex;gap:14px;align-items:center;">
          <button class="design-cta" style="background:${D.primary};color:#0B0B0C;border:none;padding:16px 30px;font-size:14px;font-weight:800;letter-spacing:0.06em;cursor:pointer;">${H(m.cta)}</button>
          <span style="font-size:13px;color:${D.muted};letter-spacing:0.10em;text-transform:uppercase;">克制美學 · 商業清晰度</span>
        </div>
      </div>
      <div class="design-enter" style="animation-delay:0.18s;">
        <div style="background:${D.panel};border:1px solid ${D.line};padding:18px;">
          <img src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1600&auto=format&fit=crop&q=80" alt="design hero" style="width:100%;height:560px;object-fit:cover;display:block;filter:brightness(0.84) saturate(0.9);" />
        </div>
      </div>
    </div>

    <div style="position:relative;z-index:1;padding:0 58px 78px;">
      <div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:20px;">
        <div style="background:${D.panel};border:1px solid ${D.line};padding:30px;">
          <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:${D.muted};margin-bottom:14px;">核心挑戰</div>
          <p style="font-size:24px;line-height:1.55;color:${D.text};margin:0;font-weight:600;">${H(m.pain)}</p>
        </div>
        <div style="background:${D.panel};border:1px solid ${D.line};padding:30px;">
          <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:${D.muted};margin-bottom:14px;">交付項目</div>
          <p style="font-size:18px;line-height:1.75;color:${D.text};margin:0;">品牌識別系統</p>
        </div>
        <div style="background:${D.panel};border:1px solid ${D.line};padding:30px;">
          <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:${D.muted};margin-bottom:14px;">調性定位</div>
          <p style="font-size:18px;line-height:1.75;color:${D.text};margin:0;">高級，克制</p>
        </div>
      </div>
    </div>

    <div style="position:relative;z-index:1;padding:0 58px 78px;display:grid;grid-template-columns:1fr 1fr;gap:36px;align-items:start;">
      <div>
        <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:${D.muted};margin-bottom:18px;">合作方式</div>
        <h2 style="font-size:38px;line-height:1.16;color:${D.text};margin:0 0 20px;font-weight:700;">更克制的視覺語言，更強的商業轉換力。</h2>
        <p style="font-size:17px;line-height:1.92;color:${D.muted};margin:0;">${H(m.solution)}</p>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;">
        <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&auto=format&fit=crop&q=80" alt="studio" style="width:100%;height:220px;object-fit:cover;display:block;border:1px solid ${D.line};" />
        <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80" alt="materials" style="width:100%;height:220px;object-fit:cover;display:block;border:1px solid ${D.line};" />
      </div>
    </div>

    <div style="position:relative;z-index:1;padding:0 58px 78px;">
      <div style="display:flex;align-items:end;justify-content:space-between;gap:20px;margin-bottom:26px;">
        <div>
          <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:${D.muted};margin-bottom:14px;">精選成果</div>
          <h2 style="font-size:36px;line-height:1.12;color:${D.text};margin:0;font-weight:700;">系統驅動的設計，編輯感的克制節奏。</h2>
        </div>
        <div style="font-size:13px;color:${D.muted};letter-spacing:0.08em;text-transform:uppercase;">品牌系統 · 視覺架構 · 轉換優化</div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(2, minmax(0, 1fr));gap:18px;">
        ${caseCards}
      </div>
    </div>

    <div style="position:relative;z-index:1;padding:0 58px 90px;">
      <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:${D.muted};margin-bottom:18px;">合作回饋</div>
      ${renderReviewCards(m, { theme: 'design', columns: 2 })}
    </div>

    <div style="position:relative;z-index:1;margin:0 58px;background:${D.panel};border:1px solid ${D.line};padding:42px;display:flex;align-items:center;justify-content:space-between;gap:24px;">
      <div>
        <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:${D.muted};margin-bottom:10px;">${H(m.brandName)}</div>
        <h2 style="font-size:clamp(28px,4vw,54px);line-height:1.04;color:${D.text};margin:0;font-weight:800;">${H(m.cta)}</h2>
      </div>
      <button class="design-cta" style="background:${D.primary};color:#0B0B0C;border:none;padding:16px 28px;font-size:14px;font-weight:800;letter-spacing:0.06em;cursor:pointer;white-space:nowrap;">${H(m.cta)}</button>
    </div>
  </section>`;
}
