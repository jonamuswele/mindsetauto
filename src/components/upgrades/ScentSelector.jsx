import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Droplet, Leaf, Flame, Snowflake, Wind, Cloud, FlaskConical } from 'lucide-react';

const SCENTS = [
  { id: 'cuir', label: 'Cuir Neuf', note: 'Notes chaudes, vanillées, boisées', icon: <span style={{fontSize:'1.5rem'}}>🛋️</span>, color: '#D4A574', vibe: 'Premium, rassurant' },
  { id: 'cedre', label: 'Bois de Cèdre', note: 'Sec, noble, légèrement épicé', icon: <Leaf size={20} />, color: '#8F7A66', vibe: 'Naturel, élégant' },
  { id: 'ozone', label: 'Air Pur / Ozone', note: 'Propre, minéral, fraîcheur alpine', icon: <Wind size={20} />, color: '#A8D0E6', vibe: 'Clinique, high-tech' },
  { id: 'agrumes', label: 'Agrumes Énergisants', note: 'Bergamote, citron vert, pamplemousse', icon: <span style={{fontSize:'1.5rem'}}>🍋</span>, color: '#F5D01E', vibe: 'Dynamique, matin' },
  { id: 'ambre', label: 'Ambre & Musc', note: 'Profond, sensuel, longue tenue', icon: <Droplet size={20} />, color: '#C98A5A', vibe: 'Soirée, intime' },
  { id: 'pin', label: 'Pin Sylvestre', note: 'Résineux, forestier, vivifiant', icon: <Leaf size={20} style={{color:'#2D5A27'}} />, color: '#2D5A27', vibe: 'Aventure, nature' },
  { id: 'jasmin', label: 'Jasmin de Nuit', note: 'Floral blanc, envoûtant, doux', icon: <Sparkles size={20} />, color: '#F0E6D2', vibe: 'Romantique, doux' },
  { id: 'neuf', label: 'Voiture Neuve', note: 'Ce parfum usine inimitable', icon: <FlaskConical size={20} />, color: '#6B7280', vibe: 'Nostalgie, neuf' },
];

export default function ScentSelector({
  selectedScent,
  onSelect,
  title = "Quelle ambiance pour votre habitacle ?",
  subtitle = "Choisissez une signature olfactive — diffuseur intégré ou clip ventilo fourni",
}) {
  const [hoveredId, setHoveredId] = useState(null);
  const containerRef = useRef(null);

  const scrollToSelected = () => {
    if (!containerRef.current || !selectedScent) return;
    const selectedEl = containerRef.current.querySelector(`[data-scent="${selectedScent}"]`);
    if (selectedEl) {
      const container = containerRef.current;
      const offset = selectedEl.offsetLeft - container.offsetWidth / 2 + selectedEl.offsetWidth / 2;
      container.scrollTo({ left: offset, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToSelected();
  }, [selectedScent]);

  return (
    <div style={{ position: 'relative' }}>
      <div className="container" style={{ paddingTop: '20px', paddingBottom: '8px' }}>
        <div style={{ marginBottom: '24px', maxWidth: '600px' }}>
          <span className="eyebrow" style={{ color: 'var(--accent)' }}>Ambiance Olfactive</span>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 600, marginTop: '8px', lineHeight: 1.2 }}>
            {title}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, marginTop: '12px', fontWeight: 300 }}>
            {subtitle}
          </p>
        </div>

        <div
          ref={containerRef}
          onWheel={(e) => {
            if (e.deltaY !== 0) {
              e.currentTarget.scrollLeft += e.deltaY;
              e.preventDefault();
            }
          }}
          style={{
            display: 'flex',
            gap: '16px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            padding: '8px 4px 16px',
            msOverflowStyle: 'none',
          }}
        >
          {SCENTS.map((scent, i) => {
            const isSelected = selectedScent === scent.id;
            const isHovered = hoveredId === scent.id;
            return (
              <motion.button
                key={scent.id}
                data-scent={scent.id}
                onClick={() => onSelect(scent.id)}
                onMouseEnter={() => setHoveredId(scent.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '24px 20px',
                  minWidth: '180px',
                  maxWidth: '200px',
                  flexShrink: 0,
                  background: isSelected
                    ? `linear-gradient(135deg, ${scent.color}22 0%, ${scent.color}11 100%)`
                    : 'rgba(255,255,255,0.03)',
                  border: isSelected
                    ? `2px solid ${scent.color}`
                    : isHovered
                    ? '1px solid var(--border-strong)'
                    : '1px solid var(--border)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.2)', borderColor: scent.color }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {/* Animated background glow */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      key="glow"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      style={{
                        position: 'absolute',
                        inset: -2,
                        background: `radial-gradient(ellipse at center, ${scent.color}33 0%, transparent 70%)`,
                        pointerEvents: 'none',
                        zIndex: 0,
                        borderRadius: '6px',
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Icon */}
                <motion.div
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    background: isSelected
                      ? `linear-gradient(135deg, ${scent.color}44 0%, ${scent.color}22 100%)`
                      : 'rgba(255,255,255,0.05)',
                    border: isSelected
                      ? `2px solid ${scent.color}`
                      : '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                  }}
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  {scent.icon}
                </motion.div>

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', width: '100%' }}>
                  <motion.div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: isSelected ? scent.color : 'var(--text-primary)',
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {scent.label}
                  </motion.div>

                  <motion.div
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.5,
                      marginTop: '4px',
                      minHeight: '36px',
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    {scent.note}
                  </motion.div>

                  <motion.div
                    style={{
                      fontSize: '0.65rem',
                      fontWeight: 500,
                      color: isSelected ? scent.color : 'var(--accent)',
                      marginTop: '8px',
                      padding: '4px 12px',
                      background: isSelected
                        ? `${scent.color}22`
                        : 'var(--accent-glow)',
                      border: isSelected
                        ? `1px solid ${scent.color}44`
                        : '1px solid var(--accent-light)',
                      borderRadius: '100px',
                      display: 'inline-block',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {scent.vibe}
                  </motion.div>
                </div>

                {/* Selection indicator */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      key="check"
                      initial={{ opacity: 0, scale: 0, rotate: -90 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0, rotate: 90 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        background: scent.color,
                        border: '2px solid #fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontSize: '0.75rem',
                        zIndex: 2,
                        boxShadow: `0 4px 16px ${scent.color}66`,
                      }}
                    >
                      ✓
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>

        <style jsx>{`
          div::-webkit-scrollbar { display: none; }
        `}</style>
      </div>
    </div>
  );
}