import type { BrandAnalysis, CategoryId, StyleOption } from './types';
import { PRESETS } from '../../data/brandPresets';
import { ALL_CATEGORY_IDS } from '../../data/styleOptions';
import { SCORING_RULES } from './scoringRules';
import { hashString } from '../../utils/hash';

/**
 * Tokenize brand name: split on camelCase, spaces, hyphens, underscores, &, +.
 * "DataFlowAI" → "data flow ai"  |  "LexGroup" → "lex group"
 * This prevents short regex tokens from matching mid-word (e.g. "api" in "capital").
 */
function tokenize(name: string): string {
  return name
    .replace(/([a-z])([A-Z])/g, '$1 $2')   // camelCase split
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2') // ACRONYMCase split
    .replace(/[&+_\-]/g, ' ')
    .toLowerCase();
}

/**
 * Score each category against the brand name using the scoring rules.
 * Tests rules against both the tokenized and original lowercased name.
 */
function scoreCategories(name: string): Map<CategoryId, number> {
  const lower = name.toLowerCase();
  const tokenized = tokenize(name);
  const scores = new Map<CategoryId, number>(ALL_CATEGORY_IDS.map(id => [id, 0]));

  for (const rule of SCORING_RULES) {
    // Test against tokenized string (catches camelCase tokens with \b boundaries)
    // AND against raw lower (catches explicit multi-word inputs)
    if (rule.pattern.test(tokenized) || rule.pattern.test(lower)) {
      scores.set(rule.category, (scores.get(rule.category) ?? 0) + rule.weight);
    }
  }
  return scores;
}

/**
 * Pick the best-scoring category.
 * If no rule matched (all scores 0) fall back to hash-stable selection.
 */
function pickCategory(name: string, scores: Map<CategoryId, number>): { category: CategoryId; confidence: number } {
  let best: CategoryId = ALL_CATEGORY_IDS[0];
  let bestScore = -1;

  for (const [id, score] of scores) {
    if (score > bestScore) {
      bestScore = score;
      best = id;
    }
  }

  if (bestScore === 0) {
    // No rule matched — deterministic hash fallback
    const idx = hashString(name) % ALL_CATEGORY_IDS.length;
    return { category: ALL_CATEGORY_IDS[idx], confidence: 10 };
  }

  // Confidence: ratio of winning score to maximum possible
  const maxPossible = 30; // rough ceiling
  const confidence = Math.min(100, Math.round((bestScore / maxPossible) * 100));
  return { category: best, confidence };
}

/**
 * Main entry point — pure function, no UI dependencies.
 * When selectedStyle is not 'auto', directly overrides analysis.
 */
export function analyzeBrand(name: string, selectedStyle: StyleOption): BrandAnalysis {
  const cleanName = name.trim() || 'Brand';

  if (selectedStyle !== 'auto') {
    return {
      brandName: cleanName,
      category: selectedStyle,
      preset: PRESETS[selectedStyle],
      confidence: 100,
      overridden: true,
    };
  }

  const scores = scoreCategories(cleanName);
  const { category, confidence } = pickCategory(cleanName, scores);

  return {
    brandName: cleanName,
    category,
    preset: PRESETS[category],
    confidence,
    overridden: false,
  };
}
