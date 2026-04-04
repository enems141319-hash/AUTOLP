import type { BrandAnalysis, LandingModel } from '../brand-analysis/types';
import { ensureFiveReviews } from './templates/reviews';

/**
 * Transform BrandAnalysis into the flat LandingModel that templates consume.
 * All interpolations and substitutions happen here, not in templates.
 */
export function buildLandingModel(analysis: BrandAnalysis): LandingModel {
  const { brandName, preset } = analysis;

  return {
    brandName,
    category: preset.type,
    tagline: preset.tagline,
    subheadline: preset.subheadline,
    cta: preset.cta,
    pain: preset.pain,
    solution: preset.solution,
    features: preset.features,
    quotes: ensureFiveReviews({
      brandName,
      category: preset.type,
      tagline: preset.tagline,
      subheadline: preset.subheadline,
      cta: preset.cta,
      pain: preset.pain,
      solution: preset.solution,
      features: preset.features,
      quotes: preset.quotes,
      imgs: preset.imgs,
      palette: preset.palette,
      font: preset.font,
      emoji: preset.emoji,
    }),
    imgs: preset.imgs,
    palette: preset.palette,
    font: preset.font,
    emoji: preset.emoji,
  };
}
