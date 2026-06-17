import { useEffect, useRef } from 'react';

export default function CockpitGeometryLoop() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let angleY = 0;
    let angleX = 0.25; // Slight forward tilt for perspective

    // Larger 3D coordinates for the sports seat profile
    const vertices = [
      // Base cushion
      { x: -65, y: 65, z: -65 },  // 0: Back L
      { x: 65, y: 65, z: -65 },   // 1: Back R
      { x: 75, y: 70, z: 65 },    // 2: Front R
      { x: -75, y: 70, z: 65 },   // 3: Front L
      
      // Bolster supports (cushion side)
      { x: -80, y: 45, z: 25 },   // 4: Bolster FL
      { x: 80, y: 45, z: 25 },    // 5: Bolster FR
      
      // Backrest
      { x: -60, y: -45, z: -80 }, // 6: Mid Back L
      { x: 60, y: -45, z: -80 },  // 7: Mid Back R
      { x: -45, y: -115, z: -95 },// 8: Top Back L
      { x: 45, y: -115, z: -95 }, // 9: Top Back R
      
      // Headrest
      { x: -25, y: -125, z: -98 },// 10: Head L
      { x: 25, y: -125, z: -98 }, // 11: Head R
      { x: -22, y: -155, z: -102},// 12: Head L Top
      { x: 22, y: -155, z: -102 } // 13: Head R Top
    ];

    const connections = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [3, 4], [4, 0], [2, 5], [5, 1],
      [0, 6], [1, 7], [6, 7],
      [6, 8], [7, 9], [8, 9],
      [8, 10], [9, 11], [10, 11],
      [10, 12], [11, 13], [12, 13],
      [4, 6], [5, 7], [6, 9], [7, 8]
    ];

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

    const project = (x, y, z, cx, cy) => {
      // 3D rotation Y axis
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      let x1 = x * cosY - z * sinY;
      let z1 = x * sinY + z * cosY;

      // 3D rotation X axis
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      let y2 = y * cosX - z1 * sinX;
      let z2 = y * sinX + z1 * cosX;

      // Perspective projection parameters (Z-buffer scale)
      const fov = 350;
      const distance = 250;
      const scale = fov / (distance + z2);
      
      return {
        x: cx + x1 * scale,
        y: cy + y2 * scale
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      angleY += 0.007;

      const cx = canvas.width * 0.78;
      const cy = canvas.height * 0.52;

      // Project vertices
      const projected = vertices.map((v) => project(v.x, v.y, v.z, cx, cy));

      // Draw wireframe lines (highly visible, glowing white/cyan)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.lineWidth = 1.8;
      ctx.shadowColor = 'rgba(255, 255, 255, 0.15)';
      ctx.shadowBlur = 8;
      
      connections.forEach(([startIdx, endIdx]) => {
        ctx.beginPath();
        ctx.moveTo(projected[startIdx].x, projected[startIdx].y);
        ctx.lineTo(projected[endIdx].x, projected[endIdx].y);
        ctx.stroke();
      });

      // Draw glowing vertices (Bright Electric Cyan)
      ctx.fillStyle = 'rgba(56, 189, 248, 0.9)';
      ctx.shadowColor = 'rgba(56, 189, 248, 0.8)';
      ctx.shadowBlur = 12;

      projected.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.2, 0, Math.PI * 2);
        ctx.fill();
      });

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
