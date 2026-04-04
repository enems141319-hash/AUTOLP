// Core domain types — all other modules depend on these

export type CategoryId =
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

export type StyleOption = 'auto' | CategoryId;

/** Raw preset for a category — all text must be readable UTF-8 */
export interface CategoryPreset {
  type: CategoryId;
  emoji: string;
  industry: string;
  font: string;
  tagline: string;
  subheadline: string;
  cta: string;
  pain: string;
  solution: string;
  features: string[];
  quotes: Array<{ text: string; author: string }>;
  imgs: {
    hero: string;
    secondary?: string;
    gallery?: string[];
  };
  /** CSS color tokens used by template renderer */
  palette: {
    primary: string;
    accent: string;
    bg: string;
    surface: string;
    text: string;
    muted: string;
  };
}

/** Result returned by analyzeBrand() */
export interface BrandAnalysis {
  brandName: string;
  category: CategoryId;
  preset: CategoryPreset;
  /** 0–100 confidence that auto-detected category is correct */
  confidence: number;
  /** true when style was manually selected (not auto) */
  overridden: boolean;
}

/** The flat model passed to templates and exportHtml */
export interface LandingModel {
  brandName: string;
  category: CategoryId;
  tagline: string;
  subheadline: string;
  cta: string;
  pain: string;
  solution: string;
  features: string[];
  quotes: Array<{ text: string; author: string }>;
  imgs: CategoryPreset['imgs'];
  palette: CategoryPreset['palette'];
  font: string;
  emoji: string;
}
