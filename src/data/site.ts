/**
 * Tout le contenu du site vit ici : les sections lisent ces données,
 * donc changer un numéro, un lien ou un projet ne touche aucun composant.
 */

export const entreprise = {
  nom: 'HAPPOTECH',
  slogan: 'Vos idées, nos solutions digitales',
  logo: '/brand/logo-happotech.jpg',
  monogramme: '/brand/happotech-mark.png',
} as const;

export const navigation = [
  { id: 'services', label: 'Services' },
  { id: 'projets', label: 'Projets' },
  { id: 'a-propos', label: 'À propos' },
  { id: 'methode', label: 'Méthode' },
] as const;

/** Une seule formule pour l'intention « nous contacter », partout sur la page. */
export const ctaContact = 'Démarrer un projet';

export type Associe = {
  nom: string;
  prenom: string; // prénom d'usage, celui qu'on emploie dans les textes et les boutons
  initiales: string;
  role: string;
  telephone: string; // format affiché
  whatsapp: string; // indicatif + numéro, chiffres uniquement (lien wa.me)
};

export const associes: Associe[] = [
  {
    nom: 'Mohamed Faye',
    prenom: 'Mohamed',
    initiales: 'MF',
    role: 'Co-fondateur',
    telephone: '+221 78 525 99 28',
    whatsapp: '221785259928',
  },
  {
    nom: 'Mouhamadou Moustapha Gueye',
    prenom: 'Moustapha',
    initiales: 'MG',
    role: 'Co-fondateur',
    telephone: '+221 75 502 91 48',
    whatsapp: '221755029148',
  },
];

export const contact = {
  email: 'happotech1@gmail.com',
  linkedin: '', // à compléter : lien LinkedIn
  github: 'https://github.com/HAPPOTECH',
  messageWhatsApp: "Bonjour HAPPOTECH, j'ai un projet à vous présenter.",
} as const;

export const lienWhatsApp = (numero: string) =>
  `https://wa.me/${numero}?text=${encodeURIComponent(contact.messageWhatsApp)}`;

export type Service = {
  id: string;
  titre: string;
  texte: string;
  tags: string[];
  image?: string;
  alt?: string;
};

export const services: Service[] = [
  {
    id: 'full-stack',
    titre: 'Applications sur mesure',
    texte:
      'Un outil pensé pour votre métier, avec son back-end, ses comptes et ses données. Rendez-vous, commandes, gestion interne.',
    tags: ['Full-stack', 'Espaces sécurisés', 'Base de données'],
    image: '/projets/mamefary-rendez-vous.webp',
    alt: 'Formulaire de demande de rendez-vous en ligne du Cabinet dentaire Mame Fary',
  },
  {
    id: 'e-commerce',
    titre: 'Boutiques en ligne',
    texte: 'Catalogue, panier et commandes, avec un espace pour gérer vos produits.',
    tags: ['E-commerce', 'Catalogue', 'Commandes'],
    image: '/projets/amsa-fiche-produit.webp',
    alt: 'Fiche produit Amsa Shop sur téléphone : photo, prix et choix de la taille',
  },
  {
    id: 'landing',
    titre: 'Landing pages',
    texte: 'Une page qui présente une offre et pousse à passer à l’action.',
    tags: ['Conversion', 'Campagnes'],
  },
  {
    id: 'vitrine',
    titre: 'Sites d’entreprise',
    texte: 'Votre activité, vos offres et vos contacts, présentés avec soin.',
    tags: ['Site vitrine', 'Devis', 'WhatsApp'],
    image: '/projets/ngouda-evenements.webp',
    alt: "Section Événements de prestige du site de N'Gouda Traiteur",
  },
  {
    id: 'design',
    titre: 'Design graphique',
    texte: 'Logos, flyers et identité visuelle, pour que votre marque se reconnaisse partout.',
    tags: ['Logo', 'Flyers', 'Identité'],
  },
];

