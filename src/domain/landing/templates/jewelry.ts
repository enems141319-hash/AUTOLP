import type { LandingModel } from '../../brand-analysis/types';
import { escapeHtml } from '../../../utils/sanitize';

/**
 * Jewelry — LUXURY CENTERED with CSS sparkle stars constellation effect.
 * Brand name rendered as large centered monogram in hero.
 */
export function renderJewelry(m: LandingModel): string {
  const H = escapeHtml;

  // Generate sparkle positions
  const sparkles = Array.from({length:20},(_,i)=>{
    const x=(i*61+17)%93; const y=(i*43+29)%87; const d=(i*0.2).toFixed(1);
    return `<div style="position:absolute;left:${x}%;top:${y}%;width:3px;height:3px;background:${m.palette.accent};border-radius:50%;animation:sparkle ${1.5+(i%3)*0.5}s ease-in-out ${d}s infinite;"></div>`;
  }).join('');

  return `
  <style>
    @keyframes sparkle {
      0%,100% { opacity:0; transform:scale(0); }
      50%      { opacity:1; transform:scale(1.5); }
    }
    @keyframes jewelFade {
      from { opacity:0; transform:translateY(20px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes goldGlow {
      0%,100% { text-shadow: 0 0 10px rgba(201,169,110,0); }
      50%      { text-shadow: 0 0 30px rgba(201,169,110,0.5); }
    }
    .jewel-monogram { animation: goldGlow 4s ease-in-out infinite; }
    .jewel-content { animation: jewelFade 1s ease 0.3s both; }
  </style>
  <section style="background:${m.palette.bg};font-family:${m.font};color:${m.palette.text};overflow:hidden;">
    <!-- NAV -->
    <nav style="padding:36px 60px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(201,169,110,0.2);">
      <span style="font-size:22px;font-weight:400;color:${m.palette.accent};letter-spacing:0.2em;text-transform:uppercase;">${H(m.brandName)}</span>
      <div style="display:flex;gap:40px;">
        <a style="color:${m.palette.muted};text-decoration:none;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;">系列</a>
        <a style="color:${m.palette.muted};text-decoration:none;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;">工藝</a>
        <a style="color:${m.palette.muted};text-decoration:none;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;">客製</a>
        <a style="color:${m.palette.accent};text-decoration:none;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;border-bottom:1px solid currentColor;">${H(m.cta)}</a>
      </div>
    </nav>

    <!-- CENTERED HERO WITH SPARKLES -->
    <div style="position:relative;min-height:85vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:80px 60px;overflow:hidden;">
      <div style="position:absolute;inset:0;">${sparkles}</div>
      <!-- Background image subtle -->
      <div style="position:absolute;inset:0;overflow:hidden;opacity:0.15;">
        <img src="${m.imgs.hero}" alt="" style="width:100%;height:100%;object-fit:cover;" />
      </div>
      <div class="jewel-content" style="position:relative;z-index:1;">
        <!-- Monogram initial -->
        <div class="jewel-monogram" style="font-size:clamp(80px,12vw,160px);font-weight:300;color:${m.palette.accent};line-height:1;letter-spacing:-0.02em;margin-bottom:24px;">
          ${H(m.brandName.charAt(0))}
        </div>
        <p style="font-size:11px;letter-spacing:0.35em;text-transform:uppercase;color:${m.palette.accent};margin:0 0 20px;">${H(m.brandName)} — 手工打造 · 代代相傳</p>
        <h1 style="font-size:clamp(32px,4vw,56px);font-weight:300;color:${m.palette.text};margin:0 0 24px;line-height:1.2;max-width:700px;">${H(m.tagline)}</h1>
        <p style="font-size:17px;color:${m.palette.muted};max-width:500px;line-height:1.7;margin:0 0 40px;">${H(m.subheadline)}</p>
        <button style="background:transparent;color:${m.palette.accent};border:1px solid ${m.palette.accent};padding:14px 40px;font-size:13px;letter-spacing:0.15em;text-transform:uppercase;cursor:pointer;font-family:${m.font};">${H(m.cta)}</button>
      </div>
    </div>

    <!-- STORY — 2 col -->
    <div style="padding:100px 80px;display:grid;grid-template-columns:1fr 1fr;gap:100px;align-items:center;max-width:1300px;margin:0 auto;">
      <div>
        <p style="font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:${m.palette.accent};margin:0 0 20px;">工藝的故事</p>
        <h2 style="font-size:38px;font-weight:300;color:${m.palette.text};margin:0 0 24px;line-height:1.2;">${H(m.pain)}</h2>
        <p style="font-size:17px;color:${m.palette.muted};line-height:1.9;margin:0 0 32px;">${H(m.solution)}</p>
        <div style="display:flex;flex-direction:column;gap:16px;">
          ${m.features.map(f=>`<p style="margin:0;color:${m.palette.muted};font-size:14px;padding-left:20px;border-left:1px solid ${m.palette.accent}40;">${H(f)}</p>`).join('')}
        </div>
      </div>
      <div>
        <img src="${m.imgs.secondary??m.imgs.hero}" alt="craft" style="width:100%;aspect-ratio:4/5;object-fit:cover;" />
      </div>
    </div>

    <!-- QUOTES -->
    <div style="background:${m.palette.surface};padding:80px;">
      <p style="text-align:center;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:${m.palette.accent};margin:0 0 60px;">佩戴者的故事</p>
      ${m.quotes.map(q=>`
      <div style="max-width:700px;margin:0 auto 60px;text-align:center;">
        <p style="font-size:22px;font-style:italic;color:${m.palette.text};margin:0 0 16px;line-height:1.5;">"${H(q.text)}"</p>
        <p style="font-size:12px;color:${m.palette.accent};letter-spacing:0.1em;text-transform:uppercase;">— ${H(q.author)}</p>
      </div>`).join('')}
    </div>

    <!-- CTA -->
    <div style="padding:80px;text-align:center;border-top:1px solid rgba(201,169,110,0.2);">
      <p style="font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:${m.palette.accent};margin:0 0 16px;">${H(m.brandName)}</p>
      <h2 style="font-size:44px;font-weight:300;color:${m.palette.text};margin:0 0 32px;">${H(m.tagline)}</h2>
      <button style="background:${m.palette.accent};color:${m.palette.bg};border:none;padding:16px 48px;font-size:13px;letter-spacing:0.15em;text-transform:uppercase;cursor:pointer;font-family:${m.font};">${H(m.cta)}</button>
    </div>
  </section>`;
}
