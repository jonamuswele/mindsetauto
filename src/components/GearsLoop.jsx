import { useEffect, useRef } from 'react';

export default function GearsLoop() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;
    let hexes = [];
    let pulseWaves = [];

    const HEX_SIZE = 32;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      buildGrid();
    };

    const buildGrid = () => {
      hexes = [];
      const cols = Math.ceil(canvas.width / (HEX_SIZE * 1.5)) + 2;
      const rows = Math.ceil(canvas.height / (HEX_SIZE * Math.sqrt(3))) + 2;

      for (let col = -1; col < cols; col++) {
        for (let row = -1; row < rows; row++) {
          const x = col * HEX_SIZE * 1.5;
          const y = row * HEX_SIZE * Math.sqrt(3) + (col % 2 === 0 ? 0 : HEX_SIZE * Math.sqrt(3) * 0.5);
          hexes.push({
            x,
            y,
            phase: Math.random() * Math.PI * 2,
            speed: 0.003 + Math.random() * 0.005,
            baseAlpha: 0.02 + Math.random() * 0.04,
            pulseAlpha: 0,
            col,
            row,
          });
        }
      }

      // Seed initial pulse waves
      pulseWaves = [
        { cx: canvas.width * 0.7, cy: canvas.height * 0.45, r: 0, maxR: Math.max(canvas.width, canvas.height) * 0.8, speed: 1.8, alpha: 0.9 },
        { cx: canvas.width * 0.55, cy: canvas.height * 0.6, r: 120, maxR: Math.max(canvas.width, canvas.height) * 0.8, speed: 1.4, alpha: 0.6 },
      ];
    };

    const hexPath = (x, y, size) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const px = x + size * Math.cos(angle);
        const py = y + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    };

    const spawnPulse = () => {
      const cx = canvas.width * 0.55 + (Math.random() - 0.5) * canvas.width * 0.3;
      const cy = canvas.height * 0.5 + (Math.random() - 0.5) * canvas.height * 0.3;
      pulseWaves.push({
        cx,
        cy,
        r: 0,
        maxR: Math.max(canvas.width, canvas.height) * 0.9,
        speed: 1.2 + Math.random() * 1.0,
        alpha: 0.7 + Math.random() * 0.3,
      });
    };

    let lastPulseTime = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;

      // Spawn pulses periodically
      if (time - lastPulseTime > 3.5 + Math.random() * 2) {
        spawnPulse();
        lastPulseTime = time;
      }

      // Advance pulse waves
      for (let i = pulseWaves.length - 1; i >= 0; i--) {
        pulseWaves[i].r += pulseWaves[i].speed;
        if (pulseWaves[i].r > pulseWaves[i].maxR) {
          pulseWaves.splice(i, 1);
        }
      }

      // Draw each hex
      for (const h of hexes) {
        h.phase += h.speed;

        // Base idle glow
        let alpha = h.baseAlpha + Math.sin(h.phase) * 0.015;

        // Apply pulse waves
        let maxPulse = 0;
        for (const wave of pulseWaves) {
          const dx = h.x - wave.cx;
          const dy = h.y - wave.cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const waveWidth = 55;
          const diff = Math.abs(dist - wave.r);
          if (diff < waveWidth) {
            const strength = (1 - diff / waveWidth) * wave.alpha;
            maxPulse = Math.max(maxPulse, strength);
          }
        }

        const totalAlpha = Math.min(alpha + maxPulse * 0.55, 0.75);
        const isCyan = maxPulse > 0.25;
        const isLit = maxPulse > 0.5;

        // Hex fill (only when pulsed)
        if (maxPulse > 0.08) {
          hexPath(h.x, h.y, HEX_SIZE - 2);
          ctx.fillStyle = isCyan
            ? `rgba(56,189,248,${maxPulse * 0.07})`
            : `rgba(255,255,255,${maxPulse * 0.03})`;
          ctx.fill();
        }

        // Hex border
        hexPath(h.x, h.y, HEX_SIZE - 2);
        ctx.shadowBlur = isLit ? 10 : 0;
        ctx.shadowColor = isCyan ? 'rgba(56,189,248,0.7)' : 'rgba(255,255,255,0.3)';
        ctx.strokeStyle = isCyan
          ? `rgba(56,189,248,${totalAlpha})`
          : `rgba(255,255,255,${totalAlpha})`;
        ctx.lineWidth = isLit ? 1.2 : 0.6;
        ctx.stroke();

        // Center dot on high-intensity hexes
        if (maxPulse > 0.7) {
          ctx.shadowBlur = 12;
          ctx.shadowColor = 'rgba(56,189,248,0.9)';
          ctx.fillStyle = `rgba(56,189,248,${maxPulse * 0.9})`;
          ctx.beginPath();
          ctx.arc(h.x, h.y, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.shadowBlur = 0;
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