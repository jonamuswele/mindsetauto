import { useEffect, useRef } from 'react';

/**
 * MechanicalGears - Subtle rotating gear/cog animations
 * Industrial/mechanical feel for about/philosophy sections
 */
export default function MechanicalGears({ 
  gearCount = 4,
  color = 'rgba(255, 107, 42, 0.06)',
  speed = 0.2
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;
    let gears = [];

    const handleResize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent ? parent.clientWidth : window.innerWidth;
      canvas.height = parent ? parent.clientHeight : window.innerHeight;
      
      gears = [];
      for (let i = 0; i < gearCount; i++) {
        const radius = 40 + Math.random() * 80;
        gears.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius,
          teeth: 8 + Math.floor(Math.random() * 8) * 2, // even number
          rotation: Math.random() * Math.PI * 2,
          direction: Math.random() > 0.5 ? 1 : -1,
          speed: 0.1 + Math.random() * 0.15,
          opacity: 0.3 + Math.random() * 0.4,
          offsetX: (Math.random() - 0.5) * 100,
          offsetY: (Math.random() - 0.5) * 100,
        });
      }
    };

    const drawGear = (gear, gearTime) => {
      const { x, y, radius, teeth, rotation, direction, color, opacity } = gear;
      const currentRotation = rotation + direction * gearTime * gear.speed * speed;
      
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(currentRotation);
      
      ctx.strokeStyle = `rgba(255, 107, 42, ${0.04 * opacity})`;
      ctx.lineWidth = 1;
      ctx.fillStyle = `rgba(255, 107, 42, ${0.015 * opacity})`;

      // Draw gear body
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.85, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Draw gear teeth
      ctx.beginPath();
      const toothHeight = radius * 0.15;
      for (let t = 0; t < teeth; t++) {
        const angle = (t / teeth) * Math.PI * 2;
        const innerR = radius * 0.85;
        const outerR = radius;
        
        const x1 = Math.cos(angle) * innerR;
        const y1 = Math.sin(angle) * innerR;
        const x2 = Math.cos(angle) * outerR;
        const y2 = Math.sin(angle) * outerR;
        const x3 = Math.cos(angle + Math.PI / teeth) * outerR;
        const y3 = Math.sin(angle + Math.PI / teeth) * outerR;
        const x4 = Math.cos(angle + Math.PI / teeth) * innerR;
        const y4 = Math.sin(angle + Math.PI / teeth) * innerR;

        if (t === 0) {
          ctx.moveTo(x1, y1);
        } else {
          ctx.lineTo(x1, y1);
        }
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.lineTo(x4, y4);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Center hole
      ctx.fillStyle = `rgba(255, 107, 42, ${0.02 * opacity})`;
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.25, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016; // ~60fps base

      // Slowly drift gears
      gears.forEach(gear => {
        gear.x += Math.sin(time * 0.1 + gear.offsetX * 0.01) * 0.05;
        gear.y += Math.cos(time * 0.08 + gear.offsetY * 0.01) * 0.05;
        
        // Wrap around
        if (gear.x < -gear.radius) gear.x = canvas.width + gear.radius;
        if (gear.x > canvas.width + gear.radius) gear.x = -gear.radius;
        if (gear.y < -gear.radius) gear.y = canvas.height + gear.radius;
        if (gear.y > canvas.height + gear.radius) gear.y = -gear.radius;

        drawGear(gear, time);
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
  }, [gearCount, color, speed]);

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