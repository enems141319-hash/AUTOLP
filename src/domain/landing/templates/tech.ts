import type { LandingModel } from '../../brand-analysis/types';
import { escapeHtml } from '../../../utils/sanitize';

/** Tech: aurora grid hero with luminous motion accents. */
export function renderTech(m: LandingModel): string {
  const H = escapeHtml;
  const techTagline = H(m.tagline).replace(
    ' 聚焦到真正目標',
    `<br/><span style="background:linear-gradient(135deg,${m.palette.primary},${m.palette.accent});-webkit-background-clip:text;background-clip:text;color:transparent;">聚焦到真正目標</span>`
  );
  const featureIcons = [
    `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true"><path d="M12 3v18M3 12h18" stroke="${m.palette.accent}" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="12" r="7" stroke="${m.palette.primary}" stroke-width="1.8"/></svg>`,
    `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="3" stroke="${m.palette.primary}" stroke-width="1.8"/><path d="M8 12h8M8 9h5M8 15h4" stroke="${m.palette.accent}" stroke-width="1.8" stroke-linecap="round"/></svg>`,
    `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true"><path d="M5 17l4-5 3 3 6-8" stroke="${m.palette.accent}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 5v14h14" stroke="${m.palette.primary}" stroke-width="1.8" stroke-linecap="round"/></svg>`,
    `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true"><path d="M7 8h10M7 12h6M7 16h10" stroke="${m.palette.accent}" stroke-width="1.8" stroke-linecap="round"/><rect x="4" y="5" width="16" height="14" rx="3" stroke="${m.palette.primary}" stroke-width="1.8"/></svg>`,
    `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true"><path d="M12 4l7 4v8l-7 4-7-4V8l7-4z" stroke="${m.palette.primary}" stroke-width="1.8"/><path d="M9.5 12l1.7 1.7L14.8 10" stroke="${m.palette.accent}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true"><path d="M7 17h10M9 13h6M11 9h2" stroke="${m.palette.accent}" stroke-width="1.8" stroke-linecap="round"/><path d="M6 4h12l2 4-2 12H6L4 8l2-4z" stroke="${m.palette.primary}" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
  ];
  const featureBodies = [
    '把任務、時程與責任人拉回同一個面板，減少跨工具追蹤的時間成本。',
    '將重複操作交給規則與觸發條件，自動推進流程，讓團隊專注真正決策。',
    '用可視化數據即時掌握流量、效率與異常狀況，讓營運判斷更快更準。',
    '串接既有工具與服務，讓資料同步不中斷，避免資訊孤島持續擴大。',
    '依角色配置可見範圍與操作層級，讓安全與協作能同時成立。',
    '以高穩定架構支撐日常運作，確保高峰流量下依然維持流暢體驗。',
  ];
  const features = m.features.map((f, index) => `
    <div style="background:${m.palette.surface};border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:24px 20px;">
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:16px;">
        <div style="width:48px;height:48px;border-radius:14px;background:linear-gradient(135deg,${m.palette.primary}22,${m.palette.accent}18);border:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;box-shadow:0 0 22px ${m.palette.primary}12;">
          ${featureIcons[index % featureIcons.length]}
        </div>
        <div style="width:36px;height:4px;background:${m.palette.primary};border-radius:2px;"></div>
      </div>
      <h3 style="margin:0 0 10px;color:${m.palette.text};font-size:18px;line-height:1.4;font-weight:700;">${H(f)}</h3>
      <p style="margin:0;color:${m.palette.muted};font-size:14px;line-height:1.75;">${featureBodies[index % featureBodies.length]}</p>
    </div>
  `).join('');
  return `
  <style>
    @keyframes auroraMove { 0% { transform:translate3d(-8%, -6%, 0) scale(1); } 100% { transform:translate3d(8%, 6%, 0) scale(1.08); } }
    @keyframes gridPulse { 0%,100% { opacity:0.16; } 50% { opacity:0.32; } }
    @keyframes techFadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
    @keyframes buttonSweep { from { transform:translateX(-120%); } to { transform:translateX(220%); } }
    @keyframes techBeamSweep { from { transform:translateX(-135%) skewX(-24deg); } to { transform:translateX(235%) skewX(-24deg); } }
    @keyframes techGradientFlow { 0% { background-position: 0% 50%; filter: drop-shadow(0 0 0 rgba(0,0,0,0)); } 50% { background-position: 100% 50%; filter: drop-shadow(0 0 16px rgba(124,58,237,0.2)); } 100% { background-position: 0% 50%; filter: drop-shadow(0 0 0 rgba(0,0,0,0)); } }
    @keyframes techStarGlow { 0%, 100% { transform: translateY(0); filter: drop-shadow(0 0 0 rgba(0,0,0,0)); opacity: 0.88; } 50% { transform: translateY(-1px); filter: drop-shadow(0 0 10px rgba(255,77,46,0.28)) drop-shadow(0 0 18px rgba(139,92,246,0.22)); opacity: 1; } }
    @keyframes techCtaAura { 0%,100% { transform: scale(1) translate3d(0,0,0); opacity: 0.42; } 50% { transform: scale(1.08) translate3d(0,-8px,0); opacity: 0.76; } }
    .tech-hero-content, .tech-hero-img { animation: techFadeUp 0.7s ease both; }
    .tech-hero-img { animation-delay:0.2s; }
    .aurora-a, .aurora-b { position:absolute; border-radius:999px; filter:blur(70px); animation:auroraMove 8s ease-in-out infinite alternate; }
    .aurora-b { animation-direction:alternate-reverse; }
    .grid-overlay { animation:gridPulse 4s ease-in-out infinite; }
    .tech-cta { position:relative; overflow:hidden; }
    .tech-cta::after { content:''; position:absolute; inset:0; background:linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.0) 40%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.0) 60%, transparent 100%); transform:translateX(-120%); animation:buttonSweep 2.6s ease-in-out infinite; }
    .tech-gradient-title {
      background-size: 200% 200% !important;
      animation: techGradientFlow 4.8s ease-in-out infinite;
    }
    .tech-rating-stars {
      display: flex;
      gap: 6px;
      align-items: center;
      margin: 0 0 14px;
    }
    .tech-rating-stars span {
      font-size: 16px;
      line-height: 1;
      background: linear-gradient(135deg, ${m.palette.primary} 0%, ${m.palette.accent} 55%, #ffffff 100%);
      background-size: 180% 180%;
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      text-shadow: 0 0 14px ${m.palette.primary}33;
      animation: techGradientFlow 5.2s ease-in-out infinite, techStarGlow 2.4s ease-in-out infinite;
    }
    .tech-rating-stars span:nth-child(2) { animation-delay: 0.12s; }
    .tech-rating-stars span:nth-child(3) { animation-delay: 0.24s; }
    .tech-rating-stars span:nth-child(4) { animation-delay: 0.36s; }
    .tech-rating-stars span:nth-child(5) { animation-delay: 0.48s; }
    .tech-section-title {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 18px;
    }
    .tech-section-title::before,
    .tech-section-title::after {
      content: '';
      width: clamp(60px, 12vw, 130px);
      height: 1px;
      background: linear-gradient(90deg, transparent 0%, ${m.palette.primary} 35%, ${m.palette.accent} 100%);
      box-shadow: 0 0 14px ${m.palette.primary}22;
      opacity: 0.9;
    }
    .tech-section-title::after {
      transform: scaleX(-1);
    }
    .tech-proof-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      text-align: center;
      gap: 0;
    }
    .tech-bottom-cta {
      position: relative;
      overflow: hidden;
      isolation: isolate;
    }
    .tech-bottom-cta::before {
      content: '';
      position: absolute;
      inset: -12% auto auto -8%;
      width: 320px;
      height: 320px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 32%, transparent 68%);
      filter: blur(18px);
      animation: techCtaAura 6s ease-in-out infinite;
      z-index: 0;
    }
    .tech-bottom-cta::after {
      content: '';
      position: absolute;
      inset: auto -12% -26% auto;
      width: 360px;
      height: 360px;
      border-radius: 50%;
      background: radial-gradient(circle, ${m.palette.accent}38 0%, ${m.palette.primary}20 36%, transparent 72%);
      filter: blur(28px);
      animation: techCtaAura 7.2s ease-in-out infinite reverse;
      z-index: 0;
    }
    .tech-bottom-cta-inner {
      position: relative;
      z-index: 1;
    }
    .tech-bottom-cta-grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px);
      background-size: 56px 56px;
      mask-image: radial-gradient(circle at center, black 26%, transparent 88%);
      opacity: 0.32;
      pointer-events: none;
      z-index: 0;
    }
    .tech-bottom-cta-line {
      position: absolute;
      left: 32px;
      right: 32px;
      top: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.82) 24%, ${m.palette.accent} 50%, rgba(255,255,255,0.82) 76%, transparent 100%);
      box-shadow: 0 0 16px rgba(255,255,255,0.35), 0 0 34px ${m.palette.accent};
      pointer-events: none;
      z-index: 1;
    }
    .tech-nav-links {
      display: flex;
      gap: 32px;
      align-items: center;
    }
    .tech-nav-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 32px;
      line-height: 1;
    }
    .tech-nav-cta {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .tech-nav-brand {
      display: inline-flex;
      align-items: center;
      min-height: 32px;
      line-height: 1;
    }
    @media (max-width: 1280px) {
      .tech-nav {
        display: grid !important;
        grid-template-columns: auto 1fr auto;
        align-items: center !important;
        gap: 18px !important;
      }
      .tech-nav-links {
        width: 100%;
        display: grid !important;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        justify-items: center;
        gap: 0 !important;
        align-items: center;
        align-self: center;
      }
      .tech-nav-link {
        min-height: 32px;
        line-height: 1;
        align-self: center;
      }
      .tech-nav-cta {
        justify-self: end;
      }
      .tech-proof-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      }
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
      .tech-hero-grid {
        grid-template-columns: 1fr !important;
        justify-items: center;
        gap: 42px !important;
      }
      .tech-hero-content {
        text-align: center;
        justify-self: center;
        margin: 0 auto;
      }
      .tech-hero-actions {
        justify-content: center;
      }
      .tech-hero-img {
        width: 100%;
        justify-content: center;
      }
      .tech-solution-grid {
        grid-template-columns: 1fr !important;
        align-items: start !important;
        gap: 28px !important;
      }
      .tech-solution-card {
        justify-self: stretch !important;
        width: 100% !important;
        max-width: 560px;
      }
      .tech-solution-card-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      }
    }
    @media (max-width: 760px) {
      .tech-nav {
        grid-template-columns: auto 1fr auto !important;
        grid-template-rows: 1fr !important;
        align-items: center !important;
        min-height: 72px;
        column-gap: 10px !important;
      }
      .tech-nav > .tech-nav-links,
      .tech-nav > .tech-nav-cta {
        width: auto !important;
      }
      .tech-nav-links {
        grid-column: 2;
        grid-row: 1;
        min-height: 40px;
        align-self: center;
      }
      .tech-nav-cta {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        grid-column: 3;
        grid-row: 1;
        justify-self: end;
        align-self: center;
        height: 40px;
      }
      .tech-nav-brand {
        display: flex;
        align-items: center;
        grid-column: 1;
        grid-row: 1;
        align-self: center;
        height: 40px;
        transform: translateY(5%);
      }
      .tech-solution-wrap {
        min-height: auto !important;
      }
      .tech-solution-grid {
        padding: 32px 22px !important;
      }
      .tech-solution-copy {
        max-width: none !important;
      }
    }
  </style>
  <section class="lp-noise" style="background:${m.palette.bg};min-height:100vh;font-family:${m.font};position:relative;overflow:hidden;">

    <!-- diffuse background orbs -->
    <div class="lp-orb" style="width:600px;height:600px;background:radial-gradient(circle,${m.palette.primary}28 0%,transparent 70%);top:-160px;left:-140px;animation:diffuseFloat 14s ease-in-out infinite;"></div>
    <div class="lp-orb" style="width:480px;height:480px;background:radial-gradient(circle,${m.palette.accent}22 0%,transparent 70%);top:60px;right:-100px;animation:diffuseFloat 18s ease-in-out infinite reverse;"></div>
    <div class="lp-orb" style="width:400px;height:400px;background:radial-gradient(circle,${m.palette.primary}18 0%,transparent 70%);bottom:180px;left:28%;animation:diffuseFloat 22s ease-in-out infinite 4s;"></div>
    <div class="lp-orb" style="width:340px;height:340px;background:radial-gradient(circle,${m.palette.accent}20 0%,transparent 70%);bottom:-60px;right:10%;animation:diffuseFloat 16s ease-in-out infinite 2s;"></div>
    <div class="aurora-a" style="width:360px;height:360px;left:-80px;top:80px;background:${m.palette.primary}55;"></div>
    <div class="aurora-b" style="width:300px;height:300px;right:-60px;top:140px;background:${m.palette.accent}55;"></div>
    <div class="grid-overlay" style="position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);background-size:36px 36px;"></div>
    <nav class="tech-nav" style="position:relative;z-index:2;max-width:1200px;margin:0 auto;padding:24px 40px;display:flex;align-items:center;justify-content:space-between;"><span class="tech-nav-brand" style="font-size:20px;font-weight:700;color:${m.palette.text};">${H(m.brandName)}</span><div class="tech-nav-links"><a class="tech-nav-link" style="color:${m.palette.muted};text-decoration:none;font-size:14px;">產品</a><a class="tech-nav-link" style="color:${m.palette.muted};text-decoration:none;font-size:14px;">平台</a><a class="tech-nav-link" style="color:${m.palette.muted};text-decoration:none;font-size:14px;">安全機制</a></div><div class="tech-nav-cta"><button class="tech-cta" style="background:${m.palette.primary};color:#fff;border:none;padding:10px 20px;border-radius:10px;font-size:14px;cursor:pointer;font-weight:600;">${H(m.cta)}</button></div></nav>
    <div style="position:relative;z-index:2;min-height:700px;overflow:hidden;border-bottom:1px solid rgba(255,255,255,0.06);">
      <div style="position:absolute;inset:0;background-image:url('${m.imgs.hero}');background-size:cover;background-position:center;background-repeat:no-repeat;background-attachment:fixed;filter:brightness(0.56) saturate(0.95);transform:translateZ(0);"></div>
      <div style="position:absolute;inset:0;background:
        linear-gradient(90deg, ${m.palette.bg} 0%, rgba(15,23,42,0.97) 24%, rgba(15,23,42,0.88) 40%, rgba(15,23,42,0.42) 62%, rgba(15,23,42,0.76) 100%),
        linear-gradient(180deg, rgba(15,23,42,0.12) 0%, rgba(15,23,42,0.36) 100%);
      "></div>
      <div class="tech-hero-grid" style="position:relative;z-index:2;max-width:1200px;margin:0 auto;min-height:700px;padding:84px 40px 60px;display:grid;grid-template-columns:minmax(0,1.02fr) minmax(340px,0.98fr);gap:80px;align-items:center;">
        <div class="tech-hero-content" style="max-width:560px;">
          <div style="display:inline-flex;align-items:center;justify-content:center;background:rgba(124,58,237,0.15);color:${m.palette.accent};padding:5px 12px;border-radius:20px;font-size:13px;line-height:1;font-weight:600;margin-bottom:20px;border:1px solid rgba(124,58,237,0.3);">AI 原生平台</div>
          <h1 style="font-size:clamp(38px,4.4vw,62px);font-weight:800;color:${m.palette.text};margin:0 0 10px;line-height:1.03;"><span style="color:${m.palette.primary};display:block;">${H(m.brandName)}</span>${techTagline}</h1>
          <p style="font-size:18px;color:${m.palette.muted};line-height:1.8;margin:0 0 36px;">${H(m.subheadline)}</p>
          <div class="tech-hero-actions" style="display:flex;gap:14px;align-items:center;flex-wrap:wrap;"><button class="tech-cta" style="background:linear-gradient(135deg,${m.palette.primary},${m.palette.accent});color:#fff;border:none;padding:15px 30px;border-radius:12px;font-size:16px;cursor:pointer;font-weight:700;">${H(m.cta)}</button><a style="color:${m.palette.muted};font-size:14px;text-decoration:none;">觀看示範</a></div>
        </div>
        <div class="tech-hero-img" style="display:flex;justify-content:center;align-items:center;height:100%;">
          <div style="position:relative;width:min(100%, 480px);border-radius:20px;overflow:hidden;box-shadow:0 0 0 1px rgba(255,255,255,0.08), 0 0 36px ${m.palette.primary}22, 0 0 80px ${m.palette.accent}18, 0 40px 80px rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.08);background:linear-gradient(180deg, rgba(15,23,42,0.54), rgba(15,23,42,0.86));backdrop-filter:blur(12px);padding:22px;">
            <div style="position:absolute;inset:0;background:linear-gradient(180deg, rgba(255,255,255,0.08), transparent 38%);pointer-events:none;"></div>
            <div style="position:absolute;inset:-20% auto auto -14%;width:180px;height:180px;border-radius:50%;background:${m.palette.primary}22;filter:blur(36px);pointer-events:none;"></div>
            <div style="position:absolute;inset:auto -10% -24% auto;width:220px;height:220px;border-radius:50%;background:${m.palette.accent}18;filter:blur(40px);pointer-events:none;"></div>
            <div style="position:absolute;top:0;bottom:0;left:-30%;width:22%;background:linear-gradient(90deg, transparent 0%, ${m.palette.primary}00 18%, ${m.palette.primary}55 48%, ${m.palette.accent}88 52%, ${m.palette.primary}55 56%, ${m.palette.primary}00 82%, transparent 100%);filter:blur(10px);opacity:0.85;mix-blend-mode:screen;pointer-events:none;animation:techBeamSweep 4.6s linear infinite;"></div>
            <div style="position:absolute;left:18px;right:18px;top:0;height:1px;background:linear-gradient(90deg, transparent 0%, ${m.palette.accent} 18%, ${m.palette.primary} 50%, ${m.palette.accent} 82%, transparent 100%);box-shadow:0 0 18px ${m.palette.accent}, 0 0 30px ${m.palette.primary};pointer-events:none;"></div>
            <div style="position:relative;z-index:1;font-size:12px;color:${m.palette.accent};letter-spacing:0.14em;text-transform:uppercase;margin-bottom:10px;">即時數據</div>
            <div style="position:relative;z-index:1;font-size:22px;color:${m.palette.text};font-weight:700;margin-bottom:18px;">Latency down 42%</div>
            <div style="position:relative;z-index:1;margin-bottom:18px;background:rgba(15,23,42,0.42);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:14px 14px 10px;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                <div style="font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:${m.palette.muted};">Realtime Throughput</div>
                <div style="font-size:11px;color:${m.palette.accent};font-weight:700;">+18.4%</div>
              </div>
              <svg viewBox="0 0 320 120" style="width:100%;display:block;" fill="none">
                ${[20, 40, 60, 80, 100].map((y) => `<line x1="0" y1="${y}" x2="320" y2="${y}" stroke="rgba(255,255,255,0.07)" stroke-width="1" />`).join('')}
                ${[40, 80, 120, 160, 200, 240, 280].map((x) => `<line x1="${x}" y1="0" x2="${x}" y2="120" stroke="rgba(255,255,255,0.04)" stroke-width="1" />`).join('')}
                <defs>
                  <linearGradient id="techCardLine" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stop-color="${m.palette.primary}" />
                    <stop offset="100%" stop-color="${m.palette.accent}" />
                  </linearGradient>
                </defs>
                <polyline points="0,94 32,90 64,82 96,86 128,62 160,66 192,48 224,54 256,34 288,22 320,16" stroke="url(#techCardLine)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                <polygon points="0,94 32,90 64,82 96,86 128,62 160,66 192,48 224,54 256,34 288,22 320,16 320,120 0,120" fill="${m.palette.primary}" opacity="0.12"/>
                <circle cx="320" cy="16" r="4" fill="${m.palette.accent}" />
              </svg>
            </div>
            <div style="position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;">
              ${[['99.99%','Uptime'],['42%','Latency'],['18ms','Sync']].map(([v,l])=>`<div style="background:rgba(15,23,42,0.66);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:14px 12px;"><div style="font-size:18px;font-weight:700;color:${m.palette.text};">${v}</div><div style="font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:${m.palette.muted};margin-top:4px;">${l}</div></div>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="background:${m.palette.surface};border-top:1px solid rgba(255,255,255,0.06);border-bottom:1px solid rgba(255,255,255,0.06);position:relative;z-index:2;"><div class="tech-proof-grid" style="max-width:1200px;margin:0 auto;padding:32px 40px;">${[['10,000+','團隊採用'],['80%','流程自動化'],['3hr+','每日節省'],['98.9%','系統穩定度']].map(([v,l])=>`<div style="padding:0 16px;border-right:1px solid rgba(255,255,255,0.06);"><div style="font-size:28px;font-weight:800;color:${m.palette.accent};">${v}</div><div style="font-size:12px;color:${m.palette.muted};margin-top:4px;text-transform:uppercase;letter-spacing:0.08em;">${l}</div></div>`).join('')}</div></div>
    <div style="max-width:900px;margin:80px auto;padding:0 40px;text-align:center;position:relative;z-index:2;"><h2 class="tech-gradient-title" style="font-size:32px;font-weight:900;margin:0 0 16px;background:linear-gradient(135deg,${m.palette.primary},${m.palette.accent},${m.palette.primary});-webkit-background-clip:text;background-clip:text;color:transparent;text-shadow:0 0 18px ${m.palette.primary}55, 0 0 36px ${m.palette.primary}22;">他們為什麼選擇「${H(m.brandName)}」</h2><p style="font-size:18px;color:${m.palette.muted};line-height:1.7;">${H(m.pain)}</p></div>
    <div style="max-width:1200px;margin:0 auto 80px;padding:0 40px;position:relative;z-index:2;"><h2 style="font-size:32px;color:${m.palette.text};text-align:center;margin:0 0 48px;font-weight:700;">核心能力</h2><div style="display:grid;grid-template-columns:repeat(2,1fr);gap:20px;">${features}</div></div>
    <div style="position:relative;z-index:2;padding:0 40px 80px;">
      <div class="tech-solution-wrap" style="max-width:1200px;margin:0 auto;position:relative;overflow:hidden;border-radius:32px;border:1px solid rgba(255,255,255,0.08);min-height:520px;box-shadow:0 36px 80px rgba(0,0,0,0.32);background:${m.palette.surface};">
        <img src="${m.imgs.secondary ?? m.imgs.hero}" alt="solution" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;display:block;filter:brightness(0.58) saturate(0.95);" />
        <div style="position:absolute;inset:0;background:
          linear-gradient(90deg, rgba(15,23,42,0.96) 0%, rgba(15,23,42,0.92) 34%, rgba(15,23,42,0.58) 58%, rgba(15,23,42,0.32) 100%),
          linear-gradient(180deg, rgba(15,23,42,0.12) 0%, rgba(15,23,42,0.44) 100%);
        "></div>
        <div style="position:absolute;left:-80px;top:-60px;width:240px;height:240px;border-radius:50%;background:${m.palette.primary}20;filter:blur(40px);"></div>
        <div style="position:absolute;right:-60px;bottom:-80px;width:280px;height:280px;border-radius:50%;background:${m.palette.accent}16;filter:blur(54px);"></div>
        <div class="tech-solution-grid" style="position:relative;z-index:1;display:grid;grid-template-columns:minmax(0,1.02fr) minmax(300px,0.98fr);gap:56px;align-items:end;min-height:520px;padding:56px;">
          <div class="tech-solution-copy" style="max-width:560px;">
            <div style="display:inline-flex;align-items:center;gap:10px;padding:8px 14px;border-radius:999px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);margin-bottom:20px;">
              <span style="width:8px;height:8px;border-radius:50%;background:${m.palette.primary};box-shadow:0 0 16px ${m.palette.primary};"></span>
              <span style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:${m.palette.accent};">Unified Operations Layer</span>
            </div>
            <h2 style="font-size:clamp(34px,4vw,48px);color:${m.palette.text};font-weight:800;line-height:1.08;margin:0 0 18px;">營運資訊更清楚</h2>
            <p style="font-size:18px;color:rgba(255,255,255,0.78);line-height:1.9;margin:0 0 28px;">${H(m.solution)}</p>
            <div style="display:flex;flex-wrap:wrap;gap:12px;">
              ${['任務集中', '資訊同步', '決策加速'].map((label) => `<div style="padding:10px 16px;border-radius:999px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);font-size:13px;color:${m.palette.text};font-weight:600;">${label}</div>`).join('')}
            </div>
          </div>
          <div class="tech-solution-card" style="display:grid;gap:16px;justify-self:end;width:min(100%, 380px);">
            <div style="background:rgba(8,15,32,0.74);border:1px solid rgba(255,255,255,0.08);backdrop-filter:blur(16px);border-radius:22px;padding:20px;box-shadow:0 0 0 1px rgba(255,255,255,0.02), 0 0 28px ${m.palette.primary}16;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
                <div style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:${m.palette.accent};">Flow Status</div>
                <div style="font-size:12px;color:${m.palette.text};font-weight:700;">Live</div>
              </div>
              <div class="tech-solution-card-grid" style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;align-items:stretch;">
                ${[['14', '活躍流程'], ['9', '跨部門節點'], ['24h', '同步週期'], ['86%', '可視化覆蓋']].map(([value, label]) => `<div style="min-width:0;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:14px 12px;"><div style="font-size:22px;font-weight:800;color:${m.palette.text};line-height:1;">${value}</div><div style="font-size:11px;color:${m.palette.muted};margin-top:6px;letter-spacing:0.08em;text-transform:uppercase;">${label}</div></div>`).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="max-width:900px;margin:80px auto;padding:0 40px;position:relative;z-index:2;"><h2 class="tech-section-title" style="font-size:32px;color:${m.palette.text};text-align:center;margin:0 0 48px;font-weight:700;">客戶回饋</h2>${m.quotes.map(q=>`<div style="margin-bottom:20px;background:${m.palette.surface};border:1px solid rgba(255,255,255,0.08);padding:24px;border-radius:16px;"><div class="tech-rating-stars">${Array.from({ length: 5 }, () => '<span>★</span>').join('')}</div><p style="color:${m.palette.text};font-size:16px;font-style:italic;margin:0 0 10px;line-height:1.7;">\"${H(q.text)}\"</p><p style="color:${m.palette.muted};font-size:13px;margin:0;">${H(q.author)}</p></div>`).join('')}</div>
    <div class="tech-bottom-cta" style="background:linear-gradient(135deg,${m.palette.primary},${m.palette.accent});padding:80px 40px;text-align:center;position:relative;z-index:2;"><div class="tech-bottom-cta-grid"></div><div class="tech-bottom-cta-line"></div><div class="tech-bottom-cta-inner"><h2 style="font-size:40px;color:#fff;font-weight:800;margin:0 0 16px;text-shadow:0 0 22px rgba(255,255,255,0.16), 0 0 44px rgba(124,58,237,0.18);">更快把下一套系統做對</h2><p style="font-size:18px;color:rgba(255,255,255,0.8);margin:0 0 32px;">${H(m.cta)}</p><button class="tech-cta" style="background:#fff;color:${m.palette.primary};border:none;padding:16px 36px;border-radius:12px;font-size:18px;font-weight:700;cursor:pointer;box-shadow:0 0 0 1px rgba(255,255,255,0.14), 0 18px 38px rgba(0,0,0,0.18), 0 0 30px rgba(255,255,255,0.24);">${H(m.cta)}</button></div></div>
  </section>`;
}


