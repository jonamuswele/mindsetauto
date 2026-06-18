import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, Clock, Phone, Wrench, Cpu, Sparkles, ShieldCheck, ChevronDown, CheckCircle, Truck, Settings, Gauge, Zap, Package, Layers, FileText, Award, Heart, Shield } from 'lucide-react';
import BookingModal from '../components/BookingModal';

// ── Hero slideshow: Real African market cars (Wikimedia Commons, confirmed URLs)
const HERO_IMAGES = [
  // Classic & everyday African market staples
  { url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1600&auto=format&fit=crop&q=80', pos: 'center 50%', label: 'Mercedes Classe C' },
  { url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1600&auto=format&fit=crop&q=80', pos: 'center 50%', label: 'Range Rover Sport' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/80-89_Toyota_Land_Cruiser.jpg/1280px-80-89_Toyota_Land_Cruiser.jpg',                                                                                              pos: 'center 50%', label: 'Toyota Land Cruiser 80' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/1997-1999_Toyota_Camry.jpg/1280px-1997-1999_Toyota_Camry.jpg',                                                                                                     pos: 'center 45%', label: 'Toyota Camry XV20' },
  // Modern premium cars
  { url: 'https://images.unsplash.com/photo-1617469767052-7b461d823bea?w=1600&auto=format&fit=crop&q=80',  pos: 'center 55%', label: 'BMW Série 5 Moderne' }
  { url: 'https://images.unsplash.com/photo-1536700503-e30e08648d9c?w=1600&auto=format&fit=crop&q=80',  pos: 'center 60%', label: 'Toyota RAV4 Moderne' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Honda_Civic_EK_hatch_%2820221211%29.jpg/1280px-Honda_Civic_EK_hatch_%2820221211%29.jpg',  pos: 'center 50%', label: 'Honda Civic EK' },
];

// Why-Us section panel — Toyota Probox, iconic African market workhorse
const WHY_US_IMG = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Toyota_Probox%2C_Jamaica.jpg/1280px-Toyota_Probox%2C_Jamaica.jpg';

// Reusable animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const scaleOnHover = {
  whileHover: { scale: 1.03, transition: { duration: 0.2 } },
  whileTap: { scale: 0.98, transition: { duration: 0.1 } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const cardHover = {
  whileHover: { y: -8, boxShadow: '0 40px 80px rgba(15,26,42,0.12)', borderColor: 'var(--border-strong)', transition: { duration: 0.3 } },
};

export default function Home({ openBookingModal, setActiveTab }) {
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setHeroIndex(i => (i + 1) % HERO_IMAGES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ background: 'var(--bg-base)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      {/* ── HERO SECTION ── */}
      <section style={{ 
        position: 'relative', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 20px',
        overflow: 'hidden'
      }}>
        {/* ── Hero slideshow ── */}
        <AnimatePresence mode="sync">
          <motion.div
            key={heroIndex}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${HERO_IMAGES[heroIndex].url})`,
              backgroundSize: 'cover',
              backgroundPosition: HERO_IMAGES[heroIndex].pos,
              zIndex: 0,
            }}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 0.28, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </AnimatePresence>

        {/* Dark gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to bottom, rgba(10,18,30,0.55) 0%, rgba(10,18,30,0.3) 50%, rgba(10,18,30,0.7) 100%)' }} />
        
        {/* Floating accent shapes */}
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: `${60 + i * 40}px`,
              height: `${60 + i * 40}px`,
              borderRadius: '50%',
              background: `rgba(13, 148, 136, ${0.03 + i * 0.02})`,
              border: `1px solid rgba(13, 148, 136, ${0.05 + i * 0.02})`,
              top: `${15 + i * 15}%`,
              left: `${5 + i * 8}%`,
              zIndex: 1,
            }}
            animate={{
              x: [0, 20 * (i % 2 === 0 ? 1 : -1), 0],
              y: [0, 15 * (i % 2 === 0 ? 1 : -1), 0],
            }}
            transition={{ duration: 12 + i * 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        <motion.div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '900px' }} variants={staggerContainer} initial="hidden" animate="show">
          <motion.span className="eyebrow" style={{ display: 'inline-block', marginBottom: '24px' }} variants={fadeUp}>Mindset Auto</motion.span>
          <motion.h1 variants={fadeUp} style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
            fontWeight: 700, 
            lineHeight: 1.1, 
            marginBottom: '24px',
            color: 'var(--text-primary)'
          }}>
            L'atelier<br /><strong>vient à vous.</strong>
          </motion.h1>
          <motion.p variants={fadeUp} style={{ 
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', 
            color: 'var(--text-secondary)', 
            lineHeight: 1.7, 
            marginBottom: '40px',
            maxWidth: '700px',
            margin: '0 auto 40px'
          }}>
            Plus d'attente en concession. Plus de voiture immobilisée. Un technicien certifié sonne à votre porte, diagnostic en main, sous 45 min.
          </motion.p>
          <motion.button
            variants={fadeUp}
            onClick={openBookingModal}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '18px 48px',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              background: '#0D9488',
              color: '#fff',
              border: 'none',
              borderRadius: '2px',
              cursor: 'pointer',
            }}
            whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(13, 148, 136, 0.4)' }}
            whileTap={{ scale: 0.98 }}
          >
            Prendre rendez-vous
            <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><ArrowRight size={16} /></motion.span>
          </motion.button>
        </motion.div>
        
        {/* Slide dot indicators */}
        <div style={{
          position: 'absolute', bottom: '80px', left: '50%',
          transform: 'translateX(-50%)', zIndex: 10,
          display: 'flex', gap: '10px', alignItems: 'center'
        }}>
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIndex(i)}
              style={{
                width: heroIndex === i ? '28px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: heroIndex === i ? '#0D9488' : 'rgba(255,255,255,0.35)',
                border: 'none', cursor: 'pointer', padding: 0,
                transition: 'all 0.4s ease',
                boxShadow: heroIndex === i ? '0 0 8px rgba(13,148,136,0.6)' : 'none',
              }}
            />
          ))}
        </div>

        <motion.div style={{ 
          position: 'absolute', bottom: '32px', left: '50%',
          transform: 'translateX(-50%)', zIndex: 10
        }}>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={24} style={{ color: 'rgba(255,255,255,0.5)' }} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        style={{ padding: '100px 20px', background: 'var(--bg-base)' }}
      >
        <div className="container" style={{ maxWidth: '1200px' }}>
          <motion.div style={{ textAlign: 'center', marginBottom: '80px' }} variants={fadeUp}>
            <span className="eyebrow">Comment ça marche</span>
            <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3vw, 3.5rem)', fontWeight: 600, marginTop: '16px' }}>
              Trois étapes.<br /><strong>Zéro friction.</strong>
            </motion.h2>
            <motion.p variants={fadeUp} style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginTop: '24px', maxWidth: '700px', margin: '24px auto 0' }}>
              Chaque intervention suit un protocole rigoureux, documenté et remis par écrit. Aucune surprise, que de la rigueur.
            </motion.p>
          </motion.div>

          <motion.div 
            variants={staggerContainer} 
            initial="hidden" 
            animate="show"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}
          >
            {/* Step 1 */}
            <motion.div 
              variants={fadeUp}
              {...cardHover}
              style={{ 
                padding: '40px', 
                background: 'var(--bg-card)', 
                border: '1px solid var(--border)', 
                borderRadius: '4px',
                textAlign: 'center'
              }}
            >
              <motion.div
                {...scaleOnHover}
                style={{ 
                  width: 80, height: 80, margin: '0 auto 24px', 
                  borderRadius: '50%', 
                  background: 'rgba(13,148,136,0.1)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#0D9488'
                }}
              >
                <Cpu size={32} />
              </motion.div>
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '16px' }}>ÉTAPE 1</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, marginBottom: '16px' }}>Diagnostic OBD</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                Valise constructeur, oscilloscope bi-voie, analyseur de gaz. Nous lisons 12 000+ paramètres vivants : injection, allumage, CAN-Bus, émissions. Le rapport technique est remis AVANT toute réparation.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              variants={fadeUp}
              {...cardHover}
              style={{ 
                padding: '40px', 
                background: 'var(--bg-card)', 
                border: '1px solid var(--border)', 
                borderRadius: '4px',
                textAlign: 'center'
              }}
            >
              <motion.div
                {...scaleOnHover}
                style={{ 
                  width: 80, height: 80, margin: '0 auto 24px', 
                  borderRadius: '50%', 
                  background: 'rgba(13,148,136,0.1)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#0D9488'
                }}
              >
                <Wrench size={32} />
              </motion.div>
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '16px' }}>ÉTAPE 2</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, marginBottom: '16px' }}>Réparation sur place</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                Outillage concession dans votre rue : clés dynamométriques étalonnées, presse hydraulique, banc de test. Moteur, freinage, suspension, direction, électronique. Pièces d'origine ou équivalent constructeur.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              variants={fadeUp}
              {...cardHover}
              style={{ 
                padding: '40px', 
                background: 'var(--bg-card)', 
                border: '1px solid var(--border)', 
                borderRadius: '4px',
                textAlign: 'center'
              }}
            >
              <motion.div
                {...scaleOnHover}
                style={{ 
                  width: 80, height: 80, margin: '0 auto 24px', 
                  borderRadius: '50%', 
                  background: 'rgba(13,148,136,0.1)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#0D9488'
                }}
              >
                <ShieldCheck size={32} />
              </motion.div>
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '16px' }}>ÉTAPE 3</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, marginBottom: '16px' }}>Validation & Garantie</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                Essai route 15 km, contrôle émissions, vérification témoins. Photos avant/après, mesures, recommandations. Dossier technique signé remis en main propre + version numérique. Pièces + main-d'œuvre.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── SERVICES ── */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        style={{ padding: '100px 20px', background: 'var(--bg-elevated)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
      >
        <div className="container" style={{ maxWidth: '1200px' }}>
          <motion.div style={{ textAlign: 'center', marginBottom: '80px' }} variants={fadeUp}>
            <span className="eyebrow">Ce que nous faisons</span>
            <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3vw, 3.5rem)', fontWeight: 600, marginTop: '16px' }}>
              Un atelier complet,<br /><strong>dans votre rue.</strong>
            </motion.h2>
          </motion.div>
      
          <motion.div 
            variants={staggerContainer} 
            initial="hidden" 
            animate="show"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}
          >
            {[
              {
                title: 'Diagnostic Électronique',
                desc: 'Analyse approfondie des systèmes électroniques et réseaux CAN-Bus. Détection précise des pannes invisibles à l\'œil nu.',
                icon: <Cpu size={24} />,
                color: '#0D9488'
              },
              {
                title: 'Mécanique Moteur',
                desc: 'Distribution, joint de culasse, injection, turbocompresseur — remise aux normes constructeur avec pièces d\'origine.',
                icon: <Wrench size={24} />,
                color: '#0D9488'
              },
              {
                title: 'Freinage & Sécurité',
                desc: 'Plaquettes, disques, étriers, liquide de frein, ABS — chaque arrêt compte, nous ne faisons aucun compromis.',
                icon: <ShieldCheck size={24} />,
                color: '#0D9488'
              },
              {
                title: 'Suspension & Direction',
                desc: 'Amortisseurs, triangles, rotules, géométrie, crémaillère — tenue de route et confort retrouvés.',
                icon: <Gauge size={24} />,
                color: '#0D9488'
              },
              {
                title: 'Électricité Auto',
                desc: 'Faisceaux, BCM, capteurs, alternateur, démarreur — diagnostic complet avec oscilloscope et valise multimarques.',
                icon: <Zap size={24} />,
                color: '#0D9488'
              },
              {
                title: 'Transmission & Boîte',
                desc: 'Boîte manuelle ou automatique, embrayage, différentiel, cardans — expertise précise et réparation sur mesure.',
                icon: <Settings size={24} />,
                color: '#0D9488'
              }
            ].map((s, i) => (
              <motion.div 
                key={i}
                variants={fadeUp}
                {...cardHover}
                style={{
                  padding: '40px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <motion.div
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: s.color }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />
                <motion.div
                  {...scaleOnHover}
                  style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}
                >
                  <motion.div 
                    style={{ width: 48, height: 48, borderRadius: '8px', background: `${s.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  >
                    {s.icon}
                  </motion.div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>{s.title}</h3>
                </motion.div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── WHY US ── */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        style={{ padding: '100px 20px', background: 'var(--bg-base)' }}
      >
        <div className="container" style={{ maxWidth: '1000px' }}>
          <motion.div style={{ textAlign: 'center', marginBottom: '60px' }} variants={fadeUp}>
            <span className="eyebrow">Pourquoi nous</span>
            <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3vw, 3.5rem)', fontWeight: 600, marginTop: '16px' }}>
              La précision<br /><strong>sans le déplacement.</strong>
            </motion.h2>
            <motion.p variants={fadeUp} style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginTop: '24px', maxWidth: '700px', margin: '24px auto 0' }}>
              Certifiés par les constructeurs. Équipés comme une concession. Assurés RC Pro. Chaque technicien a 6+ ans en atelier officiel. Nous n'apprenons pas sur votre voiture.
            </motion.p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '60px', 
              alignItems: 'center',
              marginTop: '60px'
            }}
          >
            <motion.div variants={slideInLeft}>
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ overflow: 'hidden', borderRadius: '4px' }}
              >
                <img 
                  src={WHY_US_IMG} 
                  alt="Technicien certifié Mindset Auto" 
                  style={{ 
                    width: '100%', 
                    height: '420px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    boxShadow: '0 40px 80px rgba(0,0,0,0.3)',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </motion.div>
            </motion.div>
            <motion.div variants={slideInRight}>
              <motion.div 
                variants={staggerContainer} 
                initial="hidden" 
                animate="show"
                style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}
              >
                {[
                  { value: '6+', label: "Ans d'expérience" },
                  { value: 'Certifié', label: 'Constructeurs' },
                  { value: '20 km', label: "Rayon d'action" },
                  { value: '7j/7', label: 'Disponibilité' },
                ].map((stat, i) => (
                  <motion.div 
                    key={i}
                    variants={fadeUp}
                    {...cardHover}
                    style={{ padding: '24px', textAlign: 'center', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '4px' }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 + i * 0.05, type: 'spring', stiffness: 200 }}
                      style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: '#0D9488', marginBottom: '8px' }}
                    >
                      {stat.value}
                    </motion.div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── TESTIMONIALS ── */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        style={{ padding: '100px 20px', background: 'var(--bg-elevated)', borderTop: '1px solid var(--border)' }}
      >
        <div className="container" style={{ maxWidth: '1200px' }}>
          <motion.div style={{ textAlign: 'center', marginBottom: '80px' }} variants={fadeUp}>
            <span className="eyebrow">Ils nous font confiance</span>
            <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3vw, 3.5rem)', fontWeight: 600, marginTop: '16px' }}>
              Plus de <strong>500 véhicules</strong> servis à Lubumbashi.
            </motion.h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer} 
            initial="hidden" 
            animate="show"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}
          >
            {[
              { quote: '"Diagnostic précis, réparation propre, prix annoncé respecté. Ma Clio 4 tourne comme neuve."', author: 'Marie K.', vehicle: 'Renault Clio IV', location: 'Kenia' },
              { quote: '"Ils sont venus à 7h du mat avant mon boulot. Distribution faite dans la journée. Incroyable."', author: 'Jean-Pierre M.', vehicle: 'Peugeot 3008', location: 'Gambela' },
              { quote: '"Enfin des mécanos qui expliquent ce qu\'ils font. Rapport photo à l\'appui. Confiance totale."', author: 'Fatima A.', vehicle: 'Toyota RAV4', location: 'Katuba' },
              { quote: '"Urgence freins un dimanche. 2h plus tard j\'étais reparti. Service concession, prix garage."', author: 'David L.', vehicle: 'Dacia Duster', location: 'Annexe' },
            ].map((t, i) => (
              <motion.div 
                key={i}
                variants={fadeUp}
                {...cardHover}
                style={{
                  padding: '40px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                }}
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  style={{ fontSize: '3rem', color: '#0D9488', fontFamily: 'var(--font-display)', fontWeight: 700, lineHeight: 1, marginBottom: '16px' }}
                >
                  &ldquo;
                </motion.div>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--text-primary)', marginBottom: '24px' }}>{t.quote}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                    style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #0D9488, #0F766E)' }}
                  />
                  <div>
                    <div style={{ fontWeight: 600, fontFamily: 'var(--font-display)' }}>{t.author}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.vehicle} · {t.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── COVERAGE ── */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        style={{ padding: '100px 20px', background: 'var(--bg-base)' }}
      >
        <motion.div className="container" style={{ maxWidth: '800px', textAlign: 'center' }} variants={fadeUp}>
          <span className="eyebrow" style={{ color: '#0D9488' }}>Zone couverte</span>
          <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3vw, 3.5rem)', fontWeight: 600, margin: '16px 0' }}>
            Tout Lubumbashi.<br /><strong>Et au-delà.</strong>
          </motion.h2>
          <motion.p variants={fadeUp} style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '40px', fontSize: '1.1rem' }}>
            De la Kenia à Katuba, de Gambela à Annexe. 20 km autour de Lubumbashi. Urgences 7j/7. Disponible matin, midi et soir.
          </motion.p>
          
          <motion.div 
            variants={staggerContainer} 
            initial="hidden" 
            animate="show"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '24px', marginBottom: '48px' }}
          >
            {[
              { value: 'Tout', label: 'Lubumbashi' },
              { value: '20', label: "Km rayon autour de L'shi" },
              { value: '7j/7', label: 'Disponibilité' },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                variants={fadeUp}
                {...cardHover}
                style={{ padding: '32px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '4px' }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
                  style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 700, color: '#0D9488', marginBottom: '8px' }}
                >
                  {stat.value}
                </motion.div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          
        </motion.div>
      </motion.section>

      {/* ── TIKTOK SECTION ── */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        variants={staggerContainer}
        style={{
          padding: '100px 20px',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #111827 50%, #0a0a0a 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* TikTok gradient glow */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, rgba(105,201,208,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <motion.div
          className="container"
          style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}
          variants={fadeUp}
        >
          {/* TikTok icon */}
          <motion.div
            style={{
              width: 72,
              height: 72,
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #010101, #69C9D0)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 28px',
              boxShadow: '0 0 40px rgba(105,201,208,0.35)',
            }}
            animate={{ scale: [1, 1.04, 1], boxShadow: ['0 0 30px rgba(105,201,208,0.3)', '0 0 55px rgba(105,201,208,0.5)', '0 0 30px rgba(105,201,208,0.3)'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
            </svg>
          </motion.div>

          <motion.span className="eyebrow" style={{ color: '#69C9D0' }} variants={fadeUp}>
            Contenu éducatif &bull; TikTok
          </motion.span>
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 700,
              color: '#fff',
              margin: '20px 0 16px',
              lineHeight: 1.15,
            }}
          >
            Suivez <strong style={{ color: '#69C9D0' }}>@mindsetauto</strong><br />sur TikTok
          </motion.h2>
          <motion.p
            variants={fadeUp}
            style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, maxWidth: '480px', margin: '0 auto 40px', fontWeight: 300 }}
          >
            Astuces mécanique, conseils d'entretien et coulisses de nos interventions. Du contenu qui vous aide à mieux comprendre votre voiture.
          </motion.p>
          <motion.a
            href="https://www.tiktok.com/@mindset.auto?_r=1&_t=ZS-97IMNAJzhAd"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px 42px',
              background: 'linear-gradient(135deg, #010101, #1a1a1a)',
              border: '1px solid rgba(105,201,208,0.4)',
              borderRadius: '4px',
              color: '#fff',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              boxShadow: '0 0 30px rgba(105,201,208,0.15)',
              transition: 'all 0.3s ease',
            }}
            whileHover={{ scale: 1.04, boxShadow: '0 0 50px rgba(105,201,208,0.3)', borderColor: 'rgba(105,201,208,0.7)' }}
            whileTap={{ scale: 0.97 }}
            variants={fadeUp}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
            </svg>
            Voir nos vidéos TikTok
          </motion.a>
        </motion.div>
      </motion.section>

      {/* ── FINAL CTA ── */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        style={{ padding: '120px 20px', background: 'linear-gradient(135deg, #0F1A2A 0%, #1A2A3A 100%)', position: 'relative', overflow: 'hidden' }}
      >
        {/* Subtle animated background particles */}
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: `${80 + i * 60}px`,
              height: `${80 + i * 60}px`,
              borderRadius: '50%',
              background: `rgba(13, 148, 136, ${0.02 + i * 0.01})`,
              top: `${10 + i * 12}%`,
              left: `${10 + i * 15}%`,
              zIndex: 1,
            }}
            animate={{
              x: [0, 30 * (i % 2 === 0 ? 1 : -1), 0],
              y: [0, 25 * (i % 2 === 0 ? 1 : -1), 0],
            }}
            transition={{ duration: 15 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        <motion.div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '800px', margin: '0 auto' }} variants={fadeUp}>
          <span className="eyebrow" style={{ color: '#0D9488' }}>Prêt à démarrer ?</span>
          <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 4vw, 4.5rem)', fontWeight: 700, margin: '24px 0', lineHeight: 1.1, color: '#fff' }}>
            Votre voiture mérite<br />le meilleur soin.
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto 48px', lineHeight: 1.6 }}>
            Diagnostic offert si réparation. Réservez en 2 min, on s'occupe du reste.
          </motion.p>
          <motion.button
            {...scaleOnHover}
            onClick={openBookingModal}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '20px 56px',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              background: '#0D9488',
              color: '#fff',
              border: 'none',
              borderRadius: '2px',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(13, 148, 136, 0.3)',
            }}
          >
            Prendre rendez-vous
            <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><ArrowRight size={16} /></motion.span>
          </motion.button>
        </motion.div>
      </motion.section>

      <style jsx global>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-10px); }
          60% { transform: translateX(-50%) translateY(-5px); }
        }
        .eyebrow {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #0D9488;
          font-family: var(--font-mono);
        }
        .container {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 20px;
        }
        @media (max-width: 768px) {
          .eyebrow { font-size: 0.65rem; }
        }
      `}</style>
    </div>
  );
}
