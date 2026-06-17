import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Loader2, Sparkles, Truck, ShieldCheck, Wrench } from 'lucide-react';

const UPGRADE_SERVICES = [
  { value: 'interior', label: 'Intérieur & Sellerie (sièges, tableau, tapis, parfum)', icon: Sparkles },
  { value: 'audio', label: 'Audio & Connectivité (HP, ampli, CarPlay, insonorisation)', icon: Loader2 },
  { value: 'exterior', label: 'Extérieur & Esthétique (céramique, jantes, covering, LED)', icon: ShieldCheck },
  { value: 'performance', label: 'Performance & Châssis (reprog, suspension, freins, admission)', icon: Wrench },
  { value: 'comfort', label: 'Confort & Praticité (chauffage sièges, caméra 360, vitres, charge)', icon: Truck },
];

const DIAGNOSTIC_SERVICES = [
  { value: 'engine', label: 'Diagnostic Moteur / Check Engine' },
  { value: 'electric', label: 'Système Électrique / Batterie' },
  { value: 'brakes', label: 'Freinage & Suspensions' },
  { value: 'service', label: 'Entretien Courant & Vidange' },
  { value: 'other', label: 'Autre Panne Mécanique' },
];

const VEHICLE_TYPES = [
  { value: 'sedan', label: 'Berline / Citadine' },
  { value: 'suv', label: 'SUV / 4x4 / Tout-terrain' },
  { value: 'truck', label: 'Utilitaire / Pickup' },
  { value: 'moto', label: 'Moto / Deux-roues' },
  { value: 'electric', label: 'Hybride / Électrique' },
];

