// Configuration centrale du site : tout ce qui change (coordonnées, liens, images) se modifie ici.
export const SITE = {
  name: 'SEAD CONSEIL',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.seadconsulting.fr').replace(/\/$/, ''),
  tagline: 'L’IA traite la donnée. Nous pilotons votre profit.',
  description:
    'Agence conseil en acquisition : Google Ads, Social Ads, copywriting et contenus. Les outils d’IA accélèrent, un expert humain décide.',
  email: 'contact@seadconsulting.fr',
  address: { street: '15 rue des Halles', postalCode: '75001', city: 'Paris', country: 'FR' },
  linkedin: 'https://www.linkedin.com/in/babatoure/',
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || '',
  founder: {
    name: 'Baba Touré',
    role: 'Fondateur, consultant et formateur Google Ads',
  },
  locations: [
    { city: 'Paris', label: 'Siège', detail: '15 rue des Halles, 75001 Paris' },
    { city: 'Dublin', label: 'Hub européen', detail: 'Accompagnement des comptes internationaux' },
    { city: 'Dakar', label: 'Hub Afrique de l’Ouest', detail: 'Accompagnement des marques en Afrique de l’Ouest' },
  ],
  // Références (seul endroit où les vrais noms apparaissent). Déposer les logos dans public/images/logos/
  // puis renseigner « logo » (ex. '/images/logos/arcane-industries.svg'). Sans logo, le nom s'affiche en texte.
  clients: [
    { name: 'Arcane Industries', logo: '' },
    { name: 'Apyforme', logo: '' },
    { name: 'Fleurs de Dragées', logo: '' },
  ],
};

// Images. Les illustrations marquées ai:true sont signalées comme telles sur le site (transparence).
export const IMAGES = {
  portrait: { src: '/images/baba-toure-portrait.jpg', w: 900, h: 1600, alt: 'Portrait de Baba Touré, fondateur de SEAD CONSEIL', ai: false },
  // À remplacer par « Illustration page QSN.jpg » du Drive : déposer le fichier sous public/images/qui-sommes-nous.jpg
  qsn: { src: '/images/baba-toure-portrait.jpg', w: 900, h: 1600, alt: 'Baba Touré, fondateur de SEAD CONSEIL', ai: false },
  conseil: { src: '/images/illustration-conseil.jpg', w: 800, h: 1021, alt: 'Illustration : un consultant annote une stratégie sur une tablette graphique', ai: true },
  crea: { src: '/images/illustration-crea-strategique.jpg', w: 800, h: 1006, alt: 'Illustration : travail de création publicitaire sur tablette graphique', ai: true },
  dakar: { src: '/images/illustration-dakar.jpg', w: 800, h: 1096, alt: 'Illustration : Baba Touré à Dakar', ai: true },
};

export const NAV = [
  {
    label: 'Expertises',
    href: '/expertises',
    children: [
      { label: 'Google Ads', href: '/expertises/google-ads' },
      { label: 'Social Ads', href: '/expertises/social-ads' },
      { label: 'Copywriting & contenus IA', href: '/expertises/copywriting-contenus-ia' },
      { label: 'Direction créative IA', href: '/direction-creative-ia' },
    ],
  },
  { label: 'Méthode', href: '/methode' },
  { label: 'Cas clients', href: '/cas-clients' },
  { label: 'Qui sommes-nous', href: '/qui-sommes-nous' },
  { label: 'L’œil de Baba', href: '/blog' },
];

// Mentions légales : champs à compléter avant la mise en ligne (voir README).
export const LEGAL = {
  raisonSociale: 'SEAD CONSEIL',
  formeJuridique: 'À compléter',
  capital: 'À compléter',
  siren: '988 057 089',
  rcs: 'RCS Paris 988 057 089',
  tva: 'FR77 988 057 089',
  directeurPublication: 'Baba Touré',
  hebergeur: {
    nom: 'Vercel Inc.',
    adresse: '340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis',
    site: 'https://vercel.com',
  },
};
