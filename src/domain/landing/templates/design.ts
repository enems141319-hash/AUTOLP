import type { LandingModel } from '../../brand-analysis/types';
import { escapeHtml } from '../../../utils/sanitize';
import { renderReviewCards } from './reviews';

/** Design: refined luxury studio layout with restrained typography and structured case wall. */
export function renderDesign(m: LandingModel): string {
  const H = escapeHtml;

  const D = {
    bg: '#F5F1EA',
    ink: '#171411',
    muted: '#6F655D',
    line: 'rgba(23,20,17,0.12)',
    panel: '#FFFCF7',
    primary: '#8F6A4F',
    accent: '#C8B39E',
  };

  const caseCards = m.features.map((feature, index) => `
    <article style="background:${D.panel};border:1px solid ${D.line};padding:28px;min-height:220px;display:flex;flex-direction:column;justify-content:space-between;">
      <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:${D.muted};margin-bottom:24px;">Case 0${index + 1}</div>
      <p style="font-size:22px;line-height:1.45;color:${D.ink};margin:0;font-weight:600;">${H(feature)}</p>
      <div style="margin-top:28px;width:56px;height:1px;background:${D.primary};"></div>
    </article>
  `).join('');

  return `
  <style>
    @keyframes designFadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes designRevealLine {
      from { width: 0; }
      to { width: 100%; }
    }
    .design-enter { animation: designFadeUp 0.8s ease both; }
    .design-line { animation: designRevealLine 1.2s cubic-bezier(0.16,1,0.3,1) 0.2s both; }
  </style>

  <section style="background:${D.bg};font-family:${m.font};color:${D.ink};min-height:100vh;">
    <nav style="padding:28px 56px;border-bottom:1px solid ${D.line};display:flex;align-items:center;justify-content:space-between;">
      <div>
        <div style="font-size:13px;letter-spacing:0.18em;text-transform:uppercase;color:${D.muted};margin-bottom:6px;">Brand Studio</div>
        <div style="font-size:20px;font-weight:700;color:${D.ink};">${H(m.brandName)}</div>
      </div>
      <div style="display:flex;gap:30px;align-items:center;">
        <a style="font-size:13px;color:${D.muted};text-decoration:none;">Work</a>
        <a style="font-size:13px;color:${D.muted};text-decoration:none;">Approach</a>
        <a style="font-size:13px;color:${D.muted};text-decoration:none;">Reviews</a>
        <button style="background:${D.ink};color:#fff;border:none;padding:12px 22px;font-size:13px;font-weight:700;letter-spacing:0.04em;cursor:pointer;">${H(m.cta)}</button>
      </div>
    </nav>

    <div style="padding:72px 56px 48px;display:grid;grid-template-columns:7fr 5fr;gap:48px;align-items:end;">
      <div class="design-enter">
        <div style="font-size:12px;letter-spacing:0.22em;text-transform:uppercase;color:${D.primary};margin-bottom:18px;">Creative Direction / Identity Systems / Digital Presence</div>
        <h1 style="font-size:clamp(44px,7vw,96px);line-height:0.96;margin:0;color:${D.ink};font-weight:800;max-width:860px;">
          ${H(m.tagline)}
        </h1>
        <div class="design-line" style="height:1px;background:${D.ink};max-width:300px;margin:34px 0 28px;"></div>
        <p style="font-size:18px;line-height:1.85;color:${D.muted};max-width:640px;margin:0 0 36px;">${H(m.subheadline)}</p>
        <div style="display:flex;gap:14px;align-items:center;">
          <button style="background:${D.primary};color:#fff;border:none;padding:15px 28px;font-size:14px;font-weight:700;letter-spacing:0.04em;cursor:pointer;">${H(m.cta)}</button>
          <span style="font-size:13px;color:${D.muted};letter-spacing:0.08em;text-transform:uppercase;">Independent studio practice</span>
        </div>
      </div>
      <div class="design-enter" style="animation-delay:0.15s;">
        <div style="background:${D.panel};border:1px solid ${D.line};padding:18px;">
          <img src="${m.imgs.hero}" alt="design hero" style="width:100%;height:520px;object-fit:cover;display:block;" />
        </div>
      </div>
    </div>

    <div style="padding:0 56px 72px;">
      <div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:20px;">
        <div style="background:${D.panel};border:1px solid ${D.line};padding:28px;">
          <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:${D.muted};margin-bottom:14px;">Strategic Tension</div>
          <p style="font-size:24px;line-height:1.5;color:${D.ink};margin:0;font-weight:600;">${H(m.pain)}</p>
        </div>
        <div style="background:${D.panel};border:1px solid ${D.line};padding:28px;">
          <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:${D.muted};margin-bottom:14px;">Delivery</div>
          <p style="font-size:18px;line-height:1.7;color:${D.ink};margin:0;">Identity systems</p>
        </div>
        <div style="background:${D.panel};border:1px solid ${D.line};padding:28px;">
          <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:${D.muted};margin-bottom:14px;">Focus</div>
          <p style="font-size:18px;line-height:1.7;color:${D.ink};margin:0;">Premium conversion design</p>
        </div>
      </div>
    </div>

    <div style="padding:0 56px 72px;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:36px;align-items:start;">
        <div>
          <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:${D.muted};margin-bottom:18px;">Method</div>
          <h2 style="font-size:38px;line-height:1.18;color:${D.ink};margin:0 0 18px;font-weight:700;">A more precise expression of brand value.</h2>
          <p style="font-size:17px;line-height:1.85;color:${D.muted};margin:0;">${H(m.solution)}</p>
        </div>
        <div style="background:${D.panel};border:1px solid ${D.line};padding:18px;">
          <img src="${m.imgs.secondary ?? m.imgs.hero}" alt="design detail" style="width:100%;height:320px;object-fit:cover;display:block;" />
        </div>
      </div>
    </div>

    <div style="padding:0 56px 72px;">
      <div style="display:flex;align-items:end;justify-content:space-between;gap:20px;margin-bottom:26px;">
        <div>
          <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:${D.muted};margin-bottom:14px;">Selected Outcomes</div>
          <h2 style="font-size:36px;line-height:1.12;color:${D.ink};margin:0;font-weight:700;">System-led work with a quieter luxury tone.</h2>
        </div>
        <div style="font-size:13px;color:${D.muted};letter-spacing:0.08em;text-transform:uppercase;">Signature layouts / launch systems / brand structure</div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(2, minmax(0, 1fr));gap:18px;">
        ${caseCards}
      </div>
    </div>

    <div style="padding:0 56px 88px;">
      <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:${D.muted};margin-bottom:18px;">Client Reviews</div>
      ${renderReviewCards(m, { theme: 'design', columns: 2 })}
    </div>

    <div style="margin:0 56px 0;background:${D.ink};padding:40px 42px;display:flex;align-items:center;justify-content:space-between;gap:24px;">
      <div>
        <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.45);margin-bottom:10px;">${H(m.brandName)}</div>
        <h2 style="font-size:clamp(28px,4vw,54px);line-height:1.02;color:#fff;margin:0;font-weight:800;">${H(m.cta)}</h2>
      </div>
      <button style="background:${D.primary};color:#fff;border:none;padding:16px 28px;font-size:14px;font-weight:700;letter-spacing:0.04em;cursor:pointer;white-space:nowrap;">${H(m.cta)}</button>
    </div>
  </section>`;
}
