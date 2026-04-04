import type { LandingModel } from '../../brand-analysis/types';
import { escapeHtml } from '../../../utils/sanitize';

/** Beauty — editorial hero. Effect: shimmer sweep on hero image + fade-up text. */
export function renderBeauty(m: LandingModel): string {
  const H = escapeHtml;

  const features = m.features.map(f => `
    <div style="text-align:center;padding:0 16px;">
      <div style="width:48px;height:48px;border-radius:50%;background:${m.palette.accent};opacity:0.3;margin:0 auto 16px;"></div>
      <p style="color:${m.palette.text};font-size:15px;margin:0;line-height:1.6;">${H(f)}</p>
    </div>`).join('');

  const quotes = m.quotes.map(q => `
    <div style="background:${m.palette.surface};padding:40px;border-radius:4px;">
      <p style="font-size:18px;font-style:italic;color:${m.palette.text};margin:0 0 16px;line-height:1.7;">"${H(q.text)}"</p>
      <p style="font-size:13px;color:${m.palette.muted};margin:0;letter-spacing:0.08em;text-transform:uppercase;">${H(q.author)}</p>
    </div>`).join('');

  return `
  <style>
    @keyframes shimmerSweep {
      0%   { transform:translateX(-100%) skewX(-20deg); }
      100% { transform:translateX(300%) skewX(-20deg); }
    }
    @keyframes beautyFadeUp {
      from { opacity:0; transform:translateY(28px); }
      to   { opacity:1; transform:translateY(0); }
    }
    .beauty-shimmer::after {
      content:''; position:absolute; inset:0;
      background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.25) 50%,transparent 100%);
      animation: shimmerSweep 3s ease-in-out 1s infinite;
    }
    .beauty-hero-text { animation: beautyFadeUp 0.9s ease 0.4s both; }
  </style>
  <section style="background:${m.palette.bg};font-family:${m.font};">
    <nav style="padding:28px 60px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(190,138,106,0.15);">
      <span style="font-size:22px;font-weight:400;color:${m.palette.text};letter-spacing:0.12em;text-transform:uppercase;">${H(m.brandName)}</span>
      <div style="display:flex;gap:40px;">
        <a style="color:${m.palette.muted};text-decoration:none;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;">系列</a>
        <a style="color:${m.palette.muted};text-decoration:none;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;">成分</a>
        <a style="color:${m.palette.muted};text-decoration:none;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;">故事</a>
        <a style="color:${m.palette.primary};text-decoration:none;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;border-bottom:1px solid currentColor;">${H(m.cta)}</a>
      </div>
    </nav>

    <!-- HERO WITH SHIMMER -->
    <div style="position:relative;height:90vh;overflow:hidden;">
      <div class="beauty-shimmer" style="position:relative;width:100%;height:100%;overflow:hidden;">
        <img src="${m.imgs.hero}" alt="hero" style="width:100%;height:100%;object-fit:cover;filter:brightness(0.72);" />
      </div>
      <div style="position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;padding:80px;">
        <div class="beauty-hero-text">
          <p style="color:rgba(255,255,255,0.7);font-size:13px;letter-spacing:0.2em;text-transform:uppercase;margin:0 0 12px;">${H(m.brandName)}</p>
          <h1 style="font-size:clamp(48px,6vw,88px);color:#fff;font-weight:300;margin:0 0 24px;line-height:1.05;max-width:700px;">${H(m.tagline)}</h1>
          <p style="font-size:18px;color:rgba(255,255,255,0.8);margin:0 0 40px;max-width:500px;line-height:1.6;">${H(m.subheadline)}</p>
          <button style="background:transparent;color:#fff;border:1px solid #fff;padding:14px 36px;font-size:14px;letter-spacing:0.1em;text-transform:uppercase;cursor:pointer;font-family:${m.font};">${H(m.cta)}</button>
        </div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;max-width:1200px;margin:0 auto;padding:80px 60px;gap:80px;align-items:center;">
      <div>
        <p style="font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:${m.palette.muted};margin:0 0 16px;">我們相信的</p>
        <h2 style="font-size:38px;font-weight:300;color:${m.palette.text};margin:0 0 24px;line-height:1.2;">${H(m.pain)}</h2>
        <p style="font-size:16px;color:${m.palette.muted};line-height:1.8;margin:0;">${H(m.solution)}</p>
      </div>
      <div style="aspect-ratio:4/5;overflow:hidden;">
        <img src="${m.imgs.secondary??m.imgs.hero}" alt="story" style="width:100%;height:100%;object-fit:cover;" />
      </div>
    </div>

    <div style="background:${m.palette.surface};padding:60px;">
      <p style="text-align:center;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:${m.palette.muted};margin:0 0 48px;">我們的承諾</p>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:40px;max-width:1000px;margin:0 auto;">${features}</div>
    </div>

    <div style="padding:80px 60px;">
      <div style="max-width:900px;margin:0 auto;">
        <p style="text-align:center;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:${m.palette.muted};margin:0 0 48px;">真實見證</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">${quotes}</div>
      </div>
    </div>

    <div style="text-align:center;padding:80px 40px;border-top:1px solid rgba(190,138,106,0.2);">
      <p style="font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:${m.palette.muted};margin:0 0 16px;">${H(m.brandName)}</p>
      <h2 style="font-size:42px;font-weight:300;color:${m.palette.text};margin:0 0 32px;">${H(m.tagline)}</h2>
      <button style="background:${m.palette.primary};color:#fff;border:none;padding:16px 48px;font-size:14px;letter-spacing:0.1em;text-transform:uppercase;cursor:pointer;font-family:${m.font};">${H(m.cta)}</button>
    </div>
  </section>`;
}
