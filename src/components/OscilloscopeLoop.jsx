import { useEffect, useRef } from 'react';

export default function OscilloscopeLoop() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

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

    const drawGrid = (ox, oy, w, h) => {
      ctx.shadowBlur = 0; // No glow on grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;

      // Draw grid squares
      const size = 30;
      for (let x = ox; x < ox + w; x += size) {
        ctx.beginPath();
        ctx.moveTo(x, oy);
        ctx.lineTo(x, oy + h);
        ctx.stroke();
      }
      for (let y = oy; y < oy + h; y += size) {
        ctx.beginPath();
        ctx.moveTo(ox, y);
        ctx.lineTo(ox + w, y);
        ctx.stroke();
      }

      // Draw border (highly visible)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.rect(ox, oy, w, h);
      ctx.stroke();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.05;

      const w = Math.min(canvas.width * 0.45, 500);
      const h = 240;
      const ox = canvas.width * 0.85 - w;
      const oy = canvas.height * 0.5 - h / 2;

      drawGrid(ox, oy, w, h);

      // Clip drawings inside grid boundary
      ctx.save();
      ctx.beginPath();
      ctx.rect(ox + 1, oy + 1, w - 2, h - 2);
      ctx.clip();

      // Wave 1: Smooth Lambda/Oxygen Sensor Sine wave (Glowing White)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.lineWidth = 2.2;
      ctx.shadowColor = 'rgba(255, 255, 255, 0.3)';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const py = oy + h/2 + Math.sin(x * 0.015 - time) * 40 + Math.cos(x * 0.005 + time*0.5) * 10;
        if (x === 0) ctx.moveTo(ox + x, py);
        else ctx.lineTo(ox + x, py);
      }
      ctx.stroke();

      // Wave 2: Crankshaft Sensor High-Frequency Pulse (Glowing Cyan)
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.85)';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = 'rgba(56, 189, 248, 0.7)';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        let spike = 0;
        if (Math.sin(x * 0.05 - time * 2) > 0.95) {
          spike = Math.sin(x * 0.05 - time * 2) * 35;
        }
        const py = oy + h/2 + Math.sin(x * 0.08 - time * 3) * 8 + spike;
        if (x === 0) ctx.moveTo(ox + x, py);
        else ctx.lineTo(ox + x, py);
      }
      ctx.stroke();

      // Wave 3: Square CAN-bus digital packet signals (Cyan glow, shifted down)
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
      ctx.lineWidth = 1.8;
      ctx.shadowColor = 'rgba(56, 189, 248, 0.3)';
      ctx.shadowBlur = 6;
      ctx.beginPath();
      let lastY = oy + h * 0.8;
      ctx.moveTo(ox, lastY);
      for (let x = 0; x < w; x += 15) {
        const isUp = Math.sin(x * 0.04 + time) > 0;
        const targetY = isUp ? oy + h * 0.72 : oy + h * 0.82;
        
        ctx.lineTo(ox + x, lastY);
        ctx.lineTo(ox + x, targetY);
        lastY = targetY;
      }
      ctx.stroke();

      ctx.restore();

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
