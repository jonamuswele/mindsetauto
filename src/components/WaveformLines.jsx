import { useEffect, useRef } from 'react';

/**
 * WaveformLines - Animated waveform/sound visualization
 * Perfect for diagnostic/audio analysis sections
 */
export default function WaveformLines({ 
  lineCount = 5,
  color = 'rgba(255, 107, 42, 0.08)',
  speed = 0.8,
  amplitude = 30,
  frequency = 0.015
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;
    let waves = [];

    const handleResize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent ? parent.clientWidth : window.innerWidth;
      canvas.height = parent ? parent.clientHeight : window.innerHeight;
      
      waves = [];
      for (let i = 0; i < lineCount; i++) {
        waves.push({
          yOffset: (i / lineCount) * canvas.height,
          baseAmplitude: amplitude * (0.5 + Math.random() * 0.5),
          freq: frequency * (0.7 + Math.random() * 0.6),
          phase: Math.random() * Math.PI * 2,
          speed: 0.8 + Math.random() * 0.5,
          opacity: 0.3 + Math.random() * 0.4,
          colorShift: Math.random() * 60, // slight hue variation
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01 * speed;

      waves.forEach((wave, i) => {
        const centerY = wave.yOffset + Math.sin(time * 0.3 + wave.phase) * 20;
        const waveSpeed = wave.speed * speed;
        
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 107, 42, ${0.05 * wave.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        //Draw the main waveform
        for (let x = 0; x <= canvas.width; x += 2) {
          const y = centerY + 
            Math.sin(x * wave.freq + time * waveSpeed + wave.phase) * wave.baseAmplitude +
            Math.sin(x * wave.freq * 2 + time * waveSpeed * 1.5 + wave.phase + 1) * (wave.baseAmplitude * 0.3) +
            Math.sin(x * wave.freq * 0.5 + time * waveSpeed * 0.7 + wave.phase + 2) * (wave.baseAmplitude * 0.5);
          
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Draw a glow/shadow version
        ctx.strokeStyle = `rgba(255, 107, 42, ${0.02 * wave.opacity})`;
        ctx.lineWidth = 4;
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(255, 107, 42, 0.1)';
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 3) {
          const y = centerY + 
            Math.sin(x * wave.freq + time * waveSpeed + wave.phase) * wave.baseAmplitude * 0.8;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Draw data points as small circles along the wave
        ctx.fillStyle = `rgba(255, 107, 42, ${0.1 * wave.opacity})`;
        for (let x = 30; x <= canvas.width - 30; x += 60) {
          const y = centerY + 
            Math.sin(x * wave.freq + time * waveSpeed + wave.phase) * wave.baseAmplitude;
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
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
  }, [lineCount, color, speed, amplitude, frequency]);

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