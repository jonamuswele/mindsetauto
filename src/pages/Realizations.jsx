import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Eye, Sparkles, AlertTriangle, ArrowRight, MapPin, Clock, Wrench } from 'lucide-react';
import { NarrativeSection, SplitReveal } from '../components/NarrativeScroll';
import { ScrollProgress } from '../components/ScrollAnimations';
import FloatingParticles from '../components/FloatingParticles';
import TechGrid from '../components/TechGrid';
import MechanicalGears from '../components/MechanicalGears';

// Real African market cars — Wikimedia Commons confirmed URLs
const HERO_BG       = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Land_Cruiser_80-series_1.jpg/1280px-Land_Cruiser_80-series_1.jpg';     // Toyota Land Cruiser 80 series off-road
const CHAPTER_1_IMG = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/1997-1999_Toyota_Camry.jpg/1280px-1997-1999_Toyota_Camry.jpg';              // Toyota Camry XV20 (1997-99)
const CHAPTER_2_IMG = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/1998-1999_Honda_Civic_%28EK%29_1.8_Si_Sedan_%2819-08-2017%29_02.jpg/1280px-1998-1999_Honda_Civic_%28EK%29_1.8_Si_Sedan_%2819-08-2017%29_02.jpg'; // Honda Civic EK sedan
const CHAPTER_3_IMG = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Toyota_Probox%2C_Jamaica.jpg/1280px-Toyota_Probox%2C_Jamaica.jpg';          // Toyota Probox

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

