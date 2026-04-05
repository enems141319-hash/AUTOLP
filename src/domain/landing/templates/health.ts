import type { LandingModel } from '../../brand-analysis/types';
import { escapeHtml } from '../../../utils/sanitize';
import { renderReviewCards } from './reviews';

export function renderHealth(m: LandingModel): string {
  const H = escapeHtml;
  const steps = [m.pain, m.solution, ...m.features.slice(0, 4)].map((text, index) => `
    <div style="display:flex;gap:18px;align-items:flex-start;padding:0 0 26px;">
      <div style="width:42px;height:42px;border-radius:50%;background:${index === 0 ? m.palette.primary : m.palette.surface};border:2px solid ${m.palette.primary};display:flex;align-items:center;justify-content:center;font-weight:800;color:${index === 0 ? '#fff' : m.palette.primary};flex-shrink:0;">${index + 1}</div>
      <div>
        <div style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:${m.palette.primary};margin-bottom:8px;">${index === 0 ? '現在問題' : index === 1 ? '改善方式' : `步驟 0${index}`}</div>
        <p style="margin:0;color:${m.palette.text};font-size:16px;line-height:1.8;">${H(text)}</p>
      </div>
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
    <nav style="padding:22px 60px;background:${m.palette.surface};border-bottom:1px solid rgba(5,150,105,0.14);display:flex;align-items:center;justify-content:space-between;">
      <span style="font-size:20px;font-weight:800;color:${m.palette.primary};">${H(m.brandName)}</span>
      <div style="display:flex;gap:28px;align-items:center;">
        <a style="font-size:13px;color:${m.palette.muted};text-decoration:none;">成果案例</a>
        <a style="font-size:13px;color:${m.palette.muted};text-decoration:none;">改善流程</a>
        <a style="font-size:13px;color:${m.palette.muted};text-decoration:none;">服務方案</a>
        <button style="background:${m.palette.primary};color:#fff;border:none;border-radius:999px;padding:12px 24px;font-size:13px;font-weight:700;cursor:pointer;">${H(m.cta)}</button>
      </div>
    </nav>

    <div style="padding:72px 60px;background:linear-gradient(135deg,${m.palette.primary},${m.palette.accent}33);position:relative;overflow:hidden;">
      <img src="${m.imgs.hero}" alt="${H(m.brandName)} 健康主視覺" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.18;mix-blend-mode:screen;" />
      <div style="position:relative;max-width:700px;">
        <div style="display:inline-flex;background:rgba(255,255,255,0.16);color:#fff;border-radius:999px;padding:6px 14px;font-size:12px;font-weight:700;margin-bottom:18px;">個人化訓練 · 教練全程陪伴 · 系統進步</div>
        <h1 style="font-size:clamp(38px,5vw,68px);line-height:1.06;font-weight:800;color:#fff;margin:0 0 16px;">${H(m.tagline)}</h1>
        <p style="font-size:17px;line-height:1.8;color:rgba(255,255,255,0.88);margin:0 0 26px;max-width:560px;">${H(m.subheadline)}</p>
        <button style="background:#fff;color:${m.palette.primary};border:none;border-radius:999px;padding:14px 28px;font-size:14px;font-weight:800;cursor:pointer;">${H(m.cta)}</button>
      </div>
    </div>

    <div style="max-width:1200px;margin:0 auto;padding:72px 60px;display:grid;grid-template-columns:320px 1fr;gap:56px;align-items:start;">
      <div style="position:sticky;top:48px;background:${m.palette.surface};border-radius:24px;padding:28px;">
        <div style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:${m.palette.primary};margin-bottom:12px;">品牌目標</div>
        <h2 style="font-size:30px;line-height:1.25;font-weight:800;margin:0 0 12px;">${H(m.pain)}</h2>
        <p style="margin:0;color:${m.palette.muted};font-size:15px;line-height:1.8;">${H(m.solution)}</p>
      </div>
      <div>${steps}</div>
    </div>

    <div style="padding:0 60px 80px;"><div style="max-width:1200px;margin:0 auto;"><div style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:${m.palette.primary};margin-bottom:18px;text-align:center;">學員與客戶回饋</div>${renderReviewCards(m, { theme: 'health', columns: 2 })}</div></div>
  </section>`;
}
