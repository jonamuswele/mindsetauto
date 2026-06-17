import { motion } from 'framer-motion';
import { ChevronLeft, Check, ChevronRight, Image, Minus, Plus } from 'lucide-react';
import AmbianceSelector from './AmbianceSelector';

export default function UpgradeDetailView({
  category,
  subItem,
  selectedOptionId,
  onOptionSelect,
  onBack,
  onNavigate,
  selectedAmbiance,
  setSelectedAmbiance,
}) {
  const { options, label, desc } = subItem;
  const color = category.color;
  const categoryLabel = category.label;

  return (
    <div className="detail-view">
      <button
        className="back-btn"
        onClick={onBack}
        whileHover={{ x: -4 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronLeft size={20} />
        <span>Retour à {categoryLabel}</span>
      </button>

      <motion.div
        className="detail-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="detail-category" style={{ color }}>{categoryLabel}</span>
        <h2>{label}</h2>
        <p>{desc}</p>
      </motion.div>

      <motion.div
        className="options-carousel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {options.map((option, idx) => (
          <motion.button
            key={option.id}
            className={`option-card ${selectedOptionId === option.id ? 'selected' : ''}`}
            onClick={() => onOptionSelect(option.id)}
            style={{
              borderColor: selectedOptionId === option.id ? color : 'var(--border)',
              boxShadow: selectedOptionId === option.id ? `0 0 0 1px ${color}, 0 20px 60px ${color}20` : 'none',
            }}
            whileHover={{ y: -4, borderColor: selectedOptionId === option.id ? color : 'var(--border-strong)' }}
            whileTap={{ scale: 0.985 }}
          >
            {selectedOptionId === option.id && (
              <motion.div
                className="selection-badge"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Check size={18} />
              </motion.div>
            )}

            <div className="option-media">
              <img src={option.image} alt={option.label} loading="lazy" />
              <div className="media-gradient" />
            </div>

            <div className="option-content">
              <div className="option-header">
                <h3>{option.label}</h3>
              </div>
              <p className="option-desc">{option.desc}</p>

              <div className="option-features">
                {option.features.map((feat, fi) => (
                  <span key={fi} className="feature-tag">
                    {feat}
                  </span>
                ))}
              </div>
            </div>

            <div className="option-action">
              {selectedOptionId === option.id ? (
                <span className="selected-text">✓ Sélectionné</span>
              ) : (
                <span className="select-text">Choisir cette option</span>
              )}
              <ChevronRight size={18} style={{ opacity: selectedOptionId === option.id ? 1 : 0.4 }} />
            </div>
          </motion.button>
        ))}
      </motion.div>

      {subItem.id === 'ambiance' && selectedOptionId && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginTop: '32px', marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: '#fff' }}>Choisir une senteur :</h3>
          <AmbianceSelector selectedId={selectedAmbiance} onSelect={setSelectedAmbiance} />
        </motion.div>
      )}

      {selectedOptionId && (
        <motion.div
          className="detail-footer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="footer-summary">
            <div className="summary-label">
              <span>{label}</span>
              <span className="summary-option">{options.find(o => o.id === selectedOptionId)?.label}</span>
            </div>
          </div>
          <div className="footer-actions">
            <button className="btn-secondary" onClick={() => onOptionSelect(null)}>
              <Minus size={16} /> Changer
            </button>
            <button className="btn-primary" onClick={onNavigate} style={{ background: color, borderColor: color }}>
              <Plus size={16} /> Ajouter au projet
            </button>
          </div>
        </motion.div>
      )}

      <style jsx>{`
        .detail-view {
          display: flex;
          flex-direction: column;
          gap: 24px;
          max-width: 800px;
          margin: 0 auto;
          padding: 0 24px 40px;
        }
        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          color: var(--text-secondary);
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          padding: 8px 0;
          width: fit-content;
          transition: color 0.2s;
        }
        .back-btn:hover { color: var(--text-primary); }
        .detail-header { text-align: center; }
        .detail-category {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .detail-header h2 {
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          font-weight: 600;
          margin: 0 0 12px;
          color: var(--text-primary);
        }
        .detail-header p {
          color: var(--text-secondary);
          font-size: 1.05rem;
          line-height: 1.7;
          font-weight: 300;
          max-width: 600px;
          margin: 0 auto;
        }
        .options-carousel {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 24px;
        }
        .option-card {
          position: relative;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 10px;
          overflow: hidden;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          transition: all 0.3s;
        }
        .option-card.selected {
          z-index: 5;
        }
        .selection-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--card-color, var(--accent));
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px var(--card-color, var(--accent))50;
          z-index: 2;
        }
        .option-media {
          position: relative;
          aspect-ratio: 16 / 10;
          overflow: hidden;
        }
        .option-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .option-card:hover .option-media img {
          transform: scale(1.03);
        }
        .media-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 50%, rgba(15,26,42,0.6) 100%);
          pointer-events: none;
        }
        .option-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          flex: 1;
        }
        .option-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 16px;
        }
        .option-header h3 {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }
        .option-desc {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
          margin: 0;
        }
        .option-features {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .feature-tag {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--text-muted);
          background: var(--bg-base);
          border: 1px solid var(--border);
          padding: 4px 10px;
          border-radius: 4px;
        }
        .option-action {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          border-top: 1px solid var(--border);
          background: var(--bg-base);
        }
        .selected-text {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--accent);
        }
        .select-text {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-secondary);
        }
        .detail-footer {
          background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-elevated) 100%);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .footer-summary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .summary-label {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .summary-label span:first-child {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .summary-option {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .footer-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          flex-wrap: wrap;
        }
        .btn-primary, .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-primary {
          border: 1px solid;
          color: #fff;
        }
        .btn-primary:hover { filter: brightness(1.1); }
        .btn-secondary {
          background: transparent;
          border: 1px solid var(--border);
          color: var(--text-secondary);
        }
        .btn-secondary:hover { border-color: var(--border-strong); color: var(--text-primary); }
        @media (max-width: 768px) {
          .options-carousel { grid-template-columns: 1fr; }
          .detail-view { padding: 0 16px 32px; }
        }
      `}</style>
    </div>
  );
}