export default function Realizations({ openBookingModal }) {
  const projects = [
    {
      title: 'Réfection Moteur D4D Toyota Hilux',
      category: 'MÉCANIQUE LOURDE',
      symptom: 'Perte de puissance majeure, fumée noire opaque à l\'échappement et ratés de combustion à chaud.',
      solution: 'Prise de compression révélant une fuite sur le cylindre 3. Dépose de la culasse, remplacement du piston fissuré, rodage des soupapes, nettoyage des injecteurs de rampe commune encrassés et calage de la distribution selon les normes d\'usine. Essais sur banc validés.',
      techData: 'Compression d\'origine restaurée à 31 bars sur tous les cylindres. Émissions de particules conformes aux spécifications constructeur.',
      icon: <Wrench size={24} />,
      metric: { label: 'Cylindres restaurés', value: '4/4' },
      stats: [
        { value: '31 bars', label: 'Compression' },
        { value: '4/4', label: 'Cylindres' },
        { value: 'Conforme', label: 'Émissions' },
      ],
    },
    {
      title: 'Multiplexage & Court-Circuit CAN-Bus SUV',
      category: 'ÉLECTRONIQUE COMPLEXE',
      symptom: 'Arrêt complet de l\'affichage du combiné d\'instruments, témoin check-engine clignotant et coupure intermittente de la boîte automatique.',
      solution: 'Branchement de l\'oscilloscope sur le réseau CAN High et CAN Low. Identification d\'une fluctuation anormale de tension. Localisation d\'une isolation filaire endommagée par frottement sous le faisceau de tableau de bord. Réfection de l\'épissure et reprogrammation de la passerelle BCM.',
      techData: 'Rétablissement complet du signal multiplexé (Tension stable à 2.5V de repos). Zéro code défaut DTC persistant.',
      icon: <Cpu size={24} />,
      metric: { label: 'Codes défaut résolus', value: '12' },
      stats: [
        { value: '12', label: 'DTC résolus' },
        { value: '2.5V', label: 'Signal stable' },
        { value: '0', label: 'Codes persistants' },
      ],
    },
    {
      title: 'Retrofit Intérieur & Sellerie en Cuir',
      category: 'UPGRADE & PERSONNALISATION',
      symptom: 'Sellerie d\'origine déchirée, mousse de maintien affaissée et plastiques intérieurs rayés.',
      solution: 'Dépose complète des sièges avant et de la banquette arrière. Remplacement des mousses ergonomiques de maintien lombaire. Confection de housses sur mesure en cuir synthétique haute densité résistant aux UV. Installation d\'un écran tactile multimédia intégré.',
      techData: 'Matériaux certifiés anti-usure (Test Martindale 100 000 cycles). Esthétique habitacle entièrement modernisée.',
      icon: <Sparkles size={24} />,
      metric: { label: 'Sièges refaits', value: '5' },
      stats: [
        { value: '5', label: 'Sièges' },
        { value: '100k', label: 'Cycles Martindale' },
        { value: 'Sur mesure', label: 'Sellerie' },
      ],
    },
    {
      title: 'Suspension Renforcée 4x4 Hors-Piste',
      category: 'LIAISON AU SOL',
      symptom: 'Affaissement du train arrière sous charge, talonnage sévère sur les pistes de terre et vibrations de l\'arbre de transmission.',
      solution: 'Dépose des amortisseurs d\'origine. Installation d\'un kit complet de suspension à gaz double effet renforcé (+50mm de réhausse). Remplacement des silent-blocs par des modèles en polyuréthane haute dureté. Alignement complet de la géométrie.',
      techData: 'Garde au sol accrue de 52mm. Amortissement des chocs dynamiques amélioré de 40% sur pistes accidentées.',
      icon: <ShieldCheck size={24} />,
      metric: { label: 'Réhausse', value: '+52 mm' },
      stats: [
        { value: '+52mm', label: 'Garde au sol' },
        { value: '40%', label: 'Amortissement' },
        { value: 'Polyuréthane', label: 'Silent-blocs' },
      ],
    }
  ];

  const storyChapters = [
    {
      title: 'Le diagnostic précis',
      content: 'Chaque intervention commence par une analyse rigoureuse : scan OBD complet, oscilloscope pour l\'électronique, prise de compression pour le moteur. On ne devine pas, on mesure.',
      media: { type: 'image', src: CHAPTER_1_IMG, alt: 'Diagnostic précision' },
      side: 'right',
      stats: [
        { value: '1h', label: 'Analyse moyenne' },
        { value: '100%', label: 'Traçabilité' },
      ],
    },
    {
      title: 'L\'expertise technique',
      content: 'Nos techniciens appliquent les procédures constructeur : outillage concessionnaire, pièces d\'origine ou équivalent certifié, respect des couples de serrage et tolérances. La rigueur, pas l\'approximation.',
      media: { type: 'image', src: CHAPTER_2_IMG, alt: 'Expertise technique' },
      side: 'left',
      stats: [
        { value: 'Certifié', label: 'Techniciens' },
        { value: 'Concessionnaire', label: 'Outillage' },
      ],
    },
    {
      title: 'La validation réelle',
      content: 'Essais routiers, banc de freinage, contrôle émissions, vérification témoins. Le véhicule est remis avec rapport complet, photos avant/après, garantie pièces et main-d\'œuvre. Preuve à l\'appui.',
      media: { type: 'image', src: CHAPTER_3_IMG, alt: 'Validation finale' },
      side: 'right',
      stats: [
        { value: 'Testé', label: 'Sur route' },
        { value: 'Garanti', label: 'Pièces & MO' },
      ],
    },
  ];

  return (
    <div style={{ background: 'var(--bg-base)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      <ScrollProgress color="var(--accent)" height={3} position="top" />

      {/* ── HERO ── */}
      <motion.section
        style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}
      >
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            backgroundImage: `url(${HERO_BG})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        />
        
        {/* Floating accent rings */}
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: `${100 + i * 80}px`,
              height: `${100 + i * 80}px`,
              borderRadius: '50%',
              border: `1px solid rgba(13, 148, 136, ${0.08 - i * 0.02})`,
              top: `${15 + i * 10}%`,
              right: `${5 + i * 5}%`,
              zIndex: 2,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 20 + i * 5, repeat: Infinity, ease: 'linear' }}
          />
        ))}

        <FloatingParticles count={10} speed={0.18} sizeRange={[40, 140]} connectDistance={250} />
        <TechGrid gridSize={80} speed={0.25} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 3, background: 'linear-gradient(135deg, rgba(15,26,42,0.8) 0%, rgba(15,26,42,0.55) 40%, rgba(15,26,42,0.75) 100%)' }} />

        <motion.div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }} variants={staggerContainer} initial="hidden" animate="show">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '48px' }}>
            <motion.div
              className="slide-content-overlay"
              style={{ paddingLeft: 0, maxWidth: '620px' }}
              variants={staggerContainer}
              initial="hidden"
              animate="show"
            >
              <motion.span className="eyebrow" variants={fadeUp} style={{ color: 'var(--accent-light)' }}>Cas cliniques · Lubumbashi, RDC</motion.span>
              <motion.h1
                variants={fadeUp}
                style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3.2rem, 5.5vw, 6rem)', fontWeight: 600, lineHeight: 1.04, letterSpacing: '-0.02em', marginBottom: '28px', color: '#fff' }}
              >
                La preuve<br />
                <strong style={{ fontWeight: 700 }}>par l'exemple.</strong>
              </motion.h1>
              <motion.p variants={fadeUp} style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', lineHeight: 1.72, marginBottom: '40px', fontWeight: 300, maxWidth: '460px' }}>
                Quatre interventions réelles. Symptômes, solutions, résultats mesurés. La rigueur concessionnaire documentée.
              </motion.p>
              <motion.div variants={fadeUp} style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <motion.button className="btn-primary" onClick={openBookingModal} style={{ background: 'var(--accent)', borderColor: 'var(--accent)', color: '#fff' }} whileHover={{ scale: 1.02, boxShadow: '0 15px 30px rgba(13, 148, 136, 0.4)' }} whileTap={{ scale: 0.98 }}>
                  <span>Demander mon analyse</span><ArrowRight size={14} />
                </motion.button>
                <motion.button className="btn-outline" style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }} whileHover={{ background: 'rgba(255,255,255,0.1)' }} whileTap={{ scale: 0.98 }}>
                  <span>Voir toutes les réalisations</span>
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              style={{ maxWidth: '320px', width: '100%' }}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.2)', padding: '32px', borderRadius: '4px' }}
              >
                <span className="eyebrow" style={{ marginBottom: '20px', color: 'var(--accent-light)' }}>Bilan global</span>
                {[
                  { label: 'Véhicules traités', value: '100+' },
                  { label: 'Taux de résolution', value: '98%' },
                  { label: 'Interventions d\'urgence', value: '120+' },
                  { label: 'Ans d\'expérience', value: '6+' },
                ].map((item, i) => (
                  <motion.div key={item.label} className="hud-progress-item" style={{ marginBottom: i === 3 ? 0 : '20px' }} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.1 }}>
                    <div className="hud-progress-label"><span>{item.label}</span><span style={{ color: 'var(--accent)', fontWeight: 600 }}>{item.value}</span></div>
                    <div className="hud-progress-bar">
                      <motion.div
                        className="hud-progress-fill accent"
                        style={{ width: item.value.includes('%') ? item.value : i < 2 ? '90%' : '75%' }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.8 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        transformOrigin="left"
                      />
                    </div>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.15)' }}
                >
                  <div><div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, color: '#fff' }}>4</div><div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>Expertises</div></div>
                  <div><div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, color: '#fff' }}>100%</div><div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>Norme concessionnaire</div></div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <span>Défiler</span>
          <motion.div style={{ width: 2, height: 40, background: 'var(--accent)' }} animate={{ scaleY: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
        </motion.div>
      </motion.section>

      {/* ── NARRATIVE: OUR METHOD ── */}
      <NarrativeSection
        title="Notre méthode d'intervention"
        subtitle="Rigueur, traçabilité, résultat"
        chapters={storyChapters}
        progressColor="var(--accent)"
        backgroundColor="var(--bg-base)"
      />

      {/* ── PROJECTS: SIMPLE GRID ── */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        style={{ background: 'var(--bg-base)', padding: '100px 20px', position: 'relative' }}
      >
        <TechGrid gridSize={70} speed={0.3} pulseSpeed={1.3} />
        
        {/* Subtle floating shapes */}
        {[1, 2].map((i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: `${120 + i * 100}px`,
              height: `${120 + i * 100}px`,
              borderRadius: '50%',
              background: `rgba(13, 148, 136, ${0.02})`,
              border: `1px solid rgba(13, 148, 136, ${0.04})`,
              top: `${10 + i * 25}%`,
              left: `${5 + i * 15}%`,
              zIndex: 1,
            }}
            animate={{
              x: [0, 20 * (i % 2 === 0 ? 1 : -1), 0],
              y: [0, 15 * (i % 2 === 0 ? 1 : -1), 0],
            }}
            transition={{ duration: 15 + i * 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div variants={fadeUp} style={{ marginBottom: '60px', textAlign: 'center' }}>
            <span className="eyebrow">Interventions détaillées</span>
            <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', fontWeight: 600, marginTop: '16px' }}>
              Quatre cas,<br /><strong>quatre solutions.</strong>
            </motion.h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer} 
            initial="hidden" 
            animate="show"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}
          >
            {projects.map((proj, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                {...cardHover}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 60px rgba(15,26,42,0.08)',
                  transition: 'all 0.3s',
                }}
              >
                <div style={{ display: 'flex', gap: '24px', padding: '32px 36px 24px', borderBottom: '1px solid var(--border)' }}>
                  <motion.div
                    {...scaleOnHover}
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    style={{ width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--accent-glow)', border: '1px solid var(--accent-light)', borderRadius: '4px', flexShrink: 0, color: 'var(--accent-deep)' }}
                  >
                    {proj.icon}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{ flex: 1 }}
                  >
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent-deep)', display: 'block', marginBottom: '8px' }}>
                      {proj.category}
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.3, letterSpacing: 0, color: 'var(--text-primary)' }}>
                      {proj.title}
                    </h3>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}
                  >
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                      {proj.metric.label}
                    </span>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                      style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--accent-deep)', lineHeight: 1 }}
                    >
                      {proj.metric.value}
                    </motion.span>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  style={{ padding: '32px 36px', display: 'flex', flexDirection: 'column', gap: '24px' }}
                >
                  <div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px' }}>
                      <motion.span {...scaleOnHover}><AlertTriangle size={18} style={{ color: 'var(--accent)' }} /></motion.span>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                        Symptômes du véhicule
                      </span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
                      {proj.symptom}
                    </p>
                  </div>

                  <div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px' }}>
                      <motion.span {...scaleOnHover}><ShieldCheck size={18} style={{ color: 'var(--accent-deep)' }} /></motion.span>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                        Solution appliquée
                      </span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
                      {proj.solution}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  style={{ padding: '24px 36px', borderTop: '1px solid var(--border)', background: 'var(--bg-base)', display: 'flex', flexDirection: 'column', gap: '16px' }}
                >
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, fontWeight: 300 }}>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                      Rapport technique
                    </span>
                    {proj.techData}
                  </div>

                  <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
                    {proj.stats.map((stat, si) => (
                      <motion.div
                        key={si}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + si * 0.08 }}
                        style={{ textAlign: 'left' }}
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 200 }}
                          style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}
                        >
                          {stat.value}
                        </motion.div>
                        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  style={{ padding: '0 36px 32px' }}
                >
                  <motion.button
                    className="btn-outline"
                    {...scaleOnHover}
                    style={{ width: '100%', justifyContent: 'center', padding: '16px 32px' }}
                    onClick={openBookingModal}
                  >
                    Demander une analyse similaire
                  </motion.button>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── CTA ── */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        style={{ background: 'var(--bg-base)', padding: '140px 0', position: 'relative', overflow: 'hidden' }}
      >
        <FloatingParticles count={8} speed={0.15} sizeRange={[40, 150]} connectDistance={200} />
        
        {/* Accent rings */}
        {[1, 2].map((i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: `${150 + i * 120}px`,
              height: `${150 + i * 120}px`,
              borderRadius: '50%',
              border: `1px solid rgba(13, 148, 136, ${0.06 - i * 0.02})`,
              bottom: `${5 + i * 10}%`,
              right: `${5 + i * 10}%`,
              zIndex: 1,
            }}
            animate={{
              rotate: [0, -360],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 25 + i * 5, repeat: Infinity, ease: 'linear' }}
          />
        ))}

        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <motion.div variants={fadeUp}>
            <span className="eyebrow">Votre tour</span>
            <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem, 5vw, 5rem)', fontWeight: 600, marginTop: '16px', marginBottom: '20px' }}>
              Votre véhicule<br /><strong>mérite la même rigueur.</strong>
            </motion.h2>
            <motion.p variants={fadeUp} style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', fontWeight: 300, marginBottom: '48px', maxWidth: '500px', margin: '0 auto 48px' }}>
              Diagnostic à domicile. Rapport technique remis avant toute intervention.
            </motion.p>
            <motion.button 
              className="btn-primary" 
              onClick={openBookingModal} 
              style={{ margin: '0 auto', background: 'var(--accent)', borderColor: 'var(--accent)', padding: '18px 50px', fontSize: '0.85rem', boxShadow: '0 10px 30px rgba(13, 148, 136, 0.3)' }}
              whileHover={{ scale: 1.02, y: -2, boxShadow: '0 20px 40px rgba(13, 148, 136, 0.4)' }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Réserver mon diagnostic</span><ArrowRight size={16} />
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}