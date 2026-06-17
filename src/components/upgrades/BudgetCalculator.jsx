import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { getAllSubItems } from '../../data/upgrades';

const CATEGORY_RANGES = {
  interieur: { min: 350, max: 4500, unit: '$' },
  audio: { min: 200, max: 3500, unit: '$' },
  exterieur: { min: 500, max: 8000, unit: '$' },
  performance: { min: 400, max: 12000, unit: '$' },
};

export default function BudgetCalculator({ onRequestQuote, className = '' }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [scope, setScope] = useState('essential'); // 'essential' | 'comfort' | 'premium'

  const items = useMemo(() => getAllSubItems(), []);

  const totals = useMemo(() => {
    const itemsWithPrices = selectedItems.map(id => {
      const item = items.find(i => i.id === id);
      if (!item) return null;
      const range = CATEGORY_RANGES[item.categoryId] || { min: 200, max: 2000 };
      const multiplier = scope === 'essential' ? 0.6 : scope === 'comfort' ? 0.85 : 1.2;
      return {
        ...item,
        min: Math.round(range.min * multiplier),
        max: Math.round(range.max * multiplier),
      };
    }).filter(Boolean);

    const min = itemsWithPrices.reduce((sum, i) => sum + i.min, 0);
    const max = itemsWithPrices.reduce((sum, i) => sum + i.max, 0);
    return { items: itemsWithPrices, min, max };
  }, [selectedItems, scope, items]);

  const toggleItem = (id) => {
    setSelectedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className={`budget-calculator ${className}`}>
      <motion.div
        className="calculator-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3>Estimez votre budget</h3>
        <p>Sélectionnez les upgrades souhaités, choisissez un niveau de finition, obtenez une fourchette indicative.</p>
      </motion.div>

      <div className="calculator-body">
        <div className="calculator-sidebar">
          <div className="scope-selector">
            <label>Niveau de finition</label>
            <div className="scope-options">
              {[
                { id: 'essential', label: 'Essentiel', desc: 'Qualité pro, budget maîtrisé' },
                { id: 'comfort', label: 'Confort', desc: 'Matériaux premium, finitions soignées' },
                { id: 'premium', label: 'Premium', desc: 'Haut de gamme, sur-mesure total' },
              ].map(opt => (
                <motion.button
                  key={opt.id}
                  className={`scope-btn ${scope === opt.id ? 'active' : ''}`}
                  onClick={() => setScope(opt.id)}
                  whileHover={{ borderColor: 'var(--accent)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="scope-label">{opt.label}</span>
                  <span className="scope-desc">{opt.desc}</span>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="items-selector">
            <label>Upgrades souhaités</label>
            <div className="items-list">
              {items.map(item => {
                const isSelected = selectedItems.includes(item.id);
                const range = CATEGORY_RANGES[item.categoryId] || { min: 200, max: 2000 };
                const multiplier = scope === 'essential' ? 0.6 : scope === 'comfort' ? 0.85 : 1.2;
                const min = Math.round(range.min * multiplier);
                const max = Math.round(range.max * multiplier);
                return (
                  <motion.label
                    key={item.id}
                    className={`item-checkbox ${isSelected ? 'checked' : ''}`}
                    whileHover={{ background: isSelected ? 'var(--accent-glow)' : 'var(--bg-card-hover)' }}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleItem(item.id)}
                    />
                    <div className="item-info">
                      <span className="item-category" style={{ color: item.categoryColor }}>{item.categoryLabel}</span>
                      <span className="item-name">{item.label}</span>
                    </div>
                    <span className="item-price-range">{min} – {max}$</span>
                  </motion.label>
                );
              })}
            </div>
          </div>
        </div>

        <div className="calculator-result">
          <motion.div className="result-card" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="result-total">
              <span className="total-label">Fourchette estimée</span>
              <div className="total-amount">
                {totals.min > 0 ? (
                  <>
                    <span className="currency">$</span>
                    <span className="min">{totals.min.toLocaleString()}</span>
                    <span className="separator"> – </span>
                    <span className="max">{totals.max.toLocaleString()}</span>
                    <span className="currency-end">$</span>
                  </>
                ) : (
                  <span className="empty">Sélectionnez des upgrades</span>
                )}
              </div>
              <p className="total-note">
                * Prix indicatifs TTC, main-d'œuvre incluse. Devis final après diagnostic chez vous.
              </p>
            </div>

            {totals.items.length > 0 && (
              <div className="result-breakdown">
                <h4>Détail</h4>
                <ul>
                  {totals.items.map(item => (
                    <li key={item.id}>
                      <span>{item.label}</span>
                      <span>{item.min} – {item.max}$</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <motion.button
              className="btn-request-quote"
              onClick={() => onRequestQuote?.(totals.items.map(i => i.id), scope, totals)}
              disabled={totals.items.length === 0}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Obtenir un devis</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.button>

            <div className="result-guarantees">
              <span>✓ Diagnostic chez vous</span>
              <span>✓ Devis clair sans engagement</span>
              <span>✓ Garantie 2 ans pièces + MO</span>
              <span>✓ Déplacement offert Lubumbashi + 20km</span>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .budget-calculator { width: 100%; max-width: 1000px; margin: 0 auto; }
        .calculator-header { text-align: center; margin-bottom: 48px; }
        .calculator-header h3 { font-family: var(--font-display); font-size: 1.8rem; font-weight: 600; margin: 0 0 12px; }
        .calculator-header p { color: var(--text-secondary); font-size: 1rem; margin: 0; }
        .calculator-body { display: grid; grid-template-columns: 1fr 380px; gap: 40px; align-items: start; }
        .calculator-sidebar { display: flex; flex-direction: column; gap: 32px; }
        .scope-selector label, .items-selector label {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 16px;
        }
        .scope-options { display: flex; flex-direction: column; gap: 10px; }
        .scope-btn {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 20px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 6px;
          cursor: pointer;
          text-align: left;
          transition: all 0.2s;
        }
        .scope-btn.active { border-color: var(--accent); background: var(--accent-glow); }
        .scope-label { font-family: var(--font-display); font-size: 1rem; font-weight: 600; color: var(--text-primary); }
        .scope-desc { font-size: 0.8rem; color: var(--text-secondary); }
        .items-list { display: flex; flex-direction: column; gap: 8px; max-height: 400px; overflow-y: auto; padding-right: 8px; }
        .item-checkbox {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 16px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .item-checkbox.checked { border-color: var(--accent); background: var(--accent-glow); }
        .item-checkbox input { display: none; }
        .item-checkbox::before {
          content: ''; width: 20px; height: 20px;
          border: 2px solid var(--border);
          border-radius: 4px;
          flex-shrink: 0;
          transition: all 0.2s;
        }
        .item-checkbox.checked::before {
          border-color: var(--accent);
          background: var(--accent);
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3'%3E%3Cpolyline points='20 6 9 17 4 12'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: center;
        }
        .item-info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
        .item-category { font-family: var(--font-mono); font-size: 0.6rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; }
        .item-name { font-size: 0.85rem; color: var(--text-primary); font-weight: 500; }
        .item-price-range { font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); white-space: nowrap; }
        .calculator-result { position: sticky; top: 100px; }
        .result-card {
          background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-elevated) 100%);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 32px;
          display: flex; flex-direction: column; gap: 24px;
        }
        .result-total { text-align: center; }
        .total-label { display: block; font-family: var(--font-mono); font-size: 0.65rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 8px; }
        .total-amount { display: inline-flex; align-items: baseline; gap: 2px; font-family: var(--font-display); font-size: 2.5rem; font-weight: 700; color: var(--accent); }
        .total-amount .currency { font-size: 1.5rem; }
        .total-amount .separator { color: var(--text-secondary); font-weight: 400; }
        .total-amount .empty { font-family: var(--font-sans); font-size: 1rem; color: var(--text-secondary); font-weight: 400; }
        .total-note { font-size: 0.75rem; color: var(--text-muted); margin: 10px 0 0; }
        .result-breakdown h4 { font-family: var(--font-display); font-size: 1rem; font-weight: 600; margin: 0 0 12px; padding-bottom: 12px; border-bottom: 1px solid var(--border); }
        .result-breakdown ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
        .result-breakdown li { display: flex; justify-content: space-between; font-size: 0.85rem; }
        .result-breakdown li span:first-child { color: var(--text-secondary); }
        .result-breakdown li span:last-child { color: var(--text-primary); font-weight: 500; font-family: var(--font-mono); }
        .btn-request-quote {
          display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          padding: 16px 32px;
          font-family: var(--font-sans); font-size: 0.8rem; font-weight: 500;
          letter-spacing: 0.08em; text-transform: uppercase;
          background: var(--accent); color: #fff; border: none; border-radius: 3px;
          cursor: pointer; transition: all 0.2s; width: 100%;
        }
        .btn-request-quote:disabled { opacity: 0.5; cursor: not-allowed; }
        .result-guarantees { display: flex; flex-direction: column; gap: 10px; padding-top: 16px; border-top: 1px solid var(--border); }
        .result-guarantees span { font-size: 0.75rem; color: var(--text-secondary); display: flex; align-items: center; gap: 8px; justify-content: center; }
        @media (max-width: 900px) {
          .calculator-body { grid-template-columns: 1fr; }
          .calculator-result { position: static; }
          .items-list { max-height: none; }
        }
      `}</style>
    </div>
  );
}