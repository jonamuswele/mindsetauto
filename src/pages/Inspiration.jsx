import { useState, useCallback, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles, CheckCircle, Loader2, Send, X, Plus, ChevronLeft, Check, Image as ImageIcon, Minus } from 'lucide-react';
import { ScrollProgress } from '../components/ScrollAnimations';
import FloatingParticles from '../components/FloatingParticles';
import TechGrid from '../components/TechGrid';
import FloatingShapes from '../components/FloatingShapes';
import UpgradeDetailView from '../components/upgrades/UpgradeDetailView';
import AmbianceSelector from '../components/upgrades/AmbianceSelector';
import { UPGRADE_CATEGORIES, getCategoryById, AMBIANCE_OPTIONS, getOption } from '../data/upgrades';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Inspiration({ openBookingModal, setActiveTab }) {
  const [activeCategoryId, setActiveCategoryId] = useState('interieur');
  const [activeSubItemId, setActiveSubItemId] = useState(null);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [selectedUpgrades, setSelectedUpgrades] = useState([]);
  const [selectedAmbiance, setSelectedAmbiance] = useState('cuir-neuf');
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    vehicleType: 'suv',
    vehicleModel: '',
    notes: '',
  });

  const activeCategory = getCategoryById(activeCategoryId);
  const activeSubItem = activeSubItemId ? activeCategory?.subItems?.find(s => s.id === activeSubItemId) : null;
  const selectedOption = activeSubItem && selectedOptionId ? getOption(activeCategoryId, activeSubItemId, selectedOptionId) : null;

  const handleCategoryChange = useCallback((id) => {
    setActiveCategoryId(id);
    setActiveSubItemId(null);
    setSelectedOptionId(null);
  }, []);

  const handleSubItemSelect = useCallback((id) => {
    setActiveSubItemId(id);
    setSelectedOptionId(null);
  }, []);

  const handleOptionSelect = useCallback((optionId) => {
    setSelectedOptionId(optionId);
  }, []);

  const handleBackToSubItems = useCallback(() => {
    setActiveSubItemId(null);
    setSelectedOptionId(null);
  }, []);

  const handleAddToProject = useCallback(() => {
    if (!activeSubItem || !selectedOption) return;
    
    setSelectedUpgrades(prev => {
      const exists = prev.find(s => s.categoryId === activeCategoryId && s.subItemId === activeSubItemId);
      const newUpgrade = {
        categoryId: activeCategoryId,
        categoryLabel: activeCategory.label,
        categoryColor: activeCategory.color,
        categoryIcon: activeCategory.icon,
        subItemId: activeSubItemId,
        subItemLabel: activeSubItem.label,
        optionId: selectedOptionId,
        optionLabel: selectedOption.label,
        optionDesc: selectedOption.desc,
        optionImage: selectedOption.image,
        optionPrice: selectedOption.priceRange,
        optionFeatures: selectedOption.features,
        ambiance: activeSubItemId === 'ambiance' ? selectedAmbiance : null,
      };
      
      if (exists) {
        return prev.map(s => s.categoryId === activeCategoryId && s.subItemId === activeSubItemId ? newUpgrade : s);
      }
      return [...prev, newUpgrade];
    });
    
    // Auto-navigate back to sub-items grid to continue selecting
    setSelectedOptionId(null);
  }, [activeCategory, activeCategoryId, activeSubItem, activeSubItemId, selectedOption, selectedOptionId, selectedAmbiance]);

  const removeUpgrade = useCallback((categoryId, subItemId) => {
    setSelectedUpgrades(prev => prev.filter(s => !(s.categoryId === categoryId && s.subItemId === subItemId)));
  }, []);

  const clearAll = useCallback(() => {
    setSelectedUpgrades([]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.vehicleModel || selectedUpgrades.length === 0) return;

    setIsSubmitting(true);
    const upgradeList = selectedUpgrades.map(u => `- ${u.categoryLabel} / ${u.subItemLabel} : ${u.optionLabel}`).join('\n');
    const subject = encodeURIComponent(`Projet Upgrade - ${formData.name} - ${formData.vehicleModel}`);
    const body = encodeURIComponent(
      `Nom: ${formData.name}\nTéléphone: ${formData.phone}\nEmail: ${formData.email || 'Non renseigné'}\nVéhicule: ${formData.vehicleModel} (${formData.vehicleType})\n\nUpgrades sélectionnés:\n${upgradeList}\n\nNotes: ${formData.notes || 'Aucune'}` 
    );
    window.location.href = `mailto:mindsetauto243@gmail.com?subject=${subject}&body=${body}`;
    await new Promise(r => setTimeout(r, 1000));
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({ name: '', phone: '', email: '', vehicleType: 'suv', vehicleModel: '', notes: '' });
    setSelectedUpgrades([]);
  };

  const heroSlides = [
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/80-89_Toyota_Land_Cruiser.jpg/1280px-80-89_Toyota_Land_Cruiser.jpg', pos: 'center 50%' },
    { url: 'https://images.unsplash.com/photo-1617469767052-7b461d823bea?w=1600&auto=format&fit=crop&q=80', pos: 'center 55%' },
    { url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1600&auto=format&fit=crop&q=80', pos: 'center 50%' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/1997-1999_Toyota_Camry.jpg/1280px-1997-1999_Toyota_Camry.jpg', pos: 'center 45%' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/1998-1999_Honda_Civic_%28EK%29_1.8_Si_Sedan_%2819-08-2017%29_02.jpg/1280px-1998-1999_Honda_Civic_%28EK%29_1.8_Si_Sedan_%2819-08-2017%29_02.jpg', pos: 'center 50%' },
  ];

  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setHeroIndex(i => (i + 1) % heroSlides.length), 6000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (showSubmitForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showSubmitForm]);

  const selectedCount = selectedUpgrades.length;
  const categoriesWithSelection = useMemo(() => {
    const cats = new Set(selectedUpgrades.map(s => s.categoryId));
    return Array.from(cats).map(id => getCategoryById(id)).filter(Boolean);
  }, [selectedUpgrades]);

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
        <AnimatePresence mode="sync">
          <motion.div
            key={heroIndex}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${heroSlides[heroIndex].url})`,
              backgroundSize: 'cover',
              backgroundPosition: heroSlides[heroIndex].pos,
              zIndex: 0,
            }}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 0.25, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          />
        </AnimatePresence>

        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(135deg, rgba(15,26,42,0.9) 0%, rgba(15,26,42,0.6) 50%, rgba(15,26,42,0.85) 100%)' }} />

        <FloatingParticles count={14} speed={0.18} sizeRange={[30, 140]} connectDistance={280} />
        <TechGrid gridSize={70} speed={0.22} pulseSpeed={1.4} />

        <motion.div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }} variants={staggerContainer} initial="hidden" animate="show">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '48px', height: '100%' }}>
            <motion.div className="slide-content-overlay" style={{ paddingLeft: 0, maxWidth: '680px' }} variants={staggerContainer} initial="hidden" animate="show">
              <motion.span className="eyebrow" variants={fadeUp} style={{ color: 'var(--accent-light)' }}>Inspiration & Upgrades · Lubumbashi, RDC</motion.span>
              <motion.h1 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 5.5vw, 5.5rem)', fontWeight: 600, lineHeight: 1.02, letterSpacing: '-0.02em', marginBottom: '28px', color: '#fff' }}>
                Votre voiture n'a pas<br /><strong style={{ fontWeight: 700 }}>à être banale.</strong>
              </motion.h1>
              <motion.p variants={fadeUp} style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '40px', fontWeight: 300, maxWidth: '520px' }}>
                Sièges sur-mesure, tableau de bord modernisé, son immersif, peinture céramique, parfum signature.
                Chaque détail compte. Nous transformons l'habitacle où vous vivez.
              </motion.p>
              <motion.div variants={fadeUp} style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <motion.button className="btn-primary" onClick={() => setShowSubmitForm(true)} style={{ background: 'var(--accent)', borderColor: 'var(--accent)', color: '#fff' }} whileHover={{ scale: 1.02, boxShadow: '0 15px 30px rgba(13, 148, 136, 0.4)' }} whileTap={{ scale: 0.98 }} disabled={selectedCount === 0}>
                  <span>Mon projet upgrade</span>
                  {selectedCount > 0 && <span className="selection-badge">{selectedCount}</span>}
                  <ArrowRight size={14} />
                </motion.button>
                <motion.button className="btn-outline" onClick={() => setActiveTab('realizations')} style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }} whileHover={{ background: 'rgba(255,255,255,0.1)' }} whileTap={{ scale: 0.98 }}>
                  <span>Voir nos réalisations</span>
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.75, ease: [0.16, 1, 0.3, 1] }} style={{ maxWidth: '480px', width: '100%' }}>
              <div style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.15)', padding: '32px', borderRadius: '8px', textAlign: 'center' }}>
                <Sparkles size={48} style={{ color: 'var(--accent)', marginBottom: '20px', opacity: 0.6 }} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 600, color: '#fff', marginBottom: '16px' }}>Votre projet en cours</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '360px', margin: '0 auto 24px' }}>
                  {selectedCount === 0 ? 'Aucune sélection pour l\'instant. Choisissez une catégorie ci-dessous.' : `${selectedCount} upgrade${selectedCount > 1 ? 's' : ''} sélectionné${selectedCount > 1 ? 's' : ''}. Ajoutez-en d'autres ou envoyez.`}
                </p>
                {selectedCount > 0 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
                    {categoriesWithSelection.map(cat => (
                      <div key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', border: `1px solid ${cat.color}40` }}>
                        <span style={{ fontSize: '1.5rem' }}>{cat.icon}</span>
                        <span style={{ fontWeight: 600, color: cat.color }}>{cat.label}</span>
                        <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>{selectedUpgrades.filter(s => s.categoryId === cat.id).length} option${selectedUpgrades.filter(s => s.categoryId === cat.id).length > 1 ? 's' : ''}</span>
                      </div>
                    ))}
                    <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                      <button className="btn-primary" onClick={() => setShowSubmitForm(true)} style={{ flex: 1, background: 'var(--accent)', borderColor: 'var(--accent)', padding: '14px' }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <span>Envoyer ({selectedCount})</span><ArrowRight size={14} />
                      </button>
                      <button className="btn-outline" onClick={clearAll} style={{ flex: 1, borderColor: 'rgba(255,255,255,0.3)', color: '#fff', padding: '14px' }} whileHover={{ background: 'rgba(255,255,255,0.1)' }}>
                        <span>Tout effacer</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <span>Défiler</span>
          <motion.div style={{ width: 2, height: 40, background: 'var(--accent)' }} animate={{ scaleY: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
        </div>
      </motion.section>

      {/* ── CATEGORY NAVIGATION ── */}
      <motion.section style={{ background: 'var(--bg-base)', borderBottom: '1px solid var(--border)', padding: '32px 0', position: 'sticky', top: '76px', zIndex: 50 }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
            {UPGRADE_CATEGORIES.map((cat, idx) => (
              <motion.button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '10px',
                  padding: '12px 24px',
                  fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 500,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  background: activeCategoryId === cat.id ? cat.color : 'var(--bg-card)',
                  color: activeCategoryId === cat.id ? '#fff' : 'var(--text-secondary)',
                  border: `1px solid ${activeCategoryId === cat.id ? cat.color : 'var(--border)'}`,
                  cursor: 'pointer', borderRadius: '999px', transition: 'all 0.25s',
                }}
                whileHover={{ scale: 1.03, boxShadow: activeCategoryId === cat.id ? `0 8px 24px ${cat.color}40` : '0 4px 16px rgba(0,0,0,0.1)' }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <span style={{ fontSize: '1.2em' }}>{cat.icon}</span>
                <span>{cat.label}</span>
                {selectedUpgrades.filter(s => s.categoryId === cat.id).length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{ background: activeCategoryId === cat.id ? 'rgba(255,255,255,0.3)' : cat.color, color: '#fff', padding: '2px 8px', borderRadius: '999px', fontSize: '0.65rem', fontWeight: 600 }}
                  >
                    {selectedUpgrades.filter(s => s.categoryId === cat.id).length}
                  </motion.span>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── ACTIVE CATEGORY CONTENT ── */}
      <AnimatePresence mode="wait">
        <motion.div key={activeCategoryId} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} style={{ background: 'var(--bg-base)', minHeight: 'auto' }}>
          {activeCategory && (
            <>
              {/* Category Hero */}
              <motion.section style={{ position: 'relative', minHeight: '50vh', display: 'flex', alignItems: 'center', padding: '60px 0', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: `url(${activeCategory.heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(135deg, rgba(15,26,42,0.85) 0%, rgba(15,26,42,0.5) 50%, rgba(15,26,42,0.75) 100%)' }} />
                <FloatingShapes shapeCount={6} speed={0.12} />
                <TechGrid gridSize={80} speed={0.25} />

                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
                    <motion.div variants={slideInLeft}>
                      <span className="eyebrow" style={{ color: activeCategory.color }}>{activeCategory.label}</span>
                      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 600, lineHeight: 1.15, marginTop: '16px', marginBottom: '24px', color: '#fff' }}>{activeCategory.description}</h2>
                      <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '32px', fontWeight: 300, maxWidth: '480px' }}>Cliquez sur une option pour voir les déclinaisons avec images, choisissez, ajoutez au projet.</p>
                    </motion.div>

                    <motion.div variants={slideInRight}>
                      <div style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.15)', padding: '32px', borderRadius: '8px' }}>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: '#fff', marginBottom: '20px' }}>Vos sélections dans <span style={{ color: activeCategory.color }}>{activeCategory.label}</span></h3>
                        {selectedUpgrades.filter(s => s.categoryId === activeCategoryId).length === 0 ? (
                          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.7 }}>Aucune sélection pour l'instant. Cliquez sur une carte ci-dessous pour choisir.</p>
                        ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {selectedUpgrades.filter(s => s.categoryId === activeCategoryId).map(sel => (
                              <motion.div key={`${sel.categoryId}-${sel.subItemId}`} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', border: `1px solid ${activeCategory.color}40` }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                  <CheckCircle size={20} style={{ color: activeCategory.color }} />
                                  <div>
                                    <div style={{ fontWeight: 600, color: '#fff' }}>{sel.subItemLabel}</div>
                                    <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>{sel.optionLabel}</div>
                                    {sel.ambiance && <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>Ambiance : {AMBIANCE_OPTIONS.find(a => a.id === sel.ambiance)?.label}</div>}
                                  </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                  <button onClick={() => removeUpgrade(sel.categoryId, sel.subItemId)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', padding: '4px' }} whileHover={{ color: '#fff' }}><X size={18} /></button>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.section>

              {/* Sub-items Grid OR Detail View */}
              <motion.section style={{ background: 'var(--bg-base)', padding: '60px 0 100px', position: 'relative' }}>
                <TechGrid gridSize={70} speed={0.3} />
                <div className="container" style={{ maxWidth: '1100px' }}>
                  <AnimatePresence mode="wait">
                    {activeSubItem ? (
                      <UpgradeDetailView
                        key={`detail-${activeCategoryId}-${activeSubItemId}`}
                        category={activeCategory}
                        subItem={activeSubItem}
                        selectedOptionId={selectedOptionId}
                        onOptionSelect={handleOptionSelect}
                        onBack={handleBackToSubItems}
                        onNavigate={handleAddToProject}
                        selectedAmbiance={selectedAmbiance}
                        setSelectedAmbiance={setSelectedAmbiance}
                      />
                    ) : (
                      <motion.div key={`grid-${activeCategoryId}`} variants={staggerContainer} initial="hidden" animate="show">
                        <motion.div variants={fadeUp} style={{ marginBottom: '50px', textAlign: 'center' }}>
                          <span className="eyebrow" style={{ color: activeCategory.color }}>Options disponibles</span>
                          <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 600, marginTop: '16px' }}>Tout ce qu'on peut faire<br /><strong>sur {activeCategory.label.toLowerCase()}.</strong></motion.h2>
                        </motion.div>

                        <motion.div variants={staggerContainer} initial="hidden" animate="show" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                          {activeCategory.subItems.map((item, idx) => {
                            const isSelected = selectedUpgrades.some(s => s.categoryId === activeCategoryId && s.subItemId === item.id);
                            const selectedOpt = isSelected ? selectedUpgrades.find(s => s.categoryId === activeCategoryId && s.subItemId === item.id) : null;
                            return (
                              <motion.button
                                key={item.id}
                                onClick={() => handleSubItemSelect(item.id)}
                                style={{
                                  display: 'flex', flexDirection: 'column', gap: '16px',
                                  padding: '28px 32px',
                                  background: isSelected ? `linear-gradient(135deg, ${activeCategory.color}15, ${activeCategory.color}05)` : 'var(--bg-card)',
                                  border: `1px solid ${isSelected ? activeCategory.color : 'var(--border)'}`,
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  textAlign: 'left',
                                  transition: 'all 0.25s',
                                  position: 'relative',
                                  overflow: 'hidden',
                                }}
                                whileHover={{ y: -4, boxShadow: isSelected ? `0 16px 48px ${activeCategory.color}30` : '0 12px 40px rgba(0,0,0,0.15)', borderColor: isSelected ? activeCategory.color : 'var(--border-strong)' }}
                                whileTap={{ scale: 0.985 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                              >
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
                                  <div className="card-image-preview" style={{ width: 84, height: 56, borderRadius: 6, overflow: 'hidden', flexShrink: 0 }}>
                                    <img src={item.image} alt={item.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                  </div>
                                  {isSelected && (
                                    <motion.div
                                      initial={{ scale: 0, rotate: -180 }}
                                      animate={{ scale: 1, rotate: 0 }}
                                      transition={{ type: 'spring', stiffness: 300 }}
                                      style={{ width: 28, height: 28, borderRadius: '50%', background: activeCategory.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}
                                    >
                                      <Check size={14} />
                                    </motion.div>
                                  )}
                                </div>

                                <div className="card-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                  <span className="card-category" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: activeCategory.color }}>{activeCategory.label}</span>
                                  <h3 className="card-title" style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: isSelected ? activeCategory.color : 'var(--text-primary)', margin: 0 }}>{item.label}</h3>
                                  <p className="card-desc" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                                  {isSelected && selectedOpt && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: 'var(--bg-base)', borderRadius: '6px', border: `1px solid ${activeCategory.color}40` }}>
                                      <img src={selectedOpt.optionImage} alt={selectedOpt.optionLabel} style={{ width: 50, height: 35, objectFit: 'cover', borderRadius: '4px' }} />
                                      <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{selectedOpt.optionLabel}</div>
                                      </div>
                                    </div>
                                  )}
                                </div>



                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid var(--border)', marginTop: 'auto' }}>
                                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: isSelected ? activeCategory.color : 'var(--text-muted)' }}>
                                    {isSelected ? '✓ Ajouté — Cliquer pour modifier' : 'Voir les options →'}
                                  </span>
                                  <motion.div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: isSelected ? activeCategory.color : 'var(--accent)' }}>
                                    <ImageIcon size={16} />
                                    <span style={{ fontSize: '0.7rem', fontWeight: 500 }}>{isSelected ? 'Modifier' : 'Choisir'}</span>
                                  </motion.div>
                                </div>
                              </motion.button>
                            );
                          })}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.section>

              {/* Cross-category quick links */}
              <motion.section style={{ background: 'var(--bg-elevated)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '60px 0' }}>
                <div className="container" style={{ maxWidth: '1100px' }}>
                  <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <span className="eyebrow">Et aussi</span>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 600, marginTop: '16px' }}>Explorez les autres univers d'<strong>upgrade</strong></h3>
                  </motion.div>
                  <motion.div variants={staggerContainer} initial="hidden" animate="show" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                    {UPGRADE_CATEGORIES.filter(c => c.id !== activeCategoryId).map((cat, idx) => (
                      <motion.button key={cat.id} onClick={() => handleCategoryChange(cat.id)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '32px 24px', gap: '16px', background: 'var(--bg-card)', border: `1px solid ${selectedUpgrades.some(s => s.categoryId === cat.id) ? cat.color : 'var(--border)'}`, borderRadius: '8px', cursor: 'pointer', transition: 'all 0.3s' }} whileHover={{ borderColor: cat.color, y: -4, boxShadow: `0 16px 48px ${cat.color}20` }} whileTap={{ scale: 0.98 }}>
                        <span style={{ fontSize: '2.5rem' }}>{cat.icon}</span>
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)' }}>{cat.label}</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{cat.subItems.length} options</span>
                        {selectedUpgrades.filter(s => s.categoryId === cat.id).length > 0 && (
                          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ background: cat.color, color: '#fff', padding: '2px 10px', borderRadius: '999px', fontSize: '0.65rem', fontWeight: 600 }}>{selectedUpgrades.filter(s => s.categoryId === cat.id).length} sélectionnée(s)</motion.span>
                        )}
                      </motion.button>
                    ))}
                  </motion.div>
                </div>
              </motion.section>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── STICKY SELECTION BAR (mobile) ── */}
      {selectedCount > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            background: 'linear-gradient(180deg, transparent, var(--bg-base) 20%)',
            padding: '16px 24px 24px',
            pointerEvents: 'auto',
          }}
        >
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <motion.button
              className="btn-primary"
              onClick={() => setShowSubmitForm(true)}
              style={{ width: '100%', justifyContent: 'center', gap: '12px', padding: '16px', background: 'var(--accent)', borderColor: 'var(--accent)', fontSize: '0.85rem' }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <span>Envoyer mon projet ({selectedCount} upgrade{selectedCount > 1 ? 's' : ''})</span>
              <ArrowRight size={18} />
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ── SUBMIT FORM MODAL (Portal) ── */}
      {showSubmitForm && createPortal((
        <motion.div
          className="submit-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => { setShowSubmitForm(false); setSubmitSuccess(false); }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="submit-modal-title"
        >
          <motion.div
            className="submit-modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
          >
            <button className="modal-close" onClick={() => { setShowSubmitForm(false); setSubmitSuccess(false); }} aria-label="Fermer"><X size={24} /></button>

            <AnimatePresence mode="wait">
              {!submitSuccess ? (
                <form onSubmit={handleSubmit} className="submit-form">
                  <div className="modal-header">
                    <h2 id="submit-modal-title" style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 600, margin: '0 0 8px' }}>Envoyer votre projet upgrade</h2>
                    <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.95rem' }}>Remplissez vos coordonnées — votre client e-mail s’ouvrira pour envoyer la demande directement à notre équipe.</p>
                  </div>

                  {selectedCount > 0 && (
                    <div className="selection-summary">
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600, marginBottom: '16px' }}>Vos {selectedCount} upgrade{selectedCount > 1 ? 's' : ''} sélectionné{selectedCount > 1 ? 's' : ''}</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '200px', overflow: 'auto' }}>
                        {selectedUpgrades.map(sel => (
                          <motion.div key={`${sel.categoryId}-${sel.subItemId}`} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'var(--bg-card)', border: `1px solid ${sel.categoryColor}40`, borderRadius: '6px' }}>
                            <div style={{ width: 36, height: 36, borderRadius: '8px', background: `${sel.categoryColor}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: sel.categoryColor, flexShrink: 0 }}>
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                {sel.categoryId === 'interieur' && (
                                  <>
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                    <path d="M9 22V12h6v10" />
                                  </>
                                )}
                                {sel.categoryId === 'audio' && (
                                  <>
                                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                                    <path d="M22 4a16 16 0 0 1 0 16" />
                                  </>
                                )}
                                {sel.categoryId === 'exterieur' && (
                                  <>
                                    <rect x="1" y="3" width="15" height="13" rx="2" />
                                    <path d="M5 3v13" />
                                    <path d="M19 3v13" />
                                    <circle cx="6" cy="18" r="2" />
                                    <circle cx="18" cy="18" r="2" />
                                  </>
                                )}
                                {sel.categoryId === 'performance' && <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />}
                              </svg>
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sel.subItemLabel} : {sel.optionLabel}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{sel.categoryLabel}{sel.ambiance ? ` · ${AMBIANCE_OPTIONS.find(a => a.id === sel.ambiance)?.label}` : ''}</div>
                            </div>
                            <button type="button" onClick={() => removeUpgrade(sel.categoryId, sel.subItemId)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }} whileHover={{ color: 'var(--accent)' }}><X size={18} /></button>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="submit-name">Nom complet *</label>
                      <input type="text" id="submit-name" name="name" value={formData.name} onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))} placeholder="Ex: Jonathan Kabongo" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="submit-phone">Téléphone *</label>
                      <input type="tel" id="submit-phone" name="phone" value={formData.phone} onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))} placeholder="Ex: +243 990 000 000" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="submit-email">Email</label>
                      <input type="email" id="submit-email" name="email" value={formData.email} onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))} placeholder="Ex: jonathan@email.com" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="submit-vehicleType">Type de véhicule *</label>
                      <select id="submit-vehicleType" name="vehicleType" value={formData.vehicleType} onChange={e => setFormData(prev => ({ ...prev, vehicleType: e.target.value }))} required>
                        <option value="sedan">Berline / Citadine</option>
                        <option value="suv">SUV / 4x4 / Tout-terrain</option>
                        <option value="truck">Utilitaire / Pickup</option>
                        <option value="moto">Moto / Deux-roues</option>
                        <option value="electric">Hybride / Électrique</option>
                      </select>
                    </div>
                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                      <label htmlFor="submit-vehicleModel">Modèle & Année *</label>
                      <input type="text" id="submit-vehicleModel" name="vehicleModel" value={formData.vehicleModel} onChange={e => setFormData(prev => ({ ...prev, vehicleModel: e.target.value }))} placeholder="Ex: Toyota Land Cruiser 80 (1995)" required />
                    </div>
                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                      <label htmlFor="submit-notes">Notes, précisions, inspirations</label>
                      <textarea id="submit-notes" name="notes" rows={3} value={formData.notes} onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))} placeholder="Ex: Je veux des sièges cuir beige, tableau de bord écran 12 pouces, son Focal, peinture céramique mate..." />
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="button" className="btn-outline" onClick={() => { setShowSubmitForm(false); setSubmitSuccess(false); }} style={{ padding: '14px 28px' }}>Annuler</button>
                    <button type="submit" className="btn-primary" disabled={isSubmitting || !formData.name || !formData.phone || !formData.vehicleModel || selectedCount === 0} style={{ padding: '14px 28px', background: 'var(--accent)', borderColor: 'var(--accent)' }} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      {isSubmitting ? (<> <Loader2 className="animate-spin" size={16} style={{ marginRight: '8px' }} /> <span>ENVOI...</span> </>) : (<> <span>Envoyer au shop</span> <Send size={14} /> </>)}
                    </button>
                  </div>

                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '16px' }}>En envoyant, vous acceptez d'être recontacté par Mindset Auto. Vos données ne sont pas revendues. Diagnostic à domicile · Estimation transparente · Garantie 2 ans · Déplacement offert Lubumbashi + 20km</p>
                </form>
              ) : (
                <motion.div key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="success-state" style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <CheckCircle size={64} style={{ color: 'var(--accent)', marginBottom: '24px' }} />
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 600, marginBottom: '16px' }}>Projet transmis !</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '380px', margin: '0 auto 28px' }}>Votre projet a été préparé. Votre client e-mail s’est ouvert — envoyez le message et notre équipe vous recontactera rapidement.</p>
                  <button className="btn-primary" onClick={() => { setSubmitSuccess(false); setShowSubmitForm(false); }} style={{ padding: '14px 36px', background: 'var(--accent)', borderColor: 'var(--accent)' }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <span>Fermer</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <style jsx>{`
              .submit-modal-overlay {
                position: fixed;
                inset: 0;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 24px;
                background: rgba(10, 18, 30, 0.75);
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);
              }
              .submit-modal {
                width: 100%;
                max-width: 560px;
                max-height: 90vh;
                overflow-y: auto;
                background: var(--bg-card);
                border: 1px solid var(--border);
                border-radius: 8px;
                padding: 32px;
                position: relative;
                box-shadow: 0 32px 128px rgba(0,0,0,0.7);
              }
              .modal-close {
                position: absolute;
                top: 16px;
                right: 16px;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: var(--bg-base);
                border: 1px solid var(--border);
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--text-secondary);
                cursor: pointer;
                transition: all 0.2s;
                z-index: 20;
              }
              .modal-close:hover {
                background: var(--bg-card-hover);
                border-color: var(--border-strong);
                color: var(--text-primary);
              }
              .modal-header {
                margin-bottom: 24px;
                padding-bottom: 20px;
                border-bottom: 1px solid var(--border);
              }
              .selection-summary {
                margin-bottom: 24px;
                padding: 20px;
                background: var(--bg-base);
                border: 1px solid var(--border);
                border-radius: 6px;
              }
              .selection-summary h4 {
                color: var(--text-primary);
              }
              .form-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
                margin-bottom: 24px;
              }
              .form-group {
                display: flex;
                flex-direction: column;
                gap: 8px;
              }
              .form-group label {
                font-family: var(--font-sans);
                font-size: 0.75rem;
                font-weight: 500;
                color: var(--text-secondary);
              }
              .form-group input, .form-group select, .form-group textarea {
                padding: 14px 16px;
                font-family: var(--font-sans);
                font-size: 0.9rem;
                background: var(--bg-base);
                border: 1px solid var(--border);
                border-radius: 4px;
                color: var(--text-primary);
                transition: border-color 0.2s, box-shadow 0.2s;
              }
              .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
                outline: none;
                border-color: var(--accent);
                box-shadow: 0 0 0 3px var(--accent-glow);
              }
              .form-group textarea {
                resize: vertical;
                min-height: 100px;
              }
              .form-actions {
                display: flex;
                justify-content: flex-end;
                gap: 12px;
                padding-top: 16px;
                border-top: 1px solid var(--border);
              }
              .success-state {
                display: flex;
                flex-direction: column;
                align-items: center;
              }
              @media (max-width: 600px) {
                .form-grid {
                  grid-template-columns: 1fr;
                }
                .submit-modal {
                  padding: 24px 20px;
                }
              }
            `}</style>
          </motion.div>
        </motion.div>
      ), document.body)}

      <style jsx global>{`
        .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        .eyebrow { display: inline-block; font-family: var(--font-mono); font-size: 0.65rem; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 16px; }
        .btn-primary, .btn-outline { display: inline-flex; align-items: center; gap: 10px; padding: 14px 28px; font-family: var(--font-sans); font-size: 0.75rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; border-radius: 3px; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
        .btn-primary { border: 1px solid; }
        .btn-outline { border: 1px solid; background: transparent; }
        .slide-content-overlay { display: flex; flex-direction: column; justify-content: center; }
        .selection-badge { background: rgba(255,255,255,0.2); padding: 2px 10px; border-radius: 999px; font-size: 0.7rem; font-weight: 600; margin-left: 4px; }
      `}</style>
    </div>
  );
}