export type Projet = {
  slug: string;
  nom: string;
  secteur: string;
  objectif: string;
  livre: string[];
  technologies: string[];
  url?: string; // site en ligne, à compléter
  capture: string; // desktop 1440×900
  mobile: string; // mobile 390×844 @2x
  logo: string;
};

export const projets: Projet[] = [
  {
    slug: 'amsa-shop',
    nom: 'Amsa Shop',
    secteur: 'Mode & prêt-à-porter',
    objectif:
      'Faire découvrir les nouveautés d’une boutique premium des Almadies et permettre de commander sans se déplacer.',
    livre: [
      'Vitrine et catalogue en ligne',
      'Panier et commande',
      'Espace gérante : produits, commandes, ventes',
    ],
    technologies: ['React', 'TypeScript', 'NestJS', 'PostgreSQL'],
    capture: '/projets/amsa-accueil.webp',
    mobile: '/projets/amsa-mobile.webp',
    logo: '/clients/amsa-shop.png',
  },
  {
    slug: 'cabinet-mame-fary',
    nom: 'Cabinet dentaire Mame Fary',
    secteur: 'Santé',
    objectif:
      'Permettre aux patients de prendre rendez-vous en ligne, et au cabinet de suivre toutes ses demandes au même endroit.',
    livre: [
      'Site public et prise de rendez-vous en ligne',
      'Espaces sécurisés dentiste, patient et administrateur',
      'Suivi des demandes et du planning',
    ],
    technologies: ['React', 'TypeScript', 'NestJS', 'Prisma'],
    url: 'https://www.cabinetdentairemamefary.com/',
    capture: '/projets/mamefary-accueil.webp',
    mobile: '/projets/mamefary-mobile.webp',
    logo: '/clients/cabinet-mame-fary.png',
  },
  {
    slug: 'ngouda-traiteur',
    nom: "N'Gouda Traiteur",
    secteur: 'Événementiel',
    objectif:
      'Présenter les menus d’un traiteur événementiel de Dakar et recevoir des demandes de devis complètes.',
    livre: [
      'Site vitrine avec les menus détaillés',
      'Demande de devis envoyée directement sur WhatsApp',
      'Carte des menus téléchargeable en PDF',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    url: 'https://ngouda-traiteur.vercel.app/',
    capture: '/projets/ngouda-accueil.webp',
    mobile: '/projets/ngouda-mobile.webp',
    logo: '/clients/ngouda-traiteur.png',
  },
];

export type Temoignage = {
  projet: Projet['slug'];
  auteur: string;
  role: string;
  citation: string;
};

/** Témoignages transmis par les clients (orthographe seulement corrigée). */
export const temoignages: Temoignage[] = [
  {
    projet: 'cabinet-mame-fary',
    auteur: 'Dr Peya Ndiaye',
    role: 'Chirurgien-dentiste, Cabinet dentaire Mame Fary',
    citation:
      'Cette application web a clairement dépassé mes attentes. Ça pourra grandement nous servir dans ce cabinet.',
  },
  {
    projet: 'ngouda-traiteur',
    auteur: 'Marie Ngouda',
    role: "Fondatrice, N'Gouda Traiteur",
    citation:
      'Le site est très plaisant et attractif. Ce que je préfère, c’est que la personne peut voir les différents menus et passer des commandes directement sur la plateforme. Franchement, chapeau !',
  },
  {
    projet: 'amsa-shop',
    auteur: 'Amsatou',
    role: 'Gérante, Amsa Shop',
    citation:
      'Avant la mise en place de cette plateforme, le travail était très manuel. Maintenant, non seulement j’ai plus de visibilité, mais j’ai une meilleure traçabilité et un meilleur suivi de mes marchandises. Le travail est clean et professionnel.',
  },
];

export const engagements = [
  'Vous parlez directement aux fondateurs, sans intermédiaire.',
  'Une solution adaptée à votre problème, pas un modèle tout fait.',
  'Du design à la mise en ligne, nous nous occupons de tout.',
];
