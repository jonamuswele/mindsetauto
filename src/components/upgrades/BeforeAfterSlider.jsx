import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function BeforeAfterSlider({ before, after, title, desc, alt = 'Before / After' }) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const handleRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(percent);
  };

  const handleKeyDown = (e) => {
    if (!containerRef.current) return;
    const step = e.shiftKey ? 10 : 5;
    if (e.key === 'ArrowLeft') setPosition(p => Math.max(0, p - step));
    if (e.key === 'ArrowRight') setPosition(p => Math.min(100, p + step));
    if (e.key === 'Home') setPosition(0);
    if (e.key === 'End') setPosition(100);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleMouseMove, { passive: true });
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('mouseup', () => setIsDragging(false));
      window.addEventListener('touchend', () => setIsDragging(false));
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mouseup', () => setIsDragging(false));
      window.removeEventListener('touchend', () => setIsDragging(false));
    };
  }, [isDragging]);

  return (
    <div className="before-after-slider" style={{ '--position': `${position}%` }}>
      <div
        ref={containerRef}
        className="slider-container"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
        role="slider"
        aria-label={`Comparaison avant/après: ${title}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div className="image-layer before">
          <img src={before} alt={`${alt} - Avant`} loading="lazy" />
        </div>
        <div className="image-layer after" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <img src={after} alt={`${alt} - Après`} loading="lazy" />
        </div>

        <motion.div
          ref={handleRef}
          className="slider-handle"
          style={{ left: `calc(${position}% - 24px)` }}
          animate={{ scale: isDragging ? 1.15 : 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <div className="handle-line" />
          <div className="handle-circle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: 'rotate(180deg)' }}>
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </div>
          <div className="handle-line" />
        </motion.div>

        <div className="slider-labels">
          <span className="label before" style={{ opacity: position > 30 ? 1 : 0.4 }}>AVANT</span>
          <span className="label after" style={{ opacity: position < 70 ? 1 : 0.4 }}>APRÈS</span>
        </div>
      </div>

      {(title || desc) && (
        <div className="slider-caption">
          {title && <h4>{title}</h4>}
          {desc && <p>{desc}</p>}
        </div>
      )}

      <style jsx>{`
        .before-after-slider {
          position: relative;
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
          font-family: var(--font-sans);
        }
        .slider-container {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          border-radius: 6px;
          overflow: hidden;
          background: var(--bg-base);
          border: 1px solid var(--border);
          cursor: ew-resize;
          user-select: none;
          -webkit-user-select: none;
        }
        .slider-container:focus {
          outline: none;
          box-shadow: 0 0 0 3px var(--accent-glow);
        }
        .image-layer {
          position: absolute;
          inset: 0;
        }
        .image-layer img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .image-layer.after {
          z-index: 2;
        }
        .slider-handle {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }
        .handle-line {
          width: 2px;
          height: 60px;
          background: #fff;
          box-shadow: 0 0 8px rgba(0,0,0,0.5);
        }
        .handle-circle {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--bg-card);
          border: 2px solid var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
          color: var(--accent);
        }
        .handle-circle svg:first-child { margin-right: -8px; }
        .handle-circle svg:last-child { margin-left: -8px; }
        .slider-labels {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: space-between;
          padding: 16px 24px;
          pointer-events: none;
          z-index: 5;
        }
        .label {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #fff;
          text-shadow: 0 2px 8px rgba(0,0,0,0.6);
          transition: opacity 0.2s;
        }
        .label.before { align-self: flex-start; }
        .label.after { align-self: flex-start; }
        .slider-caption {
          margin-top: 16px;
          text-align: center;
        }
        .slider-caption h4 {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 6px;
        }
        .slider-caption p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin: 0;
        }
        @media (max-width: 640px) {
          .slider-container { aspect-ratio: 4 / 3; }
          .handle-circle { width: 40px; height: 40px; }
          .handle-line { height: 48px; }
        }
      `}</style>
    </div>
  );
}