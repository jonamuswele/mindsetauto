import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CategoryTabs({
  categories,
  activeCategory,
  onChange,
  scrollContainer,
}) {
  const tabsRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollToActive = () => {
    if (!tabsRef.current) return;
    const activeTab = tabsRef.current.querySelector('[data-active="true"]');
    if (activeTab) {
      const container = tabsRef.current;
      const offset = activeTab.offsetLeft - container.offsetWidth / 2 + activeTab.offsetWidth / 2;
      container.scrollTo({ left: offset, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToActive();
  }, [activeCategory]);

  const handleScroll = () => {
    if (!tabsRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
    setScrollPosition(scrollLeft);
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  return (
    <div
      style={{
        position: 'sticky',
        top: 100,
        zIndex: 50,
        background: 'rgba(15,26,42,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
        borderTop: '1px solid var(--border)',
        padding: '16px 0',
      }}
    >
      <div className="container" style={{ position: 'relative' }}>
        {/* Scroll indicators */}
        <AnimatePresence>
          {canScrollLeft && (
            <motion.div
              key="left"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: 60,
                height: '100%',
                background: 'linear-gradient(90deg, rgba(15,26,42,1) 0%, rgba(15,26,42,0) 100%)',
                pointerEvents: 'none',
              }}
            />
          )}
          {canScrollRight && (
            <motion.div
              key="right"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              style={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: 60,
                height: '100%',
                background: 'linear-gradient(270deg, rgba(15,26,42,1) 0%, rgba(15,26,42,0) 100%)',
                pointerEvents: 'none',
              }}
            />
          )}
        </AnimatePresence>

        {/* Progress bar */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: 2,
            background: 'var(--accent)',
            zIndex: 5,
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: categories.findIndex(c => c.id === activeCategory) / Math.max(1, categories.length - 1) }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />

        <div
          ref={tabsRef}
          onScroll={handleScroll}
          onWheel={(e) => {
            if (e.deltaY !== 0) {
              e.currentTarget.scrollLeft += e.deltaY;
              e.preventDefault();
            }
          }}
          style={{
            display: 'flex',
            gap: '12px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            padding: '0 4px',
            msOverflowStyle: 'none',
          }}
        >
          {categories.map((cat, i) => (
            <motion.button
              key={cat.id}
              data-active={activeCategory === cat.id}
              onClick={() => onChange(cat.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 24px',
                background: activeCategory === cat.id
                  ? 'var(--accent)'
                  : 'rgba(255,255,255,0.04)',
                border: activeCategory === cat.id
                  ? 'none'
                  : '1px solid var(--border)',
                color: activeCategory === cat.id
                  ? '#fff'
                  : 'var(--text-secondary)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.7rem',
                fontWeight: activeCategory === cat.id ? 600 : 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                borderRadius: '2px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
                flexShrink: 0,
              }}
              whileHover={{
                background: activeCategory === cat.id ? 'var(--accent-deep)' : 'rgba(255,255,255,0.08)',
                borderColor: activeCategory === cat.id ? 'var(--accent)' : 'var(--border-strong)',
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>{cat.icon}</span>
              <span>{cat.label}</span>
              {cat.count && (
                <span
                  style={{
                    background: activeCategory === cat.id
                      ? 'rgba(255,255,255,0.2)'
                      : 'var(--accent-glow)',
                    color: activeCategory === cat.id ? '#fff' : 'var(--accent)',
                    padding: '2px 8px',
                    borderRadius: '100px',
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {cat.count}
                </span>
              )}
            </motion.button>
          ))}
        </div>

        <style jsx>{`
          div::-webkit-scrollbar { display: none; }
        `}</style>
      </div>
    </div>
  );
}