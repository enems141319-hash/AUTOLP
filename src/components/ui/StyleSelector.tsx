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
      <p style={{
        fontSize: 12, fontWeight: 600,
        color: 'rgba(255,255,255,0.25)',
        letterSpacing: '0.1em', textTransform: 'uppercase',
        marginBottom: 10, margin: '0 0 10px',
      }}>
        類目 / 風格
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
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
                gap: 5,
                padding: '6px 13px',
                borderRadius: 20,
                border: selected
                  ? '1.5px solid #FF4D2E'
                  : '1px solid rgba(255,255,255,0.1)',
                background: selected
                  ? 'rgba(255,77,46,0.12)'
                  : 'rgba(255,255,255,0.04)',
                color: selected
                  ? '#FF4D2E'
                  : 'rgba(255,255,255,0.5)',
                fontSize: 12,
                fontWeight: selected ? 600 : 400,
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                if (!selected) {
                  e.currentTarget.style.borderColor = 'rgba(255,77,46,0.35)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                }
              }}
              onMouseLeave={e => {
                if (!selected) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
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
