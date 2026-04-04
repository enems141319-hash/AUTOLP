import type { LandingModel } from '../../brand-analysis/types';
import { escapeHtml } from '../../../utils/sanitize';

/**
 * Fashion — PURE TYPOGRAPHIC layout: the brand name IS the design.
 * Huge overlapping text, minimal imagery, no conventional grid.
 * Effect: letter-spacing expand animation on hero brand name.
 */
export function renderFashion(m: LandingModel): string {
  const H = escapeHtml;

  return `
  <style>
    @keyframes trackIn {
      from { letter-spacing: -0.05em; opacity: 0; }
      to   { letter-spacing: 0.18em;  opacity: 1; }
    }
    @keyframes fashionFade { from{opacity:0;} to{opacity:1;} }
    .fashion-brand { animation: trackIn 1.2s cubic-bezier(0.16,1,0.3,1) both; }
    .fashion-sub { animation: fashionFade 1s ease 0.6s both; opacity:0; }
    .fashion-img-hover { transition: transform 0.6s ease, filter 0.4s ease; }
    .fashion-img-hover:hover { transform: scale(1.03); filter: contrast(1.05); }
  </style>
  <section style="background:${m.palette.bg};font-family:${m.font};color:${m.palette.text};overflow:hidden;">
    <!-- Minimal nav -->
    <nav style="padding:28px 60px;display:flex;align-items:center;justify-content:space-between;">
      <span style="font-size:13px;letter-spacing:0.2em;text-transform:uppercase;color:${m.palette.muted};">Menu</span>
      <div style="display:flex;gap:40px;">
        <a style="color:${m.palette.muted};text-decoration:none;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;">新季</a>
        <a style="color:${m.palette.muted};text-decoration:none;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;">女裝</a>
        <a style="color:${m.palette.muted};text-decoration:none;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;">男裝</a>
      </div>
      <a style="color:${m.palette.text};text-decoration:none;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;border-bottom:1px solid currentColor;cursor:pointer;">${H(m.cta)}</a>
    </nav>

    <!-- OVERSIZED BRAND NAME -->
    <div style="padding:0 60px;overflow:hidden;">
      <h1 class="fashion-brand" style="font-size:clamp(80px,15vw,200px);font-weight:900;color:${m.palette.text};margin:0;line-height:0.9;text-transform:uppercase;letter-spacing:0.18em;">
        ${H(m.brandName)}
      </h1>
    </div>

    <!-- Split: tagline left, image right, overlapping -->
    <div style="display:grid;grid-template-columns:1fr 1fr;min-height:70vh;margin-top:-20px;">
      <div style="padding:60px 60px 80px;display:flex;flex-direction:column;justify-content:flex-end;">
        <p class="fashion-sub" style="font-size:13px;color:${m.palette.muted};letter-spacing:0.2em;text-transform:uppercase;margin:0 0 20px;">2025 秋冬系列</p>
        <p style="font-size:clamp(22px,3vw,40px);font-style:italic;color:${m.palette.text};line-height:1.2;margin:0 0 24px;">"${H(m.tagline)}"</p>
        <p style="font-size:16px;color:${m.palette.muted};line-height:1.7;margin:0 0 36px;max-width:400px;">${H(m.subheadline)}</p>
        <a style="font-size:12px;color:${m.palette.text};letter-spacing:0.15em;text-transform:uppercase;text-decoration:none;border-bottom:1px solid currentColor;padding-bottom:4px;width:fit-content;cursor:pointer;">${H(m.cta)} →</a>
      </div>
      <div class="fashion-img-hover" style="overflow:hidden;">
        <img src="${m.imgs.hero}" alt="fashion" style="width:100%;height:100%;object-fit:cover;display:block;" />
      </div>
    </div>

    <!-- TYPE-ONLY PHILOSOPHY SECTION -->
    <div style="padding:100px 60px;border-top:1px solid #f0f0f0;border-bottom:1px solid #f0f0f0;">
      <div style="max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 2fr;gap:80px;align-items:start;">
        <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:${m.palette.muted};margin:0;padding-top:6px;">品牌哲學</p>
        <div>
          <p style="font-size:clamp(22px,2.5vw,36px);line-height:1.4;color:${m.palette.text};margin:0 0 32px;font-style:italic;">"${H(m.pain)}"</p>
          <p style="font-size:16px;color:${m.palette.muted};line-height:1.8;">${H(m.solution)}</p>
        </div>
      </div>
    </div>

    <!-- EDITORIAL IMAGE PAIR -->
    <div style="display:grid;grid-template-columns:2fr 3fr;gap:3px;background:${m.palette.muted}20;">
      <div class="fashion-img-hover" style="overflow:hidden;aspect-ratio:3/4;">
        <img src="${m.imgs.secondary??m.imgs.hero}" alt="f2" style="width:100%;height:100%;object-fit:cover;display:block;" />
      </div>
      <div style="display:flex;flex-direction:column;justify-content:space-between;padding:60px;">
        <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:${m.palette.muted};">精選系列</p>
        <div>
          ${m.features.map(f => `
          <div style="padding:20px 0;border-bottom:1px solid #eeeeee;">
            <p style="font-size:15px;color:${m.palette.text};margin:0;">${H(f)}</p>
          </div>`).join('')}
        </div>
        <button style="background:${m.palette.text};color:${m.palette.bg};border:none;padding:14px 40px;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;cursor:pointer;font-family:${m.font};width:fit-content;">${H(m.cta)}</button>
      </div>
    </div>

    <!-- QUOTES as full-width type -->
    <div style="padding:80px 60px;max-width:700px;margin:0 auto;">
      ${m.quotes.map(q=>`
      <div style="margin-bottom:56px;">
        <p style="font-size:22px;font-style:italic;color:${m.palette.text};margin:0 0 12px;line-height:1.4;">"${H(q.text)}"</p>
        <p style="font-size:11px;color:${m.palette.muted};letter-spacing:0.12em;text-transform:uppercase;margin:0;">${H(q.author)}</p>
      </div>`).join('')}
    </div>

    <!-- FOOTER CTA -->
    <div style="background:${m.palette.text};padding:80px 60px;text-align:center;">
      <h2 style="font-size:clamp(32px,5vw,64px);font-weight:900;color:${m.palette.bg};text-transform:uppercase;letter-spacing:0.12em;margin:0 0 32px;">${H(m.brandName)}</h2>
      <button style="background:${m.palette.bg};color:${m.palette.text};border:none;padding:14px 48px;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;cursor:pointer;font-family:${m.font};">${H(m.cta)}</button>
    </div>
  </section>`;
}
