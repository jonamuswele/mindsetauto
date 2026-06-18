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
        image: 'https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?w=400&h=300&fit=crop', // luxury car leather seats interior
        options: [
          {
            id: 'cuir-nappa',
            label: 'Cuir Nappa',
            desc: 'Cuir pleine fleur premium, grain fin, toucher doux',
            image: 'https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?w=600&h=400&fit=crop', // tan leather car seat close-up
            features: ['Haut de gamme', 'Durable', 'Entretien facile'],
          },
          {
            id: 'cuir-alcantara',
            label: 'Cuir + Alcantara',
            desc: 'Assises Alcantara, contours cuir, look sport',
            image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=400&fit=crop', // sport car interior black alcantara bucket seats
            features: ['Sportif', 'Respirant', 'Maintien latéral'],
          },
          {
            id: 'tissu-tech',
            label: 'Tissu Technique',
            desc: 'Tissu haute résistance, lavable, anti-taches',
            image: 'https://images.unsplash.com/photo-1555652736-e92021d28a10?w=600&h=400&fit=crop', // car cloth seat fabric detail
            features: ['Budget maîtrisé', 'Lavable', 'Résistant'],
          },
          {
            id: 'sieges-chauffants',
            label: 'Sièges Chauffants/Ventilés',
            desc: 'Intégration chauffage 3 niveaux + ventilation',
            image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e7a1?w=600&h=400&fit=crop', // car seat heating ventilation button controls on center console
            features: ['Confort 4 saisons', '3 niveaux', 'Commandes intégrées'],
          },
        ],
      },
      {
        id: 'tableau',
        label: 'Tableau de bord',
        desc: 'Écrans intégrés, inserts carbone/bois, éclairage d\'ambiance programmable',
        image: 'https://images.unsplash.com/photo-1551703599-6b3e8379aa8c?w=400&h=300&fit=crop', // modern car dashboard with large touchscreen
        options: [
          {
            id: 'ecran-12',
            label: 'Écran 12.3" Intégré',
            desc: 'Écran tactile capacitif, interface moderne',
            image: 'https://images.unsplash.com/photo-1551703599-6b3e8379aa8c?w=600&h=400&fit=crop', // large infotainment touchscreen in car dashboard
            features: ['CarPlay/Android Auto', 'Navigation GPS', 'Caméra recul'],
          },
          {
            id: 'inserts-carbone',
            label: 'Inserts Carbone/Bois',
            desc: 'Plaquages véritable carbone ou bois noble',
            image: 'https://images.unsplash.com/photo-1611016186353-9af58c69a533?w=600&h=400&fit=crop', // carbon fiber dashboard trim close-up
            features: ['Sur-mesure', 'Finitions main', 'Look premium'],
          },
          {
            id: 'eclairage-ambiance',
            label: 'Éclairage Ambiance RGB',
            desc: 'Bandes LED programmables 64 couleurs',
            image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&h=400&fit=crop', // car interior with ambient LED lighting glowing blue/purple
            features: ['64 couleurs', 'Sync musique', 'App mobile'],
          },
          {
            id: 'combiné-numérique',
            label: 'Combiné Numérique 10.25"',
            desc: 'Remplace compteurs analogiques, 3 thèmes',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop', // digital instrument cluster speedometer display
            features: ['3 thèmes', 'Navigation', 'Assistance conduite'],
          },
        ],
      },
      {
        id: 'tapis',
        label: 'Tapis & Moquettes',
        desc: 'Sur-mesure, lavables, aluminium, caoutchouc 3D, isolation phonique',
        image: 'https://images.unsplash.com/photo-1597007066704-67bf2068d5b2?w=400&h=300&fit=crop', // car floor mat close-up rubber 3D
        options: [
          {
            id: 'tapis-3d',
            label: 'Tapis 3D Caoutchouc',
            desc: 'Bords hauts, forme exacte véhicule, lavable au jet',
            image: 'https://images.unsplash.com/photo-1597007066704-67bf2068d5b2?w=600&h=400&fit=crop', // rubber 3D car floor mat with raised edges
            features: ['Sur-mesure', 'Lavable jet', 'Bords 3cm'],
          },
          {
            id: 'moquette-premium',
            label: 'Moquette Premium',
            desc: 'Moquette aiguilletée haute densité, sur-mesure',
            image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&h=400&fit=crop', // plush premium car carpet floor velvet
            features: ['Confort', 'Isolation phonique', 'Coloris au choix'],
          },
          {
            id: 'tapis-alu',
            label: 'Tapis Aluminium',
            desc: 'Plaques alu brossé, clips invisibles, look course',
            image: 'https://images.unsplash.com/photo-1504215680048-db15dd05967b?w=600&h=400&fit=crop', // brushed aluminum metal floor plate racing car
            features: ['Look sport', 'Inusable', 'Fixation invisible'],
          },
          {
            id: 'isolation-phonique',
            label: 'Isolation Phonique Plancher',
            desc: 'Couche butyle + mousse sous moquette/tapis',
            image: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=600&h=400&fit=crop', // dynamat butyl sound deadening mat being applied to car floor
            features: ['-6 à -10 dB', 'Thermique aussi', 'Invisible'],
          },
        ],
      },
      {
        id: 'volant',
        label: 'Volant & Pommeau',
        desc: 'Cuir perforé, carbone, bois, palettes, chauffant',
        image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop', // car steering wheel close-up
        options: [
          {
            id: 'volant-cuir',
            label: 'Volant Cuir Perforé',
            desc: 'Reprise cuir perforé, surpiqûres contrastées',
            image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&h=400&fit=crop', // perforated leather steering wheel with stitching close-up
            features: ['Grip optimal', 'Surpiqûres choix', 'Maintien airbag'],
          },
          {
            id: 'volant-carbone',
            label: 'Volant Carbone/Alcantara',
            desc: 'Branches carbone, prises Alcantara, palettes alu',
            image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop', // sport steering wheel carbon fiber paddle shifters
            features: ['Ultra-léger', 'Palettes alu', 'Look course'],
          },
          {
            id: 'volant-bois',
            label: 'Volant Bois/Cuir',
            desc: 'Couronne bois noble, cuir lisse, finition satinée',
            image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=600&h=400&fit=crop', // classic wooden steering wheel vintage car interior
            features: ['Classique', 'Bois noble', 'Chaleureux'],
          },
          {
            id: 'volant-chauffant',
            label: 'Volant Chauffant',
            desc: 'Intégration résistance, commande au voyant',
            image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=600&h=400&fit=crop', // car steering wheel with heating indicator light
            features: ['Chauffe 3 min', 'Thermo-régulé', 'Commande OEM'],
          },
        ],
      },
      {
        id: 'ambiance',
        label: 'Parfum & Ambiance',
        desc: 'Diffuseurs, ioniseurs, senteurs signature',
        image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=400&h=300&fit=crop', // car air freshener fragrance bottle
        options: [
          {
            id: 'diffuseur-hv',
            label: 'Diffuseur Ventilation',
            desc: 'Clip sur grille aération, recharge 60 jours',
            image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&h=400&fit=crop', // car vent clip air freshener diffuser
            features: ['Invisible', '60 jours', 'Intensité réglable'],
          },
          {
            id: 'ioniseur',
            label: 'Ioniseur Purificateur',
            desc: 'Branchement 12V, élimine odeurs/bactéries',
            image: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=600&h=400&fit=crop', // compact car air purifier ionizer device
            features: ['Sans recharge', 'Purifie air', 'Silencieux'],
          },
          {
            id: 'parfum-signature',
            label: 'Parfum Signature (lot 3)',
            desc: '3 flacons 10ml : Cuir, Cèdre, Agrumes',
            image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop', // three luxury perfume fragrance glass bottles
            features: ['3 senteurs', 'Qualité parfumerie', 'Rechargeable'],
          },
        ],
      },
    ],
    heroImage: 'https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?w=1280&h=720&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1558389157-e4bfa5dc3e81?w=400&h=300&fit=crop', // car door speaker mounted in door panel
        options: [
          {
            id: 'hp-coaxiaux',
            label: 'Kit Coaxiaux 2 Voies',
            desc: 'Remplacement direct HP avant/arrière, 60W RMS',
            image: 'https://images.unsplash.com/photo-1558389157-e4bfa5dc3e81?w=600&h=400&fit=crop', // coaxial car speaker in door panel
            features: ['Plug & play', '60W RMS', 'Qualité OEM+'],
          },
          {
            id: 'hp-composants',
            label: 'Kit Composants 2 Voies',
            desc: 'Tweeters + médiums séparés, crossover, 80W RMS',
            image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&h=400&fit=crop', // component speaker set tweeter and woofer separate
            features: ['Scène large', 'Tweeters orientables', '80W RMS'],
          },
          {
            id: 'hp-3voies',
            label: 'Kit Composants 3 Voies',
            desc: 'Médiums dédiés + tweeters + graves, 120W RMS',
            image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=600&h=400&fit=crop', // 3-way car audio speaker set with crossover
            features: ['Studio quality', 'Médiums clairs', '120W RMS'],
          },
          {
            id: 'subwoofer-sous-siege',
            label: 'Subwoofer Sous-Siège',
            desc: 'Caisson plat 20cm, ampli intégré 150W, invisible',
            image: 'https://images.unsplash.com/photo-1608155686393-8fdd966d784d?w=600&h=400&fit=crop', // flat slim subwoofer under car seat
            features: ['Invisible', '150W', 'Bass boost'],
          },
        ],
      },
      {
        id: 'amplification',
        label: 'Amplification & DSP',
        desc: 'Ampli classe D, processeur DSP, tuning acoustique cabine',
        image: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?w=400&h=300&fit=crop', // car amplifier with heatsink installed in trunk
        options: [
          {
            id: 'ampli-4canaux',
            label: 'Ampli 4 Canaux Classe D',
            desc: '4x75W RMS, compact, rendement 90%',
            image: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?w=600&h=400&fit=crop', // compact class D 4-channel car amplifier
            features: ['4x75W', 'Ultra-compact', 'Faible chauffe'],
          },
          {
            id: 'dsp-8canaux',
            label: 'DSP 8 Canaux',
            desc: 'Processeur temps/phase/ÉQ, mesure micro incluse',
            image: 'https://images.unsplash.com/photo-1599837565318-67429bde7162?w=600&h=400&fit=crop', // car audio DSP digital signal processor unit
            features: ['Auto-EQ', 'Alignement temporel', '8 sorties'],
          },
          {
            id: 'pack-ampli-dsp',
            label: 'Pack Ampli + DSP',
            desc: 'Ampli 6 canaux + DSP 10 canaux, calibré véhicule',
            image: 'https://images.unsplash.com/photo-1557463311-64c8d5a8df2d?w=600&h=400&fit=crop', // car audio system full install amp and processor rack
            features: ['Clé en main', 'Calibré VEHICULE', 'Garantie 2 ans'],
          },
        ],
      },
      {
        id: 'connectivite',
        label: 'Connectivité',
        desc: 'CarPlay/Android Auto sans fil, DAC haut de gamme, chargeur induction',
        image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400&h=300&fit=crop', // apple carplay on car screen with maps
        options: [
          {
            id: 'carplay-wireless',
            label: 'CarPlay/Android Auto Sans Fil',
            desc: 'Adaptateur OEM, connexion auto, zéro latence',
            image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600&h=400&fit=crop', // wireless carplay navigation displayed on car screen
            features: ['Sans fil', 'Auto-connect', 'Mise à jour OTA'],
          },
          {
            id: 'dac-premium',
            label: 'DAC Haut de Gamme',
            desc: 'Convertisseur 32-bit/384kHz, sortie RCA/XLR',
            image: 'https://images.unsplash.com/photo-1507149833265-60c372daea22?w=600&h=400&fit=crop', // high-end DAC audio converter device with RCA connections
            features: ['32-bit', 'Sortie symétrique', 'Horloge femto'],
          },
          {
            id: 'charge-induction',
            label: 'Chargeur Induction Intégré',
            desc: '15W rapide, découpe console, ventilation active',
            image: 'https://images.unsplash.com/photo-1622445262465-2481c8573226?w=600&h=400&fit=crop', // wireless charging pad integrated in car center console
            features: ['15W', 'Refroidi', 'OEM look'],
          },
        ],
      },
      {
        id: 'insonorisation',
        label: 'Insonorisation',
        desc: 'Portières, plancher, toit, pare-brise acoustique, mousse expansée',
        image: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=400&h=300&fit=crop', // sound deadening butyl mat applied inside car door
        options: [
          {
            id: 'insonor-portières',
            label: 'Portières (4)',
            desc: 'Butyle + mousse 3 couches, hauts-parleurs étanches',
            image: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=600&h=400&fit=crop', // dynamat sound deadening installed inside car door panel
            features: ['-5 dB', 'Bass response', 'Étanchéité HP'],
          },
          {
            id: 'insonor-plancher',
            label: 'Plancher Complet',
            desc: 'Butyle 2mm + mousse 10mm, sous moquette',
            image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&h=400&fit=crop', // butyl sound deadening sheet applied to car floor
            features: ['-8 dB', 'Thermique', 'Anti-vibrations'],
          },
          {
            id: 'pack-total',
            label: 'Pack Total (Portières+Plancher+Toit+Coffre)',
            desc: 'Traitement complet, pare-brise acoustique inclus',
            image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop', // full car interior stripped with complete sound deadening treatment
            features: ['-12 dB', 'Silence premium', 'Valeur revente'],
          },
        ],
      },
    ],
    heroImage: 'https://images.unsplash.com/photo-1558389157-e4bfa5dc3e81?w=1280&h=720&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1607603750909-408e19385117?w=400&h=300&fit=crop', // ceramic coating being applied to car paint with applicator
        options: [
          {
            id: 'ceramic',
            label: 'Traitement Céramique 9H',
            desc: 'Protection 3-5 ans, hydrophobe, brillance miroir',
            image: 'https://images.unsplash.com/photo-1607603750909-408e19385117?w=600&h=400&fit=crop', // ceramic coating liquid being buffed onto car panel showing mirror gloss
            features: ['3-5 ans', 'Auto-nettoyant', 'UV resistant'],
          },
          {
            id: 'ppf',
            label: 'Film PPF (Paint Protection Film)',
            desc: 'Auto-réparant, invisible, avant complet + zones risque',
            image: 'https://images.unsplash.com/photo-1613214149874-4f53673d67f3?w=600&h=400&fit=crop', // PPF paint protection film being installed on car hood
            features: ['Auto-réparant', '10 ans', 'Invisible'],
          },
          {
            id: 'covering-mat',
            label: 'Covering Mat/Satin/Brillant',
            desc: 'Film teinté, réversible, 200+ coloris',
            image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=600&h=400&fit=crop', // matte black vinyl wrap being applied to car with squeegee
            features: ['Réversible', '200+ teintes', 'Protection peinture'],
          },
          {
            id: 'peinture-personnalisée',
            label: 'Peinture Personnalisée',
            desc: 'Teinte unique, paillettes, chameleon, perlé',
            image: 'https://images.unsplash.com/photo-1596731902462-8db1724e7041?w=600&h=400&fit=crop', // custom paint job car being sprayed in paint booth
            features: ['Unique', 'Qualité usine', 'Certifié'],
          },
        ],
      },
      {
        id: 'jantes',
        label: 'Jantes & Pneus',
        desc: 'Forgées, flow-form, profils sport/confort, TPMS intégré',
        image: 'https://images.unsplash.com/photo-1568844401968-b7cdb0b64b16?w=400&h=300&fit=crop', // alloy wheel close-up on car
        options: [
          {
            id: 'jantes-forgées',
            label: 'Jantes Forgées 18-20"',
            desc: 'Monobloc forgé, -30% poids, sur-mesure',
            image: 'https://images.unsplash.com/photo-1568844401968-b7cdb0b64b16?w=600&h=400&fit=crop', // monoblock forged alloy wheel with deep dish design
            features: ['Ultra-légères', 'Sur-mesure', 'Garantie vie'],
          },
          {
            id: 'jantes-flowform',
            label: 'Jantes Flow-Form 17-19"',
            desc: 'Technologie hybride, -20% poids, meilleur rapport',
            image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&h=400&fit=crop', // flow-formed alloy wheels multi-spoke car
            features: ['Légères', 'Rapport qualité/prix', 'Homologuées'],
          },
          {
            id: 'pneus-sport',
            label: 'Pneus Sport/Confort',
            desc: 'Michelin PS5 / Pilot Sport 4 / Primacy 4+',
            image: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=600&h=400&fit=crop', // high-performance sport tire tread close-up on rim
            features: ['Grip/Confort', 'Silencieux', 'Longévité'],
          },
        ],
      },
      {
        id: 'eclairage',
        label: 'Éclairage LED',
        desc: 'Projecteurs matrix, signature lumineuse, feux diurnes, antibrouillard',
        image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&h=300&fit=crop', // modern LED headlight close-up at night
        options: [
          {
            id: 'led-matrix',
            label: 'Projecteurs Matrix LED',
            desc: 'Faisceau adaptatif, anti-éblouissement auto',
            image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&h=400&fit=crop', // matrix LED headlight projector beam at night
            features: ['Adaptatif', 'Auto high-beam', 'Portée 600m'],
          },
          {
            id: 'signature-lumineuse',
            label: 'Signature Lumineuse',
            desc: 'Bandes LED avant/arrière, démarrage animé',
            image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop', // car DRL daytime running lights LED strip signature front
            features: ['Animée', 'Personnalisable', 'Homologuée'],
          },
          {
            id: 'antibrouillard-led',
            label: 'Antibrouillard LED',
            desc: 'Jaune sélectif 3000K, découpe pare-choc',
            image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&h=400&fit=crop', // yellow LED fog light mounted in front bumper
            features: ['3000K', 'Pénètre brouillard', 'Look moderne'],
          },
        ],
      },
      {
        id: 'aero',
        label: 'Aéro & Détails',
        desc: 'Becquet, diffuseur, bas de caisse, rétroviseurs carbone, badges',
        image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400&h=300&fit=crop', // rear spoiler wing on sport car
        options: [
          {
            id: 'becquet',
            label: 'Becquet Arrière',
            desc: 'Carbone/ABS, appui aérodynamique, montage usine',
            image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=600&h=400&fit=crop', // carbon fiber rear spoiler wing on sports car trunk
            features: ['Appui réel', 'Montage OEM', 'Carbone/ABS'],
          },
          {
            id: 'diffuseur',
            label: 'Diffuseur Arrière',
            desc: 'Carbone, canaux Venturi, look piste',
            image: 'https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?w=600&h=400&fit=crop', // carbon fiber rear diffuser with venturi channels under bumper
            features: ['Venturi', 'Carbone', 'Flux optimisé'],
          },
          {
            id: 'retroviseurs-carbone',
            label: 'Rétroviseurs Carbone',
            desc: 'Coques carbone véritable, rabattables électriques',
            image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&h=400&fit=crop', // carbon fiber mirror cap/cover on car side mirror
            features: ['Carbone vrai', 'Électriques', 'Chauffants'],
          },
        ],
      },
    ],
    heroImage: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1280&h=720&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=300&fit=crop', // coilover suspension kit adjustable installed on car
        options: [
          {
            id: 'combinés-filetés',
            label: 'Combinés Filetés',
            desc: 'Hauteur/roulis/amortissement réglables, 30 clics',
            image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&h=400&fit=crop', // coilover threaded suspension shock absorber spring assembly
            features: ['30 clics', 'Hauteur variable', 'Piste/Route'],
          },
          {
            id: 'suspension-pneumatique',
            label: 'Suspension Pneumatique',
            desc: '4 coussins air, gestion électronique, 5 modes',
            image: 'https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=600&h=400&fit=crop', // air bag suspension airbag on car corner with compressor
            features: ['5 modes', 'Auto-nivellement', 'Confort max'],
          },
          {
            id: 'amortisseurs-pilotés',
            label: 'Amortisseurs Pilotés',
            desc: 'CDC (Continuous Damping Control), OEM+',
            image: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?w=600&h=400&fit=crop', // electronic adjustable shock absorber damper with solenoid valve
            features: ['Temps réel', 'Modes Confort/Sport', 'Intégration OEM'],
          },
          {
            id: 'rehausse-4x4',
            label: 'Kit Réhausse 4x4 (+50mm)',
            desc: 'Ressorts/amortisseurs renforcés, garde au sol +50mm',
            image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop', // lifted 4x4 truck with large suspension lift kit and off-road wheels
            features: ['+50mm', 'Renforcé', 'Homologué'],
          },
        ],
      },
      {
        id: 'freinage',
        label: 'Freinage',
        desc: 'Disques percés/rainurés, étriers 4/6 pistons, plaquettes céramique',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', // big brake kit with caliper and disc rotor on car wheel
        options: [
          {
            id: 'freins-avant-4p',
            label: 'Kit Étriers 4 Pistons Avant',
            desc: 'Étriers alu forgé, disques 330mm percés, plaquettes céramique',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop', // 4-piston brake caliper with drilled vented disc rotor
            features: ['4 pistons', '330mm', 'Plaquettes céramique'],
          },
          {
            id: 'freins-6p',
            label: 'Kit Étriers 6 Pistons Avant/Arrière',
            desc: 'Étriers monobloc 6P, disques 355/330mm, racing',
            image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&h=400&fit=crop', // 6-piston monoblock racing brake caliper large disc
            features: ['6 pistons', '355/330mm', 'Endurance'],
          },
          {
            id: 'plaquettes-ceramique',
            label: 'Plaquettes Céramique (4 roues)',
            desc: 'Poussière quasi nulle, froid/chaud constant, silence',
            image: 'https://images.unsplash.com/photo-1606577924006-27d39b132c2a?w=600&h=400&fit=crop', // ceramic brake pad close-up with friction compound visible
            features: ['Zéro poussière', 'Constant', 'Silencieux'],
          },
        ],
      },
      {
        id: 'moteur',
        label: 'Moteur & Échappement',
        desc: 'Reprog Stage 1/2, admission directe, ligne inox, valve active',
        image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop', // performance car engine bay with intake and turbo visible
        options: [
          {
            id: 'stage1',
            label: 'Reprogrammation Stage 1',
            desc: 'Optimisation carto usine, +20-30% couple/puissance',
            image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop', // laptop with ECU tuning software connected to car OBD port
            features: ['+20-30%', 'Carte sur-mesure', 'Réversible'],
          },
          {
            id: 'stage2',
            label: 'Stage 2 (Admission + Echappement + Carto)',
            desc: 'Admission carbone + ligne inox 3" + carto dédiée',
            image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop', // modified engine bay with carbon intake cold air intake pipe and turbo
            features: ['Pack complet', '+40-60%', 'Son sport'],
          },
          {
            id: 'ligne-inox',
            label: 'Ligne Échappement Inox 304',
            desc: 'Catalyseur sport 200cpi + silencieux valve active',
            image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=600&h=400&fit=crop', // stainless steel exhaust system pipes under car with muffler
            features: ['Valve active', 'Inox 304', 'Homologuée'],
          },
          {
            id: 'admission-carbone',
            label: 'Admission Directe Carbone',
            desc: 'Boîte air carbone, filtre sport, son admission',
            image: 'https://images.unsplash.com/photo-1617654112368-307921291f42?w=600&h=400&fit=crop', // carbon fiber cold air intake box installed in engine bay
            features: ['Carbone', 'Débit +40%', 'Son sport'],
          },
        ],
      },
      {
        id: 'chassis',
        label: 'Châssis & Direction',
        desc: 'Barres anti-rapprochement, renforts, direction assistée variable',
        image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400&h=300&fit=crop', // underbody chassis brace strut bar on sports car
        options: [
          {
            id: 'barre-av',
            label: 'Barre Anti-Rapprochement Avant',
            desc: 'Alu forgé, rigidité train avant +15%',
            image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=600&h=400&fit=crop', // front strut tower brace bar in engine bay aluminum
            features: ['+15% rigidité', 'Alu forgé', 'Boulons ARP'],
          },
          {
            id: 'barre-ar',
            label: 'Barre Anti-Rapprochement Arrière',
            desc: 'Acier/Alu, rigidité train arrière, passage coffre',
            image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&h=400&fit=crop', // rear strut brace bar in car trunk/boot through chassis
            features: ['Rigidité AR', 'Passage coffre', 'Réglable'],
          },
          {
            id: 'renforts-chassis',
            label: 'Renforts Châssis (Sous-caisse)',
            desc: 'Triangulation complète, soudure/bolt-on, piste',
            image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop', // underbody chassis reinforcement triangulated brace bars under car
            features: ['Triangulation', 'Bolt-on', 'Rigidité +25%'],
          },
          {
            id: 'direction-variable',
            label: 'Direction Assistée Variable',
            desc: 'Ratio variable, effort réduit ville, précis route',
            image: 'https://images.unsplash.com/photo-1571607388263-1044f9ea01dd?w=600&h=400&fit=crop', // electric power steering rack variable ratio mechanism close-up
            features: ['Ratio variable', 'Ville/Route', 'Sécurité'],
          },
        ],
      },
    ],
    heroImage: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1280&h=720&fit=crop',
  },
];

