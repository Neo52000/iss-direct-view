// Villes françaises pour les pages SEO programmatiques
// « Passage de l'ISS au-dessus de {ville} ». Coordonnées = centre-ville.

export interface FrenchCity {
  slug: string;
  name: string;
  region: string;
  lat: number;
  lon: number;
}

export const frenchCities: FrenchCity[] = [
  { slug: "paris", name: "Paris", region: "Île-de-France", lat: 48.8566, lon: 2.3522 },
  {
    slug: "marseille",
    name: "Marseille",
    region: "Provence-Alpes-Côte d'Azur",
    lat: 43.2965,
    lon: 5.3698,
  },
  { slug: "lyon", name: "Lyon", region: "Auvergne-Rhône-Alpes", lat: 45.764, lon: 4.8357 },
  { slug: "toulouse", name: "Toulouse", region: "Occitanie", lat: 43.6045, lon: 1.444 },
  { slug: "nice", name: "Nice", region: "Provence-Alpes-Côte d'Azur", lat: 43.7102, lon: 7.262 },
  { slug: "nantes", name: "Nantes", region: "Pays de la Loire", lat: 47.2184, lon: -1.5536 },
  { slug: "montpellier", name: "Montpellier", region: "Occitanie", lat: 43.6108, lon: 3.8767 },
  { slug: "strasbourg", name: "Strasbourg", region: "Grand Est", lat: 48.5734, lon: 7.7521 },
  { slug: "bordeaux", name: "Bordeaux", region: "Nouvelle-Aquitaine", lat: 44.8378, lon: -0.5792 },
  { slug: "lille", name: "Lille", region: "Hauts-de-France", lat: 50.6292, lon: 3.0573 },
  { slug: "rennes", name: "Rennes", region: "Bretagne", lat: 48.1173, lon: -1.6778 },
  { slug: "reims", name: "Reims", region: "Grand Est", lat: 49.2583, lon: 4.0317 },
  { slug: "le-havre", name: "Le Havre", region: "Normandie", lat: 49.4944, lon: 0.1079 },
  {
    slug: "saint-etienne",
    name: "Saint-Étienne",
    region: "Auvergne-Rhône-Alpes",
    lat: 45.4397,
    lon: 4.3872,
  },
  {
    slug: "toulon",
    name: "Toulon",
    region: "Provence-Alpes-Côte d'Azur",
    lat: 43.1242,
    lon: 5.928,
  },
  { slug: "grenoble", name: "Grenoble", region: "Auvergne-Rhône-Alpes", lat: 45.1885, lon: 5.7245 },
  { slug: "dijon", name: "Dijon", region: "Bourgogne-Franche-Comté", lat: 47.322, lon: 5.0415 },
  { slug: "angers", name: "Angers", region: "Pays de la Loire", lat: 47.4784, lon: -0.5632 },
  { slug: "nimes", name: "Nîmes", region: "Occitanie", lat: 43.8367, lon: 4.3601 },
  {
    slug: "villeurbanne",
    name: "Villeurbanne",
    region: "Auvergne-Rhône-Alpes",
    lat: 45.7719,
    lon: 4.8902,
  },
  {
    slug: "clermont-ferrand",
    name: "Clermont-Ferrand",
    region: "Auvergne-Rhône-Alpes",
    lat: 45.7772,
    lon: 3.087,
  },
  { slug: "le-mans", name: "Le Mans", region: "Pays de la Loire", lat: 48.0061, lon: 0.1996 },
  {
    slug: "aix-en-provence",
    name: "Aix-en-Provence",
    region: "Provence-Alpes-Côte d'Azur",
    lat: 43.5297,
    lon: 5.4474,
  },
  { slug: "brest", name: "Brest", region: "Bretagne", lat: 48.3904, lon: -4.4861 },
  { slug: "tours", name: "Tours", region: "Centre-Val de Loire", lat: 47.3941, lon: 0.6848 },
  { slug: "amiens", name: "Amiens", region: "Hauts-de-France", lat: 49.8941, lon: 2.2958 },
  { slug: "limoges", name: "Limoges", region: "Nouvelle-Aquitaine", lat: 45.8336, lon: 1.2611 },
  { slug: "annecy", name: "Annecy", region: "Auvergne-Rhône-Alpes", lat: 45.8992, lon: 6.1294 },
  { slug: "perpignan", name: "Perpignan", region: "Occitanie", lat: 42.6887, lon: 2.8948 },
  {
    slug: "besancon",
    name: "Besançon",
    region: "Bourgogne-Franche-Comté",
    lat: 47.238,
    lon: 6.0243,
  },
  { slug: "metz", name: "Metz", region: "Grand Est", lat: 49.1193, lon: 6.1757 },
  { slug: "orleans", name: "Orléans", region: "Centre-Val de Loire", lat: 47.9029, lon: 1.909 },
  { slug: "rouen", name: "Rouen", region: "Normandie", lat: 49.4432, lon: 1.0993 },
  { slug: "mulhouse", name: "Mulhouse", region: "Grand Est", lat: 47.7508, lon: 7.3359 },
  { slug: "caen", name: "Caen", region: "Normandie", lat: 49.1829, lon: -0.3707 },
  { slug: "nancy", name: "Nancy", region: "Grand Est", lat: 48.6921, lon: 6.1844 },
  {
    slug: "avignon",
    name: "Avignon",
    region: "Provence-Alpes-Côte d'Azur",
    lat: 43.9493,
    lon: 4.8055,
  },
  { slug: "poitiers", name: "Poitiers", region: "Nouvelle-Aquitaine", lat: 46.5802, lon: 0.3404 },
  {
    slug: "la-rochelle",
    name: "La Rochelle",
    region: "Nouvelle-Aquitaine",
    lat: 46.1591,
    lon: -1.1519,
  },
  { slug: "pau", name: "Pau", region: "Nouvelle-Aquitaine", lat: 43.2951, lon: -0.3708 },
  { slug: "bayonne", name: "Bayonne", region: "Nouvelle-Aquitaine", lat: 43.4933, lon: -1.4748 },
  { slug: "ajaccio", name: "Ajaccio", region: "Corse", lat: 41.9192, lon: 8.7386 },
  { slug: "argenteuil", name: "Argenteuil", region: "Île-de-France", lat: 48.9075, lon: 2.2469 },
  { slug: "dunkerque", name: "Dunkerque", region: "Hauts-de-France", lat: 51.0343, lon: 2.3768 },
  {
    slug: "chambery",
    name: "Chambéry",
    region: "Auvergne-Rhône-Alpes",
    lat: 45.5646,
    lon: 5.9178,
  },
  { slug: "colmar", name: "Colmar", region: "Grand Est", lat: 48.0794, lon: 7.3585 },
];

export const getCity = (slug: string) => frenchCities.find((c) => c.slug === slug);
