import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../../data/upgrades';

export default function Testimonials({ className = '' }) {
  return (
    <section className={`testimonials-section ${className}`} aria-labelledby="testimonials-title">
      <motion.div
        className="testimonials-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
      >
        <span className="eyebrow">Témoignages clients</span>
        <h2 id="testimonials-title" className="section-title">
          Ils ont transformé<br /><strong>leur quotidien.</strong>
        </h2>
        <p className="section-subtitle">
          De vrais clients, de vrais véhicules, de vrais résultats. Pas d'acteurs, pas de mise en scène.
        </p>
      </motion.div>

      <div className="testimonials-grid">
        {TESTIMONIALS.map((testimonial, idx) => (
          <motion.article
            key={testimonial.id}
            className="testimonial-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
          >
            <div className="card-media">
              <img src={testimonial.image} alt={`${testimonial.name} - ${testimonial.vehicle}`} loading="lazy" />
              <div className="media-overlay" />
            </div>

            <div className="card-content">
              <div className="card-meta">
                <span className="vehicle">{testimonial.vehicle}</span>
                <span className="upgrade">{testimonial.upgrade}</span>
              </div>

              <div className="rating" aria-label={`${testimonial.rating} sur 5 étoiles`}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              <blockquote className="quote">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              <footer className="card-footer">
                <div className="author">
                  <div className="author-avatar" style={{ background: `linear-gradient(135deg, var(--accent), var(--accent-deep))` }}>
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="author-info">
                    <span className="author-name">{testimonial.name}</span>
                    <span className="author-location">Lubumbashi, RDC</span>
                  </div>
                </div>
              </footer>
            </div>
          </motion.article>
        ))}
      </div>

      <style jsx>{`
        .testimonials-section {
          width: 100%;
          padding: 100px 0;
        }
        .testimonials-header {
          text-align: center;
          max-width: 720px;
          margin: 0 auto 70px;
        }
        .eyebrow {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 16px;
        }
        .section-title {
          font-family: var(--font-display);
          font-size: clamp(2.2rem, 4vw, 3.5rem);
          font-weight: 600;
          line-height: 1.15;
          color: var(--text-primary);
          margin: 0 0 16px;
        }
        .section-subtitle {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin: 0;
          font-weight: 300;
        }
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .testimonial-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 8px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
        }
        .testimonial-card:hover {
          border-color: var(--border-strong);
          box-shadow: 0 24px 64px rgba(15,26,42,0.15);
          transform: translateY(-4px);
        }
        .card-media {
          position: relative;
          aspect-ratio: 16 / 10;
          overflow: hidden;
        }
        .card-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .testimonial-card:hover .card-media img {
          transform: scale(1.03);
        }
        .media-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 50%, rgba(15,26,42,0.4) 100%);
        }
        .card-content {
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          flex: 1;
        }
        .card-meta {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .vehicle {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .upgrade {
          font-size: 0.8rem;
          color: var(--accent);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .rating {
          display: flex;
          gap: 2px;
        }
        .quote {
          font-size: 0.95rem;
          line-height: 1.75;
          color: var(--text-secondary);
          margin: 0;
          font-style: italic;
          font-weight: 300;
          flex: 1;
        }
        .card-footer {
          padding-top: 8px;
          border-top: 1px solid var(--border);
        }
        .author {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .author-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 600;
        }
        .author-info {
          display: flex;
          flex-direction: column;
        }
        .author-name {
          font-weight: 500;
          color: var(--text-primary);
          font-size: 0.9rem;
        }
        .author-location {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        @media (max-width: 640px) {
          .testimonials-section { padding: 80px 0; }
          .testimonials-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}