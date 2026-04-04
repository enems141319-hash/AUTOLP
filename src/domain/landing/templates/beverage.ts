import type { LandingModel } from '../../brand-analysis/types';
import { escapeHtml } from '../../../utils/sanitize';

/** Beverage — origin story focus. Effect: rotating origin badge + steam rise. */
export function renderBeverage(m: LandingModel): string {
  const H = escapeHtml;

  const features = m.features.map(f => `
    <div style="padding:32px;background:${m.palette.surface};border-radius:8px;border:1px solid ${m.palette.accent}20;">
      <div style="width:12px;height:12px;background:${m.palette.accent};border-radius:50%;margin-bottom:16px;"></div>
      <p style="color:${m.palette.text};font-size:15px;line-height:1.7;margin:0;">${H(f)}</p>
    </div>`).join('');

  return `
  <style>
    @keyframes rotateBadge {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes steamRise {
      0%   { opacity:0; transform:translateY(0) scaleX(1); }
      50%  { opacity:0.6; transform:translateY(-20px) scaleX(1.2); }
      100% { opacity:0; transform:translateY(-40px) scaleX(0.8); }
    }
    @keyframes bevFade { from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);} }
    .bev-badge-inner { animation: rotateBadge 20s linear infinite; }
    .steam1 { animation: steamRise 2.5s ease-in-out 0s infinite; }
    .steam2 { animation: steamRise 2.5s ease-in-out 0.8s infinite; }
    .steam3 { animation: steamRise 2.5s ease-in-out 1.6s infinite; }
    .bev-content { animation: bevFade 0.8s ease 0.2s both; }
  </style>
  <section style="background:${m.palette.bg};font-family:${m.font};color:${m.palette.text};">
    <nav style="padding:24px 60px;display:flex;align-items:center;justify-content:space-between;">
      <span style="font-size:22px;font-weight:700;color:${m.palette.primary};">${H(m.brandName)}</span>
      <div style="display:flex;gap:32px;align-items:center;">
        <a style="color:${m.palette.muted};text-decoration:none;font-size:14px;">來源</a>
        <a style="color:${m.palette.muted};text-decoration:none;font-size:14px;">精選豆款</a>
        <a style="color:${m.palette.muted};text-decoration:none;font-size:14px;">沖煮指南</a>
        <button style="background:${m.palette.primary};color:${m.palette.bg};border:none;padding:10px 24px;border-radius:6px;font-size:14px;font-weight:700;cursor:pointer;">${H(m.cta)}</button>
      </div>
    </nav>

    <!-- HERO with rotating badge -->
    <div style="position:relative;overflow:hidden;">
      <img src="${m.imgs.hero}" alt="hero" style="width:100%;height:600px;object-fit:cover;" />
      <div style="position:absolute;inset:0;background:linear-gradient(to right,${m.palette.bg}EE 45%,transparent);">
        <div class="bev-content" style="padding:80px 80px;max-width:600px;">
          <p style="font-size:13px;letter-spacing:0.15em;text-transform:uppercase;color:${m.palette.accent};margin:0 0 20px;">直接貿易 · 精品烘焙</p>
          <h1 style="font-size:clamp(36px,5vw,64px);font-weight:700;color:${m.palette.primary};margin:0 0 10px;line-height:1.1;">
            <span style="font-size:0.5em;font-weight:500;color:${m.palette.muted};display:block;margin-bottom:6px;">${H(m.brandName)}</span>
            ${H(m.tagline)}
          </h1>
          <p style="font-size:17px;color:${m.palette.muted};line-height:1.7;margin:0 0 36px;">${H(m.subheadline)}</p>
          <button style="background:${m.palette.accent};color:#fff;border:none;padding:14px 32px;font-size:16px;font-weight:700;border-radius:6px;cursor:pointer;">${H(m.cta)}</button>
        </div>
      </div>

      <!-- Rotating badge -->
      <div style="position:absolute;right:80px;top:50%;transform:translateY(-50%);width:140px;height:140px;">
        <!-- Steam effect above cup -->
        <div style="position:absolute;top:-60px;left:50%;transform:translateX(-50%);display:flex;gap:8px;">
          <div class="steam1" style="width:6px;height:30px;background:${m.palette.accent};border-radius:3px;opacity:0;"></div>
          <div class="steam2" style="width:6px;height:30px;background:${m.palette.accent};border-radius:3px;opacity:0;margin-top:8px;"></div>
          <div class="steam3" style="width:6px;height:30px;background:${m.palette.accent};border-radius:3px;opacity:0;"></div>
        </div>
        <svg class="bev-badge-inner" viewBox="0 0 140 140" style="width:140px;height:140px;">
          <circle cx="70" cy="70" r="64" fill="${m.palette.accent}" opacity="0.9"/>
          <path id="circlePath" d="M70,70 m-50,0 a50,50 0 1,1 100,0 a50,50 0 1,1 -100,0" fill="none"/>
          <text font-size="12" fill="${m.palette.bg}" font-family="sans-serif" letter-spacing="3">
            <textPath href="#circlePath">SPECIALTY · COFFEE · DIRECT · TRADE · </textPath>
          </text>
          <text x="70" y="75" text-anchor="middle" font-size="28" fill="${m.palette.bg}">☕</text>
        </svg>
      </div>
    </div>

    <!-- ORIGIN STORY -->
    <div style="max-width:1200px;margin:80px auto;padding:0 60px;display:grid;grid-template-columns:3fr 2fr;gap:80px;align-items:center;">
      <div>
        <p style="font-size:13px;letter-spacing:0.15em;text-transform:uppercase;color:${m.palette.muted};margin:0 0 16px;">問題所在</p>
        <h2 style="font-size:36px;font-weight:600;color:${m.palette.text};margin:0 0 20px;line-height:1.25;">${H(m.pain)}</h2>
        <p style="font-size:17px;color:${m.palette.muted};line-height:1.8;">${H(m.solution)}</p>
      </div>
      <div>
        <img src="${m.imgs.secondary??m.imgs.hero}" alt="origin" style="width:100%;aspect-ratio:1;object-fit:cover;border-radius:50%;" />
      </div>
    </div>

    <div style="background:${m.palette.primary};padding:80px 60px;">
      <div style="max-width:1200px;margin:0 auto;">
        <h2 style="font-size:32px;color:${m.palette.bg};font-weight:700;text-align:center;margin:0 0 48px;">每一個細節</h2>
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:24px;">${features}</div>
      </div>
    </div>

    <div style="padding:100px 80px;">
      <div style="max-width:1000px;margin:0 auto;">
        <p style="font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:${m.palette.muted};margin:0 0 48px;text-align:center;">聲音</p>
        ${m.quotes.map(q=>`
        <div style="margin-bottom:64px;">
          <p style="font-size:20px;font-style:italic;color:${m.palette.text};margin:0 0 12px;line-height:1.6;">"${H(q.text)}"</p>
          <p style="font-size:13px;color:${m.palette.muted};margin:0;">— ${H(q.author)}</p>
        </div>`).join('')}
      </div>
    </div>

    <div style="background:${m.palette.accent};padding:60px;display:flex;align-items:center;justify-content:space-between;">
      <div>
        <h2 style="font-size:32px;color:#fff;font-weight:700;margin:0 0 8px;">${H(m.brandName)}</h2>
        <p style="font-size:15px;color:rgba(255,255,255,0.8);margin:0;">${H(m.cta)} — 第一個月九折</p>
      </div>
      <button style="background:#fff;color:${m.palette.accent};border:none;padding:16px 40px;font-size:16px;font-weight:700;border-radius:6px;cursor:pointer;white-space:nowrap;">${H(m.cta)}</button>
    </div>
  </section>`;
}
