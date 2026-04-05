import type { LandingModel } from '../../brand-analysis/types';
import { escapeHtml } from '../../../utils/sanitize';
import { renderReviewCards } from './reviews';

export function renderEdu(m: LandingModel): string {
  const H = escapeHtml;
  const cards = m.features.map((feature, index) => `
    <div style="background:${index % 2 === 0 ? m.palette.surface : '#fff'};border:1px solid rgba(67,56,202,0.12);border-radius:22px;padding:28px;">
      <div style="width:38px;height:38px;border-radius:12px;background:${m.palette.primary};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;margin-bottom:14px;">${index + 1}</div>
      <p style="margin:0;color:${m.palette.text};font-size:15px;line-height:1.8;">${H(feature)}</p>
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
    <nav style="padding:22px 60px;border-bottom:1px solid rgba(67,56,202,0.14);display:flex;align-items:center;justify-content:space-between;">
      <span style="font-size:20px;font-weight:800;color:${m.palette.primary};">${H(m.brandName)}</span>
      <div style="display:flex;gap:28px;align-items:center;">
        <a style="font-size:13px;color:${m.palette.muted};text-decoration:none;">課程架構</a>
        <a style="font-size:13px;color:${m.palette.muted};text-decoration:none;">學習成果</a>
        <a style="font-size:13px;color:${m.palette.muted};text-decoration:none;">常見問題</a>
        <button style="background:linear-gradient(90deg,${m.palette.primary},${m.palette.accent});color:#fff;border:none;border-radius:999px;padding:12px 24px;font-size:13px;font-weight:700;cursor:pointer;">${H(m.cta)}</button>
      </div>
    </nav>

    <div style="display:grid;grid-template-columns:1fr 1fr;min-height:620px;">
      <div style="padding:84px 60px;background:${m.palette.primary};display:flex;flex-direction:column;justify-content:center;clip-path:polygon(0 0,92% 0,100% 100%,0 100%);position:relative;z-index:1;">
        <div style="display:inline-flex;background:rgba(255,255,255,0.18);color:#fff;border-radius:999px;padding:6px 14px;font-size:12px;font-weight:700;margin-bottom:18px;width:fit-content;">教育品牌 / 結構清楚 / 轉換導向</div>
        <h1 style="font-size:clamp(38px,5vw,66px);line-height:1.06;font-weight:800;color:#fff;margin:0 0 16px;max-width:560px;">${H(m.tagline)}</h1>
        <p style="font-size:17px;line-height:1.85;color:rgba(255,255,255,0.88);margin:0 0 28px;max-width:500px;">${H(m.subheadline)}</p>
        <div style="display:flex;gap:14px;flex-wrap:wrap;">
          <button style="background:#fff;color:${m.palette.primary};border:none;border-radius:999px;padding:14px 28px;font-size:14px;font-weight:700;cursor:pointer;">${H(m.cta)}</button>
          <button style="background:transparent;color:#fff;border:1px solid rgba(255,255,255,0.34);border-radius:999px;padding:14px 28px;font-size:14px;cursor:pointer;">查看課程架構</button>
        </div>
      </div>
      <div style="position:relative;overflow:hidden;margin-left:-56px;">
        <img src="${m.imgs.hero}" alt="${H(m.brandName)} 教學主視覺" style="width:100%;height:100%;object-fit:cover;" />
      </div>
    </div>

    <div style="max-width:1240px;margin:0 auto;padding:72px 60px;display:grid;grid-template-columns:340px 1fr;gap:52px;align-items:start;">
      <div style="background:${m.palette.surface};border-radius:24px;padding:28px;position:sticky;top:40px;">
        <div style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:${m.palette.primary};margin-bottom:12px;">你現在卡在哪裡</div>
        <h2 style="font-size:30px;line-height:1.25;font-weight:800;margin:0 0 12px;">${H(m.pain)}</h2>
        <p style="margin:0;color:${m.palette.muted};font-size:15px;line-height:1.8;">${H(m.solution)}</p>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">${cards}</div>
    </div>

    <div style="padding:0 60px 80px;"><div style="max-width:1240px;margin:0 auto;"><div style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:${m.palette.primary};margin-bottom:18px;text-align:center;">學員回饋</div>${renderReviewCards(m, { theme: 'edu', columns: 2 })}</div></div>
  </section>`;
}
