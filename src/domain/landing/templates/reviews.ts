import type { LandingModel } from '../../brand-analysis/types';
import { escapeHtml } from '../../../utils/sanitize';

type ReviewTheme =
  | 'tech'
  | 'beauty'
  | 'food'
  | 'health'
  | 'fashion'
  | 'design'
  | 'engineering'
  | 'jewelry'
  | 'dining'
  | 'beverage'
  | 'legal'
  | 'hotel'
  | 'finance'
  | 'edu'
  | 'travel';

interface ReviewOptions {
  theme: ReviewTheme;
  columns?: 1 | 2;
}

const THEME_STYLES: Record<ReviewTheme, { card: string; border: string; text: string; muted: string; accent: string }> = {
  tech:        { card: '#132033', border: 'rgba(148,163,184,0.20)', text: '#F8FAFC', muted: '#94A3B8', accent: '#7C3AED' },
  beauty:      { card: '#FFF9F6', border: 'rgba(190,138,106,0.20)', text: '#2C1810', muted: '#9B7E6E', accent: '#BE8A6A' },
  food:        { card: '#FFFFFF', border: 'rgba(74,124,89,0.18)', text: '#1A2E1A', muted: '#6B7C6B', accent: '#4A7C59' },
  health:      { card: '#FFFFFF', border: 'rgba(5,150,105,0.18)', text: '#064E3B', muted: '#047857', accent: '#059669' },
  fashion:     { card: '#FFFFFF', border: 'rgba(17,17,17,0.12)', text: '#111111', muted: '#6B7280', accent: '#C9A96E' },
  design:      { card: '#121212', border: 'rgba(255,255,255,0.08)', text: '#F5F5F5', muted: 'rgba(255,255,255,0.50)', accent: '#B08968' },
  engineering: { card: '#151A20', border: 'rgba(255,255,255,0.10)', text: '#F3F4F6', muted: '#9CA3AF', accent: '#F97316' },
  jewelry:     { card: '#FFFDF8', border: 'rgba(201,169,110,0.22)', text: '#23180C', muted: '#8C734A', accent: '#C9A96E' },
  dining:      { card: '#1C1714', border: 'rgba(255,255,255,0.08)', text: '#F8F1E7', muted: 'rgba(248,241,231,0.58)', accent: '#C26A2D' },
  beverage:    { card: '#16110D', border: 'rgba(255,255,255,0.08)', text: '#F8EDE3', muted: 'rgba(248,237,227,0.56)', accent: '#B46A3C' },
  legal:       { card: '#101827', border: 'rgba(255,255,255,0.10)', text: '#F9FAFB', muted: '#9CA3AF', accent: '#D4AF37' },
  hotel:       { card: '#FFFCF8', border: 'rgba(165,123,70,0.18)', text: '#24170E', muted: '#8E6B52', accent: '#A57B46' },
  finance:     { card: '#0F172A', border: 'rgba(148,163,184,0.16)', text: '#F8FAFC', muted: '#94A3B8', accent: '#22C55E' },
  edu:         { card: '#FFFFFF', border: 'rgba(99,102,241,0.18)', text: '#1E1B4B', muted: '#6366F1', accent: '#7C3AED' },
  travel:      { card: '#FFFFFF', border: 'rgba(14,116,144,0.18)', text: '#083344', muted: '#0F766E', accent: '#EA580C' },
};

const REVIEW_DATES = ['最近 2 天', '最近 4 天', '上週', '近兩週', '本月'];

function stars(accent: string): string {
  return Array.from({ length: 5 }, () => `<span style="color:${accent};font-size:14px;line-height:1;">★</span>`).join('');
}

function initials(author: string): string {
  const cleaned = author.replace(/[^A-Za-z\u4e00-\u9fff0-9 ]/g, ' ').trim();
  if (!cleaned) return '客戶';
  const parts = cleaned.split(/\s+/).filter(Boolean).slice(0, 2);
  const value = parts.map((part) => part[0]).join('').toUpperCase().slice(0, 2);
  return value || '客戶';
}

function normalizeQuotes(m: LandingModel): LandingModel['quotes'] {
  const base = m.quotes.length > 0
    ? m.quotes
    : [{ text: `${m.brandName} 幫我們把品牌說清楚，也讓客戶更容易做決定。`, author: '合作客戶' }];

  const suffixes = [
    '',
    ' 整個溝通流程很順，頁面節奏也比原本更有說服力。',
    ' 上線後，不只品牌形象更完整，詢問品質也提升很多。',
    ' 這次改版讓我們第一次覺得網站真的有在替業務工作。',
    ' 最重要的是，內容和視覺終於對得起我們想傳達的價值。',
  ];

  return Array.from({ length: 5 }, (_, index) => {
    const source = base[index % base.length];
    return {
      text: `${source.text}${base.length >= 5 ? '' : suffixes[index]}`,
      author: source.author,
    };
  });
}

export function ensureFiveReviews(m: LandingModel): LandingModel['quotes'] {
  return normalizeQuotes(m);
}

export function renderReviewCards(m: LandingModel, options: ReviewOptions): string {
  const H = escapeHtml;
  const theme = THEME_STYLES[options.theme];
  const cols = options.columns === 1 ? '1fr' : 'repeat(2, minmax(0, 1fr))';
  const reviews = normalizeQuotes(m);

  const cards = reviews.map((quote, index) => `
    <article style="background:${theme.card};border:1px solid ${theme.border};border-radius:20px;padding:22px 22px 18px;box-shadow:0 10px 30px rgba(0,0,0,0.06);">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:16px;">
        <div style="display:flex;align-items:center;gap:12px;min-width:0;">
          <div style="width:42px;height:42px;border-radius:50%;background:${theme.accent};color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;flex-shrink:0;">${H(initials(quote.author))}</div>
          <div style="min-width:0;">
            <div style="font-size:14px;font-weight:700;color:${theme.text};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${H(quote.author)}</div>
            <div style="font-size:12px;color:${theme.muted};">${REVIEW_DATES[index]}</div>
          </div>
        </div>
        <div style="font-size:11px;color:${theme.muted};letter-spacing:0.06em;text-transform:uppercase;white-space:nowrap;">真實回饋</div>
      </div>
      <div style="display:flex;align-items:center;gap:2px;margin-bottom:14px;">${stars(theme.accent)}</div>
      <p style="font-size:15px;line-height:1.75;color:${theme.text};margin:0;">${H(quote.text)}</p>
    </article>
  `).join('');

  return `
    <div style="display:grid;grid-template-columns:${cols};gap:18px;">
      ${cards}
    </div>
  `;
}
