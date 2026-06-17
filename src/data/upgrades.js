export const UPGRADE_CATEGORIES = [
  {
    id: 'interieur',
    label: 'Intérieur & Confort',
    icon: '🛋️',
    description: 'Sièges, tableau de bord, tapis, ambiance, sellerie',
    color: 'var(--accent)',
    subItems: [
      {
        id: 'sieges',
        label: 'Sièges & Housses',
        desc: 'Cuir, Alcantara, tissus techniques, chauffants/ventilés, maintien lombaire',
        image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop',
        options: [
          { id: 'cuir-nappa', label: 'Cuir Nappa', desc: 'Cuir pleine fleur premium, grain fin, toucher doux', image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=400&fit=crop', features: ['Haut de gamme', 'Durable', 'Entretien facile'] },
          { id: 'cuir-alcantara', label: 'Cuir + Alcantara', desc: 'Assiettes Alcantara, contours cuir, look sport', image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e7a1?w=600&h=400&fit=crop', features: ['Sportif', 'Respirant', 'Maintien latéral'] },
          { id: 'tissu-tech', label: 'Tissu Technique', desc: 'Tissu haute résistance, lavable, anti-taches', image: 'https://images.unsplash.com/photo-1562620669-982147614d9b?w=600&h=400&fit=crop', features: ['Budget maîtrisé', 'Lavable', 'Résistant'] },
          { id: 'sieges-chauffants', label: 'Sièges Chauffants/Ventilés', desc: 'Intégration chauffage 3 niveaux + ventilation', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop', features: ['Confort 4 saisons', '3 niveaux', 'Commandes intégrées'] },
        ]
      },
      {
        id: 'tableau',
        label: 'Tableau de bord',
        desc: 'Écrans intégrés, inserts carbone/bois, éclairage d\'ambiance programmable',
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop',
        options: [
          { id: 'ecran-12', label: 'Écran 12.3" Intégré', desc: 'Écran tactile capacitif, interface moderne', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop', features: ['CarPlay/Android Auto', 'Navigation GPS', 'Caméra recul'] },
          { id: 'inserts-carbone', label: 'Inserts Carbone/Bois', desc: 'Plaquages véritable carbone ou bois noble', image: 'https://images.unsplash.com/photo-1611016186353-9af58c69a533?w=600&h=400&fit=crop', features: ['Sur-mesure', 'Finitions main', 'Look premium'] },
          { id: 'eclairage-ambiance', label: 'Éclairage Ambiance RGB', desc: 'Bandes LED programmables 64 couleurs', image: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?w=600&h=400&fit=crop', features: ['64 couleurs', 'Sync musique', 'App mobile'] },
          { id: 'combiné-numérique', label: 'Combiné Numérique 10.25"', desc: 'Remplace compteurs analogiques, 3 thèmes', image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&h=400&fit=crop', features: ['3 thèmes', 'Navigation', 'Assistance conduite'] },
        ]
      },
      {
        id: 'tapis',
        label: 'Tapis & Moquettes',
        desc: 'Sur-mesure, lavables, aluminium, caoutchouc 3D, isolation phonique',
        image: 'https://images.unsplash.com/photo-1606577924006-27d39b132c2a?w=400&h=300&fit=crop',
        options: [
          { id: 'tapis-3d', label: 'Tapis 3D Caoutchouc', desc: 'Bords hauts, forme exacte véhicule, lavable au jet', image: 'https://images.unsplash.com/photo-1606577924006-27d39b132c2a?w=600&h=400&fit=crop', features: ['Sur-mesure', 'Lavable jet', 'Bords 3cm'] },
          { id: 'moquette-premium', label: 'Moquette Premium', desc: 'Moquette aiguilletée haute densité, sur-mesure', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop', features: ['Confort', 'Isolation phonique', 'Coloris au choix'] },
          { id: 'tapis-alu', label: 'Tapis Aluminium', desc: 'Plaques alu brossé, clips invisibles, look course', image: 'https://images.unsplash.com/photo-1504215680048-db15dd05967b?w=600&h=400&fit=crop', features: ['Look sport', 'Inusable', 'Fixation invisible'] },
          { id: 'isolation-phonique', label: 'Isolation Phonique Plancher', desc: 'Couche butyle + mousse sous moquette/tapis', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&h=400&fit=crop', features: ['-6 à -10 dB', 'Thermique aussi', 'Invisible'] },
        ]
      },
      {
        id: 'volant',
        label: 'Volant & Pommeau',
        desc: 'Cuir perforé, carbone, bois, palettes, chauffant',
        image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop',
        options: [
          { id: 'volant-cuir', label: 'Volant Cuir Perforé', desc: 'Reprise cuir perforé, surpiqûres contrastées', image: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=600&h=400&fit=crop', features: ['Grip optimal', 'Surpiqûres choix', 'Maintien airbag'] },
          { id: 'volant-carbone', label: 'Volant Carbone/Alcantara', desc: 'Branches carbone, prises Alcantara, palettes alu', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop', features: ['Ultra-léger', 'Palettes alu', 'Look course'] },
          { id: 'volant-bois', label: 'Volant Bois/Cuir', desc: 'Couronne bois noble, cuir lisse, finition satinée', image: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?w=600&h=400&fit=crop', features: ['Classique', 'Bois noble', 'Chaleureux'] },
          { id: 'volant-chauffant', label: 'Volant Chauffant', desc: 'Intégration résistance, commande au voyant', image: 'https://images.unsplash.com/photo-1611244419377-b0a721864e1c?w=600&h=400&fit=crop', features: ['Chauffe 3 min', 'Thermo-régulé', 'Commande OEM'] },
        ]
      },
      {
        id: 'ambiance',
        label: 'Parfum & Ambiance',
        desc: 'Diffuseurs, ioniseurs, senteurs signature',
        image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=300&fit=crop',
        options: [
          { id: 'diffuseur-hv', label: 'Diffuseur Ventilation', desc: 'Clip sur grille aération, recharge 60 jours', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&h=400&fit=crop', features: ['Invisible', '60 jours', 'Intensité réglable'] },
          { id: 'ioniseur', label: 'Ioniseur Purificateur', desc: 'Branchement 12V, élimine odeurs/bactéries', image: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=600&h=400&fit=crop', features: ['Sans recharge', 'Purifie air', 'Silencieux'] },
          { id: 'parfum-signature', label: 'Parfum Signature (lot 3)', desc: '3 flacons 10ml : Cuir, Cèdre, Agrumes', image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=600&h=400&fit=crop', features: ['3 senteurs', 'Qualité parfumerie', 'Rechargeable'] },
        ]
      },
    ],
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/2018_Toyota_Camry_Interior.jpg/1280px-2018_Toyota_Camry_Interior.jpg',
  },
  {
    id: 'audio',
    label: 'Audio & Tech',
    icon: '🎵',
    description: 'Haut-parleurs, amplification, connectivité, insonorisation',
    color: '#8B5CF6',
    subItems: [
      {
        id: 'haut-parleurs',
        label: 'Haut-parleurs',
        desc: 'Coaxiaux, composants 2/3 voies, subwoofer dissimulé sous siège',
        image: 'https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=400&h=300&fit=crop',
        options: [
          { id: 'hp-coaxiaux', label: 'Kit Coaxiaux 2 Voies', desc: 'Remplacement direct HP avant/arrière, 60W RMS', image: 'https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=600&h=400&fit=crop', features: ['Plug & play', '60W RMS', 'Qualité OEM+'] },
          { id: 'hp-composants', label: 'Kit Composants 2 Voies', desc: 'Tweeters + médiums séparés, crossover, 80W RMS', image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&h=400&fit=crop', features: ['Scène large', 'Tweeters orientables', '80W RMS'] },
          { id: 'hp-3voies', label: 'Kit Composants 3 Voies', desc: 'Médiums dédiés + tweeters + graves, 120W RMS', image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=600&h=400&fit=crop', features: ['Studio quality', 'Médiums clairs', '120W RMS'] },
          { id: 'subwoofer-sous-siege', label: 'Subwoofer Sous-Siège', desc: 'Caisson plat 20cm, ampli intégré 150W, invisible', image: 'https://images.unsplash.com/photo-1608155686393-8fdd966d784d?w=600&h=400&fit=crop', features: ['Invisible', '150W', 'Bass boost'] },
        ]
      },
      {
        id: 'amplification',
        label: 'Amplification & DSP',
        desc: 'Ampli classe D, processeur DSP, tuning acoustique cabine',
        image: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?w=400&h=300&fit=crop',
        options: [
          { id: 'ampli-4canaux', label: 'Ampli 4 Canaux Classe D', desc: '4x75W RMS, compact, rendement 90%', image: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?w=600&h=400&fit=crop', features: ['4x75W', 'Ultra-compact', 'Faible chauffe'] },
          { id: 'dsp-8canaux', label: 'DSP 8 Canaux', desc: 'Processeur temps/phase/ÉQ, mesure micro incluse', image: 'https://images.unsplash.com/photo-1599837565318-67429bde7162?w=600&h=400&fit=crop', features: ['Auto-EQ', 'Alignement temporel', '8 sorties'] },
          { id: 'pack-ampli-dsp', label: 'Pack Ampli + DSP', desc: 'Ampli 6 canaux + DSP 10 canaux, calibré véhicule', image: 'https://images.unsplash.com/photo-1557463311-64c8d5a8df2d?w=600&h=400&fit=crop', features: ['Clé en main', 'Calibré VEHICULE', 'Garantie 2 ans'] },
        ]
      },
      {
        id: 'connectivite',
        label: 'Connectivité',
        desc: 'CarPlay/Android Auto sans fil, DAC haut de gamme, chargeur induction',
        image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=300&fit=crop',
        options: [
          { id: 'carplay-wireless', label: 'CarPlay/Android Auto Sans Fil', desc: 'Adaptateur OEM, connexion auto, zéro latence', image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&h=400&fit=crop', features: ['Sans fil', 'Auto-connect', 'Mise à jour OTA'] },
          { id: 'dac-premium', label: 'DAC Haut de Gamme', desc: 'Convertisseur 32-bit/384kHz, sortie RCA/XLR', image: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=600&h=400&fit=crop', features: ['32-bit', 'Sortie symétrique', 'Horloge femto'] },
          { id: 'charge-induction', label: 'Chargeur Induction Intégré', desc: '15W rapide, découpe console, ventilation active', image: 'https://images.unsplash.com/photo-1622445262465-2481c8573226?w=600&h=400&fit=crop', features: ['15W', 'Refroidi', 'OEM look'] },
        ]
      },
      {
        id: 'insonorisation',
        label: 'Insonorisation',
        desc: 'Portières, plancher, toit, pare-brise acoustique, mousse expansée',
        image: 'https://images.unsplash.com/photo-1504215680048-db15dd05967b?w=400&h=300&fit=crop',
        options: [
          { id: 'insonor-portières', label: 'Portières (4)', desc: 'Butyle + mousse 3 couches, hauts-parleurs étanches', image: 'https://images.unsplash.com/photo-1504215680048-db15dd05967b?w=600&h=400&fit=crop', features: ['-5 dB', 'Bass response', 'Étanchéité HP'] },
          { id: 'insonor-plancher', label: 'Plancher Complet', desc: 'Butyle 2mm + mousse 10mm, sous moquette', image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&h=400&fit=crop', features: ['-8 dB', 'Thermique', 'Anti-vibrations'] },
          { id: 'pack-total', label: 'Pack Total (Portières+Plancher+Toit+Coffre)', desc: 'Traitement complet, pare-brise acoustique inclus', image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop', features: ['-12 dB', 'Silence premium', 'Valeur revente'] },
        ]
      },
    ],
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Car_audio_system_installation.jpg/1280px-Car_audio_system_installation.jpg',
  },
  {
    id: 'exterieur',
    label: 'Extérieur & Esthétique',
    icon: '🎨',
    description: 'Peinture, jantes, éclairage, aéro, protection',
    color: '#F59E0B',
    subItems: [
      {
        id: 'peinture',
        label: 'Peinture & Protection',
        desc: 'Céramique, PPF, covering mat/satin/brillant, teintes exclusives',
        image: 'https://images.unsplash.com/photo-1607603750909-408e19385117?w=400&h=300&fit=crop',
        options: [
          { id: 'ceramic', label: 'Traitement Céramique 9H', desc: 'Protection 3-5 ans, hydrophobe, brillance miroir', image: 'https://images.unsplash.com/photo-1607603750909-408e19385117?w=600&h=400&fit=crop', features: ['3-5 ans', 'Auto-nettoyant', 'UV resistant'] },
          { id: 'ppf', label: 'Film PPF (Paint Protection Film)', desc: 'Auto-réparant, invisible, avant complet + zones risque', image: 'https://images.unsplash.com/photo-1613214149874-4f53673d67f3?w=600&h=400&fit=crop', features: ['Auto-réparant', '10 ans', 'Invisible'] },
          { id: 'covering-mat', label: 'Covering Mat/Satin/Brillant', desc: 'Film teinté, réversible, 200+ coloris', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop', features: ['Réversible', '200+ teintes', 'Protection peinture'] },
          { id: 'peinture-personnalisée', label: 'Peinture Personnalisée', desc: 'Teinte unique, paillettes, chameleon, perlé', image: 'https://images.unsplash.com/photo-1596731902462-8db1724e7041?w=600&h=400&fit=crop', features: ['Unique', 'Qualité usine', 'Certifié'] },
        ]
      },
      {
        id: 'jantes',
        label: 'Jantes & Pneus',
        desc: 'Forgées, flow-form, profils sport/confort, TPMS intégré',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop',
        options: [
          { id: 'jantes-forgées', label: 'Jantes Forgées 18-20"', desc: 'Monobloc forgé, -30% poids, sur-mesure', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop', features: ['Ultra-légères', 'Sur-mesure', 'Garantie vie'] },
          { id: 'jantes-flowform', label: 'Jantes Flow-Form 17-19"', desc: 'Technologie hybride, -20% poids, meilleur rapport', image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&h=400&fit=crop', features: ['Légères', 'Rapport qualité/prix', 'Homologuées'] },
          { id: 'pneus-sport', label: 'Pneus Sport/Confort', desc: 'Michelin PS5 / Pilot Sport 4 / Primacy 4+', image: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=600&h=400&fit=crop', features: ['Grip/Confort', 'Silencieux', 'Longévité'] },
        ]
      },
      {
        id: 'eclairage',
        label: 'Éclairage LED',
        desc: 'Projecteurs matrix, signature lumineuse, feux diurnes, antibrouillard',
        image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&h=300&fit=crop',
        options: [
          { id: 'led-matrix', label: 'Projecteurs Matrix LED', desc: 'Faisceau adaptatif, anti-éblouissement auto', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&h=400&fit=crop', features: ['Adaptatif', 'Auto high-beam', 'Portée 600m'] },
          { id: 'signature-lumineuse', label: 'Signature Lumineuse', desc: 'Bandes LED avant/arrière, démarrage animé', image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&h=400&fit=crop', features: ['Animée', 'Personnalisable', 'Homologuée'] },
          { id: 'antibrouillard-led', label: 'Antibrouillard LED', desc: 'Jaune sélectif 3000K, découpe pare-choc', image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&h=400&fit=crop', features: ['3000K', 'Pénètre brouillard', 'Look moderne'] },
        ]
      },
      {
        id: 'aero',
        label: 'Aéro & Détails',
        desc: 'Becquet, diffuseur, bas de caisse, rétroviseurs carbone, badges',
        image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400&h=300&fit=crop',
        options: [
          { id: 'becquet', label: 'Becquet Arrière', desc: 'Carbone/ABS, appui aérodynamique, montage usine', image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=600&h=400&fit=crop', features: ['Appui réel', 'Montage OEM', 'Carbone/ABS'] },
          { id: 'diffuseur', label: 'Diffuseur Arrière', desc: 'Carbone, canaux Venturi, look piste', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&h=400&fit=crop', features: ['Venturi', 'Carbone', 'Flux optimisé'] },
          { id: 'retroviseurs-carbone', label: 'Rétroviseurs Carbone', desc: 'Coques carbone véritable, rabattables électriques', image: 'https://images.unsplash.com/photo-1611016186353-9af58c69a533?w=600&h=400&fit=crop', features: ['Carbone vrai', 'Électriques', 'Chauffants'] },
        ]
      },
    ],
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/80-89_Toyota_Land_Cruiser.jpg/1280px-80-89_Toyota_Land_Cruiser.jpg',
  },
  {
    id: 'performance',
    label: 'Performance & Conduite',
    icon: '⚡',
    description: 'Suspension, freinage, moteur, châssis',
    color: '#EF4444',
    subItems: [
      {
        id: 'suspension',
        label: 'Suspension',
        desc: 'Raffermie, pneumatique, pilotée, réhausse/abaissement',
        image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=300&fit=crop',
        options: [
          { id: 'combinés-filetés', label: 'Combinés Filetés', desc: 'Hauteur/roulis/amortissement réglables, 30 clics', image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&h=400&fit=crop', features: ['30 clics', 'Hauteur variable', 'Piste/Route'] },
          { id: 'suspension-pneumatique', label: 'Suspension Pneumatique', desc: '4 coussins air, gestion électronique, 5 modes', image: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?w=600&h=400&fit=crop', features: ['5 modes', 'Auto-nivellement', 'Confort max'] },
          { id: 'amortisseurs-pilotés', label: 'Amortisseurs Pilotés', desc: 'CDC (Continuous Damping Control), OEM+', image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&h=400&fit=crop', features: ['Temps réel', 'Modes Confort/Sport', 'Intégration OEM'] },
          { id: 'rehausse-4x4', label: 'Kit Réhausse 4x4 (+50mm)', desc: 'Ressorts/amortisseurs renforcés, garde au sol +50mm', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop', features: ['+50mm', 'Renforcé', 'Homologué'] },
        ]
      },
      {
        id: 'freinage',
        label: 'Freinage',
        desc: 'Disques percés/rainurés, étriers 4/6 pistons, plaquettes céramique',
        image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=400&h=300&fit=crop',
        options: [
          { id: 'freins-avant-4p', label: 'Kit Étriers 4 Pistons Avant', desc: 'Étriers alu forgé, disques 330mm percés, plaquettes céramique', image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&h=400&fit=crop', features: ['4 pistons', '330mm', 'Plaquettes céramique'] },
          { id: 'freins-6p', label: 'Kit Étriers 6 Pistons Avant/Arrière', desc: 'Étriers monobloc 6P, disques 355/330mm, racing', image: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=600&h=400&fit=crop', features: ['6 pistons', '355/330mm', 'Endurance'] },
          { id: 'plaquettes-ceramique', label: 'Plaquettes Céramique (4 roues)', desc: 'Poussière quasi nulle, froid/chaud constant, silence', image: 'https://images.unsplash.com/photo-1606577924006-27d39b132c2a?w=600&h=400&fit=crop', features: ['Zéro poussière', 'Constant', 'Silencieux'] },
        ]
      },
      {
        id: 'moteur',
        label: 'Moteur & Échappement',
        desc: 'Reprog Stage 1/2, admission directe, ligne inox, valve active',
        image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=400&h=300&fit=crop',
        options: [
          { id: 'stage1', label: 'Reprogrammation Stage 1', desc: 'Optimisation carto usine, +20-30% couple/puissance', image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&h=400&fit=crop', features: ['+20-30%', 'Carte sur-mesure', 'Réversible'] },
          { id: 'stage2', label: 'Stage 2 (Admission + Echappement + Carto)', desc: 'Admission carbone + ligne inox 3" + carto dédiée', image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=600&h=400&fit=crop', features: ['Pack complet', '+40-60%', 'Son sport'] },
          { id: 'ligne-inox', label: 'Ligne Échappement Inox 304', desc: 'Catalyseur sport 200cpi + silencieux valve active', image: 'https://images.unsplash.com/photo-1606577924006-27d39b132c2a?w=600&h=400&fit=crop', features: ['Valve active', 'Inox 304', 'Homologuée'] },
          { id: 'admission-carbone', label: 'Admission Directe Carbone', desc: 'Boîte air carbone, filtre sport, son admission', image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&h=400&fit=crop', features: ['Carbone', 'Débit +40%', 'Son sport'] },
        ]
      },
      {
        id: 'chassis',
        label: 'Châssis & Direction',
        desc: 'Barres anti-rapprochement, renforts, direction assistée variable',
        image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=400&h=300&fit=crop',
        options: [
          { id: 'barre-av', label: 'Barre Anti-Rapprochement Avant', desc: 'Alu forgé, rigidité train avant +15%', image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&h=400&fit=crop', features: ['+15% rigidité', 'Alu forgé', 'Boulons ARP'] },
          { id: 'barre-ar', label: 'Barre Anti-Rapprochement Arrière', desc: 'Acier/Alu, rigidité train arrière, passage coffre', image: 'https://images.unsplash.com/photo-1606577924006-27d39b132c2a?w=600&h=400&fit=crop', features: ['Rigidité AR', 'Passage coffre', 'Réglable'] },
          { id: 'renforts-chassis', label: 'Renforts Châssis (Sous-caisse)', desc: 'Triangulation complète, soudure/bolt-on, piste', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&h=400&fit=crop', features: ['Triangulation', 'Bolt-on', 'Rigidité +25%'] },
          { id: 'direction-variable', label: 'Direction Assistée Variable', desc: 'Ratio variable, effort réduit ville, précis route', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop', features: ['Ratio variable', 'Ville/Route', 'Sécurité'] },
        ]
      },
    ],
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/1997-1999_Toyota_Camry.jpg/1280px-1997-1999_Toyota_Camry.jpg',
  },
];

export const AMBIANCE_OPTIONS = [
  { id: 'bois-cedre', label: 'Bois de Cèdre', desc: 'Chaleureux, naturel, apaisant', color: '#8B5E3C', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop', scentNotes: 'Cèdre, santal, vanille' },
  { id: 'cuir-neuf', label: 'Cuir Neuf', desc: 'Premium, sportif, élégant', color: '#1A1A2E', image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop', scentNotes: 'Cuir, tabac, ambre' },
  { id: 'ozone-pur', label: 'Ozone Pur', desc: 'Frais, propre, moderne', color: '#00D4FF', image: 'https://images.unsplash.com/photo-1606664515524-edb1d648d0d1?w=400&h=300&fit=crop', scentNotes: 'Ozone, marine, coton' },
  { id: 'agrumes-vifs', label: 'Agrumes Vifs', desc: 'Énergisant, joyeux, vif', color: '#F59E0B', image: 'https://images.unsplash.com/photo-1611080626919-7cf5a6d1f367?w=400&h=300&fit=crop', scentNotes: 'Bergamote, citron vert, néroli' },
  { id: 'foret-dense', label: 'Forêt Dense', desc: 'Profond, masculin, ancré', color: '#065F46', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop', scentNotes: 'Pin, mousse, vétiver' },
  { id: 'vanille-douce', label: 'Vanille Douce', desc: 'Confortable, doux, enveloppant', color: '#F3E8D0', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop', scentNotes: 'Vanille, fève tonka, benjoin' },
];

export function getCategoryById(id) {
  return UPGRADE_CATEGORIES.find(c => c.id === id);
}

export function getSubItem(categoryId, subItemId) {
  const cat = getCategoryById(categoryId);
  return cat?.subItems?.find(s => s.id === subItemId);
}

export function getOption(categoryId, subItemId, optionId) {
  const subItem = getSubItem(categoryId, subItemId);
  return subItem?.options?.find(o => o.id === optionId);
}

export function getAllSubItems() {
  return UPGRADE_CATEGORIES.flatMap(cat =>
    cat.subItems.map(item => ({ ...item, categoryId: cat.id, categoryLabel: cat.label, categoryColor: cat.color }))
  );
}