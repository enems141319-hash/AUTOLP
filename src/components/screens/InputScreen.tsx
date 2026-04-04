import React, { useState } from 'react';
import { useGeneratorStore } from '../../store/useGeneratorStore';
import { analyzeBrand } from '../../domain/brand-analysis/analyzeBrand';
import { buildLandingModel } from '../../domain/landing/buildLandingModel';
import { StyleSelector } from '../ui/StyleSelector';
import { sanitizeName } from '../../utils/sanitize';

const C = {
  obsidian: '#050505',
  bone: '#F2F2F2',
  accent: '#EBEBEB',
  primary: '#FF4D2E',
  surface: '#F3F4F4',
  muted: 'rgba(255,255,255,0.6)',
  mutedDark: 'rgba(255,255,255,0.25)',
};

const SAMPLES = ['SteelForge', 'Lumina Skin', 'Brewed Kind', 'LexGroup', 'Nomad Trails', 'FinPath'];

export function InputScreen() {
  const { brandName, selectedStyle, setBrandName, setSelectedStyle, setScreen, setResults } =
    useGeneratorStore();
  const [error, setError] = useState('');
  const [focused, setFocused] = useState(false);

  function handleGenerate() {
    const clean = sanitizeName(brandName);
    if (!clean) {
      setError('請輸入品牌名稱');
      return;
    }
    setError('');
    setScreen('loading');

    setTimeout(() => {
      const analysis = analyzeBrand(clean, selectedStyle);
      const model = buildLandingModel(analysis);
      setResults(analysis, model);
      setScreen('result');
    }, 1800);
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: C.obsidian,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        fontFamily: "'Inter', sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,77,46,0.06) 0%, transparent 70%)',
      }} />

      {/* Top label */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        marginBottom: 48, opacity: 0.5,
      }}>
        <div style={{ width: 20, height: 1, background: C.bone }} />
        <span style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.bone }}>
          Brand Landing Generator
        </span>
        <div style={{ width: 20, height: 1, background: C.bone }} />
      </div>

      {/* Main card */}
      <div style={{
        width: '100%',
        maxWidth: 640,
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Heading */}
        <div style={{ marginBottom: 40 }}>
          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 52px)',
            fontWeight: 800,
            color: C.bone,
            margin: '0 0 14px',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}>
            輸入品牌名稱<br />
            <span style={{ color: C.primary }}>即刻生成官網</span>
          </h1>
          <p style={{ fontSize: 15, color: C.muted, margin: 0, lineHeight: 1.6 }}>
            AI 自動分析品牌屬性，選擇最適合的版型與視覺語言
          </p>
        </div>

        {/* Brand name input */}
        <div style={{ marginBottom: 24 }}>
          <label style={{
            display: 'block', fontSize: 12, fontWeight: 600,
            color: C.mutedDark, letterSpacing: '0.1em',
            textTransform: 'uppercase', marginBottom: 10,
          }}>
            品牌名稱
          </label>
          <div style={{ position: 'relative' }}>
            <input
              value={brandName}
              onChange={(e) => { setBrandName(e.target.value); setError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="例如：Lumina、SteelForge、Brewed Kind..."
              style={{
                width: '100%',
                padding: '16px 20px',
                fontSize: 16,
                background: 'rgba(255,255,255,0.05)',
                border: `1.5px solid ${focused ? C.primary : 'rgba(255,255,255,0.1)'}`,
                borderRadius: 10,
                color: C.bone,
                outline: 'none',
                fontFamily: 'inherit',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box',
              }}
            />
          </div>
          {error && (
            <p style={{ color: C.primary, fontSize: 12, margin: '8px 0 0', opacity: 0.9 }}>{error}</p>
          )}
        </div>

        {/* Style selector */}
        <div style={{ marginBottom: 32 }}>
          <StyleSelector value={selectedStyle} onChange={setSelectedStyle} />
        </div>

        {/* CTA button */}
        <button
          onClick={handleGenerate}
          style={{
            width: '100%',
            padding: '16px',
            background: C.primary,
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            fontSize: 16,
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'inherit',
            letterSpacing: '0.01em',
            transition: 'opacity 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          生成 Landing Page →
        </button>

        {/* Sample brands */}
        <div style={{ marginTop: 28 }}>
          <p style={{
            fontSize: 11, color: C.mutedDark, marginBottom: 10,
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
            快速範例
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {SAMPLES.map((name) => (
              <button
                key={name}
                onClick={() => setBrandName(name)}
                style={{
                  fontSize: 12,
                  padding: '5px 14px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 20,
                  background: 'rgba(255,255,255,0.04)',
                  color: C.muted,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,77,46,0.5)';
                  e.currentTarget.style.color = C.bone;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.color = C.muted;
                }}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <p style={{
        position: 'absolute', bottom: 24,
        fontSize: 11, color: 'rgba(255,255,255,0.2)',
        letterSpacing: '0.05em',
      }}>
        15 個類目 · 6 種明顯不同版型
      </p>
    </div>
  );
}
