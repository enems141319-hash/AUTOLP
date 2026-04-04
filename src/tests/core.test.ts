import { describe, it, expect } from 'vitest';
import { hashString } from '../utils/hash';
import { analyzeBrand } from '../domain/brand-analysis/analyzeBrand';
import { buildLandingModel } from '../domain/landing/buildLandingModel';
import { exportHtml } from '../domain/landing/exportHtml';
import { TEMPLATE_REGISTRY } from '../domain/landing/templates/index';
import { ALL_CATEGORY_IDS } from '../data/styleOptions';
import type { CategoryId } from '../domain/brand-analysis/types';

// ── Hash stability ───────────────────────────────────────────────────────────
describe('hashString', () => {
  it('returns same value for same input', () => {
    expect(hashString('SteelForge')).toBe(hashString('SteelForge'));
  });

  it('returns different values for different inputs', () => {
    expect(hashString('Alpha')).not.toBe(hashString('Beta'));
  });

  it('returns unsigned integer', () => {
    const h = hashString('test');
    expect(h).toBeGreaterThanOrEqual(0);
    expect(Number.isInteger(h)).toBe(true);
  });

  it('maps any string to valid category index', () => {
    const idx = hashString('RandomUnknownBrand') % ALL_CATEGORY_IDS.length;
    expect(idx).toBeGreaterThanOrEqual(0);
    expect(idx).toBeLessThan(ALL_CATEGORY_IDS.length);
  });
});

// ── selectedStyle override ───────────────────────────────────────────────────
describe('analyzeBrand override', () => {
  it('respects manual style selection over auto-detection', () => {
    const result = analyzeBrand('CoffeeShop', 'tech');
    expect(result.category).toBe('tech');
    expect(result.overridden).toBe(true);
    expect(result.confidence).toBe(100);
  });

  it('auto-detects tech keywords correctly', () => {
    const result = analyzeBrand('DataFlowAI', 'auto');
    expect(result.category).toBe('tech');
    expect(result.overridden).toBe(false);
  });

  it('auto-detects beverage keywords', () => {
    const result = analyzeBrand('Brewed Kind Coffee', 'auto');
    expect(result.category).toBe('beverage');
  });

  it('auto-detects legal keywords', () => {
    const result = analyzeBrand('LexGroup Law Firm', 'auto');
    expect(result.category).toBe('legal');
  });

  it('auto-detects Chinese food semantics', () => {
    const result = analyzeBrand('好吃', 'auto');
    expect(result.category).toBe('food');
  });

  it('auto-detects Chinese beverage semantics', () => {
    const result = analyzeBrand('好喝茶飲', 'auto');
    expect(result.category).toBe('beverage');
  });

  it('auto-detects Chinese dining semantics', () => {
    const result = analyzeBrand('鼎王火鍋', 'auto');
    expect(result.category).toBe('dining');
  });

  it('falls back to hash for unknown brand name', () => {
    const r1 = analyzeBrand('Zzzzqqqxxx', 'auto');
    const r2 = analyzeBrand('Zzzzqqqxxx', 'auto');
    expect(r1.category).toBe(r2.category); // stable
    expect(ALL_CATEGORY_IDS).toContain(r1.category);
  });
});

// ── Template registry completeness ──────────────────────────────────────────
describe('TEMPLATE_REGISTRY', () => {
  it('has an entry for every category', () => {
    for (const id of ALL_CATEGORY_IDS) {
      expect(TEMPLATE_REGISTRY[id as CategoryId]).toBeDefined();
      expect(typeof TEMPLATE_REGISTRY[id as CategoryId]).toBe('function');
    }
  });
});

// ── exportHtml basic correctness ─────────────────────────────────────────────
describe('exportHtml', () => {
  it('produces a valid HTML document with brand name', () => {
    const analysis = analyzeBrand('Lumina', 'beauty');
    const model = buildLandingModel(analysis);
    const html = exportHtml(model);

    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('<html');
    expect(html).toContain('Lumina');
    expect(html).toContain('</html>');
  });

  it('does not contain raw script tags from user input', () => {
    const analysis = analyzeBrand('<script>alert(1)</script>', 'tech');
    const model = buildLandingModel(analysis);
    const html = exportHtml(model);
    expect(html).not.toContain('<script>alert');
    expect(html).toContain('&lt;script&gt;');
  });

  it('produces non-empty output for all 15 categories', () => {
    for (const id of ALL_CATEGORY_IDS) {
      const analysis = analyzeBrand('TestBrand', id as CategoryId);
      const model = buildLandingModel(analysis);
      const html = exportHtml(model);
      expect(html.length).toBeGreaterThan(500);
    }
  });
});

// ── Brand name → expected category test cases ────────────────────────────────
describe('Brand detection cases', () => {
  const cases: [string, CategoryId][] = [
    ['SteelForge Solutions', 'engineering'],
    ['LexGroup', 'legal'],
    ['Brewed Kind', 'beverage'],
    ['Nomad Trails', 'travel'],
    ['FinPath Capital', 'finance'],
    ['GlowSkin Serum', 'beauty'],
    ['FitZone Gym', 'health'],
    ['FarmFresh Organic', 'food'],
    ['The Grand Suites', 'hotel'],
    ['Gem & Craft Jewels', 'jewelry'],
  ];

  for (const [brand, expected] of cases) {
    it(`"${brand}" → ${expected}`, () => {
      const result = analyzeBrand(brand, 'auto');
      expect(result.category).toBe(expected);
    });
  }
});
