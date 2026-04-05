import React from 'react';
import { useGeneratorStore } from '../../store/useGeneratorStore';
import { exportHtml } from '../../domain/landing/exportHtml';
import { renderTemplate } from '../../domain/landing/templates/index';
import { Toolbar } from '../ui/Toolbar';
import { STYLE_OPTIONS } from '../../data/styleOptions';
import { analyzeBrand } from '../../domain/brand-analysis/analyzeBrand';
import { buildLandingModel } from '../../domain/landing/buildLandingModel';

type HotModuleApi = {
  accept: (cb?: () => void) => void;
  on: (event: string, cb: () => void) => void;
  off: (event: string, cb: () => void) => void;
};

export function ResultScreen() {
  const { brandName, selectedStyle, landingModel, reset } = useGeneratorStore();

  if (!landingModel) return null;

  // Recompute from current source data so template/preset edits show up immediately in dev.
  const liveAnalysis = analyzeBrand(brandName || landingModel.brandName, selectedStyle);
  const liveModel = buildLandingModel(liveAnalysis);
  const styleMeta = STYLE_OPTIONS.find((option) => option.value === liveModel.category);
  const [renderNonce, setRenderNonce] = React.useState(0);

  React.useEffect(() => {
    setRenderNonce((value) => value + 1);
  }, []);

  React.useEffect(() => {
    const hot = (import.meta as ImportMeta & { hot?: HotModuleApi }).hot;
    if (!hot) return;
    const rerender = () => setRenderNonce((value) => value + 1);
    hot.accept(() => rerender());
    hot.on('vite:afterUpdate', rerender);
    return () => {
      hot.off('vite:afterUpdate', rerender);
    };
  }, []);

  function handleExport() {
    const html = exportHtml(liveModel);
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${liveModel.brandName.replace(/\s+/g, '-')}-landing.html`;
    link.click();
    URL.revokeObjectURL(url);
  }

  const innerHtml = renderTemplate(liveModel);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <Toolbar
        brandName={liveModel.brandName}
        category={`${styleMeta?.emoji ?? ''} ${styleMeta?.label ?? liveModel.category}`}
        onBack={reset}
        onExport={handleExport}
      />

      <div
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 9998,
          background: 'rgba(15,23,42,0.85)',
          color: '#fff',
          borderRadius: 10,
          padding: '10px 16px',
          fontSize: 12,
          backdropFilter: 'blur(8px)',
          maxWidth: 240,
        }}
      >
        <p style={{ margin: '0 0 4px', color: '#94A3B8' }}>分析結果</p>
        <p style={{ margin: '0 0 2px', fontWeight: 600 }}>
          {styleMeta?.emoji} {styleMeta?.label}
          {liveAnalysis.overridden && (
            <span style={{ color: '#F59E0B', marginLeft: 8, fontWeight: 400 }}>手動指定</span>
          )}
        </p>
        {!liveAnalysis.overridden && (
          <p style={{ margin: 0, color: '#64748B' }}>信心分數 {liveAnalysis.confidence}%</p>
        )}
      </div>

      <div
        key={renderNonce}
        style={{ marginTop: 57, position: 'relative' }}
        dangerouslySetInnerHTML={{ __html: innerHtml }}
      />
    </div>
  );
}
