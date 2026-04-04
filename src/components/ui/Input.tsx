import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
}

export function Input({ label, hint, style, ...props }: InputProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && (
        <label style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>{label}</label>
      )}
      <input
        style={{
          width: '100%',
          padding: '12px 16px',
          fontSize: 16,
          border: '1.5px solid #E2E8F0',
          borderRadius: 8,
          outline: 'none',
          fontFamily: 'inherit',
          background: '#fff',
          color: '#0F172A',
          ...style,
        }}
        {...props}
      />
      {hint && <p style={{ fontSize: 13, color: '#94A3B8', margin: 0 }}>{hint}</p>}
    </div>
  );
}
