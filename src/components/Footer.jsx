export default function Footer({ setActiveTab }) {
  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-spacex">
      <div className="container" style={{ flexDirection: 'column', gap: '20px', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <ul className="footer-spacex-links">
            <li className="footer-spacex-link" onClick={() => handleNavClick('home')}>Accueil</li>
            <li className="footer-spacex-link" onClick={() => handleNavClick('realizations')}>Réalisations</li>
            <li className="footer-spacex-link" onClick={() => handleNavClick('mycar')}>Ma Voiture</li>
            <li className="footer-spacex-link" onClick={() => handleNavClick('contact')}>Contact</li>
            <li>
              <a href={`https://wa.me/243995859333?text=Bonjour%20Mindset%20Auto`} target="_blank" rel="noreferrer" className="footer-spacex-link" style={{ color: 'var(--accent-deep)' }}>WhatsApp</a>
            </li>
            <li>
              <a href="https://web.facebook.com/profile.php?id=61573778981393" target="_blank" rel="noreferrer" className="footer-spacex-link" style={{ color: 'var(--accent-deep)' }}>Facebook</a>
            </li>
            <li>
              <a href="https://www.tiktok.com/@mindset.auto" target="_blank" rel="noreferrer" className="footer-spacex-link" style={{ color: 'var(--accent-deep)' }}>TikTok</a>
            </li>
          </ul>
        </div>
        <div className="footer-spacex-brand">
          Mindset Auto &copy; {new Date().getFullYear()} &bull; Lubumbashi, RDC &bull; <a href="mailto:mindsetauto243@gmail.com" style={{ color: 'var(--accent-deep)', textDecoration: 'none' }}>mindsetauto243@gmail.com</a>
        </div>
      </div>
    </footer>
  );
}