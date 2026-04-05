import React, { useRef } from 'react';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export function MagneticButton({ label, onMouseMove, onMouseLeave, ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | null>(null);

  function handleMove(event: React.MouseEvent<HTMLButtonElement>) {
    const element = ref.current;
    if (!element) return;

    const bounds = element.getBoundingClientRect();
    const offsetX = event.clientX - bounds.left;
    const offsetY = event.clientY - bounds.top;
    const pullX = ((offsetX / bounds.width) - 0.5) * 14;
    const pullY = ((offsetY / bounds.height) - 0.5) * 14;

    element.style.setProperty('--mag-x', `${pullX}px`);
    element.style.setProperty('--mag-y', `${pullY}px`);
    element.style.setProperty('--cursor-x', `${(offsetX / bounds.width) * 100}%`);
    element.style.setProperty('--cursor-y', `${(offsetY / bounds.height) * 100}%`);

    onMouseMove?.(event);
  }

  function handleLeave(event: React.MouseEvent<HTMLButtonElement>) {
    const element = ref.current;
    if (element) {
      element.style.setProperty('--mag-x', '0px');
      element.style.setProperty('--mag-y', '0px');
      element.style.setProperty('--cursor-x', '50%');
      element.style.setProperty('--cursor-y', '50%');
    }

    onMouseLeave?.(event);
  }

  return (
    <button
      {...props}
      ref={ref}
      className={`magnetic-button ${props.className ?? ''}`.trim()}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <span className="magnetic-button-content">
        <span>{label}</span>
        <span className="magnetic-button-arrow" aria-hidden="true">
          ↗
        </span>
      </span>
    </button>
  );
}
