import type { LandingModel } from '../../brand-analysis/types';
import { escapeHtml } from '../../../utils/sanitize';

/** Hotel — parallax booking hero. Effect: Ken Burns on hero + hover image zoom. */
export function renderHotel(m: LandingModel): string {
  const H = escapeHtml;

  const amenities = m.features.map(f => `
    <div style="display:flex;align-items:center;gap:16px;padding:16px 0;border-bottom:1px solid ${m.palette.muted}15;">
      <div style="width:8px;height:8px;background:${m.palette.accent};flex-shrink:0;transform:rotate(45deg);"></div>
      <p style="margin:0;color:${m.palette.text};font-size:15px;">${H(f)}</p>
    </div>`).join('');

  return `
  <style>
    @keyframes hotelKenBurns {
      0%   { transform: scale(1) translate(0,0); }
      100% { transform: scale(1.08) translate(-1%,-0.5%); }
    }
    @keyframes hotelFade { from{opacity:0;transform:translateY(24px);} to{opacity:1;transform:translateY(0);} }
    .hotel-hero-img { animation: hotelKenBurns 20s ease-in-out infinite alternate; transform-origin:center; }
    .hotel-hero-text { animation: hotelFade 0.9s ease 0.3s both; }
    .hotel-img-zoom { overflow:hidden; }
    .hotel-img-zoom img { transition: transform 0.6s ease; }
    .hotel-img-zoom:hover img { transform: scale(1.04); }
  </style>
  <section style="background:${m.palette.bg};font-family:${m.font};color:${m.palette.text};">
    <div style="position:relative;height:100vh;overflow:hidden;">
      <div style="position:absolute;inset:0;overflow:hidden;">
        <img class="hotel-hero-img" src="${m.imgs.hero}" alt="hotel" style="width:100%;height:100%;object-fit:cover;" />
      </div>
      <div style="position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.65) 100%);">
        <nav style="padding:32px 60px;display:flex;align-items:center;justify-content:space-between;">
          <span style="font-size:24px;font-weight:300;color:#fff;letter-spacing:0.2em;text-transform:uppercase;">${H(m.brandName)}</span>
          <div style="display:flex;gap:32px;align-items:center;">
            <a style="color:rgba(255,255,255,0.85);text-decoration:none;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;">客房</a>
            <a style="color:rgba(255,255,255,0.85);text-decoration:none;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;">體驗</a>
            <a style="color:rgba(255,255,255,0.85);text-decoration:none;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;">餐廳</a>
          </div>
        </nav>

        <div class="hotel-hero-text" style="position:absolute;bottom:0;left:0;right:0;padding:60px;">
          <div style="max-width:580px;margin-bottom:36px;">
            <p style="font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.6);margin:0 0 12px;">${H(m.brandName)}</p>
            <h1 style="font-size:clamp(36px,5vw,72px);color:#fff;font-weight:300;margin:0 0 16px;line-height:1.1;">${H(m.tagline)}</h1>
            <p style="font-size:17px;color:rgba(255,255,255,0.8);margin:0;line-height:1.6;">${H(m.subheadline)}</p>
          </div>
          <!-- BOOKING WIDGET -->
          <div style="background:rgba(255,255,255,0.95);padding:24px 32px;display:inline-flex;gap:24px;align-items:flex-end;border-radius:4px;">
            <div>
              <label style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:${m.palette.muted};display:block;margin-bottom:8px;">入住</label>
              <div style="font-size:16px;font-weight:600;color:${m.palette.text};border-bottom:2px solid ${m.palette.accent};padding-bottom:4px;min-width:100px;">選擇日期</div>
            </div>
            <div>
              <label style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:${m.palette.muted};display:block;margin-bottom:8px;">退房</label>
              <div style="font-size:16px;font-weight:600;color:${m.palette.text};border-bottom:2px solid ${m.palette.accent};padding-bottom:4px;min-width:100px;">選擇日期</div>
            </div>
            <div>
              <label style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:${m.palette.muted};display:block;margin-bottom:8px;">房客</label>
              <div style="font-size:16px;font-weight:600;color:${m.palette.text};border-bottom:2px solid ${m.palette.accent};padding-bottom:4px;">2 位</div>
            </div>
            <button style="background:${m.palette.primary};color:#fff;border:none;padding:14px 28px;font-size:14px;font-weight:600;cursor:pointer;white-space:nowrap;">${H(m.cta)}</button>
          </div>
        </div>
      </div>
    </div>

    <div style="max-width:1200px;margin:0 auto;padding:100px 60px;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;">
      <div>
        <p style="font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:${m.palette.muted};margin:0 0 20px;">我們的故事</p>
        <h2 style="font-size:38px;font-weight:300;color:${m.palette.text};margin:0 0 24px;line-height:1.25;">${H(m.pain)}</h2>
        <p style="font-size:17px;color:${m.palette.muted};line-height:1.8;margin:0 0 32px;">${H(m.solution)}</p>
        <button style="background:transparent;color:${m.palette.primary};border:2px solid ${m.palette.primary};padding:12px 32px;font-size:14px;cursor:pointer;font-family:${m.font};">探索客房</button>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div class="hotel-img-zoom" style="aspect-ratio:3/4;">
          <img src="${m.imgs.hero}" alt="h1" style="width:100%;height:100%;object-fit:cover;display:block;" />
        </div>
        <div class="hotel-img-zoom" style="aspect-ratio:3/4;margin-top:40px;">
          <img src="${m.imgs.secondary??m.imgs.hero}" alt="h2" style="width:100%;height:100%;object-fit:cover;display:block;" />
        </div>
      </div>
    </div>

    <div style="background:${m.palette.surface};padding:80px 60px;">
      <div style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start;">
        <div>
          <h2 style="font-size:32px;font-weight:300;margin:0 0 32px;">每個細節都是刻意的</h2>
          ${amenities}
        </div>
        <div style="position:relative;">
          <div class="hotel-img-zoom">
            <img src="${m.imgs.secondary??m.imgs.hero}" alt="amenities" style="width:100%;height:500px;object-fit:cover;display:block;" />
          </div>
          <div style="position:absolute;bottom:-20px;right:-20px;background:${m.palette.accent};padding:24px;color:${m.palette.surface};text-align:center;">
            <div style="font-size:28px;font-weight:300;">★★★★★</div>
            <div style="font-size:12px;letter-spacing:0.1em;text-transform:uppercase;margin-top:8px;">精品認證</div>
          </div>
        </div>
      </div>
    </div>

    <div style="padding:80px 60px;max-width:1100px;margin:0 auto;">
      <p style="font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:${m.palette.muted};text-align:center;margin:0 0 48px;">旅客口碑</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;">
        ${m.quotes.map(q=>`
        <div>
          <p style="font-size:20px;font-style:italic;color:${m.palette.text};margin:0 0 16px;line-height:1.6;">"${H(q.text)}"</p>
          <p style="font-size:13px;color:${m.palette.muted};margin:0;">— ${H(q.author)}</p>
        </div>`).join('')}
      </div>
    </div>

    <div style="background:${m.palette.primary};color:#fff;text-align:center;padding:80px 40px;">
      <p style="font-size:13px;letter-spacing:0.2em;text-transform:uppercase;opacity:0.6;margin:0 0 12px;">${H(m.brandName)}</p>
      <h2 style="font-size:44px;font-weight:300;margin:0 0 16px;">${H(m.tagline)}</h2>
      <p style="font-size:16px;opacity:0.8;margin:0 0 36px;">最後 3 間客房開放預訂</p>
      <button style="background:#fff;color:${m.palette.primary};border:none;padding:16px 48px;font-size:16px;font-weight:600;cursor:pointer;">${H(m.cta)}</button>
    </div>
  </section>`;
}
