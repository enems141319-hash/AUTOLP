import type { LandingModel } from '../../brand-analysis/types';
import { escapeHtml } from '../../../utils/sanitize';

/** Dining: cinematic hero with additional food photography grid. */
export function renderDining(m: LandingModel): string {
  const H = escapeHtml;
  const foodImgs = [
    'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=1200&auto=format&fit=crop&q=80',
  ];
  const menuItems = m.features.map((f, i) => `<div style="padding:20px 0;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;justify-content:space-between;align-items:baseline;animation:diningItem 0.5s ease ${i*0.1+0.5}s both;"><span style="font-size:16px;color:${m.palette.text};font-style:italic;">${H(f)}</span><span style="color:${m.palette.muted};font-size:12px;letter-spacing:0.1em;">主廚短評</span></div>`).join('');
  return `
  <style>
    @keyframes diningHero { from{opacity:0;transform:translateY(32px);} to{opacity:1;transform:translateY(0);} }
    @keyframes diningItem { from{opacity:0;transform:translateX(-16px);} to{opacity:1;transform:translateX(0);} }
    @keyframes diningTag { from{opacity:0;} to{opacity:1;} }
    .dining-tag { animation: diningTag 0.6s ease 0.1s both; }
    .dining-title { animation: diningHero 0.8s ease 0.35s both; }
    .dining-sub { animation: diningHero 0.8s ease 0.55s both; }
    .dining-cta { animation: diningHero 0.6s ease 0.75s both; }
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
  <section class="lp-noise" style="background:${m.palette.bg};font-family:${m.font};color:${m.palette.text};;overflow:hidden">

    <!-- diffuse background orbs -->
    <div class="lp-orb" style="width:600px;height:600px;background:radial-gradient(circle,${m.palette.primary}28 0%,transparent 70%);top:-160px;left:-140px;animation:diffuseFloat 14s ease-in-out infinite;"></div>
    <div class="lp-orb" style="width:480px;height:480px;background:radial-gradient(circle,${m.palette.accent}22 0%,transparent 70%);top:60px;right:-100px;animation:diffuseFloat 18s ease-in-out infinite reverse;"></div>
    <div class="lp-orb" style="width:400px;height:400px;background:radial-gradient(circle,${m.palette.primary}18 0%,transparent 70%);bottom:180px;left:28%;animation:diffuseFloat 22s ease-in-out infinite 4s;"></div>
    <div class="lp-orb" style="width:340px;height:340px;background:radial-gradient(circle,${m.palette.accent}20 0%,transparent 70%);bottom:-60px;right:10%;animation:diffuseFloat 16s ease-in-out infinite 2s;"></div>
    <div style="position:relative;height:100vh;overflow:hidden;"><img src="${m.imgs.hero}" alt="dining" style="width:100%;height:100%;object-fit:cover;filter:brightness(0.5);" /><div style="position:absolute;inset:0;background:linear-gradient(to bottom,transparent 40%,${m.palette.bg});"><nav style="padding:36px 60px;display:flex;align-items:center;justify-content:space-between;"><span style="font-size:24px;font-weight:400;color:#fff;letter-spacing:0.15em;text-transform:uppercase;">${H(m.brandName)}</span><div style="display:flex;gap:36px;align-items:center;"><a style="color:rgba(255,255,255,0.7);text-decoration:none;font-size:13px;letter-spacing:0.1em;text-transform:uppercase;">菜單</a><a style="color:rgba(255,255,255,0.7);text-decoration:none;font-size:13px;letter-spacing:0.1em;text-transform:uppercase;">主廚</a><a style="color:rgba(255,255,255,0.7);text-decoration:none;font-size:13px;letter-spacing:0.1em;text-transform:uppercase;">訂位</a><button style="background:${m.palette.accent};color:${m.palette.bg};border:none;padding:12px 28px;font-size:13px;letter-spacing:0.1em;text-transform:uppercase;cursor:pointer;font-family:${m.font};">${H(m.cta)}</button></div></nav><div style="position:absolute;bottom:120px;left:60px;max-width:680px;"><p class="dining-tag" style="font-size:12px;letter-spacing:0.25em;text-transform:uppercase;color:${m.palette.accent};margin:0 0 16px;">當季套餐 / 私密用餐 / 細緻服務</p><h1 class="dining-title" style="font-size:clamp(42px,5.5vw,80px);color:#fff;font-weight:400;margin:0 0 16px;line-height:1.05;"><span style="display:block;font-size:0.42em;color:rgba(255,255,255,0.5);font-weight:300;letter-spacing:0.06em;margin-bottom:8px;">${H(m.brandName)}</span>${H(m.tagline)}</h1><p class="dining-sub" style="font-size:17px;color:rgba(255,255,255,0.75);margin:0 0 40px;line-height:1.7;">${H(m.subheadline)}</p><div class="dining-cta" style="display:flex;gap:16px;"><button style="background:${m.palette.accent};color:${m.palette.bg};border:none;padding:16px 40px;font-size:15px;font-weight:700;cursor:pointer;font-family:${m.font};">${H(m.cta)}</button><button style="background:transparent;color:#fff;border:1px solid rgba(255,255,255,0.4);padding:16px 40px;font-size:15px;cursor:pointer;font-family:${m.font};">查看菜單</button></div></div></div></div>
    <div style="max-width:1100px;margin:0 auto;padding:100px 60px;display:grid;grid-template-columns:2fr 3fr;gap:80px;align-items:start;"><div><p style="font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:${m.palette.accent};margin:0 0 20px;">餐廳故事</p><h2 style="font-size:38px;font-weight:400;color:${m.palette.text};margin:0;line-height:1.2;">${H(m.pain)}</h2></div><div><p style="font-size:18px;color:${m.palette.muted};line-height:1.9;margin:0 0 32px;">${H(m.solution)}</p><img src="${m.imgs.secondary ?? m.imgs.hero}" alt="chef" style="width:100%;height:320px;object-fit:cover;" /></div></div>
    <div style="max-width:1200px;margin:0 auto;padding:0 60px 80px;display:grid;grid-template-columns:repeat(3,1fr);gap:18px;">${foodImgs.map((img, i)=>`<img src="${img}" alt="dish ${i+1}" style="width:100%;height:240px;object-fit:cover;display:block;" />`).join('')}</div>
    <div style="background:${m.palette.surface};padding:80px 60px;"><div style="max-width:800px;margin:0 auto;"><p style="font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:${m.palette.muted};margin:0 0 8px;text-align:center;">主打菜色</p><h2 style="font-size:36px;font-weight:400;color:${m.palette.text};margin:0 0 48px;text-align:center;">菜單亮點</h2>${menuItems}</div></div>
    <div style="padding:80px 60px;max-width:900px;margin:0 auto;">${m.quotes.map(q=>`<div style="margin-bottom:32px;background:${m.palette.surface};padding:24px;border-radius:18px;"><p style="font-size:24px;font-style:italic;color:${m.palette.text};margin:0 0 16px;line-height:1.5;">\"${H(q.text)}\"</p><p style="font-size:13px;color:${m.palette.muted};margin:0;letter-spacing:0.1em;text-transform:uppercase;">${H(q.author)}</p></div>`).join('')}</div>
    <div style="background:${m.palette.accent};padding:80px 60px;text-align:center;"><p style="font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:${m.palette.bg}CC;margin:0 0 12px;">${H(m.brandName)}</p><h2 style="font-size:44px;font-weight:400;color:${m.palette.bg};margin:0 0 32px;">${H(m.cta)}</h2><p style="font-size:14px;color:${m.palette.bg}AA;margin:0 0 32px;">讓客人在訂位前，就先被料理與空間打動。</p><button style="background:${m.palette.bg};color:${m.palette.text};border:none;padding:16px 48px;font-size:15px;cursor:pointer;font-family:${m.font};font-weight:600;">${H(m.cta)}</button></div>
  </section>`;
}


