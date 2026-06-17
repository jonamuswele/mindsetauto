import { useEffect, useRef } from 'react';

export default function CascadeStreamLoop() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let nodes = [];
    let pulses = [];
    let time = 0;

    const NODE_COUNT = 38;
    const CONNECTION_DIST = 145;
    const PULSE_INTERVAL = 18; // frames between auto-fires

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      initNodes();
    };

    const initNodes = () => {
      nodes = [];
      pulses = [];
      // Cluster nodes in the right 50% of the canvas
      const startX = canvas.width * 0.42;
      const areaW = canvas.width * 0.55;
      const areaH = canvas.height * 0.85;
      const startY = canvas.height * 0.08;

      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: startX + Math.random() * areaW,
          y: startY + Math.random() * areaH,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          radius: Math.random() * 2.4 + 1.2,
          alpha: 0.3 + Math.random() * 0.5,
          lit: false,
          litTimer: 0,
          cyan: Math.random() > 0.5,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    // Fire a signal pulse from node A to node B along their connection
    const firePulse = (fromIdx, toIdx) => {
      if (fromIdx === toIdx) return;
      const from = nodes[fromIdx];
      const to = nodes[toIdx];
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > CONNECTION_DIST) return;

      pulses.push({
        fromIdx,
        toIdx,
        progress: 0,
        speed: 0.022 + Math.random() * 0.018,
        cyan: from.cyan,
      });
      from.lit = true;
      from.litTimer = 28;
    };

    let frameCount = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;
      frameCount++;

      // Auto-fire pulses from random nodes
      if (frameCount % PULSE_INTERVAL === 0) {
        const srcIdx = Math.floor(Math.random() * nodes.length);
        const src = nodes[srcIdx];
        // Find connected neighbours
        const neighbours = [];
        nodes.forEach((n, i) => {
          if (i === srcIdx) return;
          const dx = n.x - src.x;
          const dy = n.y - src.y;
          if (Math.sqrt(dx * dx + dy * dy) < CONNECTION_DIST) {
            neighbours.push(i);
          }
        });
        if (neighbours.length > 0) {
          // Fire to 1–3 random neighbours
          const count = Math.min(neighbours.length, Math.floor(Math.random() * 3) + 1);
          for (let k = 0; k < count; k++) {
            const tIdx = neighbours[Math.floor(Math.random() * neighbours.length)];
            firePulse(srcIdx, tIdx);
          }
        }
      }

      // Move nodes gently (drift + soft boundary bounce)
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        const startX = canvas.width * 0.4;
        const endX = canvas.width * 0.98;
        const startY = canvas.height * 0.05;
        const endY = canvas.height * 0.95;
        if (n.x < startX || n.x > endX) n.vx *= -1;
        if (n.y < startY || n.y > endY) n.vy *= -1;

        if (n.litTimer > 0) n.litTimer--;
        else n.lit = false;
      });

      // Draw connections
      ctx.lineWidth = 0.5;
      ctx.shadowBlur = 0;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const baseAlpha = (1 - dist / CONNECTION_DIST) * 0.09;
            ctx.strokeStyle = `rgba(255,255,255,${baseAlpha})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Advance and draw signal pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed;

        if (p.progress >= 1) {
          // Light up target node
          nodes[p.toIdx].lit = true;
          nodes[p.toIdx].litTimer = 24;
          // Chain fire: target fires to one of its neighbours
          if (Math.random() > 0.3) {
            const target = nodes[p.toIdx];
            const candidates = [];
            nodes.forEach((n, idx) => {
              if (idx === p.toIdx || idx === p.fromIdx) return;
              const dx = n.x - target.x;
              const dy = n.y - target.y;
              if (Math.sqrt(dx * dx + dy * dy) < CONNECTION_DIST) candidates.push(idx);
            });
            if (candidates.length > 0) {
              firePulse(p.toIdx, candidates[Math.floor(Math.random() * candidates.length)]);
            }
          }
          pulses.splice(i, 1);
          continue;
        }

        const from = nodes[p.fromIdx];
        const to = nodes[p.toIdx];
        const px = from.x + (to.x - from.x) * p.progress;
        const py = from.y + (to.y - from.y) * p.progress;

        // Pulse glow
        ctx.shadowColor = p.cyan ? 'rgba(56,189,248,0.9)' : 'rgba(255,255,255,0.8)';
        ctx.shadowBlur = 14;
        ctx.fillStyle = p.cyan ? 'rgba(56,189,248,0.95)' : 'rgba(255,255,255,0.95)';
        ctx.beginPath();
        ctx.arc(px, py, 2.8, 0, Math.PI * 2);
        ctx.fill();

        // Lit connection line behind the pulse
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const litAlpha = (1 - dist / CONNECTION_DIST) * 0.55;
        ctx.shadowBlur = 6;
        ctx.strokeStyle = p.cyan
          ? `rgba(56,189,248,${litAlpha})`
          : `rgba(255,255,255,${litAlpha * 0.7})`;
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(px, py);
        ctx.stroke();
      }

      // Draw nodes
      nodes.forEach((n) => {
        n.pulsePhase += 0.03;
        const breathe = Math.sin(n.pulsePhase) * 0.15;
        const currentAlpha = Math.min(n.alpha + breathe + (n.lit ? 0.5 : 0), 1);

        if (n.lit) {
          ctx.shadowColor = n.cyan ? 'rgba(56,189,248,0.9)' : 'rgba(255,255,255,0.8)';
          ctx.shadowBlur = 18;
        } else {
          ctx.shadowColor = n.cyan ? 'rgba(56,189,248,0.3)' : 'rgba(255,255,255,0.2)';
          ctx.shadowBlur = 6;
        }

        // Outer ring on lit nodes
        if (n.lit) {
          ctx.strokeStyle = n.cyan
            ? `rgba(56,189,248,${currentAlpha * 0.6})`
            : `rgba(255,255,255,${currentAlpha * 0.5})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius + 4, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.fillStyle = n.lit
          ? (n.cyan ? `rgba(56,189,248,${currentAlpha})` : `rgba(255,255,255,${currentAlpha})`)
          : (n.cyan ? `rgba(56,189,248,${currentAlpha * 0.55})` : `rgba(255,255,255,${currentAlpha * 0.45})`);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.shadowBlur = 0;
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
        display: 'block',
      }}
    />
  );
}