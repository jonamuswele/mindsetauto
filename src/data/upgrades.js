import img1 from '../assets/aero et details.jfif'
import img2 from '../assets/chassis et direction.jfif'
import img3 from '../assets/moteur et echappement.jfif'
import img4 from '../assets/freinage.jfif'
import img5 from '../assets/suspension.jfif'
import img6 from '../assets/eclairage led.jfif'
import img7 from '../assets/jantes et pneus.jfif'
import img8 from '../assets/peinture et protection.jfif'
import img9 from '../assets/insonorisation.jfif'
import img10 from '../assets/connectivite.jfif'
import img11 from '../assets/amplification et dep.jfif'
import img12 from '../assets/haut parleur.jfif'
import img13 from '../assets/parfum et ambiance.jfif'
import img14 from '../assets/volant & pommeau.jfif'
import img15 from '../assets/tapis & moquettes.jfif'
import img16 from '../assets/tableau de bord.jfif'
import img17 from '../assets/seat&hausse.jfif'

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
        // beige leather car seats interior
        image: img17,
        options: [
          {
            id: 'cuir-nappa',
            label: 'Cuir Nappa',
            desc: 'Cuir pleine fleur premium, grain fin, toucher doux',
            // tan/beige nappa leather seat stitching close-up
            image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&h=400&fit=crop',
            features: ['Haut de gamme', 'Durable', 'Entretien facile'],
          },
          {
            id: 'cuir-alcantara',
            label: 'Cuir + Alcantara',
            desc: 'Assises Alcantara, contours cuir, look sport',
            // black sport bucket seats alcantara suede
            image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=400&fit=crop',
            features: ['Sportif', 'Respirant', 'Maintien latéral'],
          },
          {
            id: 'tissu-tech',
            label: 'Tissu Technique',
            desc: 'Tissu haute résistance, lavable, anti-taches',
            // grey technical fabric seat texture
            image: 'https://images.unsplash.com/photo-1555652736-e92021d28a10?w=600&h=400&fit=crop',
            features: ['Budget maîtrisé', 'Lavable', 'Résistant'],
          },
          {
            id: 'sieges-chauffants',
            label: 'Sièges Chauffants/Ventilés',
            desc: 'Intégration chauffage 3 niveaux + ventilation',
            // seat heating ventilation buttons on center console
            image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e7a1?w=600&h=400&fit=crop',
            features: ['Confort 4 saisons', '3 niveaux', 'Commandes intégrées'],
          },
        ],
      },
      {
        id: 'tableau',
        label: 'Tableau de bord',
        desc: 'Écrans intégrés, inserts carbone/bois, éclairage d\'ambiance programmable',
        // large infotainment screen in dashboard
        image: img16,
        options: [
          {
            id: 'ecran-12',
            label: 'Écran 12.3" Intégré',
            desc: 'Écran tactile capacitif, interface moderne',
            // big touchscreen infotainment display in car
            image: 'https://images.unsplash.com/photo-1551703599-6b3e8379aa8c?w=600&h=400&fit=crop',
            features: ['CarPlay/Android Auto', 'Navigation GPS', 'Caméra recul'],
          },
          {
            id: 'inserts-carbone',
            label: 'Inserts Carbone/Bois',
            desc: 'Plaquages véritable carbone ou bois noble',
            // carbon fiber weave trim panel dashboard close-up
            image: 'https://images.unsplash.com/photo-1611016186353-9af58c69a533?w=600&h=400&fit=crop',
            features: ['Sur-mesure', 'Finitions main', 'Look premium'],
          },
          {
            id: 'eclairage-ambiance',
            label: 'Éclairage Ambiance RGB',
            desc: 'Bandes LED programmables 64 couleurs',
            // car interior glowing blue/purple ambient LED strip lighting
            image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&h=400&fit=crop',
            features: ['64 couleurs', 'Sync musique', 'App mobile'],
          },
          {
            id: 'combiné-numérique',
            label: 'Combiné Numérique 10.25"',
            desc: 'Remplace compteurs analogiques, 3 thèmes',
            // full digital instrument cluster LCD display
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
            features: ['3 thèmes', 'Navigation', 'Assistance conduite'],
          },
        ],
      },
      {
        id: 'tapis',
        label: 'Tapis & Moquettes',
        desc: 'Sur-mesure, lavables, aluminium, caoutchouc 3D, isolation phonique',
        // rubber 3D floor mat with raised edges
        image: img15,
        options: [
          {
            id: 'tapis-3d',
            label: 'Tapis 3D Caoutchouc',
            desc: 'Bords hauts, forme exacte véhicule, lavable au jet',
            // black rubber 3D molded car floor mat with high edges
            image: 'https://images.unsplash.com/photo-1597007066704-67bf2068d5b2?w=600&h=400&fit=crop',
            features: ['Sur-mesure', 'Lavable jet', 'Bords 3cm'],
          },
          {
            id: 'moquette-premium',
            label: 'Moquette Premium',
            desc: 'Moquette aiguilletée haute densité, sur-mesure',
            // plush premium carpet velvet flooring close-up
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
            features: ['Confort', 'Isolation phonique', 'Coloris au choix'],
          },
          {
            id: 'tapis-alu',
            label: 'Tapis Aluminium',
            desc: 'Plaques alu brossé, clips invisibles, look course',
            // brushed aluminum metal floor plate footrest
            image: 'https://images.unsplash.com/photo-1504215680048-db15dd05967b?w=600&h=400&fit=crop',
            features: ['Look sport', 'Inusable', 'Fixation invisible'],
          },
          {
            id: 'isolation-phonique',
            label: 'Isolation Phonique Plancher',
            desc: 'Couche butyle + mousse sous moquette/tapis',
            // dynamat butyl sound deadening sheet material
            image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&h=400&fit=crop',
            features: ['-6 à -10 dB', 'Thermique aussi', 'Invisible'],
          },
        ],
      },
      {
        id: 'volant',
        label: 'Volant & Pommeau',
        desc: 'Cuir perforé, carbone, bois, palettes, chauffant',
        // steering wheel close-up
        image: img14,
        options: [
          {
            id: 'volant-cuir',
            label: 'Volant Cuir Perforé',
            desc: 'Reprise cuir perforé, surpiqûres contrastées',
            // perforated leather steering wheel with colored stitching
            image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&h=400&fit=crop',
            features: ['Grip optimal', 'Surpiqûres choix', 'Maintien airbag'],
          },
          {
            id: 'volant-carbone',
            label: 'Volant Carbone/Alcantara',
            desc: 'Branches carbone, prises Alcantara, palettes alu',
            // carbon fiber sport steering wheel with paddle shifters
            image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop',
            features: ['Ultra-léger', 'Palettes alu', 'Look course'],
          },
          {
            id: 'volant-bois',
            label: 'Volant Bois/Cuir',
            desc: 'Couronne bois noble, cuir lisse, finition satinée',
            // classic wooden rim steering wheel vintage
            image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=600&h=400&fit=crop',
            features: ['Classique', 'Bois noble', 'Chaleureux'],
          },
          {
            id: 'volant-chauffant',
            label: 'Volant Chauffant',
            desc: 'Intégration résistance, commande au voyant',
            // steering wheel with heating symbol button
            image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=600&h=400&fit=crop',
            features: ['Chauffe 3 min', 'Thermo-régulé', 'Commande OEM'],
          },
        ],
      },
      {
        id: 'ambiance',
        label: 'Parfum & Ambiance',
        desc: 'Diffuseurs, ioniseurs, senteurs signature',
        // car vent air freshener clip
        image: img13,
        options: [
          {
            id: 'diffuseur-hv',
            label: 'Diffuseur Ventilation',
            desc: 'Clip sur grille aération, recharge 60 jours',
            // clip-on car vent air freshener diffuser
            image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&h=400&fit=crop',
            features: ['Invisible', '60 jours', 'Intensité réglable'],
          },
          {
            id: 'ioniseur',
            label: 'Ioniseur Purificateur',
            desc: 'Branchement 12V, élimine odeurs/bactéries',
            // small compact air purifier ionizer device
            image: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=600&h=400&fit=crop',
            features: ['Sans recharge', 'Purifie air', 'Silencieux'],
          },
          {
            id: 'parfum-signature',
            label: 'Parfum Signature (lot 3)',
            desc: '3 flacons 10ml : Cuir, Cèdre, Agrumes',
            // three glass perfume fragrance bottles
            image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=600&h=400&fit=crop',
            features: ['3 senteurs', 'Qualité parfumerie', 'Rechargeable'],
          },
        ],
      },
    ],
    heroImage: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1280&h=720&fit=crop',
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
        // car speaker cone close-up
        image: img12,
        options: [
          {
            id: 'hp-coaxiaux',
            label: 'Kit Coaxiaux 2 Voies',
            desc: 'Remplacement direct HP avant/arrière, 60W RMS',
            // coaxial car speaker cone woofer close-up
            image: 'https://images.unsplash.com/photo-1558389157-e4bfa5dc3e81?w=600&h=400&fit=crop',
            features: ['Plug & play', '60W RMS', 'Qualité OEM+'],
          },
          {
            id: 'hp-composants',
            label: 'Kit Composants 2 Voies',
            desc: 'Tweeters + médiums séparés, crossover, 80W RMS',
            // component speaker set tweeter + woofer + crossover
            image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&h=400&fit=crop',
            features: ['Scène large', 'Tweeters orientables', '80W RMS'],
          },
          {
            id: 'hp-3voies',
            label: 'Kit Composants 3 Voies',
            desc: 'Médiums dédiés + tweeters + graves, 120W RMS',
            // 3-way speaker set with separate mid driver
            image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=600&h=400&fit=crop',
            features: ['Studio quality', 'Médiums clairs', '120W RMS'],
          },
          {
            id: 'subwoofer-sous-siege',
            label: 'Subwoofer Sous-Siège',
            desc: 'Caisson plat 20cm, ampli intégré 150W, invisible',
            // flat slim powered subwoofer designed to fit under seat
            image: 'https://images.unsplash.com/photo-1608155686393-8fdd966d784d?w=600&h=400&fit=crop',
            features: ['Invisible', '150W', 'Bass boost'],
          },
        ],
      },
      {
        id: 'amplification',
        label: 'Amplification & DSP',
        desc: 'Ampli classe D, processeur DSP, tuning acoustique cabine',
        // car amplifier with heatsink fins
        image: img11,
        options: [
          {
            id: 'ampli-4canaux',
            label: 'Ampli 4 Canaux Classe D',
            desc: '4x75W RMS, compact, rendement 90%',
            // compact class D 4-channel amplifier with aluminium heatsink
            image: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?w=600&h=400&fit=crop',
            features: ['4x75W', 'Ultra-compact', 'Faible chauffe'],
          },
          {
            id: 'dsp-8canaux',
            label: 'DSP 8 Canaux',
            desc: 'Processeur temps/phase/ÉQ, mesure micro incluse',
            // DSP digital signal processor audio unit with multiple outputs
            image: 'https://images.unsplash.com/photo-1599837565318-67429bde7162?w=600&h=400&fit=crop',
            features: ['Auto-EQ', 'Alignement temporel', '8 sorties'],
          },
          {
            id: 'pack-ampli-dsp',
            label: 'Pack Ampli + DSP',
            desc: 'Ampli 6 canaux + DSP 10 canaux, calibré véhicule',
            // car audio system installation trunk with amp and processor
            image: 'https://images.unsplash.com/photo-1557463311-64c8d5a8df2d?w=600&h=400&fit=crop',
            features: ['Clé en main', 'Calibré VEHICULE', 'Garantie 2 ans'],
          },
        ],
      },
      {
        id: 'connectivite',
        label: 'Connectivité',
        desc: 'CarPlay/Android Auto sans fil, DAC haut de gamme, chargeur induction',
        // Apple CarPlay interface on screen
        image: img10,
        options: [
          {
            id: 'carplay-wireless',
            label: 'CarPlay/Android Auto Sans Fil',
            desc: 'Adaptateur OEM, connexion auto, zéro latence',
            // CarPlay navigation map on car touchscreen
            image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600&h=400&fit=crop',
            features: ['Sans fil', 'Auto-connect', 'Mise à jour OTA'],
          },
          {
            id: 'dac-premium',
            label: 'DAC Haut de Gamme',
            desc: 'Convertisseur 32-bit/384kHz, sortie RCA/XLR',
            // high-end audio DAC converter device with RCA connections
            image: 'https://images.unsplash.com/photo-1507149833265-60c372daea22?w=600&h=400&fit=crop',
            features: ['32-bit', 'Sortie symétrique', 'Horloge femto'],
          },
          {
            id: 'charge-induction',
            label: 'Chargeur Induction Intégré',
            desc: '15W rapide, découpe console, ventilation active',
            // wireless charging pad in car center console with phone
            image: 'https://images.unsplash.com/photo-1622445262465-2481c8573226?w=600&h=400&fit=crop',
            features: ['15W', 'Refroidi', 'OEM look'],
          },
        ],
      },
      {
        id: 'insonorisation',
        label: 'Insonorisation',
        desc: 'Portières, plancher, toit, pare-brise acoustique, mousse expansée',
        // butyl sound deadening sheet being applied
        image: img9,
        options: [
          {
            id: 'insonor-portières',
            label: 'Portières (4)',
            desc: 'Butyle + mousse 3 couches, hauts-parleurs étanches',
            // sound deadening dynamat installed inside door skin
            image: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=600&h=400&fit=crop',
            features: ['-5 dB', 'Bass response', 'Étanchéité HP'],
          },
          {
            id: 'insonor-plancher',
            label: 'Plancher Complet',
            desc: 'Butyle 2mm + mousse 10mm, sous moquette',
            // butyl mat + foam sheet applied to car floor pan
            image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&h=400&fit=crop',
            features: ['-8 dB', 'Thermique', 'Anti-vibrations'],
          },
          {
            id: 'pack-total',
            label: 'Pack Total (Portières+Plancher+Toit+Coffre)',
            desc: 'Traitement complet, pare-brise acoustique inclus',
            // complete car sound deadening full treatment interior stripped
            image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop',
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
        // ceramic coating water beading on paint surface
        image: img8,
        options: [
          {
            id: 'ceramic',
            label: 'Traitement Céramique 9H',
            desc: 'Protection 3-5 ans, hydrophobe, brillance miroir',
            // water beading hydrophobic effect on ceramic coated paint
            image: 'https://images.unsplash.com/photo-1607603750909-408e19385117?w=600&h=400&fit=crop',
            features: ['3-5 ans', 'Auto-nettoyant', 'UV resistant'],
          },
          {
            id: 'ppf',
            label: 'Film PPF (Paint Protection Film)',
            desc: 'Auto-réparant, invisible, avant complet + zones risque',
            // PPF clear film being applied to car hood with squeegee
            image: 'https://images.unsplash.com/photo-1613214149874-4f53673d67f3?w=600&h=400&fit=crop',
            features: ['Auto-réparant', '10 ans', 'Invisible'],
          },
          {
            id: 'covering-mat',
            label: 'Covering Mat/Satin/Brillant',
            desc: 'Film teinté, réversible, 200+ coloris',
            // matte vinyl wrap film application with heat gun squeegee
            image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=600&h=400&fit=crop',
            features: ['Réversible', '200+ teintes', 'Protection peinture'],
          },
          {
            id: 'peinture-personnalisée',
            label: 'Peinture Personnalisée',
            desc: 'Teinte unique, paillettes, chameleon, perlé',
            // paint spray gun spraying custom color in paint booth
            image: 'https://images.unsplash.com/photo-1596731902462-8db1724e7041?w=600&h=400&fit=crop',
            features: ['Unique', 'Qualité usine', 'Certifié'],
          },
        ],
      },
      {
        id: 'jantes',
        label: 'Jantes & Pneus',
        desc: 'Forgées, flow-form, profils sport/confort, TPMS intégré',
        // alloy wheel rim close-up detail
        image: img7,
        options: [
          {
            id: 'jantes-forgées',
            label: 'Jantes Forgées 18-20"',
            desc: 'Monobloc forgé, -30% poids, sur-mesure',
            // forged monoblock alloy wheel deep concave dish
            image: 'https://images.unsplash.com/photo-1568844401968-b7cdb0b64b16?w=600&h=400&fit=crop',
            features: ['Ultra-légères', 'Sur-mesure', 'Garantie vie'],
          },
          {
            id: 'jantes-flowform',
            label: 'Jantes Flow-Form 17-19"',
            desc: 'Technologie hybride, -20% poids, meilleur rapport',
            // flow-form alloy wheel multi-spoke design
            image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&h=400&fit=crop',
            features: ['Légères', 'Rapport qualité/prix', 'Homologuées'],
          },
          {
            id: 'pneus-sport',
            label: 'Pneus Sport/Confort',
            desc: 'Michelin PS5 / Pilot Sport 4 / Primacy 4+',
            // performance tire tread pattern close-up on rim
            image: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=600&h=400&fit=crop',
            features: ['Grip/Confort', 'Silencieux', 'Longévité'],
          },
        ],
      },
      {
        id: 'eclairage',
        label: 'Éclairage LED',
        desc: 'Projecteurs matrix, signature lumineuse, feux diurnes, antibrouillard',
        // LED headlight unit close-up
        image: img6,
        options: [
          {
            id: 'led-matrix',
            label: 'Projecteurs Matrix LED',
            desc: 'Faisceau adaptatif, anti-éblouissement auto',
            // matrix LED headlight module projector unit close-up
            image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&h=400&fit=crop',
            features: ['Adaptatif', 'Auto high-beam', 'Portée 600m'],
          },
          {
            id: 'signature-lumineuse',
            label: 'Signature Lumineuse',
            desc: 'Bandes LED avant/arrière, démarrage animé',
            // LED DRL daytime running light strip front close-up
            image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&h=400&fit=crop',
            features: ['Animée', 'Personnalisable', 'Homologuée'],
          },
          {
            id: 'antibrouillard-led',
            label: 'Antibrouillard LED',
            desc: 'Jaune sélectif 3000K, découpe pare-choc',
            // yellow LED fog light in bumper close-up
            image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&h=400&fit=crop',
            features: ['3000K', 'Pénètre brouillard', 'Look moderne'],
          },
        ],
      },
      {
        id: 'aero',
        label: 'Aéro & Détails',
        desc: 'Becquet, diffuseur, bas de caisse, rétroviseurs carbone, badges',
        // carbon fiber rear spoiler close-up
        image: img1,
        options: [
          {
            id: 'becquet',
            label: 'Becquet Arrière',
            desc: 'Carbone/ABS, appui aérodynamique, montage usine',
            // carbon fiber trunk spoiler wing close-up detail
            image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=600&h=400&fit=crop',
            features: ['Appui réel', 'Montage OEM', 'Carbone/ABS'],
          },
          {
            id: 'diffuseur',
            label: 'Diffuseur Arrière',
            desc: 'Carbone, canaux Venturi, look piste',
            // carbon rear diffuser with venturi fins under bumper
            image: 'https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?w=600&h=400&fit=crop',
            features: ['Venturi', 'Carbone', 'Flux optimisé'],
          },
          {
            id: 'retroviseurs-carbone',
            label: 'Rétroviseurs Carbone',
            desc: 'Coques carbone véritable, rabattables électriques',
            // carbon fiber mirror cap cover on side mirror
            image: 'https://images.unsplash.com/photo-1611016186353-9af58c69a533?w=600&h=400&fit=crop',
            features: ['Carbone vrai', 'Électriques', 'Chauffants'],
          },
        ],
      },
    ],
    heroImage: 'https://images.unsplash.com/photo-1607603750909-408e19385117?w=1280&h=720&fit=crop',
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
        // coilover shock absorber spring assembly
        image: img5,
        options: [
          {
            id: 'combinés-filetés',
            label: 'Combinés Filetés',
            desc: 'Hauteur/roulis/amortissement réglables, 30 clics',
            // threaded coilover shock + spring assembly on workbench
            image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&h=400&fit=crop',
            features: ['30 clics', 'Hauteur variable', 'Piste/Route'],
          },
          {
            id: 'suspension-pneumatique',
            label: 'Suspension Pneumatique',
            desc: '4 coussins air, gestion électronique, 5 modes',
            // air suspension bag/bellows at wheel corner with manifold
            image: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?w=600&h=400&fit=crop',
            features: ['5 modes', 'Auto-nivellement', 'Confort max'],
          },
          {
            id: 'amortisseurs-pilotés',
            label: 'Amortisseurs Pilotés',
            desc: 'CDC (Continuous Damping Control), OEM+',
            // electronic adjustable damper with solenoid valve close-up
            image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&h=400&fit=crop',
            features: ['Temps réel', 'Modes Confort/Sport', 'Intégration OEM'],
          },
          {
            id: 'rehausse-4x4',
            label: 'Kit Réhausse 4x4 (+50mm)',
            desc: 'Ressorts/amortisseurs renforcés, garde au sol +50mm',
            // 4x4 suspension spacer lift kit components on bench
            image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop',
            features: ['+50mm', 'Renforcé', 'Homologué'],
          },
        ],
      },
      {
        id: 'freinage',
        label: 'Freinage',
        desc: 'Disques percés/rainurés, étriers 4/6 pistons, plaquettes céramique',
        // big brake kit caliper and disc rotor
        image: img4,
        options: [
          {
            id: 'freins-avant-4p',
            label: 'Kit Étriers 4 Pistons Avant',
            desc: 'Étriers alu forgé, disques 330mm percés, plaquettes céramique',
            // 4-piston brake caliper forged aluminium with drilled disc
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
            features: ['4 pistons', '330mm', 'Plaquettes céramique'],
          },
          {
            id: 'freins-6p',
            label: 'Kit Étriers 6 Pistons Avant/Arrière',
            desc: 'Étriers monobloc 6P, disques 355/330mm, racing',
            // 6-piston monoblock racing caliper with large slotted disc
            image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&h=400&fit=crop',
            features: ['6 pistons', '355/330mm', 'Endurance'],
          },
          {
            id: 'plaquettes-ceramique',
            label: 'Plaquettes Céramique (4 roues)',
            desc: 'Poussière quasi nulle, froid/chaud constant, silence',
            // ceramic brake pad friction material compound close-up
            image: 'https://images.unsplash.com/photo-1606577924006-27d39b132c2a?w=600&h=400&fit=crop',
            features: ['Zéro poussière', 'Constant', 'Silencieux'],
          },
        ],
      },
      {
        id: 'moteur',
        label: 'Moteur & Échappement',
        desc: 'Reprog Stage 1/2, admission directe, ligne inox, valve active',
        // performance engine bay intake turbo
        image: img3,
        options: [
          {
            id: 'stage1',
            label: 'Reprogrammation Stage 1',
            desc: 'Optimisation carto usine, +20-30% couple/puissance',
            // laptop with tuning software connected to car OBD port
            image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop',
            features: ['+20-30%', 'Carte sur-mesure', 'Réversible'],
          },
          {
            id: 'stage2',
            label: 'Stage 2 (Admission + Echappement + Carto)',
            desc: 'Admission carbone + ligne inox 3" + carto dédiée',
            // modified engine bay with carbon intake and turbo visible
            image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop',
            features: ['Pack complet', '+40-60%', 'Son sport'],
          },
          {
            id: 'ligne-inox',
            label: 'Ligne Échappement Inox 304',
            desc: 'Catalyseur sport 200cpi + silencieux valve active',
            // stainless steel exhaust pipe system muffler undercar
            image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=600&h=400&fit=crop',
            features: ['Valve active', 'Inox 304', 'Homologuée'],
          },
          {
            id: 'admission-carbone',
            label: 'Admission Directe Carbone',
            desc: 'Boîte air carbone, filtre sport, son admission',
            // carbon fiber cold air intake airbox installed in engine bay
            image: 'https://images.unsplash.com/photo-1617654112368-307921291f42?w=600&h=400&fit=crop',
            features: ['Carbone', 'Débit +40%', 'Son sport'],
          },
        ],
      },
      {
        id: 'chassis',
        label: 'Châssis & Direction',
        desc: 'Barres anti-rapprochement, renforts, direction assistée variable',
        // strut tower brace bar in engine bay
        image: img2,
        options: [
          {
            id: 'barre-av',
            label: 'Barre Anti-Rapprochement Avant',
            desc: 'Alu forgé, rigidité train avant +15%',
            // aluminium front strut tower bar brace spanning engine bay
            image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=600&h=400&fit=crop',
            features: ['+15% rigidité', 'Alu forgé', 'Boulons ARP'],
          },
          {
            id: 'barre-ar',
            label: 'Barre Anti-Rapprochement Arrière',
            desc: 'Acier/Alu, rigidité train arrière, passage coffre',
            // rear strut brace bar in boot/trunk connecting towers
            image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&h=400&fit=crop',
            features: ['Rigidité AR', 'Passage coffre', 'Réglable'],
          },
          {
            id: 'renforts-chassis',
            label: 'Renforts Châssis (Sous-caisse)',
            desc: 'Triangulation complète, soudure/bolt-on, piste',
            // underbody chassis reinforcement brace triangulation under car
            image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop',
            features: ['Triangulation', 'Bolt-on', 'Rigidité +25%'],
          },
          {
            id: 'direction-variable',
            label: 'Direction Assistée Variable',
            desc: 'Ratio variable, effort réduit ville, précis route',
            // electric power steering rack mechanism close-up
            image: 'https://images.unsplash.com/photo-1571607388263-1044f9ea01dd?w=600&h=400&fit=crop',
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
    // cedar wood grain texture close-up warm brown
    image: 'https://images.unsplash.com/photo-1548094891-c4ba474efd16?w=400&h=300&fit=crop',
    scentNotes: 'Cèdre, santal, vanille',
  },
  {
    id: 'cuir-neuf',
    label: 'Cuir Neuf',
    desc: 'Premium, sportif, élégant',
    color: '#1A1A2E',
    // dark smooth leather texture close-up
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop',
    scentNotes: 'Cuir, tabac, ambre',
  },
  {
    id: 'ozone-pur',
    label: 'Ozone Pur',
    desc: 'Frais, propre, moderne',
    color: '#00D4FF',
    // ocean sea spray blue sky fresh air
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    scentNotes: 'Ozone, marine, coton',
  },
  {
    id: 'agrumes-vifs',
    label: 'Agrumes Vifs',
    desc: 'Énergisant, joyeux, vif',
    color: '#F59E0B',
    // sliced citrus lemon lime orange bergamot vibrant
    image: 'https://images.unsplash.com/photo-1511689660979-10d2b1aada49?w=400&h=300&fit=crop',
    scentNotes: 'Bergamote, citron vert, néroli',
  },
  {
    id: 'foret-dense',
    label: 'Forêt Dense',
    desc: 'Profond, masculin, ancré',
    color: '#065F46',
    // dense dark pine forest atmospheric green
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=300&fit=crop',
    scentNotes: 'Pin, mousse, vétiver',
  },
  {
    id: 'vanille-douce',
    label: 'Vanille Douce',
    desc: 'Confortable, doux, enveloppant',
    color: '#F3E8D0',
    // vanilla pods cream warm soft tones close-up
    image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=400&h=300&fit=crop',
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
