export type ProductBadge = "Best seller" | "Instantane" | "Mise a jour";

export type Product = {
  slug: string;
  name: string;
  game: string;
  image: string;
  price: string;
  oldPrice: string;
  shortDescription: string;
  fullDescription: string;
  delivery: string;
  badges: ProductBadge[];
  features: string[];
};

export const products: Product[] = [
  {
    slug: "bo7-elite-pack",
    name: "BO7 Elite Pack",
    game: "Call Of Duty BO7",
    image: "/bo7.png",
    price: "EUR 39.99",
    oldPrice: "EUR 59.99",
    shortDescription: "Aimbot ultra stable, wallhack premium et bypass anti-cheat avance.",
    fullDescription:
      "Pack competitif complet avec tracking intelligent, securite renforcee et optimisations de performances pour des sessions longues.",
    delivery: "Activation en moins de 2 minutes",
    badges: ["Best seller", "Instantane", "Mise a jour"],
    features: ["Aimbot precision pro", "Wall ESP optimise", "Mises a jour frequentes", "Support prioritaire"]
  },
  {
    slug: "fortnite-ghost-pro",
    name: "Fortnite Ghost Pro",
    game: "Fortnite",
    image: "/fortnite.jpg",
    price: "EUR 29.99",
    oldPrice: "EUR 44.99",
    shortDescription: "ESP full map, trigger assist intelligent et updates rapides.",
    fullDescription:
      "Configuration esports avec profils predefinis, adaptation aux nouvelles saisons et performances stables en ranked.",
    delivery: "Activation instantanee",
    badges: ["Instantane", "Mise a jour"],
    features: ["Trigger assist smart", "Radar vision", "Profiles preconfigures", "Patchs rapides"]
  },
  {
    slug: "apex-predator-kit",
    name: "Apex Predator Kit",
    game: "Apex Legends",
    image: "/apex.jpg",
    price: "EUR 34.99",
    oldPrice: "EUR 49.99",
    shortDescription: "Recoil control pro, radar vision et config optimisee ranked.",
    fullDescription:
      "Suite complete orientee ladder avec tracking de precision, visibilite tactique et interface de reglages avancee.",
    delivery: "Livraison instantanee et setup guide",
    badges: ["Best seller", "Mise a jour"],
    features: ["Recoil master", "ESP intelligent", "UI moderne", "Assistance config"]
  },
  {
    slug: "eft-shadow-suite",
    name: "EFT Shadow Suite",
    game: "Escape from Tarkov",
    image: "/eft.jpg",
    price: "EUR 44.99",
    oldPrice: "EUR 64.99",
    shortDescription: "Loot ESP, thermal style visuals et profils discrets personnalisables.",
    fullDescription:
      "Experience premium Tarkov avec visualisation loot avancee, performance stealth et modules adaptables selon votre style.",
    delivery: "Acces immediat 24/7",
    badges: ["Best seller", "Instantane", "Mise a jour"],
    features: ["Loot tracker", "Thermal view", "Mode discret", "Profils avances"]
  }
];

export const reviews = [
  {
    name: "Nox",
    role: "Joueur Ranked",
    message: "Design premium et activation immediate. Le niveau de finition est vraiment pro."
  },
  {
    name: "Hexa",
    role: "Streamer FPS",
    message: "Support ultra rapide, updates frequentes et dashboard super propre."
  },
  {
    name: "Raven",
    role: "Team Competitive",
    message: "Setup stable, instructions claires et performances top en session longue."
  }
];

export const faqItems = [
  {
    question: "Combien de temps pour recevoir le produit ?",
    answer: "La livraison est instantanee apres paiement, avec acces direct a votre espace client."
  },
  {
    question: "Les produits sont-ils mis a jour ?",
    answer: "Oui, chaque pack recoit des mises a jour regulieres pour suivre les patches des jeux."
  },
  {
    question: "Le support est-il inclus ?",
    answer: "Un support premium est disponible 7j/7 pour l'activation, la configuration et le suivi."
  }
];
