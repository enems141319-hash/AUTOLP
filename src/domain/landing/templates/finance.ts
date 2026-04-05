import type { LandingModel } from '../../brand-analysis/types';
import { escapeHtml } from '../../../utils/sanitize';

/** Finance: dark split hero with glass chart and luminous CTA. */
export function renderFinance(m: LandingModel): string {
  const H = escapeHtml;
  const D = { bg:'#07090C', surface:'#0E1117', card:'#141921', border:'rgba(255,255,255,0.07)', text:'#E8EDF4', muted:'rgba(255,255,255,0.42)', primary:m.palette.primary, accent:m.palette.accent };
  const steps = m.features.map((f, i) => `<div style="display:flex;gap:20px;align-items:flex-start;padding:22px 0;border-bottom:1px solid ${D.border};"><div style="width:30px;height:30px;border-radius:50%;background:${D.primary};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:13px;flex-shrink:0;">${i+1}</div><p style="margin:0;color:${D.text};font-size:15px;line-height:1.7;padding-top:4px;">${H(f)}</p></div>`).join('');
  return `
  <style>
    @keyframes chartLineDraw { from { stroke-dashoffset:600; } to { stroke-dashoffset:0; } }
    @keyframes finGlow { 0%,100% { box-shadow:0 0 0 rgba(37,99,235,0); } 50% { box-shadow:0 0 28px rgba(37,99,235,0.28), 0 0 56px rgba(34,197,94,0.16); } }
    @keyframes finSweep { from { transform:translateX(-120%); } to { transform:translateX(220%); } }
    @keyframes finPulse { 0%,100% { transform:scale(1); opacity:0.7; } 50% { transform:scale(1.08); opacity:1; } }
    .chart-line { stroke-dasharray:600; animation:chartLineDraw 2s ease 0.4s both; }
    .fin-cta { position:relative; overflow:hidden; animation:finGlow 3s ease-in-out infinite; }
    .fin-cta::after { content:''; position:absolute; inset:0; background:linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.0) 42%, rgba(255,255,255,0.24) 50%, rgba(255,255,255,0.0) 58%, transparent 100%); transform:translateX(-120%); animation:finSweep 2.8s ease-in-out infinite; }
    .fin-signal {
      position:absolute;
      display:flex;
      align-items:center;
      gap:8px;
      padding:10px 14px;
      border-radius:14px;
      border:1px solid rgba(255,255,255,0.12);
      background:rgba(10,14,20,0.72);
      backdrop-filter:blur(14px);
      box-shadow:0 18px 40px rgba(0,0,0,0.24);
      color:${D.text};
      font-size:12px;
      z-index:2;
    }
    .fin-signal-dot {
      width:8px;
      height:8px;
      border-radius:50%;
      background:${D.accent};
      box-shadow:0 0 16px ${D.accent};
      animation:finPulse 2.4s ease-in-out infinite;
    }
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
  <section class="lp-noise" style="background:${D.bg};font-family:${m.font};color:${D.text};min-height:100vh;;overflow:hidden">

    <!-- diffuse background orbs -->
    <div class="lp-orb" style="width:600px;height:600px;background:radial-gradient(circle,${D.primary}28 0%,transparent 70%);top:-160px;left:-140px;animation:diffuseFloat 14s ease-in-out infinite;"></div>
    <div class="lp-orb" style="width:480px;height:480px;background:radial-gradient(circle,${D.accent}22 0%,transparent 70%);top:60px;right:-100px;animation:diffuseFloat 18s ease-in-out infinite reverse;"></div>
    <div class="lp-orb" style="width:400px;height:400px;background:radial-gradient(circle,${D.primary}18 0%,transparent 70%);bottom:180px;left:28%;animation:diffuseFloat 22s ease-in-out infinite 4s;"></div>
    <div class="lp-orb" style="width:340px;height:340px;background:radial-gradient(circle,${D.accent}20 0%,transparent 70%);bottom:-60px;right:10%;animation:diffuseFloat 16s ease-in-out infinite 2s;"></div>
    <nav style="background:${D.surface};border-bottom:1px solid ${D.border};padding:0 60px;"><div style="max-width:1200px;margin:0 auto;height:64px;display:flex;align-items:center;justify-content:space-between;"><span style="font-size:19px;font-weight:700;color:${D.primary};">${H(m.brandName)}</span><div style="display:flex;gap:32px;align-items:center;"><a style="color:${D.muted};text-decoration:none;font-size:13px;">策略配置</a><a style="color:${D.muted};text-decoration:none;font-size:13px;">資產組合</a><a style="color:${D.muted};text-decoration:none;font-size:13px;">市場研究</a><button class="fin-cta" style="background:${D.primary};color:#fff;border:none;padding:10px 22px;font-size:13px;font-weight:700;border-radius:8px;cursor:pointer;">${H(m.cta)}</button></div></div></nav>
    <div style="position:relative;min-height:680px;overflow:hidden;border-bottom:1px solid ${D.border};">
      <img src="${m.imgs.hero}" alt="finance" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;filter:brightness(0.58) saturate(0.9);" />
      <div style="position:absolute;inset:0;background:
        linear-gradient(90deg, ${D.bg} 0%, rgba(7,9,12,0.96) 26%, rgba(7,9,12,0.84) 42%, rgba(7,9,12,0.46) 62%, rgba(7,9,12,0.72) 100%),
        linear-gradient(180deg, rgba(7,9,12,0.16) 0%, rgba(7,9,12,0.42) 100%);
      "></div>
      <div style="position:relative;z-index:1;max-width:1200px;margin:0 auto;min-height:680px;padding:84px 60px;display:grid;grid-template-columns:minmax(0,1.05fr) minmax(340px,0.95fr);gap:60px;align-items:end;">
        <div style="display:flex;flex-direction:column;justify-content:center;max-width:560px;">
          <div style="display:inline-flex;align-items:center;gap:8px;background:${D.accent}18;color:${D.accent};padding:6px 14px;border-radius:20px;font-size:12px;font-weight:600;margin-bottom:28px;width:fit-content;border:1px solid ${D.accent}30;">CFA 認證顧問 · 無佣金透明收費</div>
          <h1 style="font-size:clamp(28px,3.5vw,50px);font-weight:800;color:${D.text};margin:0 0 14px;line-height:1.08;"><span style="display:block;font-size:0.52em;font-weight:500;color:${D.muted};margin-bottom:8px;letter-spacing:0.04em;">${H(m.brandName)}</span>${H(m.tagline)}</h1>
          <p style="font-size:17px;color:${D.muted};line-height:1.8;margin:0 0 36px;">${H(m.subheadline)}</p>
          <div style="display:flex;gap:14px;flex-wrap:wrap;">
            <button class="fin-cta" style="background:${D.primary};color:#fff;border:none;padding:14px 32px;font-size:15px;font-weight:700;border-radius:10px;cursor:pointer;">${H(m.cta)}</button>
            <a style="font-size:13px;color:${D.muted};cursor:pointer;text-decoration:underline;display:flex;align-items:center;">查看市場觀點</a>
          </div>
        </div>
        <div style="display:flex;justify-content:flex-end;align-items:flex-end;height:100%;position:relative;">
          <div style="width:min(100%, 480px);background:linear-gradient(180deg, rgba(20,25,33,0.72), rgba(20,25,33,0.94));border:1px solid ${D.border};backdrop-filter:blur(12px);padding:28px;border-radius:22px;box-shadow:0 28px 70px rgba(0,0,0,0.35);">
            <div class="fin-signal" style="top:18px;left:18px;">
              <span class="fin-signal-dot"></span>
              <span>Live Allocation Signal</span>
            </div>
            <div style="display:flex;justify-content:space-between;gap:12px;align-items:start;margin:58px 0 18px;">
              <div>
                <div style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${D.accent};margin-bottom:6px;">Market Snapshot</div>
                <div style="font-size:24px;font-weight:700;color:${D.text};">Balanced Growth Mandate</div>
              </div>
              <div style="padding:10px 12px;border-radius:14px;background:${D.primary}18;border:1px solid ${D.primary}24;text-align:right;">
                <div style="font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:${D.muted};margin-bottom:4px;">Exposure</div>
                <div style="font-size:18px;font-weight:700;color:${D.text};">72%</div>
              </div>
            </div>
            <svg viewBox="0 0 300 100" style="width:100%;margin-bottom:28px;" fill="none">
              ${[12.5, 25, 37.5, 50, 62.5, 75, 87.5].map((y) => `<line x1="0" y1="${y}" x2="300" y2="${y}" stroke="${D.border}" stroke-width="1" opacity="0.6" />`).join('')}
              ${[15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285].map((x) => `<line x1="${x}" y1="0" x2="${x}" y2="100" stroke="${D.border}" stroke-width="1" opacity="0.34" />`).join('')}
              <polyline class="chart-line" points="0,90 40,70 80,74 120,50 160,54 200,30 240,24 300,10" stroke="${D.accent}" stroke-width="2.5" fill="none"/>
              <polygon points="0,90 40,70 80,74 120,50 160,54 200,30 240,24 300,10 300,100 0,100" fill="${D.accent}" opacity="0.08"/>
              <circle cx="0" cy="90" r="3.5" fill="${D.accent}" />
              <circle cx="300" cy="10" r="3.5" fill="${D.accent}" />
              <text x="10" y="66" fill="${D.muted}" font-size="10" font-family="${m.font}">3.1</text>
              <text x="262" y="11" fill="${D.accent}" font-size="10" font-family="${m.font}" font-weight="700">9.2</text>
            </svg>
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;">${[['500+','服務客戶'],['9.2%','3 年年化'],['98%','續約率']].map(([v,l])=>`<div style="background:${D.card};padding:16px;border:1px solid ${D.border};border-radius:14px;"><div style="font-size:20px;font-weight:700;color:${D.text};">${v}</div><div style="font-size:11px;color:${D.muted};margin-top:4px;">${l}</div></div>`).join('')}</div>
          </div>
        </div>
      </div>
    </div>
    <div style="max-width:1200px;margin:0 auto;padding:80px 60px;"><div style="max-width:720px;"><h2 style="font-size:30px;font-weight:700;margin:0 0 18px;color:${D.primary};">${H(m.pain)}</h2><p style="font-size:17px;color:${D.muted};line-height:1.85;">${H(m.solution)}</p></div></div>
    <div style="background:${D.surface};padding:80px 60px;border-top:1px solid ${D.border};"><div style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 2fr;gap:80px;align-items:start;"><div><h2 style="font-size:28px;font-weight:700;margin:0 0 14px;color:${D.text};">服務流程</h2><p style="color:${D.muted};font-size:14px;line-height:1.7;">透明、可理解、可驗證的顧問流程</p><img src="${m.imgs.secondary ?? m.imgs.hero}" alt="process" style="width:100%;margin-top:28px;border-radius:12px;filter:brightness(0.7);" /></div><div>${steps}</div></div></div>
    <div style="padding:80px 60px;max-width:1200px;margin:0 auto;">
      <div style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:${D.accent};margin:0 0 14px;">客戶回饋</div>
      ${m.quotes.map(q=>`<div style="margin-bottom:22px;background:${D.card};padding:28px;border-radius:16px;border:1px solid ${D.border};"><p style="font-size:17px;font-style:italic;color:${D.text};margin:0 0 18px;line-height:1.7;">\"${H(q.text)}\"</p><p style="font-size:12px;color:${D.muted};margin:0;">${H(q.author)}</p></div>`).join('')}
    </div>
    <div style="background:linear-gradient(135deg,${D.primary},${D.accent});padding:84px 60px;text-align:center;"><p style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:rgba(255,255,255,0.55);margin:0 0 12px;">${H(m.brandName)}</p><h2 style="font-size:38px;color:#fff;font-weight:700;margin:0 0 14px;">${H(m.tagline)}</h2><p style="font-size:16px;color:rgba(255,255,255,0.8);margin:0 0 36px;">用更清楚的訊號，推動下一步資產決策。</p><button class="fin-cta" style="background:#fff;color:${D.primary};border:none;padding:16px 48px;font-size:16px;font-weight:700;border-radius:12px;cursor:pointer;">${H(m.cta)}</button></div>
  </section>`;
}
