import { useEffect, useRef } from 'react';

/**
 * TechGrid - Animated technical grid/network pattern
 * Subtle moving grid lines with pulsing nodes - industrial/technical feel
 */
export default function TechGrid({ 
  lineColor = 'rgba(13, 148, 136, 0.04)', 
  nodeColor = 'rgba(13, 148, 136, 0.12)',
  speed = 0.4,
  gridSize = 80,
  pulseSpeed = 1.5
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;
    let nodes = [];

    const handleResize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent ? parent.clientWidth : window.innerWidth;
      canvas.height = parent ? parent.clientHeight : window.innerHeight;
      
      // Create grid nodes
      nodes = [];
      const cols = Math.ceil(canvas.width / gridSize) + 1;
      const rows = Math.ceil(canvas.height / gridSize) + 1;
      
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          nodes.push({
            x: x * gridSize + (Math.random() - 0.5) * 10,
            y: y * gridSize + (Math.random() - 0.5) * 10,
            baseX: x * gridSize,
            baseY: y * gridSize,
            phase: Math.random() * Math.PI * 2,
            size: 1 + Math.random() * 2,
            pulsePhase: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01 * speed;

      // Draw grid lines
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 0.5;

      // Vertical lines with subtle wave
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        for (let y = 0; y <= canvas.height; y += 10) {
          const offset = Math.sin(time * 2 + y * 0.02 + x * 0.01) * 3;
          if (y === 0) ctx.moveTo(x + offset, y);
          else ctx.lineTo(x + offset, y);
        }
        ctx.stroke();
      }

      // Horizontal lines with subtle wave
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 10) {
          const offset = Math.cos(time * 1.5 + x * 0.02 + y * 0.01) * 3;
          if (x === 0) ctx.moveTo(x, y + offset);
          else ctx.lineTo(x, y + offset);
        }
        ctx.stroke();
      }

      // Draw pulsing nodes at intersections
      nodes.forEach((node) => {
        const pulse = Math.sin(time * pulseSpeed + node.pulsePhase) * 0.5 + 0.5;
        const currentSize = node.size * (0.5 + pulse * 0.5);
        const opacity = 0.05 + pulse * 0.15;

        // Subtle drift
        node.x = node.baseX + Math.sin(time * 0.5 + node.phase) * 8;
        node.y = node.baseY + Math.cos(time * 0.3 + node.phase) * 5;

        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, currentSize * 3);
        gradient.addColorStop(0, `rgba(13, 148, 136, ${opacity})`);
        gradient.addColorStop(1, 'rgba(13, 148, 136, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentSize * 3, 0, Math.PI * 2);
        ctx.fill();
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
  }, [lineColor, nodeColor, speed, gridSize, pulseSpeed]);

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