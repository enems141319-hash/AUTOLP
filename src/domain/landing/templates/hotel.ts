import type { LandingModel } from '../../brand-analysis/types';
import { escapeHtml } from '../../../utils/sanitize';
import { renderReviewCards } from './reviews';

export function renderHotel(m: LandingModel): string {
  const H = escapeHtml;
  const amenities = m.features.map((feature) => `
    <div style="display:flex;align-items:center;gap:14px;padding:16px 0;border-bottom:1px solid rgba(142,107,82,0.16);">
      <div style="width:10px;height:10px;border-radius:50%;background:${m.palette.accent};flex-shrink:0;"></div>
      <span style="font-size:15px;color:${m.palette.text};">${H(feature)}</span>
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

  <section class="lp-noise" style="background:${m.palette.bg};font-family:${m.font};color:${m.palette.text};;overflow:hidden">

    <!-- diffuse background orbs -->
    <div class="lp-orb" style="width:600px;height:600px;background:radial-gradient(circle,${m.palette.primary}28 0%,transparent 70%);top:-160px;left:-140px;animation:diffuseFloat 14s ease-in-out infinite;"></div>
    <div class="lp-orb" style="width:480px;height:480px;background:radial-gradient(circle,${m.palette.accent}22 0%,transparent 70%);top:60px;right:-100px;animation:diffuseFloat 18s ease-in-out infinite reverse;"></div>
    <div class="lp-orb" style="width:400px;height:400px;background:radial-gradient(circle,${m.palette.primary}18 0%,transparent 70%);bottom:180px;left:28%;animation:diffuseFloat 22s ease-in-out infinite 4s;"></div>
    <div class="lp-orb" style="width:340px;height:340px;background:radial-gradient(circle,${m.palette.accent}20 0%,transparent 70%);bottom:-60px;right:10%;animation:diffuseFloat 16s ease-in-out infinite 2s;"></div>
    <div style="position:relative;min-height:92vh;overflow:hidden;">
      <img src="${m.imgs.hero}" alt="${H(m.brandName)} 旅宿主視覺" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;" />
      <div style="position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,0.16),rgba(0,0,0,0.62));"></div>
      <nav style="position:relative;z-index:1;padding:30px 60px;display:flex;align-items:center;justify-content:space-between;">
        <span style="font-size:24px;letter-spacing:0.16em;text-transform:uppercase;color:#fff;">${H(m.brandName)}</span>
        <div style="display:flex;gap:28px;align-items:center;">
          <a style="font-size:12px;color:rgba(255,255,255,0.82);text-decoration:none;letter-spacing:0.10em;text-transform:uppercase;">客房介紹</a>
          <a style="font-size:12px;color:rgba(255,255,255,0.82);text-decoration:none;letter-spacing:0.10em;text-transform:uppercase;">體驗亮點</a>
          <a style="font-size:12px;color:rgba(255,255,255,0.82);text-decoration:none;letter-spacing:0.10em;text-transform:uppercase;">入住方案</a>
          <button style="background:#fff;color:${m.palette.primary};border:none;border-radius:999px;padding:12px 24px;font-size:13px;font-weight:700;cursor:pointer;">${H(m.cta)}</button>
        </div>
      </nav>
      <div style="position:relative;z-index:1;padding:120px 60px 70px;max-width:760px;">
        <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:${m.palette.accent};margin-bottom:16px;">精品旅宿 · 24H 管家服務 · 細節一致性</div>
        <h1 style="font-size:clamp(42px,5.2vw,74px);line-height:1.05;font-weight:300;color:#fff;margin:0 0 16px;">${H(m.tagline)}</h1>
        <p style="font-size:17px;line-height:1.85;color:rgba(255,255,255,0.86);margin:0 0 28px;max-width:560px;">${H(m.subheadline)}</p>
        <div style="display:flex;gap:14px;flex-wrap:wrap;">
          <button style="background:#fff;color:${m.palette.primary};border:none;border-radius:999px;padding:14px 28px;font-size:14px;font-weight:700;cursor:pointer;">${H(m.cta)}</button>
          <button style="background:transparent;color:#fff;border:1px solid rgba(255,255,255,0.35);border-radius:999px;padding:14px 28px;font-size:14px;cursor:pointer;">查看房型</button>
        </div>
      </div>
    </div>

    <div style="max-width:1240px;margin:0 auto;padding:72px 60px;display:grid;grid-template-columns:1fr 1fr;gap:54px;align-items:center;">
      <div>
        <div style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:${m.palette.accent};margin-bottom:12px;">旅客期待的是完整感受</div>
        <h2 style="font-size:34px;line-height:1.25;font-weight:300;margin:0 0 14px;">${H(m.pain)}</h2>
        <p style="font-size:16px;line-height:1.9;color:${m.palette.muted};margin:0 0 24px;">${H(m.solution)}</p>
        ${amenities}
      </div>
      <img src="${m.imgs.secondary ?? m.imgs.hero}" alt="${H(m.brandName)} 空間照" style="width:100%;height:560px;object-fit:cover;border-radius:28px;" />
    </div>

    <div style="padding:0 60px 80px;"><div style="max-width:1240px;margin:0 auto;"><div style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:${m.palette.accent};margin-bottom:18px;text-align:center;">旅客回饋</div>${renderReviewCards(m, { theme: 'hotel', columns: 2 })}</div></div>
  </section>`;
}
