import type { LandingModel } from '../../brand-analysis/types';
import { escapeHtml } from '../../../utils/sanitize';

/**
 * Design Agency — DARK HIGH-END: obsidian bg, neon accent CTA,
 * marquee ticker, hover colour-fill on case cards.
 * Effect: marquee scroll + case card colour reveal.
 */
export function renderDesign(m: LandingModel): string {
  const H = escapeHtml;

  // Override palette to dark for design category
  const D = {
    bg:      '#080808',
    surface: '#111111',
    card:    '#161616',
    border:  'rgba(255,255,255,0.07)',
    text:    '#F0F0F0',
    muted:   'rgba(255,255,255,0.38)',
    primary: m.palette.primary,   // keeps brand primary (e.g. #FF4D00)
    accent:  m.palette.accent,
  };

  const caseCards = m.features.map((f, i) => {
    const fills = [D.primary, D.accent, '#FFD600', '#B4F542'];
    const tc    = i === 2 ? '#000' : '#fff';
    const fill  = fills[i % fills.length];
    return `
    <div style="background:${D.card};border:1px solid ${D.border};padding:40px;cursor:default;position:relative;overflow:hidden;transition:color 0.3s;"
         onmouseenter="this.querySelector('.case-bg').style.transform='scaleX(1)';this.style.color='${tc}'"
         onmouseleave="this.querySelector('.case-bg').style.transform='scaleX(0)';this.style.color=''">
      <div class="case-bg" style="position:absolute;inset:0;background:${fill};transform:scaleX(0);transform-origin:left;transition:transform 0.45s cubic-bezier(0.16,1,0.3,1);z-index:0;"></div>
      <div style="font-size:52px;font-weight:900;opacity:0.06;position:absolute;top:12px;right:16px;z-index:1;line-height:1;color:#fff;">0${i+1}</div>
      <p style="font-size:16px;line-height:1.65;margin:0;position:relative;z-index:1;color:inherit;">${H(f)}</p>
    </div>`;
  }).join('');

  const marqueeText = ['品牌識別','UI/UX 設計','設計系統','視覺語言','轉化優化'];
  const marqueeHtml = [...marqueeText, ...marqueeText, ...marqueeText]
    .map(t => `<span style="margin:0 36px;white-space:nowrap;">${t}&nbsp;<span style="color:${D.primary};">✦</span></span>`)
    .join('');

  return `
  <style>
    @keyframes marqueeScroll {
      from { transform: translateX(0); }
      to   { transform: translateX(-33.333%); }
    }
    @keyframes designHeroIn {
      from { opacity:0; transform:translateX(-48px); }
      to   { opacity:1; transform:translateX(0); }
    }
    @keyframes designSubIn {
      from { opacity:0; transform:translateY(16px); }
      to   { opacity:1; transform:translateY(0); }
    }
    .marquee-track { animation: marqueeScroll 22s linear infinite; display:flex; width:max-content; will-change:transform; }
    .design-h1  { animation: designHeroIn 0.85s cubic-bezier(0.16,1,0.3,1) both; }
    .design-sub { animation: designSubIn  0.7s ease 0.3s both; }
  </style>

  <section style="background:${D.bg};font-family:${m.font};color:${D.text};min-height:100vh;">

    <!-- NAV -->
    <nav style="padding:26px 60px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid ${D.border};">
      <span style="font-size:18px;font-weight:700;color:${D.text};letter-spacing:0.02em;">${H(m.brandName)}</span>
      <div style="display:flex;gap:36px;align-items:center;">
        <a style="color:${D.muted};text-decoration:none;font-size:13px;letter-spacing:0.04em;">作品</a>
        <a style="color:${D.muted};text-decoration:none;font-size:13px;letter-spacing:0.04em;">服務</a>
        <a style="color:${D.muted};text-decoration:none;font-size:13px;letter-spacing:0.04em;">關於</a>
        <button style="background:${D.primary};color:#fff;border:none;padding:10px 24px;font-size:13px;font-weight:700;cursor:pointer;letter-spacing:0.03em;">${H(m.cta)}</button>
      </div>
    </nav>

    <!-- HERO — dark color block -->
    <div style="background:${D.primary};padding:80px 60px 0;display:grid;grid-template-columns:3fr 2fr;gap:60px;align-items:end;overflow:hidden;">
      <div>
        <p style="font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.5);margin:0 0 18px;">${H(m.brandName)}</p>
        <h1 class="design-h1" style="font-size:clamp(52px,8vw,108px);font-weight:900;color:#fff;margin:0;line-height:0.88;text-transform:uppercase;letter-spacing:-0.01em;">
          ${H(m.tagline)}
        </h1>
      </div>
      <div class="design-sub" style="padding-bottom:48px;">
        <p style="font-size:17px;color:rgba(255,255,255,0.75);line-height:1.75;margin:0 0 32px;">${H(m.subheadline)}</p>
        <button style="background:#fff;color:${D.primary};border:none;padding:14px 32px;font-size:15px;font-weight:800;cursor:pointer;letter-spacing:0.02em;">${H(m.cta)}</button>
      </div>
    </div>

    <!-- MARQUEE TICKER -->
    <div style="background:${D.accent};padding:18px 0;overflow:hidden;border-top:1px solid rgba(0,0,0,0.15);">
      <div class="marquee-track" style="font-size:13px;font-weight:700;color:#000;letter-spacing:0.06em;">
        ${marqueeHtml}
      </div>
    </div>

    <!-- PROBLEM SECTION -->
    <div style="padding:80px 60px 60px;max-width:1000px;">
      <p style="font-size:11px;color:${D.muted};letter-spacing:0.14em;text-transform:uppercase;margin:0 0 18px;">我們在解決的問題</p>
      <h2 style="font-size:clamp(24px,3vw,42px);font-weight:700;margin:0 0 20px;line-height:1.25;color:${D.text};">${H(m.pain)}</h2>
      <p style="font-size:17px;color:${D.muted};line-height:1.85;">${H(m.solution)}</p>
    </div>

    <!-- FULL-WIDTH IMAGE -->
    <div style="padding:0 60px;">
      <div style="overflow:hidden;position:relative;">
        <img src="${m.imgs.hero}" alt="work" style="width:100%;height:500px;object-fit:cover;display:block;filter:brightness(0.85);" />
        <div style="position:absolute;inset:0;background:linear-gradient(to top,${D.bg}60,transparent);"></div>
      </div>
    </div>

    <!-- CASE CARDS -->
    <div style="padding:80px 60px;">
      <div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:40px;">
        <h2 style="font-size:28px;font-weight:700;color:${D.text};margin:0;">我們做什麼</h2>
        <a style="font-size:13px;color:${D.muted};text-decoration:none;cursor:pointer;letter-spacing:0.04em;">查看所有案例 →</a>
      </div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:2px;">${caseCards}</div>
    </div>

    <!-- QUOTES — extra dark section -->
    <div style="background:#050505;padding:80px 60px;border-top:1px solid ${D.border};">
      <p style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${D.muted};margin:0 0 56px;text-align:center;">客戶說的</p>
      ${m.quotes.map(q=>`
      <div style="max-width:760px;margin:0 auto 56px;border-left:2px solid ${D.primary};padding-left:32px;">
        <p style="font-size:22px;font-style:italic;color:${D.text};margin:0 0 16px;line-height:1.45;">"${H(q.text)}"</p>
        <p style="font-size:13px;color:${D.muted};margin:0;letter-spacing:0.04em;">— ${H(q.author)}</p>
      </div>`).join('')}
    </div>

    <!-- FOOTER CTA -->
    <div style="padding:80px 60px;display:flex;align-items:center;justify-content:space-between;border-top:1px solid ${D.border};">
      <div>
        <p style="font-size:11px;color:${D.muted};letter-spacing:0.14em;text-transform:uppercase;margin:0 0 10px;">${H(m.brandName)}</p>
        <h2 style="font-size:clamp(28px,4.5vw,60px);font-weight:900;margin:0;text-transform:uppercase;letter-spacing:-0.01em;color:${D.text};">${H(m.cta)}</h2>
      </div>
      <button style="background:${D.primary};color:#fff;border:none;padding:18px 44px;font-size:16px;font-weight:800;cursor:pointer;flex-shrink:0;letter-spacing:0.02em;">${H(m.cta)}</button>
    </div>
  </section>`;
}
