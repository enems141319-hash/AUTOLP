import type { LandingModel } from '../../brand-analysis/types';
import { escapeHtml } from '../../../utils/sanitize';
import { renderReviewCards } from './reviews';

export function renderJewelry(m: LandingModel): string {
  const H = escapeHtml;
  const details = m.features.map((feature) => `<div style="padding:18px 0;border-bottom:1px solid rgba(201,169,110,0.16);font-size:15px;line-height:1.8;color:${m.palette.muted};">${H(feature)}</div>`).join('');

  return `
  <section style="background:${m.palette.bg};font-family:${m.font};color:${m.palette.text};">
    <nav style="padding:30px 60px;border-bottom:1px solid rgba(201,169,110,0.18);display:flex;align-items:center;justify-content:space-between;">
      <span style="font-size:22px;letter-spacing:0.20em;text-transform:uppercase;color:${m.palette.accent};">${H(m.brandName)}</span>
      <div style="display:flex;gap:30px;align-items:center;">
        <a style="font-size:12px;color:${m.palette.muted};text-decoration:none;letter-spacing:0.12em;text-transform:uppercase;">品牌故事</a>
        <a style="font-size:12px;color:${m.palette.muted};text-decoration:none;letter-spacing:0.12em;text-transform:uppercase;">工藝細節</a>
        <a style="font-size:12px;color:${m.palette.muted};text-decoration:none;letter-spacing:0.12em;text-transform:uppercase;">系列作品</a>
        <button style="background:transparent;color:${m.palette.accent};border:1px solid ${m.palette.accent};border-radius:999px;padding:12px 24px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;cursor:pointer;">${H(m.cta)}</button>
      </div>
    </nav>

    <div style="padding:88px 60px 72px;display:grid;grid-template-columns:1fr 1.05fr;gap:50px;align-items:center;max-width:1280px;margin:0 auto;">
      <div>
        <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:${m.palette.accent};margin-bottom:16px;">收藏感 / 工藝 / 高端質地</div>
        <h1 style="font-size:clamp(40px,5vw,72px);line-height:1.08;font-weight:400;margin:0 0 16px;">${H(m.tagline)}</h1>
        <p style="font-size:17px;line-height:1.9;color:${m.palette.muted};max-width:520px;margin:0 0 28px;">${H(m.subheadline)}</p>
        <button style="background:${m.palette.accent};color:${m.palette.bg};border:none;border-radius:999px;padding:14px 28px;font-size:14px;font-weight:700;cursor:pointer;">${H(m.cta)}</button>
      </div>
      <img src="${m.imgs.hero}" alt="${H(m.brandName)} 珠寶主視覺" style="width:100%;height:620px;object-fit:cover;border-radius:28px;" />
    </div>

    <div style="max-width:1280px;margin:0 auto;padding:0 60px 80px;display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center;">
      <img src="${m.imgs.secondary ?? m.imgs.hero}" alt="${H(m.brandName)} 工藝形象" style="width:100%;height:540px;object-fit:cover;border-radius:28px;" />
      <div>
        <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:${m.palette.accent};margin-bottom:12px;">作品背後的價值</div>
        <h2 style="font-size:34px;line-height:1.25;font-weight:400;margin:0 0 14px;">${H(m.pain)}</h2>
        <p style="font-size:16px;line-height:1.9;color:${m.palette.muted};margin:0 0 24px;">${H(m.solution)}</p>
        ${details}
      </div>
    </div>

    <div style="padding:0 60px 80px;"><div style="max-width:1280px;margin:0 auto;"><div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:${m.palette.accent};margin-bottom:18px;text-align:center;">客戶回饋</div>${renderReviewCards(m, { theme: 'jewelry', columns: 2 })}</div></div>
  </section>`;
}
