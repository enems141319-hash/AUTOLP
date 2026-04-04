import type { LandingModel } from '../../brand-analysis/types';
import { escapeHtml } from '../../../utils/sanitize';

/**
 * Food — BENTO GRID layout: asymmetric mosaic cards,
 * floating blob background, brand name prominent in hero.
 * Effect: floating colour blobs + card hover lift.
 */
export function renderFood(m: LandingModel): string {
  const H = escapeHtml;

  return `
  <style>
    @keyframes blobFloat1 { 0%,100%{transform:translate(0,0) scale(1);} 33%{transform:translate(30px,-20px) scale(1.05);} 66%{transform:translate(-20px,15px) scale(0.97);} }
    @keyframes blobFloat2 { 0%,100%{transform:translate(0,0) scale(1);} 33%{transform:translate(-25px,20px) scale(1.03);} 66%{transform:translate(20px,-10px) scale(0.99);} }
    @keyframes foodFade { from{opacity:0;transform:translateY(24px);} to{opacity:1;transform:translateY(0);} }
    .food-card { transition:transform 0.3s ease,box-shadow 0.3s ease; }
    .food-card:hover { transform:translateY(-6px) scale(1.01); box-shadow:0 20px 50px rgba(0,0,0,0.15) !important; }
    .food-hero-text { animation: foodFade 0.8s ease both; }
  </style>
  <section style="background:${m.palette.bg};font-family:${m.font};color:${m.palette.text};overflow:hidden;">
    <!-- Floating blobs -->
    <div style="position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden;">
      <div style="position:absolute;width:500px;height:500px;background:${m.palette.primary};opacity:0.07;border-radius:50%;top:-100px;left:-100px;filter:blur(80px);animation:blobFloat1 12s ease-in-out infinite;"></div>
      <div style="position:absolute;width:400px;height:400px;background:${m.palette.accent};opacity:0.08;border-radius:50%;bottom:-80px;right:-80px;filter:blur(80px);animation:blobFloat2 15s ease-in-out infinite;"></div>
    </div>

    <nav style="position:relative;z-index:10;padding:24px 60px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid ${m.palette.primary}15;">
      <span style="font-size:22px;font-weight:800;color:${m.palette.primary};">${H(m.brandName)}</span>
      <div style="display:flex;gap:32px;align-items:center;">
        <a style="color:${m.palette.muted};text-decoration:none;font-size:14px;">食材來源</a>
        <a style="color:${m.palette.muted};text-decoration:none;font-size:14px;">訂閱計畫</a>
        <a style="color:${m.palette.muted};text-decoration:none;font-size:14px;">食譜</a>
        <button style="background:${m.palette.primary};color:#fff;border:none;padding:10px 24px;border-radius:24px;font-size:14px;font-weight:700;cursor:pointer;">${H(m.cta)}</button>
      </div>
    </nav>

    <!-- BENTO HERO GRID -->
    <div style="position:relative;z-index:1;padding:40px 60px 60px;max-width:1300px;margin:0 auto;">
      <div style="display:grid;grid-template-columns:3fr 2fr 2fr;grid-template-rows:300px 220px;gap:16px;">

        <!-- Big hero cell -->
        <div class="food-card" style="grid-row:1/3;background:${m.palette.primary};border-radius:20px;overflow:hidden;position:relative;display:flex;flex-direction:column;justify-content:flex-end;">
          <img src="${m.imgs.hero}" alt="hero" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;mix-blend-mode:multiply;opacity:0.6;" />
          <div class="food-hero-text" style="position:relative;padding:36px;">
            <p style="font-size:12px;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.7);margin:0 0 10px;">${H(m.emoji)} 有機直送</p>
            <h1 style="font-size:clamp(28px,3.5vw,48px);font-weight:800;color:#fff;margin:0 0 12px;line-height:1.1;">
              ${H(m.brandName)}<br/><span style="font-size:0.7em;opacity:0.9;">${H(m.tagline)}</span>
            </h1>
            <button style="background:#fff;color:${m.palette.primary};border:none;padding:12px 28px;border-radius:30px;font-size:14px;font-weight:700;cursor:pointer;margin-top:8px;">${H(m.cta)}</button>
          </div>
        </div>

        <!-- Subheadline cell -->
        <div class="food-card" style="background:${m.palette.surface};border-radius:20px;padding:28px;display:flex;flex-direction:column;justify-content:space-between;">
          <p style="font-size:13px;color:${m.palette.muted};text-transform:uppercase;letter-spacing:0.1em;margin:0;">品牌理念</p>
          <p style="font-size:17px;color:${m.palette.text};line-height:1.6;margin:0;">${H(m.subheadline)}</p>
        </div>

        <!-- Image cell -->
        <div class="food-card" style="border-radius:20px;overflow:hidden;">
          <img src="${m.imgs.secondary??m.imgs.hero}" alt="f2" style="width:100%;height:100%;object-fit:cover;display:block;" />
        </div>

        <!-- Pain cell -->
        <div class="food-card" style="background:${m.palette.text};border-radius:20px;padding:28px;display:flex;flex-direction:column;justify-content:flex-end;">
          <p style="font-size:15px;color:rgba(255,255,255,0.7);line-height:1.7;margin:0;">${H(m.pain)}</p>
        </div>

        <!-- Stats cell -->
        <div class="food-card" style="background:${m.palette.accent};border-radius:20px;padding:28px;display:grid;grid-template-columns:1fr 1fr;gap:12px;align-content:center;">
          ${[['100%','有機認證'],['24h','農場直送'],['5★','用戶評價']].map(([v,l])=>`
          <div style="text-align:center;">
            <div style="font-size:24px;font-weight:800;color:${m.palette.primary};">${v}</div>
            <div style="font-size:11px;color:${m.palette.muted};margin-top:2px;">${l}</div>
          </div>`).join('')}
        </div>
      </div>
    </div>

    <!-- SOLUTION -->
    <div style="position:relative;z-index:1;background:${m.palette.primary};padding:60px;">
      <div style="max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:40px;">
        <h2 style="font-size:32px;color:#fff;font-weight:800;margin:0;max-width:500px;line-height:1.3;">${H(m.solution)}</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;max-width:480px;flex-shrink:0;">
          ${m.features.map(f=>`<div style="background:rgba(255,255,255,0.12);border-radius:12px;padding:18px;font-size:14px;color:rgba(255,255,255,0.9);line-height:1.5;">${H(f)}</div>`).join('')}
        </div>
      </div>
    </div>

    <!-- QUOTES -->
    <div style="position:relative;z-index:1;padding:80px 60px;">
      <div style="max-width:900px;margin:0 auto;text-align:center;">
        ${m.quotes.map(q=>`
        <div class="food-card" style="background:${m.palette.surface};border-radius:16px;padding:36px;margin-bottom:20px;">
          <p style="font-size:20px;font-style:italic;color:${m.palette.text};margin:0 0 12px;line-height:1.6;">"${H(q.text)}"</p>
          <p style="font-size:13px;color:${m.palette.muted};margin:0;">— ${H(q.author)}</p>
        </div>`).join('')}
      </div>
    </div>

    <!-- FOOTER CTA -->
    <div style="position:relative;z-index:1;background:${m.palette.text};padding:100px 60px;overflow:hidden;">
      <!-- 裝飾圓 -->
      <div style="position:absolute;right:-80px;top:-80px;width:320px;height:320px;border-radius:50%;background:${m.palette.primary};opacity:0.08;pointer-events:none;"></div>
      <div style="position:absolute;left:-40px;bottom:-60px;width:200px;height:200px;border-radius:50%;background:${m.palette.accent};opacity:0.1;pointer-events:none;"></div>
      <div style="max-width:900px;margin:0 auto;text-align:center;position:relative;z-index:1;">
        <p style="font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin:0 0 16px;">${H(m.brandName)}</p>
        <h2 style="font-size:clamp(32px,5vw,56px);font-weight:800;color:#fff;margin:0 0 16px;line-height:1.15;">
          開始你的<span style="color:${m.palette.accent};">健康旅程</span>
        </h2>
        <p style="font-size:17px;color:rgba(255,255,255,0.55);margin:0 0 40px;max-width:500px;margin-left:auto;margin-right:auto;line-height:1.7;">首週免費配送，隨時可暫停取消</p>
        <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;">
          <button style="background:${m.palette.primary};color:#fff;border:none;padding:16px 48px;border-radius:30px;font-size:16px;font-weight:700;cursor:pointer;font-family:inherit;">${H(m.cta)}</button>
          <button style="background:transparent;color:rgba(255,255,255,0.6);border:1.5px solid rgba(255,255,255,0.2);padding:16px 40px;border-radius:30px;font-size:16px;cursor:pointer;font-family:inherit;">了解更多</button>
        </div>
        <div style="margin-top:48px;display:flex;justify-content:center;gap:40px;border-top:1px solid rgba(255,255,255,0.08);padding-top:40px;">
          ${[['100%','有機認證'],['無','人工添加'],['免費','首週配送']].map(([v,l])=>`
          <div style="text-align:center;">
            <div style="font-size:22px;font-weight:800;color:${m.palette.accent};">${v}</div>
            <div style="font-size:12px;color:rgba(255,255,255,0.4);margin-top:4px;letter-spacing:0.06em;">${l}</div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </section>`;
}
