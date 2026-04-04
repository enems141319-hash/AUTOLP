import { create } from 'zustand';
import type { BrandAnalysis, LandingModel, StyleOption } from '../domain/brand-analysis/types';

export type Screen = 'input' | 'loading' | 'result';

interface GeneratorState {
  // Inputs
  brandName: string;
  selectedStyle: StyleOption;

  // Flow state
  currentScreen: Screen;

  // Results
  analysisResult: BrandAnalysis | null;
  landingModel: LandingModel | null;

  // Actions
  setBrandName: (name: string) => void;
  setSelectedStyle: (style: StyleOption) => void;
  setScreen: (screen: Screen) => void;
  setResults: (analysis: BrandAnalysis, model: LandingModel) => void;
  reset: () => void;
}

export const useGeneratorStore = create<GeneratorState>((set) => ({
  brandName: '',
  selectedStyle: 'auto',
  currentScreen: 'input',
  analysisResult: null,
  landingModel: null,

  setBrandName: (name) => set({ brandName: name }),
  setSelectedStyle: (style) => set({ selectedStyle: style }),
  setScreen: (screen) => set({ currentScreen: screen }),
  setResults: (analysis, model) => set({ analysisResult: analysis, landingModel: model }),
  reset: () => set({
    brandName: '',
    selectedStyle: 'auto',
    currentScreen: 'input',
    analysisResult: null,
    landingModel: null,
  }),
}));