export const AMBIANCE_OPTIONS = [
  {
    id: 'bois-cedre',
    label: 'Bois de Cèdre',
    desc: 'Chaleureux, naturel, apaisant',
    color: '#8B5E3C',
    image: 'https://images.unsplash.com/photo-1548094891-c4ba474efd16?w=400&h=300&fit=crop', // cedar wood texture close-up warm brown
    scentNotes: 'Cèdre, santal, vanille',
  },
  {
    id: 'cuir-neuf',
    label: 'Cuir Neuf',
    desc: 'Premium, sportif, élégant',
    color: '#1A1A2E',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop', // smooth dark leather texture close-up
    scentNotes: 'Cuir, tabac, ambre',
  },
  {
    id: 'ozone-pur',
    label: 'Ozone Pur',
    desc: 'Frais, propre, moderne',
    color: '#00D4FF',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', // fresh ocean air wave sea spray blue clean
    scentNotes: 'Ozone, marine, coton',
  },
  {
    id: 'agrumes-vifs',
    label: 'Agrumes Vifs',
    desc: 'Énergisant, joyeux, vif',
    color: '#F59E0B',
    image: 'https://images.unsplash.com/photo-1511689660979-10d2b1aada49?w=400&h=300&fit=crop', // sliced citrus lemon lime orange bergamote vibrant
    scentNotes: 'Bergamote, citron vert, néroli',
  },
  {
    id: 'foret-dense',
    label: 'Forêt Dense',
    desc: 'Profond, masculin, ancré',
    color: '#065F46',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=300&fit=crop', // dark dense forest pine trees moss atmospheric
    scentNotes: 'Pin, mousse, vétiver',
  },
  {
    id: 'vanille-douce',
    label: 'Vanille Douce',
    desc: 'Confortable, doux, enveloppant',
    color: '#F3E8D0',
    image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=400&h=300&fit=crop', // vanilla pods and cream warm soft tones
    scentNotes: 'Vanille, fève tonka, benjoin',
  },
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
    cat.subItems.map(item => ({
      ...item,
      categoryId: cat.id,
      categoryLabel: cat.label,
      categoryColor: cat.color,
    }))
  );
}
