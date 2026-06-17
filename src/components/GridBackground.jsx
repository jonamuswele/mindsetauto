import { useEffect, useRef } from 'react';

export default function GridBackground({ speed = 0.5 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let offset = 0;

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
      
      const width = canvas.width;
      const height = canvas.height;
      const horizon = height * 0.3; // Horizon point (vanishing point Y)
      const centerY = horizon;
      const centerX = width / 2;

      // Draw subtle grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;

      // Vertical perspective lines originating from vanishing point
      const lineCount = 24;
      for (let i = 0; i <= lineCount; i++) {
        const xOnBase = (i / lineCount) * width * 2 - (width / 2); // Spread widely on bottom edge
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(xOnBase, height);
        ctx.stroke();
      }

      // Horizontal lines (scrolling closer)
      offset += speed;
      if (offset >= 60) offset = 0;

      for (let yOffset = offset; yOffset < height - horizon; yOffset += 40) {
        // Map exponential scaling to represent 3D perspective
        const normY = yOffset / (height - horizon);
        const yPos = horizon + Math.pow(normY, 1.8) * (height - horizon);
        
        ctx.strokeStyle = `rgba(56, 189, 248, ${0.01 + normY * 0.05})`; // Fade near horizon
        ctx.beginPath();
        ctx.moveTo(0, yPos);
        ctx.lineTo(width, yPos);
        ctx.stroke();
      }

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
  }, [speed]);

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
