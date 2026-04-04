import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ variant = 'primary', size = 'md', children, style, ...props }: ButtonProps) {
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'inherit',
    fontWeight: 600,
    cursor: 'pointer',
    borderRadius: 8,
    transition: 'opacity 0.15s',
    border: 'none',
    outline: 'none',
    ...getSizeStyle(size),
    ...getVariantStyle(variant),
  };

  return (
    <button style={{ ...base, ...style }} {...props}>
      {children}
    </button>
  );
}

function getSizeStyle(size: 'sm' | 'md' | 'lg'): React.CSSProperties {
  if (size === 'sm') return { fontSize: 13, padding: '8px 16px' };
  if (size === 'lg') return { fontSize: 17, padding: '16px 40px' };
  return { fontSize: 15, padding: '12px 24px' };
}

function getVariantStyle(variant: 'primary' | 'secondary' | 'ghost'): React.CSSProperties {
  if (variant === 'secondary') return { background: '#F1F5F9', color: '#0F172A' };
  if (variant === 'ghost') return { background: 'transparent', color: '#64748B', border: '1.5px solid #E2E8F0' };
  return { background: '#2563EB', color: '#fff' };
}
