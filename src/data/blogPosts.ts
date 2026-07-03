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
  image?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "voir-iss-oeil-nu-france",
    image: "/blog/iss-trail-france.jpg",
    title: "Comment voir l'ISS à l'œil nu depuis la France ?",
    metaDescription: "Guide complet pour observer la Station Spatiale Internationale à l'œil nu depuis la France : créneaux, luminosité, conditions météo, applications et erreurs à éviter.",
    excerpt: "Pas besoin de télescope : la Station Spatiale est l'un des objets les plus brillants du ciel nocturne. Voici comment la repérer, sans rien manquer.",
    content:
      "L'ISS est visible à l'œil nu depuis presque partout en France, sans instrument, sans expérience préalable et sans connaître une seule constellation. Elle apparaît comme un point lumineux blanc, stable et sans clignotement, qui traverse le ciel en silence à une vitesse régulière — beaucoup plus rapide qu'un avion de ligne, mais bien plus lent qu'une étoile filante. Un passage complet dure généralement entre 1 et 6 minutes selon la hauteur qu'atteint la station au-dessus de l'horizon.\n\nLa raison pour laquelle elle est si facile à repérer tient à sa luminosité : l'ISS atteint une magnitude apparente pouvant descendre jusqu'à -4, ce qui la rend souvent plus brillante que n'importe quelle étoile du ciel nocturne, et parfois presque aussi lumineuse que Vénus. Cette luminosité vient simplement de la taille de la station (environ un terrain de football, avec ses immenses panneaux solaires très réfléchissants) et de son altitude relativement basse, à environ 400 kilomètres.\n\nPour qu'un passage soit visible, trois conditions doivent être réunies en même temps. D'abord, il faut que l'ISS survole effectivement votre région à cet instant précis — c'est une information qui change chaque jour, car l'orbite de la station se décale progressivement. Ensuite, il faut que le ciel local soit encore sombre, ou en tout cas suffisamment pour distinguer un point lumineux, ce qui correspond en pratique aux heures juste après le coucher du soleil ou juste avant le lever du jour. Enfin — et c'est le point que beaucoup de guides oublient de préciser — il faut que l'ISS elle-même soit encore éclairée par le Soleil alors que le sol, lui, est déjà dans l'obscurité. C'est exactement la même physique qui rend la Lune visible en plein jour parfois, ou qui fait qu'un avion à haute altitude reste éclairé longtemps après le coucher du soleil vu du sol.\n\nCette fenêtre de double crépuscule — sol sombre, station encore au soleil — explique pourquoi les passages visibles se concentrent sur des créneaux precis, généralement dans l'heure et demie suivant le coucher du soleil, ou dans l'heure et demie précédant le lever du jour. En pleine nuit noire, l'ISS est certes toujours là, en orbite, mais elle se trouve elle aussi dans l'ombre de la Terre : invisible, même si le ciel est parfaitement dégagé.\n\nCe cycle jour/nuit sur l'orbite explique aussi pourquoi certaines périodes de l'année sont plus favorables que d'autres. En France métropolitaine, les mois qui entourent les solstices (fin mai à début août, et dans une moindre mesure autour de fin décembre) offrent souvent des séries de passages visibles rapprochées, parfois plusieurs jours de suite, tandis que d'autres semaines ne présentent aucun passage exploitable. Ce n'est pas une impression : c'est la conséquence directe de la géométrie Terre-Soleil-orbite.\n\nCôté météo, il ne faut pas grand-chose pour rater l'ISS : un ciel voilé de fine altostratus suffit à rendre le point lumineux difficile à distinguer, et une couverture nuageuse basse le masque complètement. La pollution lumineuse urbaine, en revanche, gêne beaucoup moins l'observation de l'ISS que celle des étoiles faibles ou de la Voie lactée — sa luminosité est telle qu'elle reste repérable même depuis un centre-ville, à condition d'avoir un dégagement raisonnable vers la portion de ciel concernée.\n\nPour ne pas chercher au hasard, la méthode la plus fiable reste de connaître à l'avance l'heure de début du passage, sa durée, sa hauteur maximale au-dessus de l'horizon (exprimée en degrés) et sa direction d'apparition et de disparition (les points cardinaux). Notre page Passages calcule ces informations pour votre position exacte, à partir des éléments orbitaux à jour de la station ; des applications comme Spot the Station (NASA), ISS Detector ou Heavens-Above fournissent des données équivalentes si vous préférez une app mobile dédiée.\n\nUne fois sur place, quelques minutes avant l'heure indiquée, il suffit de faire face à la direction d'apparition annoncée et de laisser le regard balayer lentement le ciel à l'horizon : l'ISS apparaît progressivement, d'abord discrète, puis de plus en plus brillante à mesure qu'elle prend de la hauteur, avant de redescendre et de disparaître — soit parce qu'elle repasse sous l'horizon, soit, plus spectaculaire, parce qu'elle entre soudainement dans l'ombre de la Terre et s'éteint en quelques secondes, comme une bougie qu'on souffle.",
    category: "Observation",
    date: "2025-09-12",
    readingTime: 6,
    cover: "🌠",
  },
  {
    slug: "pourquoi-live-iss-noir",
    image: "/blog/iss-live-night.jpg",
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
    image: "/blog/iss-night-orbit.jpg",
    title: "À quelle altitude vole l'ISS ?",
    metaDescription: "L'ISS orbite entre 400 et 420 km d'altitude, en orbite terrestre basse. Pourquoi cette hauteur, comment elle est entretenue, et comment elle se compare aux autres satellites.",
    excerpt: "Une orbite basse permet une logistique simplifiée — au prix d'un entretien régulier, sous peine de retomber.",
    content:
      "L'ISS évolue sur une orbite dite « basse » (LEO, low Earth orbit), généralement maintenue entre 400 et 420 kilomètres d'altitude au-dessus du sol. Ce chiffre n'est pas fixe : il varie en permanence de quelques kilomètres selon la date, car l'altitude de la station diminue lentement puis est corrigée par étapes, plutôt que maintenue de façon parfaitement constante.\n\nCette altitude résulte d'un compromis assez précis. Plus bas, le frottement de la haute atmosphère residuelle deviendrait trop important et obligerait à des corrections d'orbite beaucoup trop fréquentes pour être viables économiquement. Plus haut, atteindre la station deviendrait plus coûteux en carburant pour chaque lancement de ravitaillement ou de relève d'équipage, et la protéger des radiations et débris deviendrait plus complexe. Entre 400 et 420 km, la trainée atmosphérique existe encore — c'est elle qui freine la station — mais elle reste gérable avec les moyens de propulsion embarqués.\n\nConcrètement, cette traînée fait perdre à l'ISS de l'ordre de 50 à 150 mètres d'altitude par jour selon l'activité solaire (le Soleil dilate la haute atmosphère terrestre lors des pics d'activité, ce qui augmente la densité de gaz à 400 km et donc le freinage). Sur un mois, cela peut représenter plusieurs kilomètres perdus si aucune correction n'est effectuée. Sans intervention, la station finirait, à terme, par redescendre suffisamment pour se désintégrer dans l'atmosphère — c'est d'ailleurs le principe retenu pour sa désorbitation planifiée en fin de vie.\n\nPour compenser cette perte continue, l'ISS est régulièrement « rehaussée » grâce aux moteurs de vaisseaux amarrés à la station : le module russe Zvezda dispose de ses propres propulseurs, et les vaisseaux cargo Progress (russe) ou, plus récemment, Cygnus (américain, Northrop Grumman) peuvent également effectuer ces manœuvres de reboost en utilisant leurs propres moteurs une fois arrimés. Ces corrections d'orbite ont lieu plusieurs fois par an, parfois plus fréquemment selon l'activité solaire du moment.\n\nPour resituer cette altitude par rapport à d'autres repères spatiaux : la ligne de Kármán, considérée par convention comme la limite de l'espace, se trouve à 100 km — l'ISS vole donc quatre fois plus haut que cette frontière symbolique. Les satellites Starlink orbitent un peu plus haut, autour de 550 km. Le télescope spatial Hubble se trouve vers 535-540 km. Les satellites de navigation GPS, eux, évoluent sur une orbite moyenne bien plus lointaine, à environ 20 200 km, et les satellites géostationnaires de télécommunication culminent à 35 786 km — presque 90 fois plus loin que l'ISS. Cette comparaison aide à comprendre pourquoi l'ISS, malgré son statut de station spatiale emblématique, reste en réalité l'un des objets artificiels les plus proches de la Terre en orbite.\n\nCette proximité relative a une conséquence directe et visible depuis le sol : c'est précisément parce que l'ISS vole aussi bas, comparée à la majorité des satellites, qu'elle apparaît aussi brillante et aussi rapide dans le ciel nocturne lorsqu'on l'observe à l'œil nu.",
    category: "Sciences",
    date: "2025-10-18",
    readingTime: 5,
    cover: "🛰️",
  },
  {
    slug: "iss-tours-terre-par-jour",
    image: "/blog/earth-orbit-sunrise.jpg",
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
    image: "/blog/iss-night-orbit.jpg",
    title: "Quelle est la vitesse de l'ISS ?",
    metaDescription: "L'ISS file à environ 27 600-28 000 km/h, soit près de 7,7 km par seconde. Explications physiques et comparaisons concrètes.",
    excerpt: "Près de huit kilomètres parcourus chaque seconde : pourquoi est-il indispensable d'aller aussi vite pour rester en orbite ?",
    content:
      "La Station Spatiale Internationale se déplace à environ 27 600 à 28 000 km/h par rapport à la surface terrestre, soit approximativement 7,66 kilomètres par seconde. À cette vitesse, l'ISS parcourt la distance qui sépare Paris de New York en un peu moins de 13 minutes, et fait le tour complet de la planète en environ 92 à 93 minutes.\n\nCette vitesse n'est pas un choix arbitraire : c'est une conséquence directe des lois de la mécanique orbitale. Pour qu'un objet reste en orbite stable autour de la Terre à une altitude donnée, sans repropulsion constante, sa vitesse horizontale doit être suffisante pour que sa trajectoire de chute libre — car un satellite est en réalité en chute libre permanente vers la Terre — épouse exactement la courbure de la planète. Si l'ISS allait plus lentement, la gravité terrestre l'emporterait progressivement vers le sol et son altitude diminuerait plus vite que ce que les moteurs de correction peuvent compenser. Si elle allait plus vite, la trajectoire s'élargirait et l'altitude augmenterait, l'éloignant progressivement de son orbite prévue. La vitesse d'environ 7,66 km/s à 400 km d'altitude est très précisément celle qui équilibre ces deux effets.\n\nPour donner une idée concrète de cette vitesse, quelques comparaisons aident à se repérer. Le son se propage dans l'air à environ 1 235 km/h dans des conditions standards : l'ISS va donc environ 22 fois plus vite que le son, largement au-delà de ce qu'aucun avion habité ne peut atteindre en vol soutenu. Un avion de ligne commercial croise en moyenne autour de 900 km/h : l'ISS va environ 30 fois plus vite. Une balle de fusil quitte généralement le canon à moins de 1 200 m/s (environ 4 300 km/h) : l'ISS, elle, dépasse les 7 600 m/s, soit près de 6 fois la vitesse d'une balle.\n\nCette vitesse extrême explique aussi pourquoi un passage visible depuis le sol est aussi rapide : contrairement à un avion qui met de longues minutes à traverser le ciel, l'ISS parcourt l'horizon visible en seulement quelques minutes, sans jamais ralentir ni changer de trajectoire apparente — un point lumineux filant, régulier, silencieux.\n\nÀ bord, cette vitesse n'est absolument pas perceptible par les astronautes : il n'existe aucun repère de vitesse dans l'espace, pas de vent, pas de vibration liée au déplacement. Ce que les membres d'équipage ressentent en revanche, c'est la conséquence de cette orbite rapide sur leur rythme quotidien : avec une révolution complète toutes les 92 minutes environ, l'ISS offre à son équipage près de 16 levers et 16 couchers de soleil chaque jour — un rythme qui n'a rien à voir avec le cycle jour-nuit terrestre, et qui oblige les astronautes à vivre selon une horloge strictement artificielle, calée sur le temps universel coordonné (UTC) plutôt que sur la lumière extérieure.",
    category: "Sciences",
    date: "2025-11-03",
    readingTime: 5,
    cover: "⚡",
  },
  {
    slug: "photographier-iss-smartphone",
    image: "/blog/observation-telescope.jpg",
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
    image: "/blog/kids-tracking-iss.jpg",
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
    image: "/blog/kids-tracking-iss.jpg",
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