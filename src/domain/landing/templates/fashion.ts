import type { LandingModel } from '../../brand-analysis/types';
import { escapeHtml } from '../../../utils/sanitize';

/** Fashion: full-bleed campaign hero with shimmer veil and editorial imagery. */
export function renderFashion(m: LandingModel): string {
  const H = escapeHtml;
  const heroImg = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1800&auto=format&fit=crop&q=80';
  const detailImg = 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&auto=format&fit=crop&q=80';

  return `
  <style>
    @keyframes fashionPan { from { transform: scale(1.02) translate3d(0,0,0); } to { transform: scale(1.10) translate3d(-1.5%, -1%, 0); } }
    @keyframes fashionTitleIn { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fashionShimmer { from { transform:translateX(-120%) skewX(-22deg); } to { transform:translateX(220%) skewX(-22deg); } }
    .fashion-hero-img { animation: fashionPan 14s ease-in-out infinite alternate; }
    .fashion-title, .fashion-copy { animation: fashionTitleIn 0.85s ease both; }
    .fashion-copy { animation-delay: 0.18s; }
    .fashion-veil::after { content:''; position:absolute; inset:0; background:linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.0) 38%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.0) 62%, transparent 100%); animation:fashionShimmer 4.6s ease-in-out infinite; }
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
  <section class="lp-noise" style="background:${m.palette.bg};font-family:${m.font};color:${m.palette.text};overflow:hidden;">
    <div style="position:relative;min-height:100vh;overflow:hidden;">
      <div class="fashion-veil" style="position:absolute;inset:0;overflow:hidden;">
        <img class="fashion-hero-img" src="${heroImg}" alt="fashion campaign" style="width:100%;height:100%;object-fit:cover;display:block;filter:brightness(0.62) contrast(1.04);" />
      </div>
      <div style="position:absolute;inset:0;background:linear-gradient(90deg, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.26) 42%, rgba(0,0,0,0.36) 100%);"></div>
      <nav style="position:relative;z-index:2;padding:28px 60px;display:flex;align-items:center;justify-content:space-between;">
        <span style="font-size:13px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.72);">Maison ${H(m.brandName)}</span>
        <div style="display:flex;gap:36px;align-items:center;">
          <a style="color:rgba(255,255,255,0.72);text-decoration:none;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;">本季系列</a>
          <a style="color:rgba(255,255,255,0.72);text-decoration:none;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;">形象特輯</a>
          <a style="color:rgba(255,255,255,0.72);text-decoration:none;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;">品牌故事</a>
          <button style="background:#fff;color:#111;border:none;padding:12px 24px;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;cursor:pointer;font-family:${m.font};font-weight:700;">${H(m.cta)}</button>
        </div>
      </nav>
      <div style="position:relative;z-index:2;padding:120px 60px 80px;max-width:760px;display:flex;flex-direction:column;justify-content:flex-end;min-height:calc(100vh - 90px);">
        <div class="fashion-title" style="font-size:12px;letter-spacing:0.24em;text-transform:uppercase;color:rgba(255,255,255,0.64);margin-bottom:18px;">Autumn Campaign / Elevated Essentials</div>
        <h1 class="fashion-title" style="font-size:clamp(56px,9vw,124px);font-weight:800;color:#fff;margin:0 0 18px;line-height:0.92;text-transform:uppercase;letter-spacing:0.08em;">${H(m.brandName)}</h1>
        <p class="fashion-copy" style="font-size:clamp(26px,3vw,42px);font-style:italic;color:#fff;line-height:1.2;margin:0 0 24px;">${H(m.tagline)}</p>
        <p class="fashion-copy" style="font-size:17px;color:rgba(255,255,255,0.82);line-height:1.85;margin:0 0 34px;max-width:520px;">${H(m.subheadline)}</p>
        <div class="fashion-copy" style="display:flex;gap:14px;align-items:center;">
          <button style="background:#fff;color:#111;border:none;padding:15px 30px;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;cursor:pointer;font-family:${m.font};font-weight:700;">${H(m.cta)}</button>
          <span style="font-size:12px;color:rgba(255,255,255,0.58);letter-spacing:0.14em;text-transform:uppercase;">new silhouette / signature tailoring</span>
        </div>
      </div>
    </div>

    <div style="padding:96px 60px;border-top:1px solid rgba(17,17,17,0.08);border-bottom:1px solid rgba(17,17,17,0.08);">
      <div style="max-width:1120px;margin:0 auto;display:grid;grid-template-columns:1fr 2fr;gap:72px;align-items:start;">
        <p style="font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:${m.palette.muted};margin:0;padding-top:8px;">Design Philosophy</p>
        <div>
          <p style="font-size:clamp(24px,2.8vw,40px);line-height:1.35;color:${m.palette.text};margin:0 0 28px;font-style:italic;">${H(m.pain)}</p>
          <p style="font-size:16px;color:${m.palette.muted};line-height:1.9;margin:0;">${H(m.solution)}</p>
        </div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:2fr 3fr;gap:4px;background:${m.palette.muted}14;">
      <div style="overflow:hidden;min-height:520px;"><img src="${detailImg}" alt="editorial detail" style="width:100%;height:100%;object-fit:cover;display:block;" /></div>
      <div style="display:flex;flex-direction:column;justify-content:space-between;padding:60px;background:${m.palette.bg};">
        <p style="font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:${m.palette.muted};margin:0 0 18px;">Key Notes</p>
        <div>${m.features.map(f => `<div style="padding:18px 0;border-bottom:1px solid #ECECEC;"><p style="font-size:15px;color:${m.palette.text};margin:0;line-height:1.7;">${H(f)}</p></div>`).join('')}</div>
        <button style="background:${m.palette.text};color:${m.palette.bg};border:none;padding:15px 40px;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;cursor:pointer;font-family:${m.font};width:fit-content;">${H(m.cta)}</button>
      </div>
    </div>

    <div style="padding:84px 60px;max-width:760px;margin:0 auto;">${m.quotes.map(q=>`<div style="margin-bottom:54px;"><p style="font-size:24px;font-style:italic;color:${m.palette.text};margin:0 0 14px;line-height:1.45;">\"${H(q.text)}\"</p><p style="font-size:11px;color:${m.palette.muted};letter-spacing:0.14em;text-transform:uppercase;margin:0;">${H(q.author)}</p></div>`).join('')}</div>

    <div style="background:${m.palette.text};padding:84px 60px;text-align:center;">
      <h2 style="font-size:clamp(34px,5vw,70px);font-weight:900;color:${m.palette.bg};text-transform:uppercase;letter-spacing:0.12em;margin:0 0 28px;">${H(m.brandName)}</h2>
      <button style="background:${m.palette.bg};color:${m.palette.text};border:none;padding:15px 50px;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;cursor:pointer;font-family:${m.font};">${H(m.cta)}</button>
    </div>
  </section>`;
}

