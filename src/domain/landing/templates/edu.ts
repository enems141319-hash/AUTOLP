import type { LandingModel } from '../../brand-analysis/types';
import { escapeHtml } from '../../../utils/sanitize';

/**
 * Edu — DIAGONAL SPLIT layout: angled divider between dark and light halves.
 * Effect: gradient shimmer sweep on CTA button + staggered card entrance.
 */
export function renderEdu(m: LandingModel): string {
  const H = escapeHtml;

  return `
  <style>
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    @keyframes eduCardIn {
      from { opacity:0; transform: translateY(20px); }
      to   { opacity:1; transform: translateY(0); }
    }
    .edu-cta-btn {
      background: linear-gradient(90deg, ${m.palette.primary} 0%, ${m.palette.accent} 50%, ${m.palette.primary} 100%);
      background-size: 200% auto;
      animation: shimmer 3s linear infinite;
      border: none; cursor: pointer; font-family: inherit; font-weight: 700;
    }
    .edu-card { animation: eduCardIn 0.5s ease both; }
  </style>
  <section style="background:${m.palette.bg};font-family:${m.font};color:${m.palette.text};overflow:hidden;">
    <!-- NAV -->
    <nav style="padding:20px 60px;display:flex;align-items:center;justify-content:space-between;border-bottom:2px solid ${m.palette.primary}20;">
      <span style="font-size:20px;font-weight:800;color:${m.palette.primary};">${H(m.brandName)}</span>
      <div style="display:flex;gap:28px;align-items:center;">
        <a style="color:${m.palette.muted};text-decoration:none;font-size:14px;">課程</a>
        <a style="color:${m.palette.muted};text-decoration:none;font-size:14px;">學員成果</a>
        <a style="color:${m.palette.muted};text-decoration:none;font-size:14px;">企業合作</a>
        <button class="edu-cta-btn" style="color:#fff;padding:10px 24px;border-radius:8px;font-size:14px;">${H(m.cta)}</button>
      </div>
    </nav>

    <!-- DIAGONAL HERO: dark left, light right, clipped angle -->
    <div style="position:relative;min-height:540px;display:flex;">
      <!-- Dark half -->
      <div style="flex:1;background:${m.palette.primary};padding:80px 80px 80px 60px;display:flex;flex-direction:column;justify-content:center;clip-path:polygon(0 0, 92% 0, 100% 100%, 0 100%);position:relative;z-index:1;">
        <div style="display:inline-block;background:rgba(255,255,255,0.2);color:#fff;padding:5px 14px;border-radius:16px;font-size:12px;font-weight:700;margin-bottom:20px;width:fit-content;">🎓 2025 新課開放</div>
        <h1 style="font-size:clamp(28px,4vw,52px);font-weight:800;color:#fff;margin:0 0 16px;line-height:1.1;max-width:460px;">
          <span style="opacity:0.65;font-size:0.5em;display:block;font-weight:500;letter-spacing:0.05em;margin-bottom:6px;">${H(m.brandName)}</span>
          ${H(m.tagline)}
        </h1>
        <p style="font-size:16px;color:rgba(255,255,255,0.85);line-height:1.7;margin:0 0 32px;max-width:400px;">${H(m.subheadline)}</p>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <button class="edu-cta-btn" style="color:#fff;padding:14px 32px;border-radius:10px;font-size:16px;">${H(m.cta)}</button>
          <button style="background:rgba(255,255,255,0.15);color:#fff;border:1.5px solid rgba(255,255,255,0.4);padding:14px 32px;border-radius:10px;font-size:16px;cursor:pointer;font-family:inherit;">看課程內容</button>
        </div>
      </div>
      <!-- Light half with image -->
      <div style="flex:1;position:relative;overflow:hidden;margin-left:-60px;">
        <img src="${m.imgs.hero}" alt="edu" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;" />
        <div style="position:absolute;inset:0;background:linear-gradient(to right,${m.palette.primary}40,transparent 60%);"></div>
      </div>
    </div>

    <!-- PAIN BANNER -->
    <div style="background:${m.palette.text};padding:48px 60px;text-align:center;">
      <p style="font-size:20px;color:rgba(255,255,255,0.9);line-height:1.7;max-width:700px;margin:0 auto;">"${H(m.pain)}"</p>
    </div>

    <!-- SOLUTION -->
    <div style="padding:80px 60px;max-width:700px;margin:0 auto;text-align:center;">
      <p style="font-size:18px;color:${m.palette.muted};line-height:1.8;">${H(m.solution)}</p>
    </div>

    <!-- FEATURE CARDS — staggered grid -->
    <div style="padding:0 60px 80px;">
      <div style="max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(2,1fr);gap:16px;">
        ${m.features.map((f,i)=>`
        <div class="edu-card" style="background:${i%2===0?m.palette.surface:m.palette.bg};border:1px solid ${m.palette.primary}20;border-radius:16px;padding:32px;animation-delay:${i*0.1}s;">
          <div style="width:36px;height:36px;border-radius:10px;background:${m.palette.primary};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:14px;margin-bottom:16px;">${i+1}</div>
          <p style="font-size:15px;color:${m.palette.text};line-height:1.6;margin:0;">${H(f)}</p>
        </div>`).join('')}
      </div>
    </div>

    <!-- QUOTES -->
    <div style="background:${m.palette.surface};padding:80px 60px;">
      <h2 style="font-size:28px;font-weight:700;text-align:center;margin:0 0 40px;">學員怎麼說</h2>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;max-width:1000px;margin:0 auto;">
        ${m.quotes.map(q=>`
        <div style="background:${m.palette.bg};padding:32px;border-radius:12px;border-left:4px solid ${m.palette.accent};">
          <p style="font-size:16px;font-style:italic;color:${m.palette.text};margin:0 0 16px;line-height:1.7;">"${H(q.text)}"</p>
          <p style="font-size:13px;color:${m.palette.muted};margin:0;">— ${H(q.author)}</p>
        </div>`).join('')}
      </div>
    </div>

    <div style="text-align:center;padding:80px 40px;">
      <h2 style="font-size:36px;font-weight:800;margin:0 0 16px;">${H(m.brandName)} — ${H(m.cta)}</h2>
      <p style="color:${m.palette.muted};margin:0 0 32px;">前 50 名報名享早鳥八折優惠</p>
      <button class="edu-cta-btn" style="color:#fff;padding:16px 48px;border-radius:12px;font-size:17px;">${H(m.cta)}</button>
    </div>
  </section>`;
}
