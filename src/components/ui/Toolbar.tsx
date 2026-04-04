import React from 'react';
import { Button } from './Button';

interface Props {
  brandName: string;
  category: string;
  onBack: () => void;
  onExport: () => void;
}

export function Toolbar({ brandName, category, onBack, onExport }: Props) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #E2E8F0',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <Button variant="ghost" size="sm" onClick={onBack}>
          ← 返回
        </Button>
        <div>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#0F172A' }}>{brandName}</span>
          <span
            style={{
              marginLeft: 10,
              fontSize: 12,
              background: '#F1F5F9',
              color: '#64748B',
              padding: '2px 10px',
              borderRadius: 12,
            }}
          >
            {category}
          </span>
        </div>
      </div>
      <Button size="sm" onClick={onExport}>
        ↓ 匯出 HTML
      </Button>
    </div>
  );
}
