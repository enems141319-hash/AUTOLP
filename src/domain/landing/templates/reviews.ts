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

const THEME_STYLES: Record<ReviewTheme, { card: string; border: string; text: string; muted: string; accent: string; chipBg: string; chipText: string }> = {
  tech:        { card: '#132033', border: 'rgba(148,163,184,0.20)', text: '#F8FAFC', muted: '#94A3B8', accent: '#7C3AED', chipBg: 'rgba(124,58,237,0.14)', chipText: '#C4B5FD' },
  beauty:      { card: '#FFF9F6', border: 'rgba(190,138,106,0.20)', text: '#2C1810', muted: '#9B7E6E', accent: '#BE8A6A', chipBg: 'rgba(190,138,106,0.10)', chipText: '#8B5E44' },
  food:        { card: '#FFFFFF', border: 'rgba(74,124,89,0.18)', text: '#1A2E1A', muted: '#6B7C6B', accent: '#4A7C59', chipBg: 'rgba(244,162,97,0.14)', chipText: '#9A5413' },
  health:      { card: '#FFFFFF', border: 'rgba(5,150,105,0.18)', text: '#064E3B', muted: '#047857', accent: '#059669', chipBg: 'rgba(5,150,105,0.10)', chipText: '#047857' },
  fashion:     { card: '#FFFFFF', border: 'rgba(17,17,17,0.12)', text: '#111111', muted: '#6B7280', accent: '#C9A96E', chipBg: 'rgba(201,169,110,0.12)', chipText: '#8B6B35' },
  design:      { card: '#121212', border: 'rgba(255,255,255,0.08)', text: '#F5F5F5', muted: 'rgba(255,255,255,0.50)', accent: '#B08968', chipBg: 'rgba(176,137,104,0.14)', chipText: '#E7C9AF' },
  engineering: { card: '#151A20', border: 'rgba(255,255,255,0.10)', text: '#F3F4F6', muted: '#9CA3AF', accent: '#F97316', chipBg: 'rgba(249,115,22,0.14)', chipText: '#FDBA74' },
  jewelry:     { card: '#FFFDF8', border: 'rgba(201,169,110,0.22)', text: '#23180C', muted: '#8C734A', accent: '#C9A96E', chipBg: 'rgba(201,169,110,0.12)', chipText: '#8B6B35' },
  dining:      { card: '#1C1714', border: 'rgba(255,255,255,0.08)', text: '#F8F1E7', muted: 'rgba(248,241,231,0.58)', accent: '#C26A2D', chipBg: 'rgba(194,106,45,0.16)', chipText: '#F4C191' },
  beverage:    { card: '#16110D', border: 'rgba(255,255,255,0.08)', text: '#F8EDE3', muted: 'rgba(248,237,227,0.56)', accent: '#B46A3C', chipBg: 'rgba(180,106,60,0.16)', chipText: '#E9BF9F' },
  legal:       { card: '#101827', border: 'rgba(255,255,255,0.10)', text: '#F9FAFB', muted: '#9CA3AF', accent: '#D4AF37', chipBg: 'rgba(212,175,55,0.14)', chipText: '#F3D98A' },
  hotel:       { card: '#FFFCF8', border: 'rgba(165,123,70,0.18)', text: '#24170E', muted: '#8E6B52', accent: '#A57B46', chipBg: 'rgba(165,123,70,0.12)', chipText: '#7A5629' },
  finance:     { card: '#0F172A', border: 'rgba(148,163,184,0.16)', text: '#F8FAFC', muted: '#94A3B8', accent: '#22C55E', chipBg: 'rgba(34,197,94,0.14)', chipText: '#86EFAC' },
  edu:         { card: '#FFFFFF', border: 'rgba(99,102,241,0.18)', text: '#1E1B4B', muted: '#6366F1', accent: '#7C3AED', chipBg: 'rgba(124,58,237,0.10)', chipText: '#6D28D9' },
  travel:      { card: '#FFFFFF', border: 'rgba(14,116,144,0.18)', text: '#083344', muted: '#0F766E', accent: '#EA580C', chipBg: 'rgba(234,88,12,0.10)', chipText: '#C2410C' },
};

const REVIEW_DATES = ['2 days ago', '4 days ago', '1 week ago', '2 weeks ago', '3 weeks ago'];

function stars(accent: string): string {
  return Array.from({ length: 5 }, () => `<span style="color:${accent};font-size:14px;line-height:1;">★</span>`).join('');
}

function initials(author: string): string {
  const cleaned = author.replace(/[^A-Za-z\u4e00-\u9fff0-9 ]/g, ' ').trim();
  if (!cleaned) return 'CL';
  const parts = cleaned.split(/\s+/).filter(Boolean).slice(0, 2);
  return parts.map((p) => p[0]).join('').toUpperCase().slice(0, 2);
}

function normalizeQuotes(m: LandingModel): LandingModel['quotes'] {
  const base = m.quotes.length > 0
    ? m.quotes
    : [{ text: `${m.brandName} helped our team move faster with more clarity and trust.`, author: 'Client Team' }];

  const normalized = Array.from({ length: 5 }, (_, index) => {
    const source = base[index % base.length];
    const suffixes = [
      '',
      ' The rollout felt structured and the communication stayed sharp throughout.',
      ' We saw the difference quickly once the new page and story went live.',
      ' The experience now feels far more premium and easier to trust.',
      ' It is the first version that actually feels aligned with our brand.',
    ];

    return {
      text: `${source.text}${base.length >= 5 ? '' : suffixes[index]}`,
      author: source.author,
    };
  });

  return normalized;
}

export function ensureFiveReviews(m: LandingModel): LandingModel['quotes'] {
  return normalizeQuotes(m);
}

export function renderReviewCards(m: LandingModel, options: ReviewOptions): string {
  const H = escapeHtml;
  const t = THEME_STYLES[options.theme];
  const cols = options.columns === 1 ? '1fr' : 'repeat(2, minmax(0, 1fr))';
  const reviews = normalizeQuotes(m);

  const cards = reviews.map((q, index) => `
    <article style="background:${t.card};border:1px solid ${t.border};border-radius:20px;padding:22px 22px 18px;box-shadow:0 10px 30px rgba(0,0,0,0.06);">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:16px;">
        <div style="display:flex;align-items:center;gap:12px;min-width:0;">
          <div style="width:42px;height:42px;border-radius:50%;background:${t.accent};color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;flex-shrink:0;">${H(initials(q.author))}</div>
          <div style="min-width:0;">
            <div style="font-size:14px;font-weight:700;color:${t.text};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${H(q.author)}</div>
            <div style="font-size:12px;color:${t.muted};">${REVIEW_DATES[index]}</div>
          </div>
        </div>
        <div style="background:${t.chipBg};color:${t.chipText};border-radius:999px;padding:6px 10px;font-size:11px;font-weight:700;letter-spacing:0.04em;white-space:nowrap;">Verified Client</div>
      </div>
      <div style="display:flex;align-items:center;gap:2px;margin-bottom:14px;">${stars(t.accent)}</div>
      <p style="font-size:15px;line-height:1.75;color:${t.text};margin:0;">${H(q.text)}</p>
    </article>
  `).join('');

  return `
    <div style="display:grid;grid-template-columns:${cols};gap:18px;">
      ${cards}
    </div>
  `;
}
