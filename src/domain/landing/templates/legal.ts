import type { LandingModel } from '../../brand-analysis/types';
import { escapeHtml } from '../../../utils/sanitize';
import { renderReviewCards } from './reviews';

/** Legal — dark trust-first. Effect: animated underline draw on headline. */
export function renderLegal(m: LandingModel): string {
  const H = escapeHtml;

  const D = {
    bg:      '#09090B',
    surface: '#111113',
    card:    '#18181B',
    border:  'rgba(255,255,255,0.07)',
    text:    '#EFEFEF',
    muted:   'rgba(255,255,255,0.38)',
    primary: m.palette.primary,
    accent:  m.palette.accent,
  };

  const areas = m.features.map(f => `
    <div style="padding:26px 22px;background:${D.card};border-top:2px solid ${D.primary};">
      <p style="color:${D.text};font-size:15px;line-height:1.7;margin:0;">${H(f)}</p>
    </div>`).join('');

  const quotes = m.quotes.map(q => `
    <div style="padding:36px;background:${D.card};border:1px solid ${D.border};">
      <p style="font-size:17px;font-style:italic;color:${D.text};margin:0 0 20px;line-height:1.8;">"${H(q.text)}"</p>
      <div style="height:1px;background:${D.border};margin-bottom:16px;"></div>
      <p style="font-size:13px;color:${D.muted};margin:0;">— ${H(q.author)}</p>
    </div>`).join('');

  return `
  <style>
    @keyframes underlineDraw {
      from { width:0; }
      to   { width:100%; }
    }
    @keyframes legalFadeIn {
      from { opacity:0; transform:translateY(18px); }
      to   { opacity:1; transform:translateY(0); }
    }
    .legal-underline { position:relative; display:inline; }
    .legal-underline::after {
      content:''; position:absolute; bottom:-5px; left:0; height:2px;
      background:${D.accent}; animation:underlineDraw 1.1s ease 0.6s both; width:0;
    }
    .legal-hero     { animation: legalFadeIn 0.7s ease both; }
    .legal-hero-img { animation: legalFadeIn 0.7s ease 0.2s both; }
  </style>

  <section style="background:${D.bg};font-family:${m.font};color:${D.text};min-height:100vh;">

    <!-- TOP BAR -->
    <div style="background:${D.surface};padding:10px 60px;border-bottom:1px solid ${D.border};">
      <div style="max-width:1200px;margin:0 auto;display:flex;justify-content:flex-end;gap:20px;">
        <a style="color:${D.muted};text-decoration:none;font-size:12px;letter-spacing:0.04em;">中文</a>
        <span style="color:${D.border};">|</span>
        <a style="color:${D.muted};text-decoration:none;font-size:12px;letter-spacing:0.04em;">English</a>
      </div>
    </div>

    <!-- NAV -->
    <nav style="background:${D.surface};border-bottom:1px solid ${D.border};padding:0 60px;">
      <div style="max-width:1200px;margin:0 auto;height:68px;display:flex;align-items:center;justify-content:space-between;">
        <div>
          <span style="font-size:19px;font-weight:700;color:${D.text};">${H(m.brandName)}</span>
          <span style="font-size:11px;color:${D.muted};margin-left:10px;letter-spacing:0.08em;text-transform:uppercase;">Law Offices</span>
        </div>
        <div style="display:flex;gap:36px;align-items:center;">
          <a style="color:${D.muted};text-decoration:none;font-size:13px;">業務領域</a>
          <a style="color:${D.muted};text-decoration:none;font-size:13px;">律師陣容</a>
          <a style="color:${D.muted};text-decoration:none;font-size:13px;">成功案例</a>
          <button style="background:${D.primary};color:#fff;border:none;padding:11px 22px;font-size:13px;cursor:pointer;font-weight:600;">${H(m.cta)}</button>
        </div>
      </div>
    </nav>

    <!-- HERO -->
    <div style="max-width:1200px;margin:0 auto;padding:100px 60px;display:grid;grid-template-columns:3fr 2fr;gap:80px;align-items:center;">
      <div class="legal-hero">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:28px;">
          <div style="width:28px;height:1px;background:${D.accent};"></div>
          <span style="font-size:11px;color:${D.muted};letter-spacing:0.14em;text-transform:uppercase;">超過 20 年商業法律服務</span>
        </div>
        <h1 style="font-size:clamp(28px,3.5vw,48px);font-weight:700;color:${D.text};margin:0 0 18px;line-height:1.2;">
          <span class="legal-underline">${H(m.brandName)}</span>
          <span style="display:block;font-weight:400;font-size:0.78em;margin-top:10px;color:${D.muted};">${H(m.tagline)}</span>
        </h1>
        <p style="font-size:17px;color:${D.muted};line-height:1.8;margin:0 0 40px;">${H(m.subheadline)}</p>
        <div style="display:flex;gap:16px;align-items:center;">
          <button style="background:${D.primary};color:#fff;border:none;padding:14px 32px;font-size:15px;font-weight:600;cursor:pointer;">${H(m.cta)}</button>
          <a style="font-size:13px;color:${D.muted};text-decoration:underline;cursor:pointer;">了解服務</a>
        </div>
      </div>

      <div class="legal-hero-img" style="background:${D.card};padding:36px;border:1px solid ${D.border};">
        <img src="${m.imgs.hero}" alt="legal" style="width:100%;height:260px;object-fit:cover;margin-bottom:24px;filter:brightness(0.75);" />
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;text-align:center;">
          ${[['20+','年執業'],['500+','成功案例'],['98%','續簽率']].map(([v,l])=>`
          <div style="padding:16px;background:${D.surface};border:1px solid ${D.border};">
            <div style="font-size:22px;font-weight:700;color:${D.primary};">${v}</div>
            <div style="font-size:11px;color:${D.muted};margin-top:4px;letter-spacing:0.04em;">${l}</div>
          </div>`).join('')}
        </div>
      </div>
    </div>

    <!-- PAIN SECTION -->
    <div style="background:${D.primary};padding:72px 60px;">
      <div style="max-width:1200px;margin:0 auto;">
        <h2 style="font-size:30px;font-weight:700;margin:0 0 18px;color:#fff;">${H(m.pain)}</h2>
        <p style="font-size:17px;line-height:1.85;color:rgba(255,255,255,0.8);max-width:820px;">${H(m.solution)}</p>
      </div>
    </div>

    <!-- PRACTICE AREAS -->
    <div style="max-width:1200px;margin:0 auto;padding:80px 60px;">
      <h2 style="font-size:26px;font-weight:700;margin:0 0 10px;color:${D.text};">業務領域</h2>
      <div style="height:2px;width:44px;background:${D.accent};margin-bottom:36px;"></div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:14px;">${areas}</div>
    </div>

    <!-- QUOTES -->
    <div style="background:${D.surface};padding:72px 60px;border-top:1px solid ${D.border};">
      <div style="max-width:1200px;margin:0 auto;">
        <h2 style="font-size:26px;font-weight:700;margin:0 0 10px;color:${D.text};">客戶的信任</h2>
        <div style="height:2px;width:44px;background:${D.accent};margin-bottom:36px;"></div>
        ${renderReviewCards(m, { theme: 'legal', columns: 2 })}
      </div>
    </div>

    <!-- FOOTER CTA -->
    <div style="text-align:center;padding:80px 40px;border-top:3px solid ${D.primary};">
      <p style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:${D.muted};margin:0 0 12px;">${H(m.brandName)}</p>
      <h2 style="font-size:34px;font-weight:700;color:${D.text};margin:0 0 12px;">${H(m.tagline)}</h2>
      <p style="font-size:15px;color:${D.muted};margin:0 0 32px;">初次諮詢免費，無義務</p>
      <button style="background:${D.primary};color:#fff;border:none;padding:16px 48px;font-size:16px;font-weight:700;cursor:pointer;">${H(m.cta)}</button>
    </div>
  </section>`;
}
