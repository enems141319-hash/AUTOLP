import type { LandingModel } from '../../brand-analysis/types';
import { escapeHtml } from '../../../utils/sanitize';
import { renderReviewCards } from './reviews';

/** Design: dark luxury studio with generous whitespace and luminous CTA. */
export function renderDesign(m: LandingModel): string {
  const H = escapeHtml;

  const D = {
    bg: '#0B0B0C',
    panel: '#121315',
    line: 'rgba(255,255,255,0.10)',
    text: '#F4F0EA',
    muted: 'rgba(244,240,234,0.58)',
    primary: '#C4A484',
    accent: '#8A6A4B',
  };

  const caseCards = m.features.map((feature, index) => `
    <article style="background:${D.panel};border:1px solid ${D.line};padding:30px;min-height:220px;display:flex;flex-direction:column;justify-content:space-between;">
      <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:${D.muted};margin-bottom:24px;">Case 0${index + 1}</div>
      <p style="font-size:22px;line-height:1.5;color:${D.text};margin:0;font-weight:600;">${H(feature)}</p>
      <div style="margin-top:28px;width:60px;height:1px;background:${D.primary};"></div>
    </article>
  `).join('');

  return `
  <style>
    @keyframes designFadeUp {
      from { opacity: 0; transform: translateY(26px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes ctaGlow {
      0%, 100% { box-shadow: 0 0 0 rgba(196,164,132,0.0), inset 0 0 0 rgba(255,255,255,0.0); }
      50% { box-shadow: 0 14px 40px rgba(196,164,132,0.22), inset 0 0 30px rgba(255,255,255,0.06); }
    }
    @keyframes borderSweep {
      from { transform: translateX(-120%); }
      to { transform: translateX(120%); }
    }
    .design-enter { animation: designFadeUp 0.9s ease both; }
    .design-cta {
      position: relative;
      overflow: hidden;
      animation: ctaGlow 3.4s ease-in-out infinite;
    }
    .design-cta::after {
      content:'';
      position:absolute;
      inset:-1px;
      background:linear-gradient(120deg,transparent 0%, rgba(255,255,255,0.0) 35%, rgba(255,255,255,0.28) 50%, rgba(255,255,255,0.0) 65%, transparent 100%);
      transform:translateX(-120%);
      animation:borderSweep 3.2s ease-in-out infinite;
    }
    .design-noise-layer {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 9999;
      opacity: 0.22;
      mix-blend-mode: overlay;
    }
  </style>

  <!-- Canvas noise: generated at runtime, always visible -->
  <canvas id="design-noise-canvas" class="design-noise-layer" aria-hidden="true"></canvas>
  <script>
    (function() {
      var c = document.getElementById('design-noise-canvas');
      if (!c) return;
      var W = 256, H = 256;
      c.width = W; c.height = H;
      c.style.width = '100%'; c.style.height = '100%';
      c.style.imageRendering = 'pixelated';
      var ctx = c.getContext('2d');
      var img = ctx.createImageData(W, H);
      var d = img.data;
      for (var i = 0; i < d.length; i += 4) {
        var v = Math.random() * 255 | 0;
        d[i] = v; d[i+1] = v; d[i+2] = v; d[i+3] = 255;
      }
      ctx.putImageData(img, 0, 0);
      c.style.backgroundImage = 'url(' + c.toDataURL() + ')';
      c.style.backgroundSize = '256px 256px';
      c.width = 0; c.height = 0;
    })();
  </script>

  <section style="background:${D.bg};font-family:${m.font};color:${D.text};min-height:100vh;">
    <nav style="padding:30px 58px;border-bottom:1px solid ${D.line};display:flex;align-items:center;justify-content:space-between;">
      <div>
        <div style="font-size:12px;letter-spacing:0.20em;text-transform:uppercase;color:${D.muted};margin-bottom:8px;">Creative Office</div>
        <div style="font-size:20px;font-weight:700;color:${D.text};">${H(m.brandName)}</div>
      </div>
      <div style="display:flex;gap:28px;align-items:center;">
        <a style="font-size:13px;color:${D.muted};text-decoration:none;">作品案例</a>
        <a style="font-size:13px;color:${D.muted};text-decoration:none;">合作方式</a>
        <a style="font-size:13px;color:${D.muted};text-decoration:none;">Reviews</a>
        <button class="design-cta" style="background:${D.primary};color:#0B0B0C;border:none;padding:13px 24px;font-size:13px;font-weight:700;letter-spacing:0.06em;cursor:pointer;">${H(m.cta)}</button>
      </div>
    </nav>

    <div style="padding:84px 58px 54px;display:grid;grid-template-columns:7fr 5fr;gap:56px;align-items:end;">
      <div class="design-enter">
        <div style="font-size:12px;letter-spacing:0.22em;text-transform:uppercase;color:${D.primary};margin-bottom:20px;">品牌方向 / 數位系統 / 高意圖轉換頁</div>
        <h1 style="font-size:clamp(48px,7vw,102px);line-height:0.96;margin:0;color:${D.text};font-weight:800;max-width:860px;">
          ${H(m.tagline)}
        </h1>
        <div style="height:1px;background:${D.primary};max-width:300px;margin:36px 0 28px;"></div>
        <p style="font-size:18px;line-height:1.95;color:${D.muted};max-width:640px;margin:0 0 38px;">${H(m.subheadline)}</p>
        <div style="display:flex;gap:14px;align-items:center;">
          <button class="design-cta" style="background:${D.primary};color:#0B0B0C;border:none;padding:16px 30px;font-size:14px;font-weight:800;letter-spacing:0.06em;cursor:pointer;">${H(m.cta)}</button>
          <span style="font-size:13px;color:${D.muted};letter-spacing:0.10em;text-transform:uppercase;">quiet luxury / editorial clarity</span>
        </div>
      </div>
      <div class="design-enter" style="animation-delay:0.18s;">
        <div style="background:${D.panel};border:1px solid ${D.line};padding:18px;">
          <img src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1600&auto=format&fit=crop&q=80" alt="design hero" style="width:100%;height:560px;object-fit:cover;display:block;filter:brightness(0.84) saturate(0.9);" />
        </div>
      </div>
    </div>

    <div style="padding:0 58px 78px;">
      <div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:20px;">
        <div style="background:${D.panel};border:1px solid ${D.line};padding:30px;">
          <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:${D.muted};margin-bottom:14px;">Strategic Tension</div>
          <p style="font-size:24px;line-height:1.55;color:${D.text};margin:0;font-weight:600;">${H(m.pain)}</p>
        </div>
        <div style="background:${D.panel};border:1px solid ${D.line};padding:30px;">
          <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:${D.muted};margin-bottom:14px;">Deliverables</div>
          <p style="font-size:18px;line-height:1.75;color:${D.text};margin:0;">Identity systems</p>
        </div>
        <div style="background:${D.panel};border:1px solid ${D.line};padding:30px;">
          <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:${D.muted};margin-bottom:14px;">Tone</div>
          <p style="font-size:18px;line-height:1.75;color:${D.text};margin:0;">Premium and controlled</p>
        </div>
      </div>
    </div>

    <div style="padding:0 58px 78px;display:grid;grid-template-columns:1fr 1fr;gap:36px;align-items:start;">
      <div>
        <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:${D.muted};margin-bottom:18px;">合作方式</div>
        <h2 style="font-size:38px;line-height:1.16;color:${D.text};margin:0 0 20px;font-weight:700;">A quieter visual system with stronger commercial intent.</h2>
        <p style="font-size:17px;line-height:1.92;color:${D.muted};margin:0;">${H(m.solution)}</p>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;">
        <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&auto=format&fit=crop&q=80" alt="studio" style="width:100%;height:220px;object-fit:cover;display:block;border:1px solid ${D.line};" />
        <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80" alt="materials" style="width:100%;height:220px;object-fit:cover;display:block;border:1px solid ${D.line};" />
      </div>
    </div>

    <div style="padding:0 58px 78px;">
      <div style="display:flex;align-items:end;justify-content:space-between;gap:20px;margin-bottom:26px;">
        <div>
          <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:${D.muted};margin-bottom:14px;">Selected Outcomes</div>
          <h2 style="font-size:36px;line-height:1.12;color:${D.text};margin:0;font-weight:700;">System-led work with editorial restraint.</h2>
        </div>
        <div style="font-size:13px;color:${D.muted};letter-spacing:0.08em;text-transform:uppercase;">launch systems / brand structure / conversion polish</div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(2, minmax(0, 1fr));gap:18px;">
        ${caseCards}
      </div>
    </div>

    <div style="padding:0 58px 90px;">
      <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:${D.muted};margin-bottom:18px;">合作回饋</div>
      ${renderReviewCards(m, { theme: 'design', columns: 2 })}
    </div>

    <div style="margin:0 58px;background:${D.panel};border:1px solid ${D.line};padding:42px;display:flex;align-items:center;justify-content:space-between;gap:24px;">
      <div>
        <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:${D.muted};margin-bottom:10px;">${H(m.brandName)}</div>
        <h2 style="font-size:clamp(28px,4vw,54px);line-height:1.04;color:${D.text};margin:0;font-weight:800;">${H(m.cta)}</h2>
      </div>
      <button class="design-cta" style="background:${D.primary};color:#0B0B0C;border:none;padding:16px 28px;font-size:14px;font-weight:800;letter-spacing:0.06em;cursor:pointer;white-space:nowrap;">${H(m.cta)}</button>
    </div>
  </section>`;
}

