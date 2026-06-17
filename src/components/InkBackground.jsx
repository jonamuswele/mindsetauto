import { useEffect, useRef } from 'react';

/**
 * InkBackground
 * Fluid organic ink bleed that breathes slowly across a light canvas.
 * Uses layered metaball-style blobs with Perlin-like noise movement.
 * Renders at low opacity so it reads as atmosphere, not decoration.
 *
 * Props:
 *   intensity  — 0.0–1.0  overall opacity multiplier   (default 0.55)
 *   dark       — bool      use dark ink on light bg vs light ink on dark bg
 */
export default function InkBackground({ intensity = 0.55, dark = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    // ── Simplex-like smooth noise via stacked sines (no library needed) ──
    const noise = (x, y, t) =>
      Math.sin(x * 1.3 + t * 0.41) * Math.cos(y * 0.9 - t * 0.27) * 0.5 +
      Math.sin(x * 0.6 - t * 0.19) * Math.cos(y * 1.7 + t * 0.53) * 0.3 +
      Math.sin(x * 2.1 + t * 0.13) * Math.cos(y * 0.4 - t * 0.37) * 0.2;

    // ── Blob definitions ── each is an ink drop wandering the canvas
    const makeBlob = (seed) => ({
      // Base position as fraction of canvas, offset by seed
      ox: 0.15 + (seed * 0.618033) % 0.75,
      oy: 0.1  + (seed * 0.381966) % 0.85,
      // Radius as fraction of min canvas dimension
      rBase: 0.18 + (seed * 0.234) % 0.22,
      // Individual time offsets so blobs don't move in sync
      tOffX: seed * 2.71,
      tOffY: seed * 1.41,
      tOffR: seed * 3.14,
      // Opacity weight
      alpha: 0.28 + (seed * 0.157) % 0.28,
      // Is this blob a primary (darker) or secondary (lighter) blob?
      primary: seed % 3 !== 0,
    });

    const blobs = Array.from({ length: 7 }, (_, i) => makeBlob(i + 1));

    const handleResize = () => {
      const parent = canvas.parentElement;
      canvas.width  = parent ? parent.clientWidth  : window.innerWidth;
      canvas.height = parent ? parent.clientHeight : window.innerHeight;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.004; // very slow — one full undulation every ~26 seconds

      const W = canvas.width;
      const H = canvas.height;
      const minDim = Math.min(W, H);

      // ── Draw each blob as a radial gradient "ink drop" ──
      for (const b of blobs) {
        // Noise-driven position drift
        const nx = noise(b.ox * 2, b.oy * 1.5, time + b.tOffX);
        const ny = noise(b.ox * 1.5, b.oy * 2, time + b.tOffY);
        const nr = noise(b.rBase * 3, time * 0.5, b.tOffR);

        const cx = (b.ox + nx * 0.14) * W;
        const cy = (b.oy + ny * 0.10) * H;
        const r  = (b.rBase + nr * 0.06) * minDim;

        // Ink colour — dark blobs on light canvas
        const inkAlpha = b.alpha * intensity;

        let innerColor, outerColor;
        if (dark) {
          // Dark navy ink on white canvas (matches --bg-dark)
          const inkR = b.primary ? 10 : 22;
          const inkG = b.primary ? 22 : 36;
          const inkB = b.primary ? 40 : 58;
          innerColor = `rgba(${inkR},${inkG},${inkB},${inkAlpha})`;
          outerColor = `rgba(${inkR},${inkG},${inkB},0)`;
        } else {
          // White ink on dark navy canvas (for inverted sections)
          innerColor = `rgba(255,255,255,${inkAlpha * 0.5})`;
          outerColor = `rgba(255,255,255,0)`;
        }

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        grad.addColorStop(0,    innerColor);
        grad.addColorStop(0.45, innerColor);
        grad.addColorStop(1,    outerColor);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Secondary detail layer: thin ink veins ──
      // Bezier curves that slowly morph — like capillary ink spreading
      ctx.save();
      const veinAlpha = 0.04 * intensity;

      for (let v = 0; v < 5; v++) {
        const tOff = v * 1.73 + time * 0.6;
        const x0 = (0.1 + (v * 0.19) % 0.8) * W;
        const y0 = (0.05 + (v * 0.23) % 0.9) * H;
        const x1 = x0 + Math.sin(tOff * 0.7) * W * 0.22;
        const y1 = y0 + Math.cos(tOff * 0.5) * H * 0.18;
        const x2 = x1 + Math.sin(tOff * 1.1 + 1) * W * 0.15;
        const y2 = y1 + Math.cos(tOff * 0.8 + 2) * H * 0.12;

        const lineColor = dark
          ? `rgba(10,22,40,${veinAlpha})`
          : `rgba(255,255,255,${veinAlpha * 0.4})`;

        ctx.strokeStyle = lineColor;
        ctx.lineWidth   = 1.5 + Math.sin(tOff * 0.3) * 1.0;
        ctx.lineCap     = 'round';
        ctx.shadowBlur  = 0;

        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.bezierCurveTo(
          x0 + (x1 - x0) * 0.3, y0 + (y1 - y0) * 0.1,
          x1 + Math.sin(tOff) * 30, y1 + Math.cos(tOff) * 20,
          x2, y2
        );
        ctx.stroke();
      }
      ctx.restore();

      // ── Grain texture overlay — tiny scattered dots for paper feel ──
      // Only redraw grain every 3 frames (performance)
      if (Math.floor(time * 250) % 3 === 0) {
        const grainAlpha = 0.012 * intensity;
        const grainColor = dark
          ? `rgba(10,22,40,${grainAlpha})`
          : `rgba(255,255,255,${grainAlpha * 0.3})`;

        for (let g = 0; g < 180; g++) {
          const gx = Math.random() * W;
          const gy = Math.random() * H;
          ctx.fillStyle = grainColor;
          ctx.fillRect(gx, gy, 1, 1);
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    const parent = canvas.parentElement;
    if (parent) resizeObserver.observe(parent);
    else window.addEventListener('resize', handleResize);

    handleResize();
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      if (parent) resizeObserver.disconnect();
      else window.removeEventListener('resize', handleResize);
    };
  }, [intensity, dark]);

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
        mixBlendMode: dark ? 'multiply' : 'screen',
      }}
    />
  );
}