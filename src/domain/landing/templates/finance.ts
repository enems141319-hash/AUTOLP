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
    .chart-line { stroke-dasharray:600; animation:chartLineDraw 2s ease 0.4s both; }
    .fin-cta { position:relative; overflow:hidden; animation:finGlow 3s ease-in-out infinite; }
    .fin-cta::after { content:''; position:absolute; inset:0; background:linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.0) 42%, rgba(255,255,255,0.24) 50%, rgba(255,255,255,0.0) 58%, transparent 100%); transform:translateX(-120%); animation:finSweep 2.8s ease-in-out infinite; }
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
  <section class="lp-noise" style="background:${D.bg};font-family:${m.font};color:${D.text};min-height:100vh;">
    <nav style="background:${D.surface};border-bottom:1px solid ${D.border};padding:0 60px;"><div style="max-width:1200px;margin:0 auto;height:64px;display:flex;align-items:center;justify-content:space-between;"><span style="font-size:19px;font-weight:700;color:${D.primary};">${H(m.brandName)}</span><div style="display:flex;gap:32px;align-items:center;"><a style="color:${D.muted};text-decoration:none;font-size:13px;">策略配置</a><a style="color:${D.muted};text-decoration:none;font-size:13px;">資產組合</a><a style="color:${D.muted};text-decoration:none;font-size:13px;">市場研究</a><button class="fin-cta" style="background:${D.primary};color:#fff;border:none;padding:10px 22px;font-size:13px;font-weight:700;border-radius:8px;cursor:pointer;">${H(m.cta)}</button></div></div></nav>
    <div style="display:grid;grid-template-columns:1fr 1fr;min-height:620px;"><div style="padding:84px 60px;display:flex;flex-direction:column;justify-content:center;"><div style="display:inline-flex;align-items:center;gap:8px;background:${D.accent}18;color:${D.accent};padding:6px 14px;border-radius:20px;font-size:12px;font-weight:600;margin-bottom:28px;width:fit-content;border:1px solid ${D.accent}30;">CFA 認證顧問 · 無佣金透明收費</div><h1 style="font-size:clamp(28px,3.5vw,50px);font-weight:800;color:${D.text};margin:0 0 14px;line-height:1.08;"><span style="display:block;font-size:0.52em;font-weight:500;color:${D.muted};margin-bottom:8px;letter-spacing:0.04em;">${H(m.brandName)}</span>${H(m.tagline)}</h1><p style="font-size:17px;color:${D.muted};line-height:1.8;margin:0 0 36px;">${H(m.subheadline)}</p><div style="display:flex;gap:14px;flex-wrap:wrap;"><button class="fin-cta" style="background:${D.primary};color:#fff;border:none;padding:14px 32px;font-size:15px;font-weight:700;border-radius:10px;cursor:pointer;">${H(m.cta)}</button><a style="font-size:13px;color:${D.muted};cursor:pointer;text-decoration:underline;display:flex;align-items:center;">查看市場觀點</a></div></div><div style="background:${D.surface};position:relative;overflow:hidden;border-left:1px solid ${D.border};"><img src="${m.imgs.hero}" alt="finance" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.08;" /><div style="position:relative;padding:60px;height:100%;display:flex;flex-direction:column;justify-content:flex-end;"><div style="background:linear-gradient(180deg, rgba(20,25,33,0.70), rgba(20,25,33,0.92));border:1px solid ${D.border};backdrop-filter:blur(12px);padding:28px;border-radius:22px;"><svg viewBox="0 0 300 100" style="width:100%;margin-bottom:28px;" fill="none"><polyline class="chart-line" points="0,90 40,70 80,74 120,50 160,54 200,30 240,24 300,10" stroke="${D.accent}" stroke-width="2.5" fill="none"/><polygon points="0,90 40,70 80,74 120,50 160,54 200,30 240,24 300,10 300,100 0,100" fill="${D.accent}" opacity="0.08"/></svg><div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;">${[['500+','服務客戶'],['9.2%','3 年年化'],['98%','續約率']].map(([v,l])=>`<div style="background:${D.card};padding:16px;border:1px solid ${D.border};border-radius:14px;"><div style="font-size:20px;font-weight:700;color:${D.text};">${v}</div><div style="font-size:11px;color:${D.muted};margin-top:4px;">${l}</div></div>`).join('')}</div></div></div></div></div>
    <div style="max-width:1200px;margin:0 auto;padding:80px 60px;"><div style="max-width:720px;"><h2 style="font-size:30px;font-weight:700;margin:0 0 18px;color:${D.text};">${H(m.pain)}</h2><p style="font-size:17px;color:${D.muted};line-height:1.85;">${H(m.solution)}</p></div></div>
    <div style="background:${D.surface};padding:80px 60px;border-top:1px solid ${D.border};"><div style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 2fr;gap:80px;align-items:start;"><div><h2 style="font-size:28px;font-weight:700;margin:0 0 14px;color:${D.text};">服務流程</h2><p style="color:${D.muted};font-size:14px;line-height:1.7;">透明、可理解、可驗證的顧問流程</p><img src="${m.imgs.secondary ?? m.imgs.hero}" alt="process" style="width:100%;margin-top:28px;border-radius:12px;filter:brightness(0.7);" /></div><div>${steps}</div></div></div>
    <div style="padding:80px 60px;max-width:1200px;margin:0 auto;">${m.quotes.map(q=>`<div style="margin-bottom:22px;background:${D.card};padding:28px;border-radius:16px;border:1px solid ${D.border};"><p style="font-size:17px;font-style:italic;color:${D.text};margin:0 0 18px;line-height:1.7;">\"${H(q.text)}\"</p><p style="font-size:12px;color:${D.muted};margin:0;">${H(q.author)}</p></div>`).join('')}</div>
    <div style="background:linear-gradient(135deg,${D.primary},${D.accent});padding:84px 60px;text-align:center;"><p style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:rgba(255,255,255,0.55);margin:0 0 12px;">${H(m.brandName)}</p><h2 style="font-size:38px;color:#fff;font-weight:700;margin:0 0 14px;">${H(m.tagline)}</h2><p style="font-size:16px;color:rgba(255,255,255,0.8);margin:0 0 36px;">用更清楚的訊號，推動下一步資產決策。</p><button class="fin-cta" style="background:#fff;color:${D.primary};border:none;padding:16px 48px;font-size:16px;font-weight:700;border-radius:12px;cursor:pointer;">${H(m.cta)}</button></div>
  </section>`;
}





