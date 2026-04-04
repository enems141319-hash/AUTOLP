import type { LandingModel } from '../../brand-analysis/types';
import { escapeHtml } from '../../../utils/sanitize';
import { renderReviewCards } from './reviews';

export function renderBeauty(m: LandingModel): string {
  const H = escapeHtml;
  const features = m.features.map((feature) => `
    <div style="padding:22px;border:1px solid rgba(190,138,106,0.18);border-radius:20px;background:rgba(255,255,255,0.76);backdrop-filter:blur(10px);">
      <div style="width:34px;height:34px;border-radius:50%;background:${m.palette.accent}22;margin-bottom:14px;"></div>
      <p style="margin:0;color:${m.palette.text};font-size:15px;line-height:1.7;">${H(feature)}</p>
    </div>
  `).join('');

  return `
  <section style="background:${m.palette.bg};font-family:${m.font};color:${m.palette.text};">
    <nav style="padding:26px 60px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(190,138,106,0.16);">
      <span style="font-size:22px;color:${m.palette.text};letter-spacing:0.12em;text-transform:uppercase;">${H(m.brandName)}</span>
      <div style="display:flex;gap:30px;align-items:center;">
        <a style="font-size:13px;color:${m.palette.muted};text-decoration:none;">品牌故事</a>
        <a style="font-size:13px;color:${m.palette.muted};text-decoration:none;">產品亮點</a>
        <a style="font-size:13px;color:${m.palette.muted};text-decoration:none;">使用感受</a>
        <button style="background:${m.palette.primary};color:#fff;border:none;border-radius:999px;padding:12px 24px;font-size:13px;cursor:pointer;">${H(m.cta)}</button>
      </div>
    </nav>

    <div style="display:grid;grid-template-columns:1.15fr 1fr;min-height:640px;">
      <div style="padding:88px 60px;display:flex;flex-direction:column;justify-content:center;">
        <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:${m.palette.primary};margin-bottom:18px;">精品保養 / 柔和質地 / 儀式感體驗</div>
        <h1 style="font-size:clamp(42px,5vw,74px);line-height:1.06;font-weight:400;margin:0 0 18px;max-width:640px;">${H(m.tagline)}</h1>
        <p style="font-size:17px;line-height:1.9;color:${m.palette.muted};max-width:540px;margin:0 0 30px;">${H(m.subheadline)}</p>
        <div style="display:flex;gap:14px;flex-wrap:wrap;">
          <button style="background:${m.palette.text};color:#fff;border:none;border-radius:999px;padding:14px 28px;font-size:14px;font-weight:700;cursor:pointer;">${H(m.cta)}</button>
          <button style="background:transparent;color:${m.palette.text};border:1px solid rgba(44,24,16,0.18);border-radius:999px;padding:14px 28px;font-size:14px;cursor:pointer;">查看品牌提案</button>
        </div>
      </div>
      <div style="position:relative;overflow:hidden;">
        <img src="${m.imgs.hero}" alt="${H(m.brandName)} 主視覺" style="width:100%;height:100%;object-fit:cover;filter:brightness(0.92);" />
        <div style="position:absolute;inset:auto 36px 36px 36px;background:rgba(255,255,255,0.82);backdrop-filter:blur(12px);border-radius:22px;padding:22px;max-width:360px;box-shadow:0 24px 60px rgba(0,0,0,0.10);">
          <div style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:${m.palette.primary};margin-bottom:10px;">品牌觀點</div>
          <p style="font-size:15px;line-height:1.8;color:${m.palette.text};margin:0;">${H(m.solution)}</p>
        </div>
      </div>
    </div>

    <div style="max-width:1240px;margin:0 auto;padding:72px 60px;display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center;">
      <img src="${m.imgs.secondary ?? m.imgs.hero}" alt="${H(m.brandName)} 產品形象" style="width:100%;height:520px;object-fit:cover;border-radius:28px;" />
      <div>
        <div style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:${m.palette.primary};margin-bottom:14px;">品牌需要被感受</div>
        <h2 style="font-size:34px;line-height:1.2;font-weight:400;margin:0 0 16px;">${H(m.pain)}</h2>
        <p style="font-size:16px;line-height:1.85;color:${m.palette.muted};margin:0 0 26px;">${H(m.solution)}</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">${features}</div>
      </div>
    </div>

    <div style="padding:0 60px 80px;"><div style="max-width:1240px;margin:0 auto;"><div style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:${m.palette.primary};margin-bottom:18px;text-align:center;">客戶回饋</div>${renderReviewCards(m, { theme: 'beauty', columns: 2 })}</div></div>
  </section>`;
}
