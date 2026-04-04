import type { LandingModel } from '../../brand-analysis/types';
import { escapeHtml } from '../../../utils/sanitize';

/** Tech — dark hero with floating particle dots, brand name in H1 */
export function renderTech(m: LandingModel): string {
  const H = escapeHtml;
  const features = m.features.map(f => `
    <div style="background:${m.palette.surface};border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:24px 20px;">
      <div style="width:36px;height:4px;background:${m.palette.primary};border-radius:2px;margin-bottom:14px;"></div>
      <p style="margin:0;color:${m.palette.text};font-size:15px;line-height:1.6;">${H(f)}</p>
    </div>`).join('');

  const quotes = m.quotes.map(q => `
    <div style="border-left:3px solid ${m.palette.primary};padding-left:20px;">
      <p style="color:${m.palette.text};font-size:16px;font-style:italic;margin:0 0 10px;">"${H(q.text)}"</p>
      <p style="color:${m.palette.muted};font-size:13px;margin:0;">— ${H(q.author)}</p>
    </div>`).join('');

  // Generate 40 random-ish dots using hash of brandName for determinism
  const dots = Array.from({ length: 40 }, (_, i) => {
    const x = ((i * 73 + 17) % 97);
    const y = ((i * 41 + 53) % 89);
    const s = (i % 3) + 1;
    const d = (i * 0.15).toFixed(1);
    return `<div style="position:absolute;left:${x}%;top:${y}%;width:${s}px;height:${s}px;background:rgba(124,58,237,0.5);border-radius:50%;animation:floatDot ${2 + (i % 3)}s ease-in-out ${d}s infinite alternate;"></div>`;
  }).join('');

  return `
  <style>
    @keyframes floatDot { from { transform: translateY(0) scale(1); opacity:0.4; } to { transform: translateY(-12px) scale(1.4); opacity:1; } }
    @keyframes techFadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
    .tech-hero-content { animation: techFadeUp 0.7s ease both; }
    .tech-hero-img { animation: techFadeUp 0.7s ease 0.2s both; }
  </style>
  <section style="background:${m.palette.bg};min-height:100vh;font-family:${m.font};">
    <nav style="max-width:1200px;margin:0 auto;padding:24px 40px;display:flex;align-items:center;justify-content:space-between;">
      <span style="font-size:20px;font-weight:700;color:${m.palette.text};">${H(m.brandName)}</span>
      <div style="display:flex;gap:32px;align-items:center;">
        <a style="color:${m.palette.muted};text-decoration:none;font-size:14px;">功能</a>
        <a style="color:${m.palette.muted};text-decoration:none;font-size:14px;">定價</a>
        <a style="color:${m.palette.muted};text-decoration:none;font-size:14px;">文件</a>
        <button style="background:${m.palette.primary};color:#fff;border:none;padding:10px 20px;border-radius:8px;font-size:14px;cursor:pointer;font-weight:600;">${H(m.cta)}</button>
      </div>
    </nav>

    <div style="max-width:1200px;margin:0 auto;padding:80px 40px 60px;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;">
      <div class="tech-hero-content">
        <div style="display:inline-block;background:rgba(124,58,237,0.15);color:${m.palette.accent};padding:6px 14px;border-radius:20px;font-size:13px;font-weight:600;margin-bottom:24px;border:1px solid rgba(124,58,237,0.3);">✦ AI-powered</div>
        <h1 style="font-size:clamp(36px,4vw,56px);font-weight:800;color:${m.palette.text};margin:0 0 8px;line-height:1.05;">
          <span style="color:${m.palette.primary};">${H(m.brandName)}</span>
        </h1>
        <h2 style="font-size:clamp(22px,2.5vw,34px);font-weight:700;color:${m.palette.text};margin:0 0 20px;line-height:1.15;">${H(m.tagline)}</h2>
        <p style="font-size:18px;color:${m.palette.muted};line-height:1.7;margin:0 0 36px;">${H(m.subheadline)}</p>
        <div style="display:flex;gap:14px;align-items:center;">
          <button style="background:linear-gradient(135deg,${m.palette.primary},${m.palette.accent});color:#fff;border:none;padding:14px 28px;border-radius:10px;font-size:16px;cursor:pointer;font-weight:700;">${H(m.cta)}</button>
          <a style="color:${m.palette.muted};font-size:14px;text-decoration:none;">▶ 觀看 Demo</a>
        </div>
        <p style="color:${m.palette.muted};font-size:13px;margin-top:16px;">免費試用 14 天，無需信用卡</p>
      </div>
      <div class="tech-hero-img" style="position:relative;border-radius:16px;overflow:hidden;box-shadow:0 40px 80px rgba(0,0,0,0.5);">
        <img src="${m.imgs.hero}" alt="hero" style="width:100%;height:360px;object-fit:cover;display:block;" />
        <div style="position:absolute;inset:0;pointer-events:none;">${dots}</div>
      </div>
    </div>

    <div style="background:${m.palette.surface};border-top:1px solid rgba(255,255,255,0.06);border-bottom:1px solid rgba(255,255,255,0.06);">
      <div style="max-width:1200px;margin:0 auto;padding:32px 40px;display:grid;grid-template-columns:repeat(4,1fr);text-align:center;gap:0;">
        ${[['10,000+','活躍用戶'],['80%','任務自動化率'],['3hr+','每人每天節省'],['98.9%','正常運行時間']].map(([v,l])=>`
        <div style="padding:0 16px;border-right:1px solid rgba(255,255,255,0.06);">
          <div style="font-size:28px;font-weight:800;color:${m.palette.text};">${v}</div>
          <div style="font-size:12px;color:${m.palette.muted};margin-top:4px;text-transform:uppercase;letter-spacing:0.08em;">${l}</div>
        </div>`).join('')}
      </div>
    </div>

    <div style="max-width:900px;margin:80px auto;padding:0 40px;text-align:center;">
      <h2 style="font-size:32px;color:${m.palette.text};font-weight:700;margin:0 0 16px;">你是不是也遇到這個問題？</h2>
      <p style="font-size:18px;color:${m.palette.muted};line-height:1.7;">${H(m.pain)}</p>
    </div>

    <div style="max-width:1200px;margin:0 auto 80px;padding:0 40px;">
      <h2 style="font-size:32px;color:${m.palette.text};text-align:center;margin:0 0 48px;font-weight:700;">核心功能</h2>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:20px;">${features}</div>
    </div>

    <div style="background:${m.palette.surface};padding:80px 40px;">
      <div style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;">
        <img src="${m.imgs.secondary??m.imgs.hero}" alt="solution" style="border-radius:12px;width:100%;height:340px;object-fit:cover;" />
        <div>
          <h2 style="font-size:36px;color:${m.palette.text};font-weight:700;margin:0 0 20px;">我們的解法</h2>
          <p style="font-size:17px;color:${m.palette.muted};line-height:1.8;">${H(m.solution)}</p>
        </div>
      </div>
    </div>

    <div style="max-width:900px;margin:80px auto;padding:0 40px;">
      <h2 style="font-size:32px;color:${m.palette.text};text-align:center;margin:0 0 48px;font-weight:700;">客戶怎麼說</h2>
      <div style="display:flex;flex-direction:column;gap:32px;">${quotes}</div>
    </div>

    <div style="background:linear-gradient(135deg,${m.palette.primary},${m.palette.accent});padding:80px 40px;text-align:center;">
      <h2 style="font-size:40px;color:#fff;font-weight:800;margin:0 0 16px;">準備好了嗎？</h2>
      <p style="font-size:18px;color:rgba(255,255,255,0.8);margin:0 0 32px;">加入 10,000+ 個已經改變工作方式的團隊</p>
      <button style="background:#fff;color:${m.palette.primary};border:none;padding:16px 36px;border-radius:10px;font-size:18px;font-weight:700;cursor:pointer;">${H(m.cta)}</button>
    </div>
  </section>`;
}
