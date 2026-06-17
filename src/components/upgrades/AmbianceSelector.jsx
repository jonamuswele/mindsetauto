import { motion } from 'framer-motion';
import { AMBIANCE_OPTIONS } from '../../data/upgrades';

export default function AmbianceSelector({ selectedId, onSelect, className = '' }) {
  return (
    <div className={`ambiance-selector ${className}`}>
      <div className="ambiance-grid">
        {AMBIANCE_OPTIONS.map((ambiance, idx) => (
          <motion.button
            key={ambiance.id}
            className={`ambiance-card ${selectedId === ambiance.id ? 'selected' : ''}`}
            onClick={() => onSelect(ambiance.id)}
            style={{
              '--ambiance-color': ambiance.color,
              borderColor: selectedId === ambiance.id ? ambiance.color : 'var(--border)',
            }}
            whileHover={{ y: -4, boxShadow: `0 16px 48px ${ambiance.color}30` }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.06 }}
          >
            <div className="ambiance-image" style={{ backgroundImage: `url(${ambiance.image})` }}>
              <div className="image-overlay" style={{ background: `linear-gradient(180deg, transparent 40%, ${ambiance.color}CC)` }} />
              {selectedId === ambiance.id && (
                <motion.div className="check-badge" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </motion.div>
              )}
            </div>

            <div className="ambiance-info">
              <div className="ambiance-header">
                <span className="ambiance-label">{ambiance.label}</span>
                <span className="ambiance-color-dot" style={{ background: ambiance.color }} />
              </div>
              <p className="ambiance-desc">{ambiance.desc}</p>
              <div className="ambiance-notes">
                <span className="notes-label">Notes :</span>
                <span className="notes-values">{ambiance.scentNotes}</span>
              </div>
            </div>

            <style jsx>{`
              .ambiance-card {
                position: relative;
                background: var(--bg-card);
                border: 1px solid var(--border);
                border-radius: 8px;
                overflow: hidden;
                cursor: pointer;
                transition: border-color 0.3s, box-shadow 0.3s, transform 0.2s;
              }
              .ambiance-card.selected {
                border-width: 2px;
                box-shadow: 0 0 0 1px var(--ambiance-color), 0 20px 60px var(--ambiance-color)20;
              }
              .ambiance-image {
                position: relative;
                aspect-ratio: 4 / 3;
                background-size: cover;
                background-position: center;
              }
              .image-overlay {
                position: absolute;
                inset: 0;
                border-radius: 8px 8px 0 0;
              }
              .check-badge {
                position: absolute;
                bottom: 16px; right: 16px;
                width: 40px; height: 40px;
                border-radius: 50%;
                background: var(--ambiance-color);
                color: var(--text-invert);
                display: flex; align-items: center; justify-content: center;
                box-shadow: 0 4px 16px var(--ambiance-color)50;
              }
              .ambiance-info {
                padding: 20px;
                display: flex; flex-direction: column; gap: 10px;
              }
              .ambiance-header {
                display: flex; align-items: center; justify-content: space-between; gap: 12px;
              }
              .ambiance-label {
                font-family: var(--font-display);
                font-size: 1.1rem;
                font-weight: 600;
                color: var(--text-primary);
              }
              .ambiance-color-dot {
                width: 14px; height: 14px;
                border-radius: 3px;
                flex-shrink: 0;
                box-shadow: 0 0 8px var(--ambiance-color);
              }
              .ambiance-desc {
                font-size: 0.85rem;
                color: var(--text-secondary);
                margin: 0;
              }
              .ambiance-notes {
                display: flex; gap: 8px; align-items: flex-start;
                font-size: 0.75rem;
                padding-top: 8px;
                border-top: 1px solid var(--border);
              }
              .notes-label {
                color: var(--text-muted);
                font-family: var(--font-mono);
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: 0.08em;
                flex-shrink: 0;
              }
              .notes-values {
                color: var(--text-secondary);
                line-height: 1.5;
              }
            `}</style>
          </motion.button>
        ))}
      </div>

      <style jsx>{`
        .ambiance-selector { width: 100%; }
        .ambiance-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }
        @media (max-width: 768px) {
          .ambiance-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}