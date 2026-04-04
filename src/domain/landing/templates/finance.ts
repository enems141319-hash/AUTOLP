import type { LandingModel } from '../../brand-analysis/types';
import { escapeHtml } from '../../../utils/sanitize';

/** Finance — dark split hero. Effect: SVG chart draw-in + stat count-up. */
export function renderFinance(m: LandingModel): string {
  const H = escapeHtml;

  const D = {
    bg:      '#07090C',
    surface: '#0E1117',
    card:    '#141921',
    border:  'rgba(255,255,255,0.07)',
    text:    '#E8EDF4',
    muted:   'rgba(255,255,255,0.38)',
    primary: m.palette.primary,
    accent:  m.palette.accent,    // often a green like #1B998B
  };

  const steps = m.features.map((f, i) => `
    <div style="display:flex;gap:20px;align-items:flex-start;padding:22px 0;border-bottom:1px solid ${D.border};">
      <div style="width:30px;height:30px;border-radius:50%;background:${D.primary};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:13px;flex-shrink:0;">${i+1}</div>
      <p style="margin:0;color:${D.text};font-size:15px;line-height:1.7;padding-top:4px;">${H(f)}</p>
    </div>`).join('');

  return `
  <style>
    @keyframes finTickUp {
      from { opacity:0; transform:translateY(18px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes chartLineDraw {
      from { stroke-dashoffset:600; }
      to   { stroke-dashoffset:0; }
    }
    @keyframes finHeroIn { from{opacity:0;} to{opacity:1;} }
    .fin-stat { animation: finTickUp 0.55s ease both; }
    .fin-stat:nth-child(2) { animation-delay:0.13s; }
    .fin-stat:nth-child(3) { animation-delay:0.26s; }
    .chart-line { stroke-dasharray:600; animation:chartLineDraw 2s ease 0.4s both; }
    .fin-hero   { animation: finHeroIn 0.6s ease both; }
  </style>

  <section style="background:${D.bg};font-family:${m.font};color:${D.text};min-height:100vh;">

    <!-- NAV -->
    <nav style="background:${D.surface};border-bottom:1px solid ${D.border};padding:0 60px;">
      <div style="max-width:1200px;margin:0 auto;height:64px;display:flex;align-items:center;justify-content:space-between;">
        <span style="font-size:19px;font-weight:700;color:${D.primary};">${H(m.brandName)}</span>
        <div style="display:flex;gap:32px;align-items:center;">
          <a style="color:${D.muted};text-decoration:none;font-size:13px;">投資策略</a>
          <a style="color:${D.muted};text-decoration:none;font-size:13px;">績效紀錄</a>
          <a style="color:${D.muted};text-decoration:none;font-size:13px;">手續費</a>
          <button style="background:${D.primary};color:#fff;border:none;padding:10px 22px;font-size:13px;font-weight:600;border-radius:5px;cursor:pointer;">${H(m.cta)}</button>
        </div>
      </div>
    </nav>

    <!-- HERO SPLIT -->
    <div style="display:grid;grid-template-columns:1fr 1fr;min-height:580px;">
      <!-- LEFT -->
      <div class="fin-hero" style="padding:80px 60px;display:flex;flex-direction:column;justify-content:center;">
        <div style="display:inline-flex;align-items:center;gap:8px;background:${D.accent}18;color:${D.accent};padding:6px 14px;border-radius:20px;font-size:12px;font-weight:600;margin-bottom:28px;width:fit-content;border:1px solid ${D.accent}30;">
          ↑ +9.2% 年化報酬（3 年）
        </div>
        <h1 style="font-size:clamp(28px,3.5vw,50px);font-weight:800;color:${D.text};margin:0 0 14px;line-height:1.1;">
          <span style="display:block;font-size:0.52em;font-weight:500;color:${D.muted};margin-bottom:8px;letter-spacing:0.04em;">${H(m.brandName)}</span>
          ${H(m.tagline)}
        </h1>
        <p style="font-size:17px;color:${D.muted};line-height:1.75;margin:0 0 36px;">${H(m.subheadline)}</p>
        <div style="display:flex;gap:14px;flex-wrap:wrap;">
          <button style="background:${D.primary};color:#fff;border:none;padding:14px 32px;font-size:15px;font-weight:700;border-radius:7px;cursor:pointer;">${H(m.cta)}</button>
          <a style="font-size:13px;color:${D.muted};cursor:pointer;text-decoration:underline;display:flex;align-items:center;">查看績效 →</a>
        </div>
        <p style="font-size:12px;color:${D.muted};margin-top:20px;line-height:1.6;opacity:0.7;">投資有風險，過去績效不代表未來保證。</p>
      </div>

      <!-- RIGHT — chart panel -->
      <div style="background:${D.surface};position:relative;overflow:hidden;border-left:1px solid ${D.border};">
        <img src="${m.imgs.hero}" alt="finance" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.07;" />
        <div style="position:relative;padding:60px;height:100%;display:flex;flex-direction:column;justify-content:flex-end;">
          <!-- Chart -->
          <svg viewBox="0 0 300 100" style="width:100%;margin-bottom:28px;" fill="none">
            <polyline class="chart-line" points="0,90 40,70 80,74 120,50 160,54 200,30 240,24 300,10" stroke="${D.accent}" stroke-width="2.5" fill="none"/>
            <polygon points="0,90 40,70 80,74 120,50 160,54 200,30 240,24 300,10 300,100 0,100" fill="${D.accent}" opacity="0.08"/>
          </svg>
          <!-- Stats -->
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;">
            ${[['$2.4B','管理資產'],['12yr','平均持倉'],['87%','達標率']].map(([v,l],i)=>`
            <div class="fin-stat" style="background:${D.card};padding:16px;border:1px solid ${D.border};">
              <div style="font-size:20px;font-weight:700;color:${D.text};">${v}</div>
              <div style="font-size:11px;color:${D.muted};margin-top:4px;">${l}</div>
            </div>`).join('')}
          </div>
        </div>
      </div>
    </div>

    <!-- PAIN / SOLUTION -->
    <div style="max-width:1200px;margin:0 auto;padding:80px 60px;">
      <div style="max-width:720px;">
        <h2 style="font-size:30px;font-weight:700;margin:0 0 18px;color:${D.text};">${H(m.pain)}</h2>
        <p style="font-size:17px;color:${D.muted};line-height:1.85;">${H(m.solution)}</p>
      </div>
    </div>

    <!-- PROCESS -->
    <div style="background:${D.surface};padding:80px 60px;border-top:1px solid ${D.border};">
      <div style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 2fr;gap:80px;align-items:start;">
        <div>
          <h2 style="font-size:28px;font-weight:700;margin:0 0 14px;color:${D.text};">投資流程</h2>
          <p style="color:${D.muted};font-size:14px;line-height:1.7;">透明、可理解、可驗證</p>
          <img src="${m.imgs.secondary??m.imgs.hero}" alt="process" style="width:100%;margin-top:28px;border-radius:6px;filter:brightness(0.7);" />
        </div>
        <div>${steps}</div>
      </div>
    </div>

    <!-- QUOTES -->
    <div style="padding:80px 60px;">
      <div style="max-width:1200px;margin:0 auto;">
        <h2 style="font-size:26px;font-weight:700;margin:0 0 36px;color:${D.text};">客戶故事</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
          ${m.quotes.map(q=>`
          <div style="background:${D.card};padding:32px;border-radius:6px;border:1px solid ${D.border};">
            <p style="font-size:17px;font-style:italic;color:${D.text};margin:0 0 18px;line-height:1.7;">"${H(q.text)}"</p>
            <p style="font-size:12px;color:${D.muted};margin:0;">— ${H(q.author)}</p>
          </div>`).join('')}
        </div>
      </div>
    </div>

    <!-- FOOTER CTA -->
    <div style="background:linear-gradient(135deg,${D.primary},${D.accent});padding:80px 60px;text-align:center;">
      <p style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:rgba(255,255,255,0.55);margin:0 0 12px;">${H(m.brandName)}</p>
      <h2 style="font-size:38px;color:#fff;font-weight:700;margin:0 0 14px;">${H(m.tagline)}</h2>
      <p style="font-size:16px;color:rgba(255,255,255,0.8);margin:0 0 36px;">免費評估，30 分鐘了解你的配置選項</p>
      <button style="background:#fff;color:${D.primary};border:none;padding:16px 48px;font-size:16px;font-weight:700;border-radius:7px;cursor:pointer;">${H(m.cta)}</button>
    </div>
  </section>`;
}
