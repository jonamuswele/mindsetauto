import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useRef, useEffect, useState, useMemo } from 'react';

/**
 * ParallaxImage - Image that moves at different speed than scroll
 * Creates depth perception
 */
export function ParallaxImage({ 
  src, 
  alt = '', 
  speed = 0.3, 
  className = '',
  style = {}
}) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, window.innerHeight], [0, window.innerHeight * speed]);
  
  return (
    <motion.div 
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        overflow: 'hidden',
        ...style
      }}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          willChange: 'transform',
        }}
        y={y}
      />
    </motion.div>
  );
}

/**
 * ScrollReveal - Text/element that reveals as it enters viewport
 * Supports line-by-line, word-by-word, or character-by-character
 * Uses scroll-driven animations for smooth, reversible transitions
 */
export function ScrollReveal({ 
  children, 
  type = 'lines', // 'lines' | 'words' | 'chars' | 'fade' | 'slide'
  delay = 0,
  duration = 0.8,
  stagger = 0.08,
  threshold = 0.1,
  rootMargin = '0px 0px 0px 0px',
  className = '',
  style = {},
  once = false,
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Scroll-driven transforms - these naturally animate in AND out with scroll
  const opacity = useTransform(scrollYProgress, [0, threshold], [0, 1]);
  const y = useTransform(scrollYProgress, [0, threshold], [60, 0]);
  const slideX = useTransform(scrollYProgress, [0, threshold], [-40, 0]);

  // Split children into lines/words/chars if needed
  const childArray = typeof children === 'string' ? [children] : 
    Array.isArray(children) ? children : [children];

  if (type === 'fade') {
    return (
      <motion.div 
        ref={ref}
        className={className}
        style={style}
        animate={{ opacity, y }}
        transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    );
  }

  if (type === 'slide') {
    return (
      <motion.div 
        ref={ref}
        className={className}
        style={style}
        animate={{ opacity, x: slideX }}
        transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    );
  }

  // For lines/words/chars, we need to split the text
  const text = typeof children === 'string' ? children : 
    Array.isArray(children) ? children.join(' ') : String(children);
  
  let items = [];
  let splitBy = '';
  
  if (type === 'lines') {
    items = text.split('\n').filter(l => l.trim());
    splitBy = '\n';
  } else if (type === 'words') {
    items = text.split(' ').filter(w => w.trim());
    splitBy = ' ';
  } else if (type === 'chars') {
    items = text.split('');
    splitBy = '';
  }

  // Pre-compute staggered scroll-driven transforms for each item
  const itemTransforms = useMemo(() => 
    items.map((_, i) => {
      const itemThreshold = threshold + i * 0.05;
      return {
        opacity: useTransform(scrollYProgress, [0, itemThreshold], [0, 1]),
        y: useTransform(scrollYProgress, [0, itemThreshold], [30, 0]),
      };
    }),
    [scrollYProgress, items.length, threshold]
  );

  return (
    <motion.div ref={ref} className={className} style={style}>
      {items.map((item, i) => (
        <motion.div
          key={i}
          animate={{ opacity: itemTransforms[i].opacity, y: itemTransforms[i].y }}
          transition={{ 
            duration, 
            delay: delay + i * stagger, 
            ease: [0.16, 1, 0.3, 1] 
          }}
          style={{ display: type === 'chars' ? 'inline' : 'block' }}
        >
          {item}{splitBy && type !== 'chars' && splitBy}
        </motion.div>
      ))}
    </motion.div>
  );
}

/**
 * PinSection - Section that pins while content scrolls inside
 * Creates "sticky" storytelling sections
 */
export function PinSection({ 
  children, 
  height = '400vh', // How long to pin (multiple of viewport)
  className = '',
  style = {},
  onProgress,
}) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (onProgress) onProgress(latest);
  });

  return (
    <motion.div
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        height,
        width: '100%',
        ...style,
      }}
    >
      <motion.div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/**
 * HorizontalScroll - Horizontal scrolling section within vertical scroll
 * Great for project galleries, timelines
 */
export function HorizontalScroll({ 
  children, 
  className = '',
  style = {},
  spacing = 40,
  padding = 80,
}) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-100%']);

  return (
    <motion.div
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        height: '300vh', // Long enough for horizontal scroll
        width: '100%',
        ...style,
      }}
    >
      <motion.div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          padding: `0 ${padding}px`,
        }}
      >
        <motion.div
          style={{
            display: 'flex',
            gap: `${spacing}px`,
            width: 'max-content',
            willChange: 'transform',
          }}
          x={x}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/**
 * Counter - Animated number counter on scroll
 */
export function Counter({ 
  value, 
  duration = 1.5,
  delay = 0,
  className = '',
  style = {},
  prefix = '',
  suffix = '',
  threshold = 0.3,
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const [hasAnimated, setHasAnimated] = useState(false);
  const countRef = useRef(0);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest > threshold && !hasAnimated) {
      setHasAnimated(true);
      const start = 0;
      const end = value;
      const startTime = performance.now();
      
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOut
        countRef.current = Math.floor(start + (end - start) * eased);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  });

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{countRef.current || 0}{suffix}
    </span>
  );
}



/**
 * ScrollProgress - Visual scroll progress indicator
 */
export function ScrollProgress({ 
  className = '', 
  style = {},
  color = 'var(--accent)',
  height = 3,
  position = 'top', // 'top' | 'bottom'
}) {
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <motion.div
      className={className}
      style={{
        position: 'fixed',
        [position]: 0,
        left: 0,
        zIndex: 9999,
        height,
        background: 'var(--border)',
        ...style,
      }}
    >
      <motion.div
        style={{
          height: '100%',
          background: color,
          borderRadius: 'inherit',
        }}
        width={width}
      />
    </motion.div>
  );
}

/**
 * ImageSequence - Sequence of images that crossfade on scroll
 * Like a flipbook/video controlled by scroll
 */
export function ImageSequence({ 
  images, 
  className = '',
  style = {},
  height = '100vh',
}) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const currentIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, images.length - 1],
    { clamp: true }
  );

  return (
    <motion.div
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
      {images.map((src, i) => (
        <motion.img
          key={i}
          src={src}
          alt={`Frame ${i + 1}`}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            willChange: 'opacity',
          }}
          opacity={useTransform(currentIndex, [i - 0.5, i, i + 0.5], [0, 1, 0], { clamp: true })}
        />
      ))}
    </motion.div>
  );
}

/**
 * StickyStack - Stack of cards that peel away on scroll
 */
export function StickyStack({ 
  children, 
  className = '',
  style = {},
  spacing = 100,
  scaleStep = 0.95,
}) {
  const items = Array.isArray(children) ? children : [children];
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <motion.div
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        height: `${items.length * 100}vh`,
        width: '100%',
        ...style,
      }}
    >
      {items.map((child, i) => {
        const startProgress = i / items.length;
        const endProgress = (i + 1) / items.length;

        const y = useTransform(scrollYProgress, [startProgress, endProgress], [0, -spacing * (items.length - i)]);
        const scale = useTransform(scrollYProgress, [startProgress, endProgress], [1, scaleStep]);
        const opacity = useTransform(scrollYProgress, [startProgress, endProgress - 0.05], [1, 0], { clamp: true });
        const zIndex = items.length - i;

        return (
          <motion.div
            key={i}
            style={{
              position: 'sticky',
              top: spacing * i,
              zIndex,
              willChange: 'transform, opacity',
            }}
            y={y}
            scale={scale}
            opacity={opacity}
          >
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
}