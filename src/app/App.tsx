import React from 'react';
import { useGeneratorStore } from '../store/useGeneratorStore';
import { InputScreen } from '../components/screens/InputScreen';
import { LoadingScreen } from '../components/screens/LoadingScreen';
import { ResultScreen } from '../components/screens/ResultScreen';

export function App() {
  const screen = useGeneratorStore((s) => s.currentScreen);

  if (screen === 'loading') return <LoadingScreen />;
  if (screen === 'result') return <ResultScreen />;
  return <InputScreen />;
}
