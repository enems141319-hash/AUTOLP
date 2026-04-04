import React, { useEffect, useState } from 'react';
import { useGeneratorStore } from '../../store/useGeneratorStore';

const STEPS = [
  '分析品牌關鍵字...',
  '推斷品牌類目...',
  '選擇最佳版型...',
  '生成內容架構...',
  '組合視覺語言...',
];

export function LoadingScreen() {
  const { brandName, selectedStyle } = useGeneratorStore();
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
      setProgress((p) => Math.min(p + 20, 95));
    }, 350);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#050505',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 32,
        fontFamily: "'Inter', sans-serif",
        color: '#F8FAFC',
      }}
    >
      {/* Spinner */}
      <div
        style={{
          width: 64,
          height: 64,
          border: '3px solid rgba(255,255,255,0.1)',
          borderTop: '3px solid #FF4D2E',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <div style={{ textAlign: 'center', maxWidth: 400 }}>
        <p style={{ fontSize: 14, color: '#94A3B8', margin: '0 0 8px' }}>
          正在生成「{brandName}」的 Landing Page
          {selectedStyle !== 'auto' && ` · ${selectedStyle}`}
        </p>
        <p style={{ fontSize: 20, fontWeight: 600, margin: 0, minHeight: 32 }}>
          {STEPS[step]}
        </p>
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: 320,
          height: 4,
          background: 'rgba(255,255,255,0.1)',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: '#FF4D2E',
            borderRadius: 2,
            transition: 'width 0.3s ease',
          }}
        />
      </div>
    </div>
  );
}
