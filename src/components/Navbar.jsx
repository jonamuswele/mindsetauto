import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, openBookingModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home',         label: 'Accueil' },
    { id: 'realizations', label: 'Réalisations' },
    { id: 'inspiration',  label: 'Inspiration' },
    { id: 'contact',      label: 'Contact' },
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          {/* Brand */}
          <div className="nav-brand" onClick={() => handleNavClick('home')}>
            Mindset Auto
          </div>

          {/* Desktop links */}
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <span
                  className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  {item.label}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="nav-actions">
            <button
              className="btn-primary"
              style={{ padding: '10px 28px', fontSize: '0.72rem' }}
              onClick={openBookingModal}
            >
              <span>Prendre RDV</span>
            </button>
          </div>

          {/* Mobile trigger */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              style={{ position: 'fixed', inset: 0, background: 'rgba(20,20,20,0.35)', zIndex: 140 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              className="mobile-nav"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', ease: 'easeOut', duration: 0.28 }}
            >
              <button
                className="modal-close-spacex"
                style={{ top: 24, right: 28 }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={22} />
              </button>

              <ul className="mobile-nav-links">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <span
                      className={`mobile-nav-link ${activeTab === item.id ? 'active' : ''}`}
                      onClick={() => handleNavClick(item.id)}
                    >
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: 'auto' }}>
                <button
                  className="btn-primary"
                  style={{ width: '100%', padding: '14px 0', justifyContent: 'center' }}
                  onClick={() => { setMobileMenuOpen(false); openBookingModal(); }}
                >
                  <span>Prendre RDV</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}