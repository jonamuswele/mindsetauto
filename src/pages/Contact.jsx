import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Clock, Send, CheckCircle, Loader2, MapPin } from 'lucide-react';
import heroImage from '../assets/hero.png';
import { NarrativeSection, SplitReveal } from '../components/NarrativeScroll';
import { ScrollProgress } from '../components/ScrollAnimations';
import FloatingParticles from '../components/FloatingParticles';
import TechGrid from '../components/TechGrid';
import MechanicalGears from '../components/MechanicalGears';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.13 } },
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    vehicleType: 'suv',
    details: '',
    atHome: true
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setLoading(true);
    const subject = encodeURIComponent(`Demande d'intervention - ${formData.name}`);
    const body = encodeURIComponent(
      `Nom: ${formData.name}\nTéléphone: ${formData.phone}\nType de véhicule: ${formData.vehicleType}\nDescription: ${formData.details || 'Non renseigné'}\nDéplacement atelier mobile: ${formData.atHome ? 'Oui' : 'Non'}`
    );
    window.location.href = `mailto:mindsetauto243@gmail.com?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', phone: '', vehicleType: 'suv', details: '', atHome: true });
    }, 1200);
  };

  const contactChapters = [
    {
      title: 'Vous nous contactez',
      content: 'Remplissez le formulaire ou appelez notre numéro directement. Décrivez les symptômes, choisissez votre type de véhicule, et nous préparons l\'outillage adapté avant même d\'arriver.',
      media: { type: 'image', src: heroImage, alt: 'Contact initial' },
      side: 'right',
      stats: [
        { value: '7j/7', label: 'Disponibilité' },
        { value: 'Rapide', label: 'Réponse' },
      ],
    },
    {
      title: 'Nous venons chez vous',
      content: 'Notre atelier mobile se déplace chez vous à votre domicile ou sur votre lieu de travail. Intervention sous 45 minutes dans tout Lubumbashi et périphérie 20km.',
      media: { type: 'image', src: heroImage, alt: 'Atelier mobile' },
      side: 'left',
      stats: [
        { value: '45 min', label: 'Délai max' },
        { value: 'Offert', label: 'Déplacement' },
      ],
    },
    {
      title: 'Diagnostic & réparation',
      content: 'Scan complet OBD, analyse électronique, test mécanique. Rapport technique remis avant toute intervention. Vous validez, nous réparons sur place selon normes constructeur.',
      media: { type: 'image', src: heroImage, alt: 'Diagnostic sur site' },
      side: 'right',
      stats: [
        { value: 'Transparent', label: 'Pas de surprise' },
        { value: 'Garanti', label: 'Pièces & MO' },
      ],
    },
  ];

  return (
    <div style={{ background: 'var(--bg-base)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      <ScrollProgress color="var(--accent)" height={3} position="top" />

      {/* ── HERO ── */}
      <motion.section
        style={{
          position: 'relative',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }} />
        <FloatingParticles count={12} speed={0.2} sizeRange={[30, 120]} connectDistance={300} />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          background: 'linear-gradient(135deg, rgba(15,26,42,0.85) 0%, rgba(15,26,42,0.6) 50%, rgba(15,26,42,0.8) 100%)',
        }} />

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
                Prendre contact · Lubumbashi, RDC
              </motion.span>
              <motion.h1
                variants={fadeUp}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3.2rem, 5.5vw, 6rem)',
                  fontWeight: 600,
                  lineHeight: 1.04,
                  letterSpacing: '-0.02em',
                  marginBottom: '28px',
                  color: '#fff',
                }}
              >
                Nous venons<br />
                <strong style={{ fontWeight: 700 }}>à votre rencontre.</strong>
              </motion.h1>
              <motion.p variants={fadeUp} style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', lineHeight: 1.72, marginBottom: '40px', fontWeight: 300, maxWidth: '460px' }}>
                Un diagnostic chez vous. Remplissez le formulaire ou contactez-nous directement.
              </motion.p>
              <motion.div variants={fadeUp} style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <a href="tel:+243995859333" className="btn-primary" style={{ background: 'var(--accent)', borderColor: 'var(--accent)', color: '#fff' }}>
                  <Phone size={14} /><span>Appeler</span>
                </a>
                <a href="mailto:mindsetauto243@gmail.com" className="btn-outline" style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }}>
                  <Mail size={14} /><span>Envoyer un e-mail</span>
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              style={{ maxWidth: '320px', width: '100%' }}
            >
              <div style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.2)', padding: '32px', borderRadius: '4px' }}>
                <span className="eyebrow" style={{ marginBottom: '20px', color: 'var(--accent-light)' }}>Coordonnées</span>
                {[
                  { icon: <Phone size={15} />, label: 'Téléphone', value: '+243 995 859 333' },
                  { icon: <Mail size={15} />, label: 'E-mail', value: 'mindsetauto243@gmail.com' },
                  { icon: <Clock size={15} />, label: 'Horaires', value: 'Lun – Sam · 7h30 → 18h00' },
                  { icon: <MapPin size={15} />, label: 'Zone', value: 'Lubumbashi + 20 km' },
                ].map((row) => (
                  <div key={row.label} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
                    <span style={{ color: 'var(--accent)', marginTop: 2 }}>{row.icon}</span>
                    <div>
                      <div style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '3px' }}>{row.label}</div>
                      <div style={{ fontSize: '0.92rem', color: '#fff', fontWeight: 300 }}>{row.value}</div>
                    </div>
                  </div>
                ))}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                  <div style={{ textAlign: 'left' }}><div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent)' }}>45 min</div><div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>Délai max</div></div>
                  <div style={{ textAlign: 'left' }}><div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent)' }}>Offert</div><div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>Déplacement</div></div>
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

      {/* ── NARRATIVE PROCESS ── */}
      <NarrativeSection
        title="Comment se passe l'intervention"
        subtitle="3 étapes, zéro tracas"
        chapters={contactChapters}
        progressColor="var(--accent)"
        backgroundColor="var(--bg-base)"
      />

      {/* ── FORM SECTION ── */}
      <motion.section style={{ background: 'var(--bg-base)', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
        <TechGrid gridSize={60} speed={0.25} pulseSpeed={1.5} />
        
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <SplitReveal
            minHeight="700px"
            backgroundColor="transparent"
            left={
              <motion.div style={{ maxWidth: '550px' }}>
                <span className="eyebrow">Demande d'intervention</span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 600, marginTop: '16px', marginBottom: '24px' }}>
                  Dites-nous<br /><strong>ce dont vous avez besoin.</strong>
                </h2>
                <div className="rule" style={{ width: '60px', height: '2px', background: 'var(--accent)', marginBottom: '28px' }} />
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, fontWeight: 300, marginBottom: '36px' }}>
                  Décrivez les symptômes, choisissez le type de véhicule, et nos techniciens prépareront l'outillage adapté avant même d'arriver chez vous.
                </p>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '16px 24px', background: 'var(--accent-glow)', border: '1px solid var(--accent-light)', borderRadius: '2px' }}>
                    <CheckCircle size={20} style={{ color: 'var(--accent)' }} />
                    <span style={{ fontWeight: 500 }}>Réponse rapide</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '16px 24px', background: 'var(--accent-glow)', border: '1px solid var(--accent-light)', borderRadius: '2px' }}>
                    <CheckCircle size={20} style={{ color: 'var(--accent)' }} />
                    <span style={{ fontWeight: 500 }}>Déplacement offert</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '16px 24px', background: 'var(--accent-glow)', border: '1px solid var(--accent-light)', borderRadius: '2px' }}>
                    <CheckCircle size={20} style={{ color: 'var(--accent)' }} />
                    <span style={{ fontWeight: 500 }}>Sans engagement</span>
                  </div>
                </div>
              </motion.div>
            }
            right={
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="hud-panel-glass" style={{ borderRadius: '4px', maxWidth: '520px' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, marginBottom: '28px', letterSpacing: 0 }}>
                    Dossier de diagnostic
                  </h3>

                  <AnimatePresence mode="wait">
                    {!submitted ? (
                      <form className="spacex-form" onSubmit={handleSubmit}>
                        <div className="form-group-spacex">
                          <label htmlFor="contact-name">Nom complet</label>
                          <input type="text" id="contact-name" name="name" className="form-control-spacex" placeholder="Ex: Jonathan Kabongo" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="form-group-spacex">
                          <label htmlFor="contact-phone">Téléphone</label>
                          <input type="tel" id="contact-phone" name="phone" className="form-control-spacex" placeholder="Ex: +243 990 000 000" value={formData.phone} onChange={handleChange} required />
                        </div>
                        <div className="form-group-spacex">
                          <label htmlFor="contact-vehicleType">Type de véhicule</label>
                          <select id="contact-vehicleType" name="vehicleType" className="form-control-spacex" value={formData.vehicleType} onChange={handleChange}>
                            <option value="sedan">Berline / Citadine</option>
                            <option value="suv">SUV / 4x4 / Tout-terrain</option>
                            <option value="truck">Utilitaire / Pickup</option>
                            <option value="moto">Moto / Deux-roues</option>
                            <option value="electric">Hybride / Électrique</option>
                          </select>
                        </div>
                        <div className="form-group-spacex">
                          <label htmlFor="contact-details">Description de la panne</label>
                          <textarea id="contact-details" name="details" className="form-control-spacex" rows="3" placeholder="Ex: Ratés d'allumage moteur à chaud, voyants allumés..." value={formData.details} onChange={handleChange} />
                        </div>
                        <div className="form-group-spacex" style={{ margin: '4px 0' }}>
                          <label className="checkbox-group-spacex">
                            <input type="checkbox" name="atHome" checked={formData.atHome} onChange={handleChange} />
                            <span>Autoriser le déplacement de l'atelier mobile</span>
                          </label>
                        </div>
                        <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', marginTop: '10px', justifyContent: 'center', background: 'var(--accent)', borderColor: 'var(--accent)' }} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                          {loading ? (
                            <>
                              <Loader2 className="animate-spin" size={16} style={{ marginRight: '8px' }} />
                              <span>ENVOI EN COURS...</span>
                            </>
                          ) : (
                            <>
                              <span>Transmettre la demande</span>
                              <Send size={14} />
                            </>
                          )}
                        </button>
                      </form>
                    ) : (
                      <motion.div className="hud-panel-glass" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', padding: '50px 30px' }}>
                        <CheckCircle size={56} style={{ color: 'var(--accent)', marginBottom: '20px' }} />
                        <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 600, marginBottom: '16px' }}>Demande envoyée !</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '380px', margin: '0 auto 28px' }}>
                          Votre demande a été préparée. Votre client e-mail s'est ouvert — envoyez le message pour le faire parvenir à notre équipe. Nous vous recontacterons rapidement.
                        </p>
                        <button className="btn-outline" style={{ padding: '14px 36px', fontSize: '0.8rem' }} onClick={() => setSubmitted(false)}>Nouvelle demande</button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            }
          />
        </div>
      </motion.section>

      {/* ── CTA ── */}
      <motion.section style={{ background: 'var(--bg-dark)', padding: '140px 0', position: 'relative', overflow: 'hidden' }}>
        <MechanicalGears gearCount={4} speed={0.1} />
        
        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="eyebrow" style={{ color: 'var(--accent-light)' }}>Urgence ?</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem, 5vw, 5rem)', fontWeight: 600, color: '#fff', marginTop: '16px', marginBottom: '20px' }}>
              Une panne<br /><strong>ne prévient pas.</strong>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', fontWeight: 300, marginBottom: '48px', maxWidth: '500px', margin: '0 auto 48px' }}>
              Hotline 7j/7. Intervention sous 45 min dans tout Lubumbashi.
            </p>
            <a href="tel:+243995859333" className="btn-primary" style={{ background: 'var(--accent)', borderColor: 'var(--accent)', padding: '18px 50px', fontSize: '0.85rem' }}>
              <Phone size={16} /><span>Appeler le +243 995 859 333</span>
            </a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}