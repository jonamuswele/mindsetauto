import { useEffect, useRef } from 'react';

/**
 * FloatingShapes - Geometric shapes that float and rotate gently
 * Clean, modern feel for CTA/section backgrounds
 */
export default function FloatingShapes({ 
  shapeCount = 8,
  color = 'rgba(255, 107, 42, 0.05)',
  speed = 0.25,
  shapes = ['circle', 'square', 'triangle', 'diamond', 'hexagon']
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;
    let items = [];

    const drawShape = (ctx, shape, x, y, size, rotation) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      switch (shape) {
        case 'circle':
          ctx.beginPath();
          ctx.arc(0, 0, size, 0, Math.PI * 2);
          break;
        case 'square':
          ctx.beginPath();
          ctx.rect(-size, -size, size * 2, size * 2);
          break;
        case 'triangle':
          ctx.beginPath();
          ctx.moveTo(0, -size);
          ctx.lineTo(size * 0.866, size * 0.5);
          ctx.lineTo(-size * 0.866, size * 0.5);
          ctx.closePath();
          break;
        case 'diamond':
          ctx.beginPath();
          ctx.moveTo(0, -size);
          ctx.lineTo(size, 0);
          ctx.lineTo(0, size);
          ctx.lineTo(-size, 0);
          ctx.closePath();
          break;
        case 'hexagon':
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const px = Math.cos(angle) * size;
            const py = Math.sin(angle) * size;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          break;
      }

      ctx.restore();
    };

    const handleResize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent ? parent.clientWidth : window.innerWidth;
      canvas.height = parent ? parent.clientHeight : window.innerHeight;
      
      items = [];
      for (let i = 0; i < shapeCount; i++) {
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const size = 15 + Math.random() * 40;
        items.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          baseX: Math.random() * canvas.width,
          baseY: Math.random() * canvas.height,
          size,
          shape,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.005,
          driftX: (Math.random() - 0.5) * 0.3,
          driftY: (Math.random() - 0.5) * 0.3,
          floatAmplitude: 10 + Math.random() * 30,
          floatSpeed: 0.3 + Math.random() * 0.4,
          floatPhase: Math.random() * Math.PI * 2,
          opacity: 0.2 + Math.random() * 0.3,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01 * speed;

      items.forEach(item => {
        // Gentle floating motion
        item.x = item.baseX + Math.sin(time * item.floatSpeed + item.floatPhase) * item.floatAmplitude;
        item.y = item.baseY + Math.cos(time * item.floatSpeed * 0.7 + item.floatPhase) * item.floatAmplitude * 0.6;
        item.rotation += item.rotationSpeed;

        // Very slow drift
        item.baseX += item.driftX;
        item.baseY += item.driftY;

        // Wrap around
        if (item.x < -item.size - 50) { item.baseX = canvas.width + item.size + 50; item.x = item.baseX; }
        if (item.x > canvas.width + item.size + 50) { item.baseX = -item.size - 50; item.x = item.baseX; }
        if (item.y < -item.size - 50) { item.baseY = canvas.height + item.size + 50; item.y = item.baseY; }
        if (item.y > canvas.height + item.size + 50) { item.baseY = -item.size - 50; item.y = item.baseY; }

        // Draw filled shape with gradient
        const gradient = ctx.createRadialGradient(item.x, item.y, 0, item.x, item.y, item.size * 1.5);
        gradient.addColorStop(0, `rgba(255, 107, 42, ${item.opacity * 0.3})`);
        gradient.addColorStop(1, 'rgba(255, 107, 42, 0)');

        ctx.fillStyle = gradient;
        drawShape(ctx, item.shape, item.x, item.y, item.size, item.rotation);
        ctx.fill();

        // Draw outline
        ctx.strokeStyle = `rgba(255, 107, 42, ${item.opacity * 0.15})`;
        ctx.lineWidth = 1;
        drawShape(ctx, item.shape, item.x, item.y, item.size, item.rotation);
        ctx.stroke();
      });

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
  }, [shapeCount, color, speed, shapes]);

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