import React from 'react';
import type { StyleOption } from '../../domain/brand-analysis/types';
import { STYLE_OPTIONS } from '../../data/styleOptions';

interface Props {
  value: StyleOption;
  onChange: (v: StyleOption) => void;
}

export function StyleSelector({ value, onChange }: Props) {
  return (
    <div>
      <p className="panel-label">Style Override</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {STYLE_OPTIONS.map((opt) => {
          const selected = opt.value === value;

          return (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              title={opt.description}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '9px 13px',
                borderRadius: 999,
                border: selected
                  ? '1px solid rgba(255,77,46,0.55)'
                  : '1px solid rgba(255,255,255,0.1)',
                background: selected
                  ? 'linear-gradient(180deg, rgba(255,77,46,0.18), rgba(255,255,255,0.08))'
                  : 'rgba(255,255,255,0.03)',
                color: selected ? 'var(--color-bone)' : 'var(--color-text-muted)',
                fontSize: 12,
                fontWeight: selected ? 700 : 500,
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.15s',
                boxShadow: selected ? '0 0 24px rgba(255,77,46,0.14)' : 'none',
              }}
              onMouseEnter={(event) => {
                if (!selected) {
                  event.currentTarget.style.borderColor = 'rgba(255,77,46,0.35)';
                  event.currentTarget.style.color = 'rgba(255,255,255,0.92)';
                  event.currentTarget.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(event) => {
                if (!selected) {
                  event.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  event.currentTarget.style.color = 'var(--color-text-muted)';
                  event.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              <span style={{ fontSize: 13 }}>{opt.emoji}</span>
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
