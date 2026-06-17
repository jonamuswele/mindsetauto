import { useEffect, useRef } from 'react';

export default function TurbineLoop() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    let time = 0;

    const PARTICLE_COUNT = 320;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(createParticle());
      }
    };

    const createParticle = (fromCenter = false) => {
      const angle = Math.random() * Math.PI * 2;
      const radius = fromCenter
        ? Math.random() * 30
        : Math.random() * 280 + 60;
      return {
        angle,
        radius,
        speed: 0.004 + Math.random() * 0.012,
        radiusSpeed: 0.6 + Math.random() * 1.2,
        size: Math.random() * 1.8 + 0.4,
        alpha: Math.random() * 0.7 + 0.3,
        alphaSpeed: 0.005 + Math.random() * 0.01,
        alphaDir: Math.random() > 0.5 ? 1 : -1,
        cyan: Math.random() > 0.45,
        trail: [],
        trailLength: Math.floor(Math.random() * 8) + 3,
        spiralFactor: 0.012 + Math.random() * 0.018,
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.012;

      const cx = canvas.width * 0.75;
      const cy = canvas.height * 0.5;

      // Faint concentric guide rings
      ctx.shadowBlur = 0;
      for (let r = 60; r <= 300; r += 60) {
        const alpha = 0.025 + (r / 300) * 0.015;
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Radial spokes (very faint)
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2 + time * 0.05;
        ctx.strokeStyle = 'rgba(56,189,248,0.03)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(a) * 320, cy + Math.sin(a) * 320);
        ctx.stroke();
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Spiral inward
        p.angle += p.speed + p.spiralFactor * (1 - p.radius / 300);
        p.radius -= p.radiusSpeed * (1 + (300 - p.radius) / 300);

        // Twinkle
        p.alpha += p.alphaSpeed * p.alphaDir;
        if (p.alpha > 1) { p.alpha = 1; p.alphaDir = -1; }
        if (p.alpha < 0.15) { p.alpha = 0.15; p.alphaDir = 1; }

        const px = cx + Math.cos(p.angle) * p.radius;
        const py = cy + Math.sin(p.angle) * p.radius;

        // Record trail
        p.trail.push({ x: px, y: py });
        if (p.trail.length > p.trailLength) p.trail.shift();

        // Draw trail
        if (p.trail.length > 1) {
          for (let t = 1; t < p.trail.length; t++) {
            const trailAlpha = (t / p.trail.length) * p.alpha * 0.4;
            ctx.strokeStyle = p.cyan
              ? `rgba(56,189,248,${trailAlpha})`
              : `rgba(255,255,255,${trailAlpha})`;
            ctx.lineWidth = p.size * 0.6;
            ctx.shadowBlur = 0;
            ctx.beginPath();
            ctx.moveTo(p.trail[t - 1].x, p.trail[t - 1].y);
            ctx.lineTo(p.trail[t].x, p.trail[t].y);
            ctx.stroke();
          }
        }

        // Draw particle head
        const glow = p.radius < 80 ? 10 : 5;
        ctx.shadowColor = p.cyan ? 'rgba(56,189,248,0.8)' : 'rgba(255,255,255,0.5)';
        ctx.shadowBlur = glow;
        ctx.fillStyle = p.cyan
          ? `rgba(56,189,248,${p.alpha})`
          : `rgba(255,255,255,${p.alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Recycle particle when it reaches the center
        if (p.radius < 18) {
          particles[i] = createParticle();
        }
      }

      // Central singularity core
      ctx.shadowColor = 'rgba(56,189,248,0.9)';
      ctx.shadowBlur = 28;
      ctx.fillStyle = 'rgba(56,189,248,0.15)';
      ctx.beginPath();
      ctx.arc(cx, cy, 16, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(56,189,248,0.9)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, 16, 0, Math.PI * 2);
      ctx.stroke();

      // Inner bright dot
      ctx.shadowBlur = 15;
      ctx.fillStyle = 'rgba(255,255,255,0.95)';
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fill();

      // Outer energy ring pulse
      const pulseR = 22 + Math.sin(time * 2) * 6;
      ctx.shadowColor = 'rgba(56,189,248,0.5)';
      ctx.shadowBlur = 12;
      ctx.strokeStyle = `rgba(56,189,248,${0.3 + Math.sin(time * 2) * 0.2})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, pulseR, 0, Math.PI * 2);
      ctx.stroke();

      animationId = requestAnimationFrame(draw);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    const parent = canvas.parentElement;
    if (parent) {
      resizeObserver.observe(parent);
    } else {
      window.addEventListener('resize', handleResize);
    }

    handleResize();
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      if (parent) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}