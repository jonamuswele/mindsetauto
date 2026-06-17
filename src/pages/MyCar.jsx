import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Eye, Compass, ShieldAlert, Activity, AlertTriangle, ArrowRight, CheckCircle } from 'lucide-react';
import { NarrativeSection, SplitReveal } from '../components/NarrativeScroll';
import { ScrollProgress } from '../components/ScrollAnimations';
import FloatingParticles from '../components/FloatingParticles';
import WaveformLines from '../components/WaveformLines';
import FloatingShapes from '../components/FloatingShapes';

// Real African market cars — Wikimedia Commons confirmed URLs
const HERO_BG       = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Toyota_Probox_%282014_model%29%2C_front_left.jpg/1280px-Toyota_Probox_%282014_model%29%2C_front_left.jpg'; // Toyota Probox — most common car in Lubumbashi
const CHAPTER_1_IMG = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/1997-1999_Toyota_Camry.jpg/1280px-1997-1999_Toyota_Camry.jpg';                                                // Toyota Camry XV20 (1997-99)
const CHAPTER_2_IMG = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/80-89_Toyota_Land_Cruiser.jpg/1280px-80-89_Toyota_Land_Cruiser.jpg';                                         // Toyota Land Cruiser 80-89
const CHAPTER_3_IMG = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Honda_Civic_EK_hatch_%2820221211%29.jpg/1280px-Honda_Civic_EK_hatch_%2820221211%29.jpg';                      // Honda Civic EK hatchback

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.13 } },
};

