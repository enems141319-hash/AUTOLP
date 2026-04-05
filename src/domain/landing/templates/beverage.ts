import type { LandingModel } from '../../brand-analysis/types';
import { escapeHtml } from '../../../utils/sanitize';

/** Beverage: atmospheric brew hero with light sweep and no rotating badge. */
export function renderBeverage(m: LandingModel): string {
  const H = escapeHtml;
  const heroImg = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1800&auto=format&fit=crop&q=80';
  const detailImg = 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1200&auto=format&fit=crop&q=80';
  const features = m.features.map(f => `<div style="padding:32px;background:${m.palette.surface};border-radius:8px;border:1px solid ${m.palette.accent}20;"><div style="width:12px;height:12px;background:${m.palette.accent};border-radius:50%;margin-bottom:16px;"></div><p style="color:${m.palette.text};font-size:15px;line-height:1.7;margin:0;">${H(f)}</p></div>`).join('');
  return `
  <style>
    @keyframes brewDrift { from { transform: translate3d(0,0,0) scale(1.02); } to { transform: translate3d(-1%, -1%, 0) scale(1.07); } }
    @keyframes steamRise { 0% { opacity:0; transform:translateY(0) scale(1); } 50% { opacity:0.45; transform:translateY(-24px) scale(1.18); } 100% { opacity:0; transform:translateY(-52px) scale(0.92); } }
    @keyframes brewSweep { from { transform:translateX(-120%) skewX(-22deg); } to { transform:translateX(220%) skewX(-22deg); } }
    .bev-hero-img { animation: brewDrift 16s ease-in-out infinite alternate; }
    .steam-a, .steam-b, .steam-c { position:absolute; width:70px; height:70px; border-radius:50%; filter:blur(26px); background:rgba(255,255,255,0.18); }
    .steam-a { animation: steamRise 3.4s ease-in-out infinite; }
    .steam-b { animation: steamRise 3.4s ease-in-out 0.9s infinite; }
    .steam-c { animation: steamRise 3.4s ease-in-out 1.8s infinite; }
    .bev-sweep::after { content:''; position:absolute; inset:0; background:linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.0) 38%, rgba(255,255,255,0.16) 50%, rgba(255,255,255,0.0) 62%, transparent 100%); animation: brewSweep 4.2s ease-in-out infinite; }
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
  <section class="lp-noise" style="background:${m.palette.bg};font-family:${m.font};color:${m.palette.text};">
    <nav style="padding:24px 60px;display:flex;align-items:center;justify-content:space-between;"><span style="font-size:22px;font-weight:700;color:${m.palette.primary};">${H(m.brandName)}</span><div style="display:flex;gap:32px;align-items:center;"><a style="color:${m.palette.muted};text-decoration:none;font-size:14px;">風味來源</a><a style="color:${m.palette.muted};text-decoration:none;font-size:14px;">烘焙風格</a><a style="color:${m.palette.muted};text-decoration:none;font-size:14px;">菜單</a><button style="background:${m.palette.primary};color:${m.palette.bg};border:none;padding:10px 24px;border-radius:6px;font-size:14px;font-weight:700;cursor:pointer;">${H(m.cta)}</button></div></nav>
    <div class="bev-sweep" style="position:relative;overflow:hidden;min-height:680px;"><img class="bev-hero-img" src="${heroImg}" alt="beverage hero" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:brightness(0.58);" /><div style="position:absolute;inset:0;background:linear-gradient(to right,${m.palette.bg}F2 0%, ${m.palette.bg}D8 40%, transparent 78%);"></div><div style="position:absolute;right:12%;top:28%;width:160px;height:120px;"><div class="steam-a" style="left:0;top:30px;"></div><div class="steam-b" style="left:36px;top:12px;"></div><div class="steam-c" style="left:74px;top:28px;"></div></div><div style="position:relative;padding:96px 80px;max-width:620px;"><p style="font-size:13px;letter-spacing:0.16em;text-transform:uppercase;color:${m.palette.accent};margin:0 0 20px;">慢萃風味 / 產地直送 / 日常儀式感</p><h1 style="font-size:clamp(38px,5vw,70px);font-weight:700;color:${m.palette.primary};margin:0 0 14px;line-height:1.05;"><span style="font-size:0.46em;font-weight:500;color:${m.palette.muted};display:block;margin-bottom:8px;">${H(m.brandName)}</span>${H(m.tagline)}</h1><p style="font-size:17px;color:${m.palette.muted};line-height:1.8;margin:0 0 34px;">${H(m.subheadline)}</p><button style="background:${m.palette.accent};color:#fff;border:none;padding:14px 32px;font-size:16px;font-weight:700;border-radius:6px;cursor:pointer;">${H(m.cta)}</button></div></div>
    <div style="max-width:1200px;margin:80px auto;padding:0 60px;display:grid;grid-template-columns:3fr 2fr;gap:80px;align-items:center;"><div><p style="font-size:13px;letter-spacing:0.15em;text-transform:uppercase;color:${m.palette.muted};margin:0 0 16px;">風味起點</p><h2 style="font-size:36px;font-weight:600;color:${m.palette.text};margin:0 0 20px;line-height:1.25;">${H(m.pain)}</h2><p style="font-size:17px;color:${m.palette.muted};line-height:1.8;">${H(m.solution)}</p></div><div><img src="${detailImg}" alt="brew detail" style="width:100%;aspect-ratio:1;object-fit:cover;border-radius:26px;" /></div></div>
    <div style="background:${m.palette.primary};padding:80px 60px;"><div style="max-width:1200px;margin:0 auto;"><h2 style="font-size:32px;color:${m.palette.bg};font-weight:700;text-align:center;margin:0 0 48px;">風味亮點</h2><div style="display:grid;grid-template-columns:repeat(2,1fr);gap:24px;">${features}</div></div></div>
    <div style="padding:100px 80px;max-width:1000px;margin:0 auto;">${m.quotes.map(q=>`<div style="margin-bottom:64px;"><p style="font-size:20px;font-style:italic;color:${m.palette.text};margin:0 0 12px;line-height:1.6;">\"${H(q.text)}\"</p><p style="font-size:13px;color:${m.palette.muted};margin:0;">${H(q.author)}</p></div>`).join('')}</div>
    <div style="background:${m.palette.accent};padding:60px;display:flex;align-items:center;justify-content:space-between;"><div><h2 style="font-size:32px;color:#fff;font-weight:700;margin:0 0 8px;">${H(m.brandName)}</h2><p style="font-size:15px;color:rgba(255,255,255,0.8);margin:0;">${H(m.cta)}</p></div><button style="background:#fff;color:${m.palette.accent};border:none;padding:16px 40px;font-size:16px;font-weight:700;border-radius:6px;cursor:pointer;white-space:nowrap;">${H(m.cta)}</button></div>
  </section>`;
}


