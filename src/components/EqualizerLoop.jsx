import { useEffect, useRef } from 'react';

export default function EqualizerLoop() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let bars = [];
    const barCount = 30;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      initBars();
    };

    const initBars = () => {
      bars = [];
      for (let i = 0; i < barCount; i++) {
        bars.push({
          x: 0,
          currentHeight: 10,
          targetHeight: 10,
          speed: 0.12 + Math.random() * 0.15,
          seed: Math.random() * 10
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const width = canvas.width;
      const height = canvas.height;
      
      const barWidth = 8; // Wider bars
      const spacing = 5;
      const totalWidth = barCount * (barWidth + spacing);
      
      const startX = width * 0.78 - totalWidth / 2;
      const baseY = height * 0.65;

      bars.forEach((bar, idx) => {
        bar.x = startX + idx * (barWidth + spacing);
        
        const time = Date.now() * 0.003;
        const hNoise = Math.sin(idx * 0.3 + time) * 35 + Math.cos(idx * 0.15 - time * 1.5) * 18;
        const activeAmp = Math.sin(time * 0.2) > -0.2 ? 1 : 0.2; // Simulates human speaking rhythm
        
        bar.targetHeight = Math.max(12, (hNoise + 55) * activeAmp);
        bar.currentHeight += (bar.targetHeight - bar.currentHeight) * bar.speed;

        // Draw frequency bar (Glowing Cyan)
        ctx.shadowColor = 'rgba(56, 189, 248, 0.5)';
        ctx.shadowBlur = 10;
        ctx.fillStyle = 'rgba(56, 189, 248, 0.75)';
        ctx.fillRect(bar.x, baseY - bar.currentHeight, barWidth, bar.currentHeight);

        // Draw peak indicator dots (Glowing White)
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        ctx.shadowBlur = 8;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.fillRect(bar.x, baseY - bar.currentHeight - 5, barWidth, 2);
      });

      // Draw baseline (no glow)
      ctx.shadowBlur = 0;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(startX - 20, baseY);
      ctx.lineTo(startX + totalWidth + 20, baseY);
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
        display: 'block'
      }}
    />
  );
}
