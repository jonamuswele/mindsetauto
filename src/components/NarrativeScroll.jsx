import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

/**
 * NarrativeSection - Story-telling section with:
 * - Section header (fades in on scroll)
 * - Full-viewport-height chapter panels (each child animates in with stagger)
 * - Optional media per chapter (slides in from opposite side)
 */
export function NarrativeSection({
  title,
  subtitle,
  chapters = [],
  className = '',
  style = {},
  backgroundColor = 'transparent',
  progressColor = 'var(--accent)',
}) {
  return (
    <section
      className={className}
      style={{
        position: 'relative',
        backgroundColor,
        padding: '120px 0 80px',
        ...style,
      }}
    >
      {/* Section header */}
      <motion.div
        style={{
          padding: '0 80px',
          marginBottom: '100px',
          maxWidth: '700px',
        }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {subtitle && (
          <span className="eyebrow" style={{ color: progressColor, display: 'block', marginBottom: '16px' }}>
            {subtitle}
          </span>
        )}
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            margin: 0,
          }}
        >
          {title}
        </h2>
      </motion.div>

      {/* Chapters — each fills ~90vh for that cinematic scroll feel */}
      <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '60px' }}>
        {chapters.map((chapter, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              gap: '80px',
              alignItems: 'center',
              minHeight: '90vh',
              padding: '60px 80px',
              maxWidth: '1400px',
              margin: '0 auto',
              width: '100%',
              flexDirection: chapter.side === 'right' ? 'row-reverse' : 'row',
            }}
          >
            {/* Text side — each child animates in with a cascading delay */}
            <div style={{ flex: 1, maxWidth: '550px' }}>
              {/* Step label */}
              <motion.span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: progressColor,
                  display: 'block',
                  marginBottom: '16px',
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              >
                ÉTAPE {String(i + 1).padStart(2, '0')}
              </motion.span>

              {/* Title */}
              <motion.h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                  fontWeight: 600,
                  lineHeight: 1.2,
                  marginBottom: '20px',
                  color: 'var(--text-primary)',
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              >
                {chapter.title}
              </motion.h3>

              {/* Body text */}
              <motion.p
                style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.8,
                  color: 'var(--text-secondary)',
                  fontWeight: 300,
                  margin: '0 0 28px',
                }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
              >
                {chapter.content}
              </motion.p>

              {/* Stats */}
              {chapter.stats && (
                <motion.div
                  style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.38 }}
                >
                  {chapter.stats.map((stat, si) => (
                    <div key={si} style={{ textAlign: 'left' }}>
                      <div style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '2.2rem',
                        fontWeight: 700,
                        color: progressColor,
                        lineHeight: 1,
                      }}>
                        {stat.value}
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)',
                        marginTop: '4px',
                      }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Media side — slides in from the opposite side */}
            {chapter.media && (
              <motion.div
                style={{ flex: 1, position: 'relative' }}
                initial={{ opacity: 0, x: chapter.side === 'right' ? -50 : 50, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              >
                {chapter.media.type === 'image' && (
                  <div style={{
                    position: 'relative',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: '0 40px 80px rgba(0,0,0,0.22)',
                  }}>
                    <img
                      src={chapter.media.src}
                      alt={chapter.media.alt || chapter.title}
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                    {chapter.media.overlay && (
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(135deg, rgba(15,26,42,0.3) 0%, transparent 50%)',
                        pointerEvents: 'none',
                      }} />
                    )}
                  </div>
                )}
                {chapter.media.type === 'video' && (
                  <video
                    src={chapter.media.src}
                    autoPlay loop muted playsInline
                    style={{ width: '100%', borderRadius: '8px', boxShadow: '0 40px 80px rgba(0,0,0,0.22)', display: 'block' }}
                  />
                )}
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}


/**
 * MorphingHero - Hero where image morphs/transforms on scroll
 */
export function MorphingHero({
  images,
  titles,
  subtitle,
  ctaText,
  ctaAction,
  className = '',
  style = {},
  height = '100vh',
  children,
}) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const imageIndex = useTransform(scrollYProgress, [0, 1], [0, images.length - 1], { clamp: true });

  // Fade out all hero content at the end of the section
  const heroFade = useTransform(scrollYProgress, [0.7, 1], [1, 0], { clamp: true });

  return (
    <motion.section
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        height,
        width: '100%',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Morphing images */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        {images.map((src, i) => (
          <motion.img
            key={i}
            src={src}
            alt={titles[i] || `Slide ${i + 1}`}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              willChange: 'opacity, transform',
            }}
            opacity={useTransform(imageIndex, [i - 0.7, i - 0.3, i + 0.3, i + 0.7], [0, 1, 1, 0], { clamp: true })}
            scale={useTransform(imageIndex, [i - 0.5, i, i + 0.5], [1.1, 1, 1.1], { clamp: true })}
          />
        ))}
      </div>

      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 2,
        background: 'linear-gradient(135deg, rgba(15,26,42,0.8) 0%, rgba(15,26,42,0.5) 40%, rgba(15,26,42,0.7) 100%)',
      }} />

      {/* Fixed content */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 10,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '0 80px',
          maxWidth: '800px',
        }}
        opacity={heroFade}
      >
        <motion.span className="eyebrow" style={{ color: 'var(--accent-light)' }} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          {subtitle}
        </motion.span>

        <motion.div style={{ position: 'relative', height: '120px', marginTop: '24px' }}>
          {titles.map((title, i) => (
            <motion.h1
              key={i}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3rem, 5vw, 5rem)',
                fontWeight: 600,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: 'var(--text-invert)',
                margin: 0,
                whiteSpace: 'nowrap',
              }}
              opacity={useTransform(imageIndex, [i - 0.6, i - 0.2, i + 0.2, i + 0.6], [0, 1, 1, 0], { clamp: true })}
              y={useTransform(imageIndex, [i - 0.5, i, i + 0.5], [30, 0, -30], { clamp: true })}
            >
              {title}
            </motion.h1>
          ))}
        </motion.div>

        <motion.button
          className="btn-primary"
          style={{ marginTop: '48px', background: 'var(--accent)', borderColor: 'var(--accent)', color: '#fff' }}
          onClick={ctaAction}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {ctaText}
        </motion.button>
      </motion.div>

      {children}

      {/* Scroll indicator */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          color: 'rgba(255,255,255,0.5)',
          fontSize: '0.7rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
        opacity={heroFade}
      >
        <span>Défiler</span>
        <motion.div
          style={{ width: 2, height: 40, background: 'var(--accent)' }}
          animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.section>
  );
}

/**
 * SplitReveal - Two panels that reveal from center on scroll
 */
export function SplitReveal({
  left,
  right,
  className = '',
  style = {},
  minHeight = '100vh',
  backgroundColor = 'transparent',
}) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const leftX = useTransform(scrollYProgress, [0, 1], [-100, 0]);
  const rightX = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);

  return (
    <motion.section
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        minHeight,
        backgroundColor,
        overflow: 'hidden',
        ...style,
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 60px',
          willChange: 'transform, opacity',
        }}
        x={leftX}
        opacity={opacity}
      >
        {left}
      </motion.div>

      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 60px',
          willChange: 'transform, opacity',
        }}
        x={rightX}
        opacity={opacity}
      >
        {right}
      </motion.div>
    </motion.section>
  );
}