import React, { useEffect, useState } from 'react';
import { useGeneratorStore } from '../../store/useGeneratorStore';
import { analyzeBrand } from '../../domain/brand-analysis/analyzeBrand';
import { buildLandingModel } from '../../domain/landing/buildLandingModel';
import { StyleSelector } from '../ui/StyleSelector';
import { sanitizeName } from '../../utils/sanitize';
import { MagneticButton } from '../ui/MagneticButton';

const SAMPLES = ['SteelForge', 'Lumina Skin', 'Brewed Kind', 'LexGroup', 'Nomad Trails', 'FinPath'];

const metrics = [
  ['15', 'Industry Templates'],
  ['3D', 'Hero Motion Layers'],
  ['3s', 'Generation Trigger'],
];

export function InputScreen() {
  const { brandName, selectedStyle, setBrandName, setSelectedStyle, setScreen, setResults } =
    useGeneratorStore();
  const [error, setError] = useState('');
  const [isCompact, setIsCompact] = useState(() => window.innerWidth < 1100);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);

  useEffect(() => {
    function handleResize() {
      setIsCompact(window.innerWidth < 1100);
      setIsMobile(window.innerWidth < 640);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function handleGenerate() {
    const clean = sanitizeName(brandName);
    if (!clean) {
      setError('請先輸入品牌名稱。');
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
    <div className="autolp-shell">
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: 1320,
          margin: '0 auto',
          minHeight: '100vh',
          padding: '36px 22px 30px',
          display: 'grid',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'grid',
            gap: 28,
            gridTemplateColumns: isCompact ? '1fr' : 'minmax(0, 1.12fr) minmax(360px, 0.88fr)',
          }}
        >
          <section style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
            <div
              style={{
                display: 'grid',
                alignContent: 'center',
                gap: 26,
                flex: 1,
                justifyItems: isMobile ? 'center' : 'stretch',
                textAlign: isMobile ? 'center' : 'left',
              }}
            >
              <div className="neon-kicker">SnapCo Branding Generator</div>

              <div style={{ display: 'grid', gap: 18, justifyItems: isMobile ? 'center' : 'stretch' }}>
                <h1
                  className="neon-headline"
                  style={{
                    textAlign: isMobile ? 'center' : 'left',
                    fontSize: isMobile ? 'clamp(3.45rem, 13.8vw, 5rem)' : undefined,
                  }}
                >
                  輸入品牌名稱
                  <br />
                  <span className="neon-headline-accent">
                    <span style={{ fontSize: '1.1em' }}>3</span>秒生成官網
                  </span>
                </h1>
                <p
                  style={{
                    maxWidth: 640,
                    margin: 0,
                    fontSize: 18,
                    lineHeight: 1.7,
                    color: 'var(--text-muted)',
                    textAlign: isMobile ? 'center' : 'left',
                  }}
                >
                  AI 自動分析品牌屬性，選擇最適合的版型與視覺語言
                </p>
              </div>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                <span className="signal-pill">
                  <span className="signal-dot" />
                  Designer Style
                </span>
                <span className="signal-pill">Magnetic CTA</span>
                <span className="signal-pill">Free Download</span>
              </div>
            </div>

            <div
              className="beam-panel"
              style={{
                borderRadius: 28,
                padding: isMobile ? 10 : 16,
                display: 'grid',
                gap: isMobile ? 6 : 14,
                gridTemplateColumns: isMobile ? 'repeat(3, minmax(0, 1fr))' : isCompact ? '1fr' : 'repeat(3, minmax(0, 1fr))',
                marginTop: 'auto',
                justifyItems: isMobile ? 'center' : 'stretch',
              }}
            >
              {metrics.map(([value, label]) => (
                <div
                  key={label}
                  style={{
                    padding: isMobile ? '6px 4px' : '10px 12px',
                    textAlign: isMobile ? 'center' : 'left',
                    justifySelf: isMobile ? 'center' : 'stretch',
                    width: isMobile ? '100%' : 'auto',
                  }}
                >
                  <div style={{ fontSize: isMobile ? 18 : 30, fontWeight: 800, letterSpacing: '-0.04em' }}>{value}</div>
                  <div
                    style={{
                      color: 'var(--text-soft)',
                      fontSize: isMobile ? 10 : 13,
                      lineHeight: isMobile ? 1.2 : 1.4,
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section style={{ display: 'grid', alignContent: 'center' }}>
            <div className="beam-panel" style={{ borderRadius: 32, padding: 28 }}>
              <div style={{ display: 'grid', gap: 22 }}>
                <div>
                  <p className="panel-label">Brand Input</p>
                  <input
                    value={brandName}
                    onChange={(event) => {
                      setBrandName(event.target.value);
                      setError('');
                    }}
                    onKeyDown={(event) => event.key === 'Enter' && handleGenerate()}
                    placeholder="例如 Lumina、SteelForge、Brewed Kind"
                    className="neon-input"
                  />
                  {error && (
                    <p style={{ color: '#FF8A72', fontSize: 12, margin: '10px 0 0', opacity: 0.95 }}>{error}</p>
                  )}
                </div>

                <StyleSelector value={selectedStyle} onChange={setSelectedStyle} />

                <div style={{ display: 'grid', gap: 14 }}>
                  <MagneticButton label="Generate Landing Page" onClick={handleGenerate} />
                  <p style={{ margin: 0, fontSize: 13, color: 'var(--text-soft)', lineHeight: 1.6 }}>
                    依品牌語意自動判斷分類、內容方向與版型，並保留手動風格覆蓋能力。
                  </p>
                </div>

                <div style={{ display: 'grid', gap: 12 }}>
                  <p className="panel-label" style={{ marginBottom: 0 }}>
                    Quick Start Brands
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    {SAMPLES.map((name) => (
                      <button key={name} onClick={() => setBrandName(name)} className="chip-button">
                        {name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <footer
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 16,
            alignItems: 'center',
            marginTop: 24,
            color: 'var(--text-soft)',
            fontSize: 12,
            flexWrap: 'wrap',
          }}
        >
          <span>15 categories · 6 style directions · premium export pipeline</span>
          <span>Obsidian / bone / primary accent / border beam</span>
        </footer>
      </div>
    </div>
  );
}