export default function BookingModal({ isOpen, onClose, variant = 'diagnostic' }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    vehicleType: 'suv',
    serviceNeeded: variant === 'upgrade' ? 'interior' : 'engine',
    dateTime: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Reset form when variant changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      serviceNeeded: variant === 'upgrade' ? 'interior' : 'engine',
    }));
  }, [variant]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.dateTime) return;

    setLoading(true);
    const type = isUpgrade ? 'Demande Upgrade' : 'Rendez-vous Diagnostic';
    const subject = encodeURIComponent(`${type} - ${formData.name}`);
    const body = encodeURIComponent(
      `Nom: ${formData.name}\nT\u00e9l\u00e9phone: ${formData.phone}\nType de v\u00e9hicule: ${formData.vehicleType}\nService: ${formData.serviceNeeded}\nDate / Heure souhait\u00e9e: ${formData.dateTime}\nNotes: ${formData.notes || 'Aucune'}`
    );
    window.location.href = `mailto:mindsetauto243@gmail.com?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', phone: '', vehicleType: 'suv', serviceNeeded: variant === 'upgrade' ? 'interior' : 'engine', dateTime: '', notes: '' });
    }, 1000);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setSubmitted(false); }, 300);
  };

  const isUpgrade = variant === 'upgrade';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="modal-content-spacex"
            initial={{ scale: 0.95, y: 15, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 15, opacity: 0 }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close-spacex" onClick={handleClose}>
              <X size={20} />
            </button>

            <div>
              {!submitted ? (
                <>
                  <div style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '8px', letterSpacing: '2px' }}>
                      {isUpgrade ? 'DEMANDE DE DEVIS UPGRADE' : 'RÉSERVER UN DIAGNOSTIC'}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                      {isUpgrade
                        ? 'Sélectionnez vos envies ci-dessous — nous vous recontactons sous 24h avec un devis détaillé, transparent et sans engagement.'
                        : "Entrez les détails ci-dessous pour planifier le déplacement et le scan complet gratuit de notre atelier mobile à Lubumbashi."}
                    </p>
                  </div>

                  <form className="spacex-form" onSubmit={handleSubmit}>
                    <div className="form-group-spacex">
                      <label htmlFor="modal-name">Nom complet</label>
                      <input
                        type="text"
                        id="modal-name"
                        name="name"
                        className="form-control-spacex"
                        placeholder={isUpgrade ? "Ex: Jonathan Kabongo" : "Ex: Jonathan Kabongo"}
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div className="form-group-spacex">
                        <label htmlFor="modal-phone">Téléphone</label>
                        <input
                          type="tel"
                          id="modal-phone"
                          name="phone"
                          className="form-control-spacex"
                          placeholder="Ex: +243 990 000 000"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="form-group-spacex">
                        <label htmlFor="modal-dateTime">Date & Heure souhaitées</label>
                        <input
                          type="datetime-local"
                          id="modal-dateTime"
                          name="dateTime"
                          className="form-control-spacex"
                          value={formData.dateTime}
                          onChange={handleChange}
                          style={{ color: '#ffffff' }}
                          required
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div className="form-group-spacex">
                        <label htmlFor="modal-vehicleType">Véhicule</label>
                        <select
                          id="modal-vehicleType"
                          name="vehicleType"
                          className="form-control-spacex"
                          value={formData.vehicleType}
                          onChange={handleChange}
                          style={{ color: '#ffffff' }}
                        >
                          {VEHICLE_TYPES.map(v => (
                            <option key={v.value} value={v.value} style={{ background: '#000000' }}>
                              {v.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group-spacex">
                        <label htmlFor="modal-serviceNeeded">
                          {isUpgrade ? "Type d'Upgrade" : 'Type de Diagnostic'}
                        </label>
                        <select
                          id="modal-serviceNeeded"
                          name="serviceNeeded"
                          className="form-control-spacex"
                          value={formData.serviceNeeded}
                          onChange={handleChange}
                          style={{ color: '#ffffff' }}
                        >
                          {(isUpgrade ? UPGRADE_SERVICES : DIAGNOSTIC_SERVICES).map(s => (
                            <option key={s.value} value={s.value} style={{ background: '#000000' }}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-group-spacex">
                      <label htmlFor="modal-notes">
                        {isUpgrade ? 'Détails de votre projet (envies, références, contraintes...)' : 'Symptômes observés'}
                      </label>
                      <textarea
                        id="modal-notes"
                        name="notes"
                        className="form-control-spacex"
                        rows="3"
                        placeholder={isUpgrade
                          ? 'Ex: Je veux refaire les sièges en cuir cognac, mettre un écran 10" CarPlay, et protéger la carrosserie céramique...'
                          : 'Ex: Voyant moteur rouge clignotant, perte de puissance en accélération...'}
                        value={formData.notes}
                        onChange={handleChange}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-spacex"
                      disabled={loading}
                      style={{ marginTop: '10px', width: '100%' }}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin" size={16} style={{ animation: 'spin 1.5s linear infinite', marginRight: '8px' }} />
                          <span>{isUpgrade ? 'ENVOI DEVIS...' : 'SYNCHRONISATION...'}</span>
                        </>
                      ) : (
                         <span>{isUpgrade ? 'RECEVOIR MON DEVIS' : 'CONFIRMER LE RENDEZ-VOUS'}</span>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="success-box-spacex">
                  <CheckCircle size={36} style={{ color: 'var(--accent-cyan)' }} />
                  <h4 style={{ fontSize: '1.2rem', color: '#ffffff', letterSpacing: '2px' }}>
                    {isUpgrade ? 'DEVIS DEMANDÉ' : 'RÉSERVATION ENREGISTRÉE'}
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5', maxWidth: '340px' }}>
                    {isUpgrade
                      ? 'Votre demande de devis upgrade a été reçue. Notre équipe vous contacte sous 24h pour affiner le projet et vous envoyer une proposition détaillée.'
                      : 'Le rendez-vous de diagnostic mobile a été validé. Nos techniciens vous appelleront d\'ici quelques minutes sur le canal fourni pour valider l\'itinéraire vers votre domicile.'}
                  </p>

                  <button
                    className="btn-spacex btn-spacex-secondary"
                    onClick={handleClose}
                    style={{ padding: '8px 24px', fontSize: '0.75rem' }}
                  >
                    FERMER
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}