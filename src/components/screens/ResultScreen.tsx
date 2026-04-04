import React from 'react';
import { useGeneratorStore } from '../../store/useGeneratorStore';
import { exportHtml } from '../../domain/landing/exportHtml';
import { renderTemplate } from '../../domain/landing/templates/index';
import { Toolbar } from '../ui/Toolbar';
import { STYLE_OPTIONS } from '../../data/styleOptions';

export function ResultScreen() {
  const { landingModel, analysisResult, reset } = useGeneratorStore();

  if (!landingModel || !analysisResult) return null;

  const styleMeta = STYLE_OPTIONS.find((o) => o.value === landingModel.category);

  function handleExport() {
    const html = exportHtml(landingModel!);
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${landingModel!.brandName.replace(/\s+/g, '-')}-landing.html`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const innerHtml = renderTemplate(landingModel);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <Toolbar
        brandName={landingModel.brandName}
        category={`${styleMeta?.emoji ?? ''} ${styleMeta?.label ?? landingModel.category}`}
        onBack={reset}
        onExport={handleExport}
      />

      {/* Analysis badge */}
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
          {analysisResult.overridden && (
            <span style={{ color: '#F59E0B', marginLeft: 8, fontWeight: 400 }}>手動</span>
          )}
        </p>
        {!analysisResult.overridden && (
          <p style={{ margin: 0, color: '#64748B' }}>信心度 {analysisResult.confidence}%</p>
        )}
      </div>

      {/* Preview — rendered in a sandboxed iframe-like container */}
      <div
        style={{ marginTop: 57, position: 'relative' }}
        dangerouslySetInnerHTML={{ __html: innerHtml }}
      />
    </div>
  );
}
