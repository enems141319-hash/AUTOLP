import type { LandingModel } from '../../brand-analysis/types';
import { escapeHtml } from '../../../utils/sanitize';

/** Travel: full-bleed hero and photographic reasons-to-choose grid without icons. */
export function renderTravel(m: LandingModel): string {
  const H = escapeHtml;
  const cardImgs = [
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=900&auto=format&fit=crop&q=80'
  ];
  const featureCards = m.features.map((f, i) => {
    const rotate = ['-2deg','1deg','-1deg','2deg'][i] ?? '0deg';
    const img = cardImgs[i % cardImgs.length];
    return `<div style="background:#fff;border-radius:18px;overflow:hidden;transform:rotate(${rotate});box-shadow:0 12px 40px rgba(0,0,0,0.15);transition:transform 0.4s ease,box-shadow 0.4s ease;cursor:default;" onmouseenter="this.style.transform='rotate(0deg) translateY(-8px)';this.style.boxShadow='0 24px 60px rgba(0,0,0,0.2)'" onmouseleave="this.style.transform='rotate(${rotate})';this.style.boxShadow='0 12px 40px rgba(0,0,0,0.15)'"><img src="${img}" alt="travel card ${i+1}" style="width:100%;height:180px;object-fit:cover;display:block;" /><div style="padding:20px;"><p style="font-size:14px;color:#1A1A1A;line-height:1.7;margin:0;">${H(f)}</p></div></div>`;
  }).join('');
  return `
  <style>
    @keyframes kenBurns { 0% { transform: scale(1) translate(0,0); } 50% { transform: scale(1.06) translate(-1%, -1%); } 100% { transform: scale(1.04) translate(1%, 0.5%); } }
    @keyframes travelTitleIn { from { opacity:0; transform: translateY(40px); } to { opacity:1; transform: translateY(0); } }
    .travel-hero-img { animation: kenBurns 18s ease-in-out infinite alternate; transform-origin: center center; }
    .travel-title { animation: travelTitleIn 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s both; }
  </style>
  <section style="background:${m.palette.bg};font-family:${m.font};color:${m.palette.text};overflow:hidden;">
    <div style="position:relative;height:95vh;overflow:hidden;"><div style="position:absolute;inset:0;overflow:hidden;"><img class="travel-hero-img" src="${m.imgs.hero}" alt="travel" style="width:100%;height:100%;object-fit:cover;" /></div><div style="position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,0.18) 0%,rgba(0,0,0,0.72) 100%);"><nav style="padding:32px 60px;display:flex;align-items:center;justify-content:space-between;"><span style="font-size:24px;font-weight:700;color:#fff;">${H(m.brandName)}</span><div style="display:flex;gap:32px;align-items:center;"><a style="color:rgba(255,255,255,0.85);text-decoration:none;font-size:14px;">Journeys</a><a style="color:rgba(255,255,255,0.85);text-decoration:none;font-size:14px;">Destinations</a><a style="color:rgba(255,255,255,0.85);text-decoration:none;font-size:14px;">Stories</a><button style="background:${m.palette.accent};color:#fff;border:none;padding:10px 24px;border-radius:6px;font-size:14px;font-weight:700;cursor:pointer;">${H(m.cta)}</button></div></nav><div class="travel-title" style="position:absolute;bottom:80px;left:60px;max-width:680px;"><p style="color:${m.palette.accent};font-size:13px;letter-spacing:0.15em;text-transform:uppercase;margin:0 0 16px;">Immersive travel / curated local experiences</p><h1 style="font-size:clamp(36px,5.5vw,72px);color:#fff;font-weight:700;margin:0 0 20px;line-height:1.1;"><span style="font-size:0.55em;opacity:0.7;font-weight:500;display:block;letter-spacing:0.02em;">${H(m.brandName)}</span>${H(m.tagline)}</h1><p style="font-size:17px;color:rgba(255,255,255,0.85);margin:0 0 36px;line-height:1.6;">${H(m.subheadline)}</p><button style="background:${m.palette.accent};color:#fff;border:none;padding:14px 36px;border-radius:6px;font-size:16px;font-weight:700;cursor:pointer;">${H(m.cta)}</button></div></div></div>
    <div style="padding:80px 60px;background:${m.palette.primary};"><div style="max-width:1200px;margin:0 auto;"><div style="text-align:center;margin-bottom:48px;"><h2 style="font-size:32px;font-weight:700;color:#fff;margin:0 0 12px;">為什麼選擇我們</h2><p style="color:rgba(255,255,255,0.7);font-size:15px;">${H(m.pain)}</p></div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:24px;align-items:start;">${featureCards}</div></div></div>
    <div style="max-width:900px;margin:0 auto;padding:80px 60px;text-align:center;"><p style="font-size:20px;color:${m.palette.text};line-height:1.8;">${H(m.solution)}</p></div>
    <div style="background:${m.palette.surface};padding:80px 60px;"><div style="max-width:1000px;margin:0 auto;">${m.quotes.map(q=>`<div style="margin-bottom:28px;background:#fff;padding:24px;border-radius:18px;box-shadow:0 10px 26px rgba(0,0,0,0.06);"><p style="font-size:20px;font-style:italic;color:${m.palette.text};margin:0 0 16px;line-height:1.5;">\"${H(q.text)}\"</p><p style="font-size:13px;color:${m.palette.muted};margin:0;">${H(q.author)}</p></div>`).join('')}</div></div>
    <div style="background:${m.palette.accent};padding:60px;text-align:center;"><h2 style="font-size:40px;color:#fff;font-weight:700;margin:0 0 16px;">${H(m.brandName)}</h2><p style="color:rgba(255,255,255,0.85);font-size:16px;margin:0 0 32px;">Design trips that feel personal and cinematic.</p><button style="background:#fff;color:${m.palette.accent};border:none;padding:16px 48px;font-size:16px;font-weight:700;border-radius:6px;cursor:pointer;">${H(m.cta)}</button></div>
  </section>`;
}

