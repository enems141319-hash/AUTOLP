import type { LandingModel } from '../../brand-analysis/types';
import { escapeHtml } from '../../../utils/sanitize';

/** Tech: aurora grid hero with luminous motion accents. */
export function renderTech(m: LandingModel): string {
  const H = escapeHtml;
  const features = m.features.map(f => `<div style="background:${m.palette.surface};border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:24px 20px;"><div style="width:36px;height:4px;background:${m.palette.primary};border-radius:2px;margin-bottom:14px;"></div><p style="margin:0;color:${m.palette.text};font-size:15px;line-height:1.6;">${H(f)}</p></div>`).join('');
  return `
  <style>
    @keyframes auroraMove { 0% { transform:translate3d(-8%, -6%, 0) scale(1); } 100% { transform:translate3d(8%, 6%, 0) scale(1.08); } }
    @keyframes gridPulse { 0%,100% { opacity:0.16; } 50% { opacity:0.32; } }
    @keyframes techFadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
    @keyframes buttonSweep { from { transform:translateX(-120%); } to { transform:translateX(220%); } }
    .tech-hero-content, .tech-hero-img { animation: techFadeUp 0.7s ease both; }
    .tech-hero-img { animation-delay:0.2s; }
    .aurora-a, .aurora-b { position:absolute; border-radius:999px; filter:blur(70px); animation:auroraMove 8s ease-in-out infinite alternate; }
    .aurora-b { animation-direction:alternate-reverse; }
    .grid-overlay { animation:gridPulse 4s ease-in-out infinite; }
    .tech-cta { position:relative; overflow:hidden; }
    .tech-cta::after { content:''; position:absolute; inset:0; background:linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.0) 40%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.0) 60%, transparent 100%); transform:translateX(-120%); animation:buttonSweep 2.6s ease-in-out infinite; }
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
  <section class="lp-noise" style="background:${m.palette.bg};min-height:100vh;font-family:${m.font};position:relative;overflow:hidden;">
    <div class="aurora-a" style="width:360px;height:360px;left:-80px;top:80px;background:${m.palette.primary}55;"></div>
    <div class="aurora-b" style="width:300px;height:300px;right:-60px;top:140px;background:${m.palette.accent}55;"></div>
    <div class="grid-overlay" style="position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);background-size:36px 36px;"></div>
    <nav style="position:relative;z-index:2;max-width:1200px;margin:0 auto;padding:24px 40px;display:flex;align-items:center;justify-content:space-between;"><span style="font-size:20px;font-weight:700;color:${m.palette.text};">${H(m.brandName)}</span><div style="display:flex;gap:32px;align-items:center;"><a style="color:${m.palette.muted};text-decoration:none;font-size:14px;">產品</a><a style="color:${m.palette.muted};text-decoration:none;font-size:14px;">平台</a><a style="color:${m.palette.muted};text-decoration:none;font-size:14px;">安全機制</a><button class="tech-cta" style="background:${m.palette.primary};color:#fff;border:none;padding:10px 20px;border-radius:10px;font-size:14px;cursor:pointer;font-weight:600;">${H(m.cta)}</button></div></nav>
    <div style="position:relative;z-index:2;max-width:1200px;margin:0 auto;padding:84px 40px 60px;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;"><div class="tech-hero-content"><div style="display:inline-block;background:rgba(124,58,237,0.15);color:${m.palette.accent};padding:6px 14px;border-radius:20px;font-size:13px;font-weight:600;margin-bottom:24px;border:1px solid rgba(124,58,237,0.3);">AI 原生平台</div><h1 style="font-size:clamp(38px,4.4vw,62px);font-weight:800;color:${m.palette.text};margin:0 0 10px;line-height:1.03;"><span style="color:${m.palette.primary};display:block;">${H(m.brandName)}</span>${H(m.tagline)}</h1><p style="font-size:18px;color:${m.palette.muted};line-height:1.8;margin:0 0 36px;">${H(m.subheadline)}</p><div style="display:flex;gap:14px;align-items:center;"><button class="tech-cta" style="background:linear-gradient(135deg,${m.palette.primary},${m.palette.accent});color:#fff;border:none;padding:15px 30px;border-radius:12px;font-size:16px;cursor:pointer;font-weight:700;">${H(m.cta)}</button><a style="color:${m.palette.muted};font-size:14px;text-decoration:none;">觀看示範</a></div></div><div class="tech-hero-img" style="position:relative;border-radius:20px;overflow:hidden;box-shadow:0 40px 80px rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.08);"><img src="${m.imgs.hero}" alt="hero" style="width:100%;height:420px;object-fit:cover;display:block;filter:brightness(0.78);" /><div style="position:absolute;inset:auto 24px 24px 24px;background:rgba(7,9,12,0.72);backdrop-filter:blur(14px);padding:18px 20px;border:1px solid rgba(255,255,255,0.08);border-radius:16px;"><div style="font-size:12px;color:${m.palette.accent};letter-spacing:0.14em;text-transform:uppercase;margin-bottom:8px;">即時數據</div><div style="font-size:22px;color:${m.palette.text};font-weight:700;">Latency down 42%</div></div></div></div>
    <div style="background:${m.palette.surface};border-top:1px solid rgba(255,255,255,0.06);border-bottom:1px solid rgba(255,255,255,0.06);position:relative;z-index:2;"><div style="max-width:1200px;margin:0 auto;padding:32px 40px;display:grid;grid-template-columns:repeat(4,1fr);text-align:center;gap:0;">${[['10,000+','團隊採用'],['80%','流程自動化'],['3hr+','每日節省'],['98.9%','系統穩定度']].map(([v,l])=>`<div style="padding:0 16px;border-right:1px solid rgba(255,255,255,0.06);"><div style="font-size:28px;font-weight:800;color:${m.palette.text};">${v}</div><div style="font-size:12px;color:${m.palette.muted};margin-top:4px;text-transform:uppercase;letter-spacing:0.08em;">${l}</div></div>`).join('')}</div></div>
    <div style="max-width:900px;margin:80px auto;padding:0 40px;text-align:center;position:relative;z-index:2;"><h2 style="font-size:32px;color:${m.palette.text};font-weight:700;margin:0 0 16px;">Why 團隊採用 switch</h2><p style="font-size:18px;color:${m.palette.muted};line-height:1.7;">${H(m.pain)}</p></div>
    <div style="max-width:1200px;margin:0 auto 80px;padding:0 40px;position:relative;z-index:2;"><h2 style="font-size:32px;color:${m.palette.text};text-align:center;margin:0 0 48px;font-weight:700;">核心能力</h2><div style="display:grid;grid-template-columns:repeat(2,1fr);gap:20px;">${features}</div></div>
    <div style="background:${m.palette.surface};padding:80px 40px;position:relative;z-index:2;"><div style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;"><img src="${m.imgs.secondary ?? m.imgs.hero}" alt="solution" style="border-radius:16px;width:100%;height:360px;object-fit:cover;" /><div><h2 style="font-size:36px;color:${m.palette.text};font-weight:700;margin:0 0 20px;">營運資訊更清楚</h2><p style="font-size:17px;color:${m.palette.muted};line-height:1.8;">${H(m.solution)}</p></div></div></div>
    <div style="max-width:900px;margin:80px auto;padding:0 40px;position:relative;z-index:2;"><h2 style="font-size:32px;color:${m.palette.text};text-align:center;margin:0 0 48px;font-weight:700;">客戶回饋</h2>${m.quotes.map(q=>`<div style="margin-bottom:20px;background:${m.palette.surface};border:1px solid rgba(255,255,255,0.08);padding:24px;border-radius:16px;"><p style="color:${m.palette.text};font-size:16px;font-style:italic;margin:0 0 10px;line-height:1.7;">\"${H(q.text)}\"</p><p style="color:${m.palette.muted};font-size:13px;margin:0;">${H(q.author)}</p></div>`).join('')}</div>
    <div style="background:linear-gradient(135deg,${m.palette.primary},${m.palette.accent});padding:80px 40px;text-align:center;position:relative;z-index:2;"><h2 style="font-size:40px;color:#fff;font-weight:800;margin:0 0 16px;">更快把下一套系統做對</h2><p style="font-size:18px;color:rgba(255,255,255,0.8);margin:0 0 32px;">${H(m.cta)}</p><button class="tech-cta" style="background:#fff;color:${m.palette.primary};border:none;padding:16px 36px;border-radius:12px;font-size:18px;font-weight:700;cursor:pointer;">${H(m.cta)}</button></div>
  </section>`;
}


