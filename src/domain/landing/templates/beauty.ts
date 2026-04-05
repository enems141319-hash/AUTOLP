import type { LandingModel } from '../../brand-analysis/types';
import { escapeHtml } from '../../../utils/sanitize';
import { renderReviewCards } from './reviews';

export function renderBeauty(m: LandingModel): string {
  const H = escapeHtml;
  const beautyFeatureImages = [
    m.imgs.gallery?.[0],
    m.imgs.gallery?.[1],
    m.imgs.gallery?.[2],
    m.imgs.secondary,
    m.imgs.gallery?.[0],
    m.imgs.gallery?.[1],
  ].filter(Boolean) as string[];
  const features = m.features.map((feature, index) => `
    <div style="overflow:hidden;border:1px solid rgba(190,138,106,0.18);border-radius:20px;background:rgba(255,255,255,0.76);backdrop-filter:blur(10px);">
      <img src="${H(beautyFeatureImages[index % beautyFeatureImages.length] ?? m.imgs.secondary ?? m.imgs.hero)}" alt="${H(feature)}" style="width:100%;aspect-ratio:5 / 4;object-fit:cover;display:block;" />
      <div style="padding:18px 18px 20px;">
        <div style="display:inline-flex;align-items:center;justify-content:center;padding:6px 10px;border-radius:999px;background:${m.palette.accent}18;border:1px solid rgba(190,138,106,0.16);margin-bottom:14px;font-size:11px;line-height:1;letter-spacing:0.16em;text-transform:uppercase;color:${m.palette.primary};">${H(m.brandName)}</div>
        <p style="margin:0;color:${m.palette.text};font-size:15px;line-height:1.7;">${H(feature)}</p>
      </div>
    </div>
  `).join('');

  return `
  <style>
    @keyframes beautyFadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
    .beauty-hero-copy { animation: beautyFadeUp 0.72s ease both; }
    .beauty-section-title {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 18px;
    }
    .beauty-section-title::before,
    .beauty-section-title::after {
      content: '';
      width: clamp(56px, 12vw, 124px);
      height: 1px;
      background: linear-gradient(90deg, transparent 0%, ${m.palette.primary} 36%, ${m.palette.accent} 100%);
      box-shadow: 0 0 12px ${m.palette.accent}22;
      opacity: 0.8;
    }
    .beauty-section-title::after {
      transform: scaleX(-1);
    }
    .beauty-nav-links {
      display: flex;
      gap: 30px;
      align-items: center;
      justify-content: flex-end;
    }
    .beauty-nav-cta {
      display: inline-flex;
      align-items: center;
      justify-content: center;
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
    @media (max-width: 1280px) {
      .beauty-nav {
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        gap: 18px !important;
      }
      .beauty-nav-links {
        display: flex !important;
        gap: 18px !important;
        align-items: center;
        justify-content: flex-end;
      }
      .beauty-nav-cta {
        justify-self: auto;
      }
      .beauty-hero-grid {
        grid-template-columns: 1fr !important;
        gap: 32px !important;
      }
      .beauty-hero-copy {
        text-align: center;
        margin: 0 auto;
      }
      .beauty-hero-actions {
        justify-content: center;
      }
      .beauty-feature-grid {
        grid-template-columns: 1fr 1fr !important;
      }
    }
    @media (max-width: 900px) {
      .beauty-nav {
        display: grid !important;
        grid-template-columns: auto 1fr auto;
      }
      .beauty-nav-links {
        width: 100%;
        display: grid !important;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        justify-items: center;
        gap: 6px !important;
        align-items: center;
        align-self: center;
      }
      .beauty-nav-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 32px;
        line-height: 1;
      }
    }
  </style>

  <section class="lp-noise" style="background:${m.palette.bg};font-family:${m.font};color:${m.palette.text};;overflow:hidden">

    <!-- diffuse background orbs -->
    <div class="lp-orb" style="width:600px;height:600px;background:radial-gradient(circle,${m.palette.primary}28 0%,transparent 70%);top:-160px;left:-140px;animation:diffuseFloat 14s ease-in-out infinite;"></div>
    <div class="lp-orb" style="width:480px;height:480px;background:radial-gradient(circle,${m.palette.accent}22 0%,transparent 70%);top:60px;right:-100px;animation:diffuseFloat 18s ease-in-out infinite reverse;"></div>
    <div class="lp-orb" style="width:400px;height:400px;background:radial-gradient(circle,${m.palette.primary}18 0%,transparent 70%);bottom:180px;left:28%;animation:diffuseFloat 22s ease-in-out infinite 4s;"></div>
    <div class="lp-orb" style="width:340px;height:340px;background:radial-gradient(circle,${m.palette.accent}20 0%,transparent 70%);bottom:-60px;right:10%;animation:diffuseFloat 16s ease-in-out infinite 2s;"></div>
    <nav class="beauty-nav" style="padding:26px 60px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(190,138,106,0.16);">
      <span style="font-size:22px;color:${m.palette.text};letter-spacing:0.12em;text-transform:uppercase;">${H(m.brandName)}</span>
      <div class="beauty-nav-links">
        <a class="beauty-nav-link" style="font-size:13px;color:${m.palette.muted};text-decoration:none;">品牌故事</a>
        <a class="beauty-nav-link" style="font-size:13px;color:${m.palette.muted};text-decoration:none;">產品亮點</a>
        <a class="beauty-nav-link" style="font-size:13px;color:${m.palette.muted};text-decoration:none;">使用感受</a>
      </div>
      <div class="beauty-nav-cta">
        <button style="background:${m.palette.primary};color:#fff;border:none;border-radius:999px;padding:12px 24px;font-size:13px;cursor:pointer;">${H(m.cta)}</button>
      </div>
    </nav>

    <div style="position:relative;z-index:2;min-height:700px;overflow:hidden;border-bottom:1px solid rgba(190,138,106,0.16);">
      <img src="${m.imgs.hero}" alt="${H(m.brandName)} 主視覺" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;display:block;filter:brightness(0.9) saturate(0.92);" />
      <div style="position:absolute;inset:0;background:
        linear-gradient(90deg, ${m.palette.bg} 0%, rgba(248,240,234,0.96) 24%, rgba(248,240,234,0.82) 40%, rgba(248,240,234,0.34) 62%, rgba(248,240,234,0.74) 100%),
        linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(248,240,234,0.14) 100%);
      "></div>
      <div style="position:absolute;left:-100px;top:20px;width:320px;height:320px;border-radius:50%;background:${m.palette.accent}22;filter:blur(54px);"></div>
      <div style="position:absolute;right:-60px;bottom:-80px;width:280px;height:280px;border-radius:50%;background:${m.palette.primary}16;filter:blur(56px);"></div>
      <div class="beauty-hero-grid" style="position:relative;z-index:2;max-width:1240px;margin:0 auto;min-height:700px;padding:88px 60px 60px;display:grid;grid-template-columns:minmax(0,1.08fr) minmax(260px,0.92fr);gap:72px;align-items:center;">
        <div class="beauty-hero-copy" style="max-width:640px;">
          <div style="display:inline-flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.42);color:${m.palette.primary};padding:8px 16px;border-radius:999px;font-size:12px;line-height:1;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;margin-bottom:22px;border:1px solid rgba(190,138,106,0.18);backdrop-filter:blur(10px);">精品保養 / 柔和質地 / 儀式感體驗</div>
          <h1 style="font-size:clamp(42px,5vw,74px);line-height:1.04;font-weight:400;margin:0 0 18px;max-width:640px;">${H(m.tagline)}</h1>
          <p style="font-size:17px;line-height:1.9;color:${m.palette.muted};max-width:560px;margin:0 0 30px;">${H(m.subheadline)}</p>
          <div class="beauty-hero-actions" style="display:flex;gap:14px;flex-wrap:wrap;">
            <button style="background:${m.palette.text};color:#fff;border:none;border-radius:999px;padding:14px 28px;font-size:14px;font-weight:700;cursor:pointer;">${H(m.cta)}</button>
            <button style="background:rgba(255,255,255,0.3);color:${m.palette.text};border:1px solid rgba(44,24,16,0.14);border-radius:999px;padding:14px 28px;font-size:14px;cursor:pointer;backdrop-filter:blur(10px);">查看品牌提案</button>
          </div>
        </div>
        <div></div>
      </div>
    </div>

    <div style="max-width:1240px;margin:0 auto;padding:72px 60px;">
      <div>
        <div style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:${m.palette.primary};margin-bottom:14px;">品牌需要被感受</div>
        <h2 style="font-size:34px;line-height:1.2;font-weight:400;margin:0 0 16px;">${H(m.pain)}</h2>
        <p style="font-size:16px;line-height:1.85;color:${m.palette.muted};margin:0 0 26px;">${H(m.solution)}</p>
        <div class="beauty-feature-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">${features}</div>
      </div>
    </div>

    <div style="padding:0 60px 80px;"><div style="max-width:1240px;margin:0 auto;"><div class="beauty-section-title" style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:${m.palette.primary};margin-bottom:18px;text-align:center;">客戶回饋</div>${renderReviewCards(m, { theme: 'beauty', columns: 2 })}</div></div>
  </section>`;
}
