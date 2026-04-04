import type { LandingModel } from '../../brand-analysis/types';
import { escapeHtml } from '../../../utils/sanitize';

/**
 * Health — JOURNEY TRACKER layout: left sticky progress spine,
 * right scrolling milestones. Effect: pulse-ring on active step.
 */
export function renderHealth(m: LandingModel): string {
  const H = escapeHtml;

  const milestones = [
    { label: '現況', text: m.pain, icon: '⚠️' },
    { label: '目標', text: m.solution, icon: '🎯' },
    ...m.features.map((f, i) => ({ label: `第 ${i+1} 步`, text: f, icon: ['🔥','💪','🥗','📊'][i] ?? '✓' })),
  ];

  return `
  <style>
    @keyframes pulseRing {
      0% { box-shadow: 0 0 0 0 rgba(5,150,105,0.5); }
      70% { box-shadow: 0 0 0 16px rgba(5,150,105,0); }
      100% { box-shadow: 0 0 0 0 rgba(5,150,105,0); }
    }
    @keyframes healthSlide { from{opacity:0;transform:translateX(-20px);} to{opacity:1;transform:translateX(0);} }
    .health-step { animation: healthSlide 0.5s ease both; }
    .pulse-dot { animation: pulseRing 2s ease-in-out infinite; }
  </style>
  <section style="background:${m.palette.bg};font-family:${m.font};color:${m.palette.text};min-height:100vh;">
    <!-- NAV -->
    <nav style="background:${m.palette.surface};padding:0 60px;border-bottom:2px solid ${m.palette.primary}20;">
      <div style="max-width:1200px;margin:0 auto;height:64px;display:flex;align-items:center;justify-content:space-between;">
        <span style="font-size:20px;font-weight:800;color:${m.palette.primary};">${H(m.brandName)}</span>
        <div style="display:flex;gap:28px;align-items:center;">
          <a style="color:${m.palette.muted};text-decoration:none;font-size:14px;">課表</a>
          <a style="color:${m.palette.muted};text-decoration:none;font-size:14px;">教練</a>
          <a style="color:${m.palette.muted};text-decoration:none;font-size:14px;">定價</a>
          <button style="background:${m.palette.primary};color:#fff;border:none;padding:10px 24px;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;">${H(m.cta)}</button>
        </div>
      </div>
    </nav>

    <!-- HERO BANNER -->
    <div style="background:linear-gradient(135deg,${m.palette.primary},${m.palette.accent}20);padding:80px 60px;position:relative;overflow:hidden;">
      <div style="position:absolute;right:0;top:0;width:50%;height:100%;overflow:hidden;">
        <img src="${m.imgs.hero}" alt="health" style="width:100%;height:100%;object-fit:cover;opacity:0.25;" />
      </div>
      <div style="max-width:700px;position:relative;z-index:1;">
        <div style="display:inline-block;background:rgba(255,255,255,0.2);color:#fff;padding:6px 16px;border-radius:20px;font-size:13px;font-weight:700;margin-bottom:20px;">7 天免費體驗</div>
        <h1 style="font-size:clamp(36px,5vw,64px);font-weight:800;color:#fff;margin:0 0 16px;line-height:1.1;">
          <span style="opacity:0.7;font-size:0.6em;display:block;font-weight:600;margin-bottom:8px;">${H(m.brandName)}</span>
          ${H(m.tagline)}
        </h1>
        <p style="font-size:18px;color:rgba(255,255,255,0.85);margin:0 0 32px;line-height:1.6;">${H(m.subheadline)}</p>
        <button style="background:#fff;color:${m.palette.primary};border:none;padding:14px 32px;border-radius:10px;font-size:16px;font-weight:700;cursor:pointer;">${H(m.cta)}</button>
      </div>
    </div>

    <!-- JOURNEY TRACKER -->
    <div style="max-width:1100px;margin:0 auto;padding:80px 60px;display:grid;grid-template-columns:200px 1fr;gap:60px;align-items:start;">
      <!-- Left sticky label -->
      <div style="position:sticky;top:80px;text-align:center;">
        <div class="pulse-dot" style="width:64px;height:64px;border-radius:50%;background:${m.palette.primary};margin:0 auto 16px;display:flex;align-items:center;justify-content:center;font-size:28px;">🏃</div>
        <p style="font-size:13px;font-weight:700;color:${m.palette.primary};text-transform:uppercase;letter-spacing:0.1em;margin:0;">你的旅程</p>
        <div style="width:2px;background:linear-gradient(to bottom,${m.palette.primary},transparent);height:200px;margin:16px auto 0;"></div>
      </div>

      <!-- Right milestones -->
      <div style="display:flex;flex-direction:column;gap:0;">
        ${milestones.map((s, i) => `
        <div class="health-step" style="display:flex;gap:24px;padding-bottom:40px;animation-delay:${i*0.1}s;">
          <div style="display:flex;flex-direction:column;align-items:center;">
            <div style="width:48px;height:48px;border-radius:50%;background:${i===0?m.palette.primary:m.palette.surface};border:2px solid ${m.palette.primary};display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">${s.icon}</div>
            ${i < milestones.length-1 ? `<div style="width:2px;flex:1;background:${m.palette.primary}30;margin-top:8px;min-height:32px;"></div>` : ''}
          </div>
          <div style="padding-top:10px;">
            <p style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${m.palette.primary};margin:0 0 6px;">${s.label}</p>
            <p style="font-size:16px;color:${m.palette.text};line-height:1.7;margin:0;">${H(s.text)}</p>
          </div>
        </div>`).join('')}
      </div>
    </div>

    <!-- QUOTES -->
    <div style="background:${m.palette.surface};padding:60px;">
      <div style="max-width:900px;margin:0 auto;">
        <h2 style="font-size:28px;font-weight:700;text-align:center;margin:0 0 40px;">真實轉變</h2>
        ${m.quotes.map(q=>`
        <div style="padding:28px;border-left:4px solid ${m.palette.primary};margin-bottom:20px;">
          <p style="font-size:17px;font-style:italic;color:${m.palette.text};margin:0 0 10px;line-height:1.6;">"${H(q.text)}"</p>
          <p style="font-size:13px;color:${m.palette.muted};margin:0;">— ${H(q.author)}</p>
        </div>`).join('')}
      </div>
    </div>

    <div style="text-align:center;padding:80px 40px;background:${m.palette.accent}20;">
      <h2 style="font-size:36px;font-weight:800;margin:0 0 12px;">${H(m.brandName)} — ${H(m.tagline)}</h2>
      <p style="color:${m.palette.muted};margin:0 0 28px;">今天就開始你的旅程</p>
      <button style="background:${m.palette.primary};color:#fff;border:none;padding:16px 48px;border-radius:10px;font-size:16px;font-weight:700;cursor:pointer;">${H(m.cta)}</button>
    </div>
  </section>`;
}
