import type { LandingModel } from '../../brand-analysis/types';
import { escapeHtml } from '../../../utils/sanitize';
import { renderReviewCards } from './reviews';

export function renderFood(m: LandingModel): string {
  const H = escapeHtml;
  const features = m.features.map((feature) => `
    <div style="padding:20px 0;border-bottom:1px solid rgba(26,46,26,0.10);display:flex;justify-content:space-between;gap:20px;">
      <span style="font-size:16px;color:${m.palette.text};">${H(feature)}</span>
      <span style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:${m.palette.muted};">精選內容</span>
    </div>
  `).join('');

  return `
  <style>
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

  <section class="lp-noise" style="background:${m.palette.bg};font-family:${m.font};color:${m.palette.text};">
    <nav style="padding:24px 60px;border-bottom:1px solid rgba(74,124,89,0.12);display:flex;align-items:center;justify-content:space-between;">
      <span style="font-size:22px;font-weight:800;color:${m.palette.primary};">${H(m.brandName)}</span>
      <div style="display:flex;gap:28px;align-items:center;">
        <a style="font-size:13px;color:${m.palette.muted};text-decoration:none;">產品特色</a>
        <a style="font-size:13px;color:${m.palette.muted};text-decoration:none;">食材來源</a>
        <a style="font-size:13px;color:${m.palette.muted};text-decoration:none;">品牌故事</a>
        <button style="background:${m.palette.primary};color:#fff;border:none;border-radius:999px;padding:12px 24px;font-size:13px;font-weight:700;cursor:pointer;">${H(m.cta)}</button>
      </div>
    </nav>

    <div style="max-width:1240px;margin:0 auto;padding:56px 60px 72px;display:grid;grid-template-columns:1.1fr 1fr;gap:30px;align-items:stretch;">
      <div style="border-radius:28px;overflow:hidden;position:relative;min-height:560px;">
        <img src="${m.imgs.hero}" alt="${H(m.brandName)} 食品主視覺" style="width:100%;height:100%;object-fit:cover;filter:brightness(0.78);" />
        <div style="position:absolute;inset:auto 32px 32px 32px;max-width:520px;">
          <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:${m.palette.accent};margin-bottom:14px;">產地 / 風味 / 真實感</div>
          <h1 style="font-size:clamp(38px,4.8vw,68px);line-height:1.06;color:#fff;font-weight:800;margin:0 0 14px;">${H(m.tagline)}</h1>
          <p style="font-size:17px;line-height:1.8;color:rgba(255,255,255,0.86);margin:0 0 24px;">${H(m.subheadline)}</p>
          <button style="background:#fff;color:${m.palette.primary};border:none;border-radius:999px;padding:14px 28px;font-size:14px;font-weight:800;cursor:pointer;">${H(m.cta)}</button>
        </div>
      </div>
      <div style="display:grid;grid-template-rows:auto 1fr;gap:24px;">
        <div style="background:${m.palette.surface};border-radius:24px;padding:28px;">
          <div style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:${m.palette.primary};margin-bottom:12px;">品牌困境</div>
          <h2 style="font-size:30px;line-height:1.25;font-weight:800;margin:0 0 12px;">${H(m.pain)}</h2>
          <p style="font-size:16px;line-height:1.85;color:${m.palette.muted};margin:0;">${H(m.solution)}</p>
        </div>
        <div style="background:${m.palette.surface};border-radius:24px;padding:28px;display:flex;flex-direction:column;justify-content:center;">
          <div style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:${m.palette.primary};margin-bottom:12px;">本頁重點</div>
          ${features}
        </div>
      </div>
    </div>

    <div style="padding:0 60px 80px;"><div style="max-width:1240px;margin:0 auto;"><div style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:${m.palette.primary};margin-bottom:18px;text-align:center;">客戶回饋</div>${renderReviewCards(m, { theme: 'food', columns: 2 })}</div></div>
  </section>`;
}
