export interface BlogPost {
  slug: string;
  title: string;
  metaDescription: string;
  excerpt: string;
  content: string; // texte simple, paragraphes séparés par \n\n
  category: string;
  date: string; // ISO
  readingTime: number; // minutes
  cover: string; // emoji ou URL
}

export const blogPosts: BlogPost[] = [
  {
    slug: "voir-iss-oeil-nu-france",
    title: "Comment voir l'ISS à l'œil nu depuis la France ?",
    metaDescription: "Guide pratique pour observer la Station Spatiale Internationale depuis la France : créneaux, conditions, conseils.",
    excerpt: "Pas besoin de télescope : la Station Spatiale est l'un des objets les plus brillants du ciel nocturne. Voici comment la repérer.",
    content:
      "L'ISS est visible à l'œil nu depuis presque partout en France. Elle apparaît comme un point lumineux blanc qui traverse le ciel en silence, sans clignoter, contrairement à un avion.\n\nLes meilleures conditions sont juste après le coucher du soleil ou avant l'aube : la station est éclairée par le Soleil tandis que le sol est dans la pénombre.\n\nRepérez votre prochain passage sur notre page Passages : nous indiquons l'heure de début, la durée, la hauteur maximale et l'azimut.",
    category: "Observation",
    date: "2025-09-12",
    readingTime: 4,
    cover: "🌠",
  },
  {
    slug: "pourquoi-live-iss-noir",
    title: "Pourquoi le live ISS est parfois noir ?",
    metaDescription: "L'image du live ISS devient noire ou bleue par moments : voici les raisons techniques.",
    excerpt: "Trois raisons principales expliquent ces interruptions visuelles du flux en direct.",
    content:
      "L'ISS effectue un tour de la Terre toutes les 90 minutes environ. Pendant la moitié de chaque orbite, elle se trouve dans la nuit terrestre : les caméras extérieures n'ont plus assez de lumière.\n\nLes pertes de signal entre la station et le sol sont également fréquentes lors des transitions entre stations relais TDRSS. La NASA diffuse alors une mire bleue ou grise.\n\nEnfin, certaines opérations (sorties extra-véhiculaires, manœuvres) peuvent modifier ou interrompre temporairement le flux.",
    category: "Live",
    date: "2025-10-02",
    readingTime: 3,
    cover: "📺",
  },
  {
    slug: "altitude-iss",
    title: "À quelle altitude vole l'ISS ?",
    metaDescription: "L'ISS orbite entre 400 et 420 km d'altitude. Explications sur cette orbite basse et son entretien.",
    excerpt: "Une orbite basse permet une logistique simplifiée — au prix d'un entretien régulier.",
    content:
      "L'ISS évolue sur une orbite dite « basse » (LEO), entre 400 et 420 kilomètres d'altitude. Cette hauteur résulte d'un compromis : assez bas pour faciliter le ravitaillement, assez haut pour limiter le frottement atmosphérique.\n\nMalgré tout, la station perd quelques centaines de mètres d'altitude chaque mois. Les vaisseaux Progress ou Cygnus la repoussent régulièrement vers le haut.",
    category: "Sciences",
    date: "2025-10-18",
    readingTime: 3,
    cover: "🛰️",
  },
  {
    slug: "iss-tours-terre-par-jour",
    title: "Combien de fois l'ISS fait-elle le tour de la Terre chaque jour ?",
    metaDescription: "L'ISS effectue environ 16 orbites complètes autour de la Terre chaque jour.",
    excerpt: "16 levers et couchers de soleil par jour pour les astronautes : c'est le rythme imposé par l'orbite.",
    content:
      "À 28 000 km/h, l'ISS boucle une orbite complète en environ 92 minutes. Sur 24 heures, cela représente près de 16 tours de la Terre — donc 16 levers et 16 couchers de soleil pour les astronautes à bord.",
    category: "Sciences",
    date: "2025-10-25",
    readingTime: 2,
    cover: "🌍",
  },
  {
    slug: "vitesse-iss",
    title: "Quelle est la vitesse de l'ISS ?",
    metaDescription: "L'ISS file à environ 28 000 km/h, soit près de 7,7 km par seconde.",
    excerpt: "Près de huit kilomètres parcourus chaque seconde : pourquoi est-il indispensable d'aller aussi vite ?",
    content:
      "La vitesse orbitale d'environ 28 000 km/h est nécessaire pour que la force centrifuge équilibre exactement la gravité terrestre à 400 km d'altitude. Plus vite, l'ISS s'éloignerait ; moins vite, elle retomberait.",
    category: "Sciences",
    date: "2025-11-03",
    readingTime: 2,
    cover: "⚡",
  },
  {
    slug: "photographier-iss-smartphone",
    title: "Peut-on photographier l'ISS avec un smartphone ?",
    metaDescription: "Astuces pour capturer le passage de l'ISS avec un smartphone moderne.",
    excerpt: "Avec le mode nuit ou astrophotographie, un smartphone récent peut immortaliser une trace lumineuse de l'ISS.",
    content:
      "Les modes nuit et astrophotographie des smartphones récents permettent des poses longues de 10 à 30 secondes. Posez le téléphone sur un trépied ou une surface stable, déclenchez juste avant le passage, et l'ISS laissera une fine traînée blanche sur la photo.",
    category: "Photo",
    date: "2025-11-15",
    readingTime: 3,
    cover: "📱",
  },
  {
    slug: "activite-espace-a-imprimer",
    title: "Activité espace à imprimer pour les enfants",
    metaDescription: "Téléchargez gratuitement un kit d'activités espace : coloriages, quiz, fiches pédagogiques.",
    excerpt: "Coloriages, quiz, fiches : de quoi occuper un mercredi après-midi tout en apprenant.",
    content:
      "Notre kit espace gratuit rassemble des coloriages (fusée, ISS, planètes), un quiz pour tester les connaissances, et des fiches pédagogiques adaptées au cycle 2 et 3. À télécharger et imprimer librement.",
    category: "Enfants",
    date: "2025-11-22",
    readingTime: 2,
    cover: "🎨",
  },
  {
    slug: "expliquer-iss-primaire",
    title: "Comment expliquer l'ISS à des élèves de primaire ?",
    metaDescription: "Pistes pédagogiques pour présenter la Station Spatiale Internationale en classe de primaire.",
    excerpt: "Comparaisons concrètes, expériences simples et supports visuels pour rendre l'ISS accessible aux 6–10 ans.",
    content:
      "Comparer l'ISS à un terrain de football (sa taille), expliquer la microgravité avec une bouteille d'eau percée en chute libre, ou faire deviner combien d'orbites en une journée d'école : autant de pistes simples pour mobiliser une classe de primaire.",
    category: "Enfants",
    date: "2025-12-01",
    readingTime: 4,
    cover: "🎒",
  },
];

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);