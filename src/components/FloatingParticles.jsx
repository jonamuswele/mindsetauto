import { useEffect, useRef } from 'react';

/**
 * FloatingParticles - Subtle floating particles/orbs for hero sections
 * Creates a sense of depth and atmosphere with slow-moving orbs
 */
export default function FloatingParticles({ 
  count = 12, 
  color = 'rgba(13, 148, 136, 0.15)',
  speed = 0.3,
  sizeRange = [20, 80],
  connectDistance = 200
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    const handleResize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent ? parent.clientWidth : window.innerWidth;
      canvas.height = parent ? parent.clientHeight : window.innerHeight;
      
      // Recreate particles on resize
      particles = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]),
        speedX: (Math.random() - 0.5) * 0.5 * speed,
        speedY: (Math.random() - 0.5) * 0.5 * speed,
        opacity: 0.1 + Math.random() * 0.2,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach((p, i) => {
        // Subtle sine wave movement
        p.x += p.speedX + Math.sin(Date.now() * 0.0003 + p.phase) * 0.15;
        p.y += p.speedY + Math.cos(Date.now() * 0.0002 + p.phase) * 0.15;
        
        // Wrap around edges
        if (p.x < -p.size) p.x = canvas.width + p.size;
        if (p.x > canvas.width + p.size) p.x = -p.size;
        if (p.y < -p.size) p.y = canvas.height + p.size;
        if (p.y > canvas.height + p.size) p.y = -p.size;

        // Draw particle as soft glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, `rgba(13, 148, 136, ${p.opacity})`);
        gradient.addColorStop(0.5, `rgba(13, 148, 136, ${p.opacity * 0.3})`);
        gradient.addColorStop(1, 'rgba(13, 148, 136, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw subtle connections between nearby particles
      ctx.strokeStyle = 'rgba(13, 148, 136, 0.03)';
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < connectDistance) {
            const opacity = (1 - dist / connectDistance) * 0.03;
            ctx.strokeStyle = `rgba(13, 148, 136, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
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
  }, [count, color, speed, sizeRange, connectDistance]);

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