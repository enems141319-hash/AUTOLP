import React, { useEffect, useRef } from 'react';

type Particle = {
  angle: number;
  distance: number;
  speed: number;
  size: number;
  color: string;
};

const PARTICLE_COUNT = 120;
const COLORS = [
  'rgba(99, 230, 255, 0.95)',
  'rgba(79, 124, 255, 0.92)',
  'rgba(255, 82, 217, 0.92)',
  'rgba(121, 255, 204, 0.92)',
];

export function ParticleHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({ x: 0.5, y: 0.5, active: false });

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvasElement = canvasRef.current as HTMLCanvasElement;

    const renderingContext = canvasElement.getContext('2d');
    if (!renderingContext) return;
    const context = renderingContext as CanvasRenderingContext2D;

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, (_, index) => ({
      angle: (Math.PI * 2 * index) / PARTICLE_COUNT,
      distance: 30 + Math.random() * 180,
      speed: 0.002 + Math.random() * 0.005,
      size: 0.8 + Math.random() * 2.8,
      color: COLORS[index % COLORS.length],
    }));

    let animationFrame = 0;

    function resize() {
      const parent = canvasElement.parentElement;
      if (!parent) return;

      const { width, height } = parent.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      canvasElement.width = width * ratio;
      canvasElement.height = height * ratio;
      canvasElement.style.width = `${width}px`;
      canvasElement.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function draw(time: number) {
      const { width, height } = canvasElement.getBoundingClientRect();
      const centerX = width * (pointerRef.current.active ? 0.5 + (pointerRef.current.x - 0.5) * 0.08 : 0.5);
      const centerY = height * (pointerRef.current.active ? 0.5 + (pointerRef.current.y - 0.5) * 0.08 : 0.5);

      context.clearRect(0, 0, width, height);

      const backgroundGradient = context.createRadialGradient(
        centerX,
        centerY,
        20,
        centerX,
        centerY,
        width * 0.42
      );
      backgroundGradient.addColorStop(0, 'rgba(99,230,255,0.16)');
      backgroundGradient.addColorStop(0.5, 'rgba(79,124,255,0.08)');
      backgroundGradient.addColorStop(1, 'rgba(0,0,0,0)');

      context.fillStyle = backgroundGradient;
      context.fillRect(0, 0, width, height);

      particles.forEach((particle, index) => {
        const drift = 1 + Math.sin((time * 0.0005) + index) * 0.12;
        const angle = particle.angle + (time * particle.speed);
        const orbitalRadius = particle.distance * drift;
        const pointerWarpX = (pointerRef.current.x - 0.5) * 90;
        const pointerWarpY = (pointerRef.current.y - 0.5) * 90;
        const x = centerX + Math.cos(angle) * orbitalRadius + pointerWarpX * (particle.distance / 220);
        const y = centerY + Math.sin(angle * 1.3) * orbitalRadius * 0.42 + pointerWarpY * (particle.distance / 240);

        context.beginPath();
        context.arc(x, y, particle.size, 0, Math.PI * 2);
        context.fillStyle = particle.color;
        context.shadowBlur = 18;
        context.shadowColor = particle.color;
        context.fill();

        if (index % 3 === 0) {
          context.beginPath();
          context.moveTo(centerX, centerY);
          context.lineTo(x, y);
          context.strokeStyle = particle.color.replace(/0\.9\d\)/, '0.16)');
          context.globalAlpha = 0.24;
          context.lineWidth = 0.5;
          context.stroke();
          context.globalAlpha = 1;
        }
      });

      context.shadowBlur = 0;
      context.beginPath();
      const pulse = 54 + Math.sin(time * 0.002) * 6;
      const coreGradient = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, pulse);
      coreGradient.addColorStop(0, 'rgba(255,255,255,0.92)');
      coreGradient.addColorStop(0.3, 'rgba(99,230,255,0.42)');
      coreGradient.addColorStop(0.7, 'rgba(79,124,255,0.18)');
      coreGradient.addColorStop(1, 'rgba(0,0,0,0)');
      context.fillStyle = coreGradient;
      context.arc(centerX, centerY, pulse, 0, Math.PI * 2);
      context.fill();

      animationFrame = window.requestAnimationFrame(draw);
    }

    function handlePointerMove(event: PointerEvent) {
      const bounds = canvasElement.getBoundingClientRect();
      pointerRef.current = {
        x: (event.clientX - bounds.left) / bounds.width,
        y: (event.clientY - bounds.top) / bounds.height,
        active: true,
      };
    }

    function handlePointerLeave() {
      pointerRef.current = { x: 0.5, y: 0.5, active: false };
    }

    resize();
    animationFrame = window.requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    canvasElement.addEventListener('pointermove', handlePointerMove);
    canvasElement.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      canvasElement.removeEventListener('pointermove', handlePointerMove);
      canvasElement.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return (
    <div className="hero-visual beam-panel" style={{ borderRadius: 32 }}>
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', borderRadius: 32 }}
      />
      <div className="hero-visual-grid" />
      <div className="hero-orb-shell">
        <div className="hero-orb" />
      </div>
      <div
        style={{
          position: 'absolute',
          right: 24,
          bottom: 24,
          width: 'min(68%, 320px)',
          padding: '16px 18px',
          borderRadius: 20,
          border: '1px solid rgba(99, 230, 255, 0.14)',
          background: 'rgba(4, 10, 22, 0.54)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.22)',
        }}
      >
        <p className="panel-label" style={{ marginBottom: 8 }}>
          Signal Stack
        </p>
        <div style={{ display: 'grid', gap: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: 13 }}>
            <span>Interaction</span>
            <span style={{ color: 'var(--text-main)' }}>Tracking / Pull / Beam</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: 13 }}>
            <span>Atmosphere</span>
            <span style={{ color: 'var(--text-main)' }}>Neon Contrast</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: 13 }}>
            <span>Output</span>
            <span style={{ color: 'var(--text-main)' }}>Instant Landing Page</span>
          </div>
        </div>
      </div>
    </div>
  );
}
