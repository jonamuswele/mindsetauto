import { useEffect, useRef } from 'react';

export default function PulseTelemetryLoop() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let sweepAngle = 0;
    let pulses = [];

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width * 0.78;
      const cy = canvas.height * 0.5;
      const maxRadius = Math.min(canvas.width, canvas.height) * 0.22;

      // Update sweep angle
      sweepAngle += 0.015;
      if (sweepAngle > Math.PI * 2) {
        sweepAngle = 0;
        pulses.push({ r: 10, alpha: 0.9 });
      }

      ctx.shadowBlur = 0; // No glow for guidelines

      // Draw concentric radar grids (silver/faint)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      const step = maxRadius / 4;
      for (let r = step; r <= maxRadius; r += step) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Crosshairs
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(cx - maxRadius - 20, cy);
      ctx.lineTo(cx + maxRadius + 20, cy);
      ctx.moveTo(cx, cy - maxRadius - 20);
      ctx.lineTo(cx, cy + maxRadius + 20);
      ctx.stroke();

      // Update and draw expanding pulses (High Glow)
      pulses.forEach((p, idx) => {
        p.r += 1.5;
        p.alpha -= 0.007;

        if (p.alpha <= 0 || p.r > maxRadius) {
          pulses.splice(idx, 1);
          return;
        }

        ctx.strokeStyle = `rgba(56, 189, 248, ${p.alpha * 0.95})`;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = 'rgba(56, 189, 248, 0.6)';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(cx, cy, p.r, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Draw sweeping scanner beam
      ctx.shadowBlur = 0; // Reset
      const endX = cx + Math.cos(sweepAngle) * maxRadius;
      const endY = cy + Math.sin(sweepAngle) * maxRadius;
      
      const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, maxRadius);
      grad.addColorStop(0, 'rgba(56, 189, 248, 0.1)');
      grad.addColorStop(1, 'rgba(56, 189, 248, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, maxRadius, sweepAngle - 0.4, sweepAngle);
      ctx.closePath();
      ctx.fill();

      // Sweep Line (Glowing Cyan)
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.85)';
      ctx.lineWidth = 2.2;
      ctx.shadowColor = 'rgba(56, 189, 248, 0.8)';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(endX, endY);
      ctx.stroke();

      // Telemetry marks text (More visible)
      ctx.shadowBlur = 0;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.font = 'bold 9px monospace';
      ctx.fillText('SCAN_RADAR: ACTIVE', cx - maxRadius, cy - maxRadius - 15);
      ctx.fillText(`AZIMUTH: ${(sweepAngle * 180 / Math.PI).toFixed(1)}°`, cx - maxRadius, cy + maxRadius + 20);
      ctx.fillText('RPM_TELEMETRY: OK', cx + maxRadius - 90, cy - maxRadius - 15);

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
        display: 'block'
      }}
    />
  );
}
