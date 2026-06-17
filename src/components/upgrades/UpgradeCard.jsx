import { motion } from 'framer-motion';

export default function UpgradeCard({
  item,
  category,
  isActive = false,
  onClick,
  onNavigate,
  className = '',
}) {
  const { label, desc, id } = item;
  const { color, label: catLabel } = category;

  return (
    <motion.button
      className={`upgrade-card ${isActive ? 'active' : ''} ${className}`}
      onClick={onClick}
      style={{
        '--card-color': color,
        borderColor: isActive ? color : 'var(--border)',
        boxShadow: isActive ? `0 0 0 1px ${color}, 0 20px 60px rgba(0,0,0,0.15)` : 'none',
      }}
      whileHover={{ y: -6, boxShadow: `0 30px 80px rgba(0,0,0,0.2), 0 0 0 1px ${color}` }}
      whileTap={{ scale: 0.985 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="card-glow"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ background: `linear-gradient(90deg, ${color}00, ${color}40, ${color}00)` }}
      />

      <div className="card-icon" style={{ background: `${color}15`, color: color }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {category.id === 'interieur' && (
            <>
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <path d="M9 22V12h6v10" />
            </>
          )}
          {category.id === 'audio' && (
            <>
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              <path d="M22 4a16 16 0 0 1 0 16" />
            </>
          )}
          {category.id === 'exterieur' && (
            <>
              <rect x="1" y="3" width="15" height="13" rx="2" />
              <path d="M5 3v13" />
              <path d="M19 3v13" />
              <circle cx="6" cy="18" r="2" />
              <circle cx="18" cy="18" r="2" />
            </>
          )}
          {category.id === 'performance' && (
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          )}
        </svg>
      </div>

      <div className="card-content">
        <span className="card-category" style={{ color }}>{catLabel}</span>
        <h3 className="card-title">{label}</h3>
        <p className="card-desc">{desc}</p>
      </div>

      <motion.div
        className="card-nav-hint"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: isActive ? 1 : 0, x: 0 }}
        transition={{ delay: 0.2 }}
        onClick={(e) => { e.stopPropagation(); onNavigate?.(id); }}
      >
        <span>Voir options</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </motion.div>

      {isActive && (
        <motion.div
          className="card-expand"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="expand-divider" />
          <div className="expand-content">
            <p>Choisissez une option ci-dessous pour voir les détails, prix indicatifs et exemples avant/après.</p>
            <div className="expand-actions">
              <button className="btn-expand-primary" onClick={(e) => { e.stopPropagation(); onNavigate?.(id); }}>
                Explorer {label}
              </button>
              <button className="btn-expand-secondary" onClick={(e) => { e.stopPropagation(); }} >
                Devis gratuit
              </button>
            </div>
          </div>
        </motion.div>
      )}

      <style jsx>{`
        .upgrade-card {
          position: relative;
          width: 100%;
          padding: 28px 32px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          cursor: pointer;
          text-align: left;
          overflow: hidden;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .upgrade-card.active {
          z-index: 10;
        }
        .card-glow {
          position: absolute;
          top: 0; left: 0; right: 0; height: 2px;
          transform-origin: left;
        }
        .card-icon {
          width: 56px; height: 56px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .card-content { flex: 1; display: flex; flex-direction: column; gap: 8px; }
        .card-category {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .card-title {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }
        .card-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }
        .card-nav-hint {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          cursor: pointer;
          padding: 8px 0;
          border-top: 1px solid var(--border);
          margin-top: auto;
        }
        .card-nav-hint svg { transition: transform 0.2s; }
        .upgrade-card:hover .card-nav-hint svg { transform: translateX(4px); }
        .card-expand {
          border-top: 1px solid var(--border);
          margin: 8px -32px -28px;
          padding: 20px 32px 28px;
        }
        .expand-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border), transparent);
          margin: -20px -32px 20px;
        }
        .expand-content { display: flex; flex-direction: column; gap: 16px; }
        .expand-content p { color: var(--text-secondary); font-size: 0.9rem; margin: 0; }
        .expand-actions { display: flex; gap: 12px; flex-wrap: wrap; }
        .btn-expand-primary, .btn-expand-secondary {
          padding: 12px 24px;
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border-radius: 3px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-expand-primary {
          background: var(--card-color);
          color: var(--text-invert);
          border: none;
        }
        .btn-expand-primary:hover { filter: brightness(1.1); }
        .btn-expand-secondary {
          background: transparent;
          color: var(--text-secondary);
          border: 1px solid var(--border);
        }
        .btn-expand-secondary:hover { border-color: var(--border-strong); color: var(--text-primary); }
        @media (max-width: 640px) {
          .upgrade-card { padding: 24px; }
          .card-expand { margin: 8px -24px -24px; padding: 20px 24px 24px; }
        }
      `}</style>
    </motion.button>
  );
}