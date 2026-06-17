import { useEffect, useRef } from 'react';

export default function WaveBackground({ speed = 0.015, waveCount = 3 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    // Wave configs — each layer has distinct character
    const waves = [
      { amplitudeBase: 38, freq: 0.0028, speedMult: 1.0,  yFactor: 0.68, dotSize: 1.4, gap: 10, cyan: false, alphaBase: 0.07 },
      { amplitudeBase: 22, freq: 0.0042, speedMult: 1.35, yFactor: 0.72, dotSize: 1.1, gap: 8,  cyan: true,  alphaBase: 0.055 },
      { amplitudeBase: 50, freq: 0.0018, speedMult: 0.75, yFactor: 0.64, dotSize: 1.6, gap: 14, cyan: false, alphaBase: 0.035 },
      { amplitudeBase: 14, freq: 0.006,  speedMult: 2.1,  yFactor: 0.76, dotSize: 0.9, gap: 7,  cyan: true,  alphaBase: 0.04  },
    ];

    // Aurora streak particles that glide along the wave paths
    let streaks = [];

    const initStreaks = () => {
      streaks = [];
      for (let i = 0; i < 18; i++) {
        streaks.push(createStreak());
      }
    };

    const createStreak = () => {
      const waveIdx = Math.floor(Math.random() * waves.length);
      return {
        x: Math.random() * (canvas.width || window.innerWidth),
        waveIdx,
        speed: 0.6 + Math.random() * 1.4,
        length: 40 + Math.random() * 80,
        alpha: 0.15 + Math.random() * 0.35,
        cyan: Math.random() > 0.4,
        phase: Math.random() * Math.PI * 2,
      };
    };

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      initStreaks();
    };

    const getWaveY = (wave, x, t) => {
      const centerY = canvas.height * wave.yFactor;
      return (
        centerY +
        Math.sin(x * wave.freq + t * wave.speedMult * speed * 60) * wave.amplitudeBase +
        Math.cos(x * wave.freq * 0.4 + t * wave.speedMult * speed * 30) * (wave.amplitudeBase * 0.3)
      );
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 1;

      const usedWaves = waveCount > 0 ? waves.slice(0, Math.min(waveCount + 1, waves.length)) : waves;

      // Draw base dot waves
      for (const wave of usedWaves) {
        ctx.shadowBlur = 0;
        for (let x = 0; x < canvas.width; x += wave.gap) {
          const y = getWaveY(wave, x, time);

          // Skip dots outside canvas
          if (y < -10 || y > canvas.height + 10) continue;

          // Distance from wave center for opacity fall-off
          const normX = x / canvas.width;
          const edgeFade = Math.sin(normX * Math.PI);

          const alpha = wave.alphaBase * edgeFade;
          ctx.fillStyle = wave.cyan
            ? `rgba(56,189,248,${alpha})`
            : `rgba(255,255,255,${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, wave.dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw aurora streaks gliding along the waves
      for (let i = streaks.length - 1; i >= 0; i--) {
        const s = streaks[i];
        const wave = waves[s.waveIdx];
        s.x += s.speed;

        if (s.x - s.length > canvas.width) {
          streaks[i] = createStreak();
          streaks[i].x = -s.length;
          continue;
        }

        // Draw streak as a tapered line following the wave contour
        ctx.shadowBlur = 8;
        ctx.shadowColor = s.cyan ? 'rgba(56,189,248,0.5)' : 'rgba(255,255,255,0.3)';

        const steps = Math.floor(s.length / 4);
        for (let t2 = 0; t2 < steps; t2++) {
          const sx = s.x - t2 * 4;
          if (sx < 0 || sx > canvas.width) continue;
          const sy = getWaveY(wave, sx, time);
          const progress = 1 - t2 / steps; // head = 1, tail = 0
          const alpha = s.alpha * progress * progress;

          ctx.fillStyle = s.cyan
            ? `rgba(56,189,248,${alpha})`
            : `rgba(255,255,255,${alpha})`;
          ctx.beginPath();
          ctx.arc(sx, sy, wave.dotSize * (0.6 + progress * 0.8), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Occasional bright crest flash — random dot bursts on the wave peaks
      if (Math.random() < 0.04) {
        const wave = usedWaves[Math.floor(Math.random() * usedWaves.length)];
        const flashX = Math.random() * canvas.width;
        const flashY = getWaveY(wave, flashX, time);
        ctx.shadowColor = 'rgba(56,189,248,0.9)';
        ctx.shadowBlur = 18;
        ctx.fillStyle = 'rgba(56,189,248,0.7)';
        ctx.beginPath();
        ctx.arc(flashX, flashY, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

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
  }, [speed, waveCount]);

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