export interface AffiliateProduct {
  id: string;
  title: string;
  price: string;
  rating: number;
  category: string;
  image: string;
  affiliateUrl: string;
  badge?: string;
}

/**
 * Remplacez `affiliateUrl` par vos liens Amazon Partenaires, Awin, Fnac, etc.
 * `image` accepte un dégradé/emoji SVG inline pour V1 — branchez vos visuels produits ensuite.
 */
export const affiliateProducts: AffiliateProduct[] = [
  {
    id: "jumelles-astro",
    title: "Jumelles astronomiques 10x50",
    price: "89,90 €",
    rating: 4.5,
    category: "Observation",
    image: "🔭",
    affiliateUrl: "#",
    badge: "Best-seller",
  },
  {
    id: "telescope-debutant",
    title: "Télescope débutant 70/700",
    price: "129,00 €",
    rating: 4.3,
    category: "Observation",
    image: "🪐",
  affiliateUrl: "#",
  },
  {
    id: "maquette-iss",
    title: "Maquette officielle ISS",
    price: "49,90 €",
    rating: 4.7,
    category: "Maquettes",
    image: "🛰️",
    affiliateUrl: "#",
  },
  {
    id: "livre-enfant-espace",
    title: "Mon grand livre de l'espace",
    price: "14,90 €",
    rating: 4.8,
    category: "Enfants",
    image: "📚",
    affiliateUrl: "#",
    badge: "Coup de cœur",
  },
  {
    id: "poster-systeme-solaire",
    title: "Poster système solaire XXL",
    price: "19,90 €",
    rating: 4.6,
    category: "Déco",
    image: "🌌",
    affiliateUrl: "#",
  },
  {
    id: "globe-lumineux",
    title: "Globe terrestre lumineux",
    price: "59,00 €",
    rating: 4.4,
    category: "Déco",
    image: "🌍",
    affiliateUrl: "#",
  },
];