export default function MyCar({ openBookingModal }) {
  const [activeCategory, setActiveCategory] = useState('sounds');
  const [selectedSymptom, setSelectedSymptom] = useState(null);

  const categories = [
    { id: 'sounds', label: 'Bruits & Sons', icon: <Volume2 size={18} /> },
    { id: 'visual', label: 'Fumées & Visuel', icon: <Eye size={18} /> },
    { id: 'feel', label: 'Vibrations & Ressenti', icon: <Compass size={18} /> }
  ];

  const symptomDb = {
    sounds: [
      { id: 'click', title: 'Cliquetis métallique régulier sous le capot', cause: 'Généralement lié à un manque de lubrification des poussoirs hydrauliques, un jeu de soupapes incorrect, ou un cliquetis de combustion.', severity: 'ÉLEVÉE', color: 'var(--accent-deep)', action: 'Vérifiez immédiatement le niveau d\'huile moteur. Évitez les hauts régimes. Un diagnostic mobile à domicile est recommandé.' },
      { id: 'whistle', title: 'Sifflement aigu lors de l\'accélération', cause: 'Fuite de pression d\'air dans le circuit de suralimentation ou usure interne des paliers du turbo.', severity: 'MODÉRÉE', color: 'var(--accent)', action: 'Inspectez les durites d\'admission d\'air. Si perte de puissance ou fumée grise, évitez de solliciter le turbo.' },
      { id: 'grind', title: 'Grincement aigu au freinage', cause: 'Plaquettes usées au maximum. Support métallique frotte contre le disque.', severity: 'ÉLEVÉE', color: 'var(--accent-deep)', action: 'Remplacez plaquettes et disques au plus vite. Distance de freinage compromise.' }
    ],
    visual: [
      { id: 'black_smoke', title: 'Fumée d\'échappement noire opaque (Diesel)', cause: 'Mélange trop riche. Vanne EGR bloquée, débitmètre encrassé ou injecteur défectueux.', severity: 'MODÉRÉE', color: 'var(--accent)', action: 'Nettoyage vanne EGR ou tarage injecteurs. Évitez longs trajets pour ne pas saturer le FAP.' },
      { id: 'blue_smoke', title: 'Fumée d\'échappement bleue odorante', cause: 'Huile brûlée dans les cylindres. Joints queues de soupapes, segments pistons ou paliers turbo.', severity: 'ÉLEVÉE', color: 'var(--accent-deep)', action: 'Surveillez le niveau d\'huile. Prise de compression mécanique indispensable.' }
    ],
    feel: [
      { id: 'vibration', title: 'Vibrations volant à haute vitesse', cause: 'Déséquilibrage roues, déformation pneumatique, ou usure rotules/biellettes.', severity: 'MODÉRÉE', color: 'var(--accent)', action: 'Équilibrage roues et contrôle géométrique. Inspectez le jeu des rotules.' },
      { id: 'soft_brake', title: 'Pédale de frein molle', cause: 'Air/humidité dans circuit hydraulique, fuite étrier ou maître-cylindre défaillant.', severity: 'ÉLEVÉE', color: 'var(--accent-deep)', action: 'NE PRENEZ PAS LA ROUTE. Purgez le circuit et détectez la fuite immédiatement.' }
    ]
  };

  const diagnosticChapters = [
    {
      title: 'Écoutez les symptômes',
      content: 'Votre voiture vous parle. Bruits suspects, fumées anormales, vibrations inhabituelles — chaque symptôme est un indice. Sélectionnez la catégorie qui correspond à ce que vous observez.',
      media: { type: 'image', src: CHAPTER_1_IMG, alt: 'Symptômes voiture' },
      side: 'right',
      stats: [
        { value: '8', label: 'Symptômes référencés' },
        { value: '3', label: 'Catégories' },
      ],
    },
    {
      title: 'Analyse technique instantanée',
      content: 'Notre système croise vos symptômes avec notre base de données technique. Causes probables, niveau de gravité, recommandations d\'urgence — tout s\'affiche en temps réel.',
      media: { type: 'image', src: CHAPTER_2_IMG, alt: 'Analyse technique' },
      side: 'left',
      stats: [
        { value: 'Temps réel', label: 'Analyse' },
        { value: 'Précis', label: 'Diagnostic' },
      ],
    },
    {
      title: 'Passez à l\'action',
      content: 'Le diagnostic à domicile confirme l\'analyse. Scan OBD complet, rapport technique, devis clair. Vous décidez, nous intervenons.',
      media: { type: 'image', src: CHAPTER_3_IMG, alt: 'Scan à domicile' },
      side: 'right',
      stats: [
        { value: 'Offert', label: 'Diagnostic' },
        { value: 'Sans engagement', label: 'Devis' },
      ],
    },
  ];

  const handleSymptomSelect = (symptom) => {
    setSelectedSymptom(symptom);
  };

  return (
    <div style={{ background: 'var(--bg-base)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      <ScrollProgress color="var(--accent)" height={3} position="top" />

      {/* ── HERO ── */}
      <motion.section
        style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}
      >
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }} />
        <FloatingParticles count={12} speed={0.2} sizeRange={[30, 120]} connectDistance={300} />
        <WaveformLines lineCount={5} speed={0.5} amplitude={20} frequency={0.01} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 3, background: 'linear-gradient(135deg, rgba(15,26,42,0.85) 0%, rgba(15,26,42,0.6) 50%, rgba(15,26,42,0.8) 100%)' }} />

        <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '48px' }}>
            <motion.div
              className="slide-content-overlay"
              style={{ paddingLeft: 0, maxWidth: '620px' }}
              variants={stagger}
              initial="hidden"
              animate="show"
            >
              <motion.span className="eyebrow" variants={fadeUp} style={{ color: 'var(--accent-light)' }}>
                Diagnostic assisté · Lubumbashi, RDC
              </motion.span>
              <motion.h1
                variants={fadeUp}
                style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3.2rem, 5.5vw, 6rem)', fontWeight: 600, lineHeight: 1.04, letterSpacing: '-0.02em', marginBottom: '28px', color: '#fff' }}
              >
                Écoutez votre<br />
                <strong style={{ fontWeight: 700 }}>voiture vous parler.</strong>
              </motion.h1>
              <motion.p variants={fadeUp} style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', lineHeight: 1.72, marginBottom: '40px', fontWeight: 300, maxWidth: '460px' }}>
                Sélectionnez les symptômes, obtenez l'analyse technique, planifiez l'intervention.
              </motion.p>
              <motion.div variants={fadeUp} style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <button className="btn-primary" onClick={openBookingModal} style={{ background: 'var(--accent)', borderColor: 'var(--accent)', color: '#fff' }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <span>Planifier un scan</span><ArrowRight size={14} />
                </button>
                <button className="btn-outline" onClick={() => setActiveCategory('sounds')} style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }} whileHover={{ background: 'rgba(255,255,255,0.1)' }}>
                  <span>Commencer le diagnostic</span>
                </button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              style={{ maxWidth: '320px', width: '100%' }}
            >
              <div style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.2)', padding: '32px', borderRadius: '4px' }}>
                <span className="eyebrow" style={{ marginBottom: '20px', color: 'var(--accent-light)' }}>Catégories</span>
                {categories.map((cat) => (
                  <div key={cat.id} className="hud-progress-item">
                    <div className="hud-progress-label">
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>{cat.icon}{cat.label}</span>
                      <span style={{ color: activeCategory === cat.id ? 'var(--accent)' : 'rgba(255,255,255,0.6)', fontWeight: 600 }}>{symptomDb[cat.id].length} symptômes</span>
                    </div>
                    <div className="hud-progress-bar">
                      <div className={`hud-progress-fill ${activeCategory === cat.id ? 'accent' : ''}`} style={{ width: activeCategory === cat.id ? '100%' : '15%', background: activeCategory === cat.id ? 'var(--accent)' : 'rgba(255,255,255,0.2)' }} />
                    </div>
                  </div>
                ))}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                  <div><div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, color: '#fff' }}>{Object.values(symptomDb).flat().length}+</div><div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>Symptômes</div></div>
                  <div><div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, color: '#fff' }}>3</div><div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>Catégories</div></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <span>Défiler</span>
          <motion.div style={{ width: 2, height: 40, background: 'var(--accent)' }} animate={{ scaleY: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
        </div>
      </motion.section>

      {/* ── NARRATIVE FLOW ── */}
      <NarrativeSection
        title="Comment identifier la panne"
        subtitle="3 étapes pour comprendre votre voiture"
        chapters={diagnosticChapters}
        progressColor="var(--accent)"
        backgroundColor="var(--bg-base)"
      />

      {/* ── INTERACTIVE WIZARD ── */}
      <motion.section style={{ background: 'var(--bg-base)', borderBottom: '1px solid var(--border)', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
        <WaveformLines lineCount={6} speed={0.6} amplitude={25} frequency={0.012} />
        
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: '60px' }}
          >
            <span className="eyebrow">Analyse interactive</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', fontWeight: 600 }}>
              Identifiez l'origine<br /><strong>de l'anomalie.</strong>
            </h2>
          </motion.div>

          <div style={{ display: 'flex', gap: '60px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            {/* LEFT: Category tabs + symptoms */}
            <div style={{ flex: '1 1 400px', minWidth: '320px' }}>
              <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => { setActiveCategory(cat.id); setSelectedSymptom(null); }}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px',
                      fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 500,
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      background: activeCategory === cat.id ? 'var(--text-primary)' : 'transparent',
                      color: activeCategory === cat.id ? 'var(--text-invert)' : 'var(--text-secondary)',
                      border: '2px solid', borderColor: activeCategory === cat.id ? 'var(--text-primary)' : 'var(--border-strong)',
                      cursor: 'pointer', transition: 'all 0.3s', borderRadius: '2px'
                    }}
                    whileHover={{ background: activeCategory !== cat.id ? 'var(--bg-card)' : 'var(--text-primary)', scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {cat.icon}<span>{cat.label}</span>
                  </button>
                ))}
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, marginBottom: '24px' }}>Sélectionnez une anomalie</h3>

              <motion.div
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.06 } } }}
                style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
              >
                {symptomDb[activeCategory].map((symptom) => (
                  <motion.button
                    key={symptom.id}
                    onClick={() => handleSymptomSelect(symptom)}
                    style={{
                      textAlign: 'left', padding: '24px 28px',
                      background: selectedSymptom?.id === symptom.id ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                      border: `2px solid ${selectedSymptom?.id === symptom.id ? 'var(--accent-deep)' : 'var(--border)'}`,
                      cursor: 'pointer', borderRadius: '4px', transition: 'all 0.3s', width: '100%'
                    }}
                    whileHover={{ background: selectedSymptom?.id !== symptom.id ? 'var(--bg-card-hover)' : 'var(--bg-card-hover)', borderColor: selectedSymptom?.id !== symptom.id ? 'var(--border-strong)' : 'var(--accent-deep)', x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    variants={{ show: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 20 } }}
                  >
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 600, color: selectedSymptom?.id === symptom.id ? 'var(--accent-deep)' : 'var(--text-primary)', marginBottom: '8px' }}>{symptom.title}</h4>
                    <span style={{
                      display: 'inline-block', fontFamily: 'var(--font-sans)', fontSize: '0.65rem', fontWeight: 600,
                      letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: '2px',
                      background: `${symptom.color}20`, color: symptom.color, border: `1px solid ${symptom.color}40`
                    }}>Gravité : {symptom.severity}</span>
                  </motion.button>
                ))}
              </motion.div>
            </div>

            {/* RIGHT: Analysis panel */}
            <div style={{ flex: '1 1 450px', minWidth: '380px', width: '100%' }}>
              <AnimatePresence mode="wait">
                {selectedSymptom ? (
                  <motion.div
                    key={selectedSymptom.id}
                    className="hud-panel-glass"
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{ borderRadius: '4px', height: '100%', minHeight: '480px', display: 'flex', flexDirection: 'column' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', borderBottom: '1px solid var(--border)', paddingBottom: '20px' }}>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <Activity size={20} style={{ color: 'var(--accent)' }} />
                        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Analyse technique</span>
                      </div>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', fontWeight: 600, color: selectedSymptom.color, border: `2px solid ${selectedSymptom.color}`, padding: '6px 16px', letterSpacing: '0.08em', borderRadius: '2px' }}>GRAVITÉ : {selectedSymptom.severity}</span>
                    </div>

                    <div style={{ marginBottom: '28px', flex: 1 }}>
                      <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>Causes probables</h4>
                      <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.8, fontWeight: 300 }}>{selectedSymptom.cause}</p>
                    </div>

                    <div style={{ marginBottom: '32px', padding: '24px', background: 'var(--bg-card)', borderLeft: `4px solid ${selectedSymptom.color}`, borderRadius: '0 4px 4px 0' }}>
                      <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <AlertTriangle size={18} style={{ color: selectedSymptom.color }} />
                        Recommandations d'urgence
                      </h4>
                      <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 300 }}>{selectedSymptom.action}</p>
                    </div>

                    <button
                      className="btn-primary"
                      style={{ width: '100%', marginTop: 'auto', justifyContent: 'center', padding: '18px 40px', background: 'var(--accent)', borderColor: 'var(--accent)', fontSize: '0.85rem' }}
                      onClick={openBookingModal}
                      whileHover={{ scale: 1.01, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Planifier un scan à domicile</span>
                      <ArrowRight size={16} />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    className="hud-panel-glass"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ textAlign: 'center', padding: '100px 50px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '480px', borderRadius: '4px' }}
                  >
                    <CheckCircle size={64} style={{ color: 'var(--accent-light)', marginBottom: '24px', opacity: 0.5 }} />
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 600, marginBottom: '16px' }}>En attente de sélection</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '340px', margin: 0 }}>
                      Choisissez un symptôme à gauche pour lancer l'analyse technique et les recommandations d'urgence.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── CTA ── */}
      <motion.section style={{ background: 'var(--bg-dark)', padding: '140px 0', position: 'relative', overflow: 'hidden' }}>
        <FloatingShapes shapeCount={8} speed={0.15} />
        
        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="eyebrow" style={{ color: 'var(--accent-light)' }}>Passer à l'action</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem, 5vw, 5rem)', fontWeight: 600, color: '#fff', marginTop: '16px', marginBottom: '20px' }}>
              Le diagnostic<br /><strong>est offert.</strong>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', fontWeight: 300, marginBottom: '48px', maxWidth: '500px', margin: '0 auto 48px' }}>
              Scan OBD complet, rapport technique avant intervention. Sans engagement.
            </p>
            <button className="btn-primary" onClick={openBookingModal} style={{ margin: '0 auto', background: 'var(--accent)', borderColor: 'var(--accent)', padding: '18px 50px', fontSize: '0.85rem' }} whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
              <span>Réserver mon diagnostic</span><ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}