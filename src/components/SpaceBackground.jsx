import { useEffect, useRef } from 'react';

export default function SpaceBackground({ speedMultiplier = 1, starCount = 80 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let stars = [];

    // Handle resizing to parent container bounds
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      initStars();
    };

    // Initialize randomized star particles
    const initStars = () => {
      stars = [];
      const count = Math.floor(starCount * (canvas.width * canvas.height) / (1920 * 1080));
      
      // Random direction vectors for this instance
      const angle = Math.random() * Math.PI * 2;
      const baseSpeedX = Math.cos(angle) * 0.15;
      const baseSpeedY = Math.sin(angle) * 0.15;

      for (let i = 0; i < Math.max(count, 30); i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.2,
          // Mix of drift and individual random paths
          vx: baseSpeedX * speedMultiplier + (Math.random() - 0.5) * 0.05,
          vy: baseSpeedY * speedMultiplier + (Math.random() - 0.5) * 0.05,
          alpha: Math.random() * 0.7 + 0.3,
          twinkleSpeed: 0.005 + Math.random() * 0.015,
          twinkleDir: Math.random() > 0.5 ? 1 : -1,
          // Sparkle colors
          color: Math.random() > 0.85 ? 'rgba(56, 189, 248, ' : 'rgba(255, 255, 255, '
        });
      }
    };

    // Animation draw loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw and update stars
      stars.forEach((star) => {
        // Draw glow effect for larger stars
        if (star.radius > 1) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = star.color + (star.alpha * 0.15) + ')';
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color + star.alpha + ')';
        ctx.fill();

        // Update positions
        star.x += star.vx;
        star.y += star.vy;

        // Twinkle (opacity variance)
        star.alpha += star.twinkleSpeed * star.twinkleDir;
        if (star.alpha >= 1) {
          star.alpha = 1;
          star.twinkleDir = -1;
        } else if (star.alpha <= 0.1) {
          star.alpha = 0.1;
          star.twinkleDir = 1;
        }

        // Wrap around edges
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
      });

      animationId = requestAnimationFrame(animate);
    };

    // Setup listener & initial dimensions
    const resizeObserver = new ResizeObserver(() => handleResize());
    const parent = canvas.parentElement;
    if (parent) {
      resizeObserver.observe(parent);
    } else {
      window.addEventListener('resize', handleResize);
    }

    handleResize();
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      if (parent) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [speedMultiplier, starCount]);

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
