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
    metaDescription: "L'image du live ISS devient noire, bleue ou grise par moments : les vraies raisons techniques, et comment savoir si le flux fonctionne toujours.",
    excerpt: "Trois raisons principales expliquent ces interruptions visuelles du flux en direct — aucune n'est un signe de panne.",
    content:
      "Voir l'écran devenir subitement noir en plein visionnage du live ISS est l'une des questions les plus fréquentes chez les nouveaux visiteurs. La bonne nouvelle : dans l'immense majorité des cas, ce n'est pas un problème technique de votre côté, ni même un signe que le flux est cassé. C'est un comportement parfaitement normal, lié à la façon dont fonctionne la diffusion et à la géométrie de l'orbite.\n\nLa première explication, la plus fréquente, tient simplement au cycle jour/nuit orbital. L'ISS effectue un tour complet de la Terre en environ 90 à 93 minutes, ce qui signifie qu'elle traverse la nuit terrestre à peu près 16 fois par jour, pendant environ 45 minutes à chaque passage. Lorsque la station se trouve du côté nuit de la planète, les caméras extérieures — conçues pour filmer la Terre éclairée par le Soleil — ne reçoivent plus assez de lumière pour produire une image exploitable. L'écran devient alors noir, ou affiche tout au plus quelques lumières de villes au sol si la caméra est suffisamment sensible. Ce phénomène se répète donc mécaniquement toutes les 90 minutes environ, et dure lui-même une quarantaine de minutes.\n\nLa deuxième cause concerne les pertes de signal entre la station et le sol. L'ISS ne communique pas directement en continu avec les stations terrestres : la NASA relaie la majorité des communications via un réseau de satellites géostationnaires appelés TDRSS (Tracking and Data Relay Satellite System). Lors des transitions entre deux satellites relais — ce qui arrive plusieurs fois par orbite — il peut y avoir une brève coupure du signal vidéo. Dans ce cas, la NASA affiche généralement un écran bleu uni, parfois accompagné du texte « Signal Loss », ou une mire grise. Ces coupures durent en général de quelques secondes à quelques minutes.\n\nUne troisième raison, plus ponctuelle, concerne les opérations en cours à bord ou à l'extérieur de la station. Lors de sorties extravéhiculaires (EVA), d'arrimages de vaisseaux cargo ou habités, de manœuvres de reboost d'orbite, ou de tests techniques, la NASA peut couper volontairement le flux public, le rediriger vers une caméra différente, ou le remplacer temporairement par un direct commenté depuis la Terre (NASA TV). Ces interruptions sont généralement annoncées à l'avance sur les canaux officiels de la NASA.\n\nEnfin, il existe une quatrième cause bien plus rare mais qui alimente beaucoup de questions en ligne : certaines caméras peuvent temporairement fixer un panneau solaire, la coque de la station, ou un module en gros plan, ce qui donne une image sombre ou très contrastée pouvant être confondue avec une coupure, alors que le flux fonctionne parfaitement.\n\nEn résumé, si l'image devient noire, bleue ou grise, il suffit généralement de patienter quelques minutes : soit l'ISS ressort de la nuit terrestre, soit la liaison TDRSS se rétablit, soit l'opération en cours se termine. Aucune action n'est nécessaire de votre côté — pas besoin de rafraîchir la page ni de changer de navigateur.",
    category: "Live",
    date: "2025-10-02",
    readingTime: 5,
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
    metaDescription: "L'ISS effectue environ 15,5 à 16 orbites complètes autour de la Terre chaque jour, soit un lever de soleil toutes les 90 minutes. Explications et conséquences pour l'équipage.",
    excerpt: "16 levers et couchers de soleil par jour pour les astronautes : c'est le rythme imposé par l'orbite, très loin du cycle terrestre habituel.",
    content:
      "À environ 27 600-28 000 km/h, l'ISS boucle une orbite complète autour de la Terre en approximativement 92 à 93 minutes. En divisant les 1 440 minutes d'une journée par cette durée, on obtient un peu plus de 15,5 orbites en 24 heures — un chiffre que l'on arrondit généralement à 16 tours par jour dans le langage courant, même si le nombre exact d'orbites complétées varie légèrement selon l'heure de référence choisie.\n\nCette cadence a une conséquence directe et assez vertigineuse pour l'équipage : à chaque orbite correspond, en théorie, un lever et un coucher de soleil, puisque la moitié du trajet se déroule côté jour de la Terre et l'autre moitié côté nuit. Concrètement, cela signifie qu'un astronaute à bord de l'ISS peut assister à environ 16 levers de soleil et 16 couchers de soleil au cours d'une seule journée de travail — un rythme radicalement différent du cycle de 24 heures auquel le corps humain est habitué sur Terre.\n\nCe décalage pose un vrai défi physiologique. Le corps humain régule son horloge interne (rythme circadien) en grande partie grâce à l'alternance lumière/obscurité. À bord de l'ISS, avec 16 cycles jour/nuit par 24 heures, se fier à la lumière extérieure pour réguler le sommeil serait intenable. C'est pourquoi l'équipage vit selon un planning strict calé sur le temps universel coordonné (UTC), avec des horaires de réveil, de repas et de coucher fixes, indépendants de ce qui se passe derrière le hublot, complétés par un éclairage intérieur artificiel conçu pour respecter autant que possible un cycle de 24 heures.\n\nCette fréquence orbitale explique aussi pourquoi l'ISS repasse relativement souvent, mais pas systématiquement, au-dessus d'une même région du globe. Comme la Terre tourne sous l'orbite de la station pendant que celle-ci poursuit sa révolution, la trace au sol de chaque orbite est décalée d'environ 22 à 23 degrés de longitude par rapport à la précédente. Il faut donc plusieurs jours pour que l'ISS repasse à une heure similaire au-dessus d'un point donné dans des conditions d'éclairage favorables à l'observation — ce qui explique les fameuses séries de \"bons soirs\" et de \"mauvais soirs\" pour observer un passage visible depuis une ville donnée.\n\nÀ titre de comparaison, un satellite géostationnaire, lui, reste fixe au-dessus d'un même point du globe en effectuant exactement une orbite par 24 heures, à une altitude bien plus élevée (35 786 km). L'ISS, avec ses 16 orbites quotidiennes à seulement 400 km d'altitude, illustre à l'inverse ce que permet une orbite basse : une vitesse de survol beaucoup plus rapide, au prix d'un passage bien plus bref à chaque fois au-dessus d'un lieu donné.",
    category: "Sciences",
    date: "2025-10-25",
    readingTime: 4,
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
    metaDescription: "Guide pratique pour photographier le passage de l'ISS avec un smartphone : réglages, mode nuit, pose longue, erreurs à éviter.",
    excerpt: "Avec le mode nuit ou astrophotographie, un smartphone récent peut immortaliser une trace lumineuse de l'ISS — à condition de bien s'y préparer.",
    content:
      "Contrairement à une idée reçue, il n'est pas nécessaire de posséder un appareil photo professionnel pour capturer le passage de l'ISS : la plupart des smartphones sortis ces dernières années disposent d'un mode nuit ou d'un mode astrophotographie capable de réaliser des poses longues de 10 à 30 secondes, largement suffisantes pour enregistrer la traînée lumineuse laissée par la station dans le ciel.\n\nLa préparation compte autant que la prise de vue elle-même. Avant toute chose, il faut connaître précisément l'heure de passage, sa durée, sa direction d'apparition et sa hauteur maximale — des informations disponibles sur notre page Passages. Repérez ensuite un point de vue dégagé, sans lampadaire proche ni obstacle dans la direction attendue, et installez le téléphone sur un support parfaitement stable : un trépied dédié smartphone est l'idéal, mais un muret, un sac posé au sol ou même un livre calé peuvent suffire. La moindre vibration ruine une pose longue.\n\nCôté réglages, désactivez le flash (inutile et contre-productif à cette distance), passez en mode nuit ou mode astrophotographie si votre téléphone le propose, et si l'application le permet, réglez manuellement une durée d'exposition de 10 à 20 secondes, une sensibilité ISO modérée (400 à 800 pour limiter le bruit numérique) et la mise au point sur l'infini. Désactivez également la stabilisation optique si l'appareil est sur trépied : elle peut parfois introduire du flou sur une pose fixe.\n\nLe minutage du déclenchement est important : lancez la prise de vue 15 à 30 secondes avant l'heure de passage annoncée, pour être certain de capturer le début du trajet, et laissez si possible plusieurs poses s'enchaîner pour couvrir l'ensemble du passage, qui peut durer jusqu'à 5-6 minutes lors des meilleurs passages. Le résultat attendu est une fine ligne blanche continue traversant le cadre, sans interruption ni scintillement — c'est justement cette continuité, contrairement au clignotement d'un avion, qui permet de confirmer après coup qu'il s'agissait bien de l'ISS.\n\nParmi les erreurs les plus fréquentes : viser une portion de ciel trop étroite (mieux vaut cadrer large, avec un peu d'horizon et de premier plan pour donner de l'échelle à la photo), oublier de vérifier l'autonomie de la batterie par temps froid, ou tout simplement se fier à l'heure affichée sans tenir compte du fuseau horaire ou de l'heure d'été/hiver. Pour les amateurs qui veulent aller plus loin, un appareil photo hybride ou reflex avec un objectif grand-angle et un mode bulb (pose B) permettra un contrôle plus fin de l'exposition, mais un smartphone récent bien réglé suffit largement pour un premier essai réussi.",
    category: "Photo",
    date: "2025-11-15",
    readingTime: 5,
    cover: "📱",
  },
  {
    slug: "activite-espace-a-imprimer",
    image: "/blog/kids-tracking-iss.jpg",
    title: "Activité espace à imprimer pour les enfants",
    metaDescription: "Kit gratuit d'activités espace à imprimer : coloriages, quiz, fiches pédagogiques sur l'ISS et le système solaire, pour la maison ou la classe.",
    excerpt: "Coloriages, quiz, fiches pédagogiques : de quoi occuper un mercredi après-midi tout en apprenant, sans écran.",
    content:
      "Faire découvrir l'espace à un enfant ne demande pas forcément un écran ni un abonnement : notre kit espace gratuit rassemble plusieurs supports imprimables pensés pour occuper intelligemment un mercredi après-midi, une après-midi pluvieuse ou une séance de classe, à la maison comme à l'école.\n\nLe kit comprend d'abord une série de coloriages thématiques — une fusée, l'ISS avec ses panneaux solaires caractéristiques, les principales planètes du système solaire — pensés pour être accessibles dès le cycle 1, avec des traits suffisamment larges pour les plus jeunes. Vient ensuite un quiz à choix multiples pour tester les connaissances de façon ludique : nombre d'astronautes à bord, vitesse de la station, durée d'une orbite, noms des agences spatiales partenaires. Ce format quiz fonctionne bien en autonomie comme en groupe, et peut servir de point de départ à une discussion plus large sur l'espace.\n\nLe kit inclut également des fiches pédagogiques plus détaillées, calibrées pour les cycles 2 et 3 (du CP au CM2), qui reprennent les notions clés de manière simplifiée : qu'est-ce qu'une orbite, pourquoi flotte-t-on en apesanteur, comment la station est-elle ravitaillée, qui y vit et pendant combien de temps. Ces fiches sont conçues pour être utilisées telles quelles par un enseignant ou un parent, sans préparation supplémentaire.\n\nTous ces supports sont téléchargeables et imprimables librement depuis notre page Ressources, en format prêt à imprimer sur une simple imprimante familiale ou scolaire. Un pack complet destiné aux enseignants, avec des séquences pédagogiques plus structurées et des supports d'évaluation, est en préparation et sera annoncé sur cette même page dès sa disponibilité.",
    category: "Enfants",
    date: "2025-11-22",
    readingTime: 4,
    cover: "🎨",
  },
  {
    slug: "expliquer-iss-primaire",
    image: "/blog/kids-tracking-iss.jpg",
    title: "Comment expliquer l'ISS à des élèves de primaire ?",
    metaDescription: "Pistes pédagogiques concrètes pour présenter la Station Spatiale Internationale en classe de primaire : comparaisons, expériences simples, supports visuels.",
    excerpt: "Comparaisons concrètes, expériences simples et supports visuels pour rendre l'ISS accessible aux 6-10 ans, sans jargon scientifique.",
    content:
      "Présenter la Station Spatiale Internationale à des enfants de 6 à 10 ans demande surtout de traduire des notions abstraites — orbite, apesanteur, vitesse orbitale — en repères concrets qu'ils peuvent visualiser ou manipuler. Voici plusieurs pistes testées et éprouvées pour une séance de classe ou une discussion à la maison.\n\nPour donner une idée de la taille de la station, la comparaison la plus efficace reste celle du terrain de football : l'ISS, avec l'ensemble de ses modules et de ses panneaux solaires déployés, occupe à peu près la surface d'un terrain de football professionnel. C'est un repère que la plupart des enfants connaissent déjà, ce qui rend la comparaison immédiatement parlante, bien plus qu'une dimension en mètres qui resterait abstraite.\n\nPour expliquer l'apesanteur, l'expérience de la bouteille percée fonctionne remarquablement bien et peut être réalisée en classe en quelques secondes : percez une bouteille en plastique remplie d'eau sur le côté, l'eau s'écoule normalement tant que la bouteille est tenue immobile. Mais si vous laissez tomber la bouteille en chute libre (au-dessus d'une bassine, par précaution), l'eau cesse instantanément de s'écouler par le trou pendant la chute. C'est exactement le même principe physique qui explique l'apesanteur à bord de l'ISS : la station et tout ce qu'elle contient, y compris les astronautes, sont en réalité constamment en train de « tomber » autour de la Terre, ce qui produit cette sensation d'apesanteur.\n\nPour aborder la notion d'orbite et de vitesse, un jeu simple consiste à faire deviner aux élèves combien de fois l'ISS fait le tour de la Terre pendant une seule journée d'école (réponse : environ 16 fois), puis à leur demander de calculer combien de temps dure un tour (environ 90 minutes, soit à peu près la durée d'une matinée de classe avec récréation). Cela permet d'ancrer très concrètement une notion de vitesse par ailleurs difficile à se représenter (environ 28 000 km/h).\n\nEnfin, pour rendre la présence humaine à bord plus tangible, il est utile de rappeler que l'ISS est habitée en permanence depuis novembre 2000 par des équipages internationaux qui se relaient tous les quelques mois, et que ces astronautes y mènent de véritables expériences scientifiques — biologie, physique des fluides, médecine — dont beaucoup ont des applications directes sur Terre. Montrer une photo ou une vidéo courte de la vie quotidienne à bord (repas, sommeil, toilette) complète efficacement ces comparaisons et suscite presque toujours de nombreuses questions spontanées.",
    category: "Enfants",
    date: "2025-12-01",
    readingTime: 5,
    cover: "🎒",
  },
  {
    slug: "pourquoi-iss-ne-tombe-pas",
    title: "Pourquoi l'ISS ne tombe-t-elle pas sur la Terre ?",
    metaDescription:
      "L'ISS est attirée par la Terre et tombe en permanence : découvrez pourquoi sa vitesse l'empêche pourtant de s'écraser.",
    excerpt:
      "La station tombe continuellement vers la Terre, mais sa vitesse transforme cette chute en orbite.",
    content:
      "L'ISS est bien attirée par la gravité terrestre. À environ 400 kilomètres d'altitude, la gravité reste forte : elle vaut encore près de 90 % de celle ressentie au sol. La station n'est donc ni hors de portée de la Terre, ni maintenue en l'air par une absence de gravité. Elle est en chute libre permanente.\n\nCe qui l'empêche de s'écraser est sa vitesse horizontale, proche de 28 000 km/h. Pendant que l'ISS tombe vers le sol, la surface de la Terre se courbe sous sa trajectoire. Elle tombe ainsi autour de notre planète au lieu de la rejoindre. Cette combinaison entre attraction gravitationnelle et vitesse est ce que l'on appelle une orbite.\n\nL'atmosphère n'est toutefois pas complètement absente à cette altitude. Quelques particules freinent progressivement la station et font baisser son orbite. Des vaisseaux ravitailleurs utilisent donc régulièrement leurs moteurs pour la rehausser. Sans ces corrections, l'ISS finirait réellement par redescendre.\n\nPour visualiser cette chute autour de la planète, consultez [la position de l'ISS en temps réel](/position). Sa vitesse actuelle est expliquée dans notre article [Quelle est la vitesse de l'ISS ?](/blog/vitesse-iss), et vous pouvez vérifier [quand elle passera au-dessus de votre ville](/passages).",
    category: "Sciences",
    date: "2026-07-25",
    readingTime: 4,
    cover: "🌍",
  },
  {
    slug: "combien-astronautes-dans-iss",
    title: "Combien d'astronautes vivent dans l'ISS ?",
    metaDescription:
      "Découvrez combien d'astronautes vivent habituellement dans l'ISS, pourquoi l'effectif varie et comment les équipages se relaient.",
    excerpt:
      "L'ISS accueille généralement sept personnes, mais son équipage peut varier pendant les rotations et missions privées.",
    content:
      "L'équipage permanent de l'ISS compte généralement sept personnes. Ce nombre peut temporairement augmenter ou diminuer pendant l'arrivée d'un nouveau vaisseau, le départ d'un équipage ou une mission privée. Il faut donc distinguer la capacité habituelle de la station du nombre exact de personnes présentes à un instant donné.\n\nLes astronautes et cosmonautes restent le plus souvent environ six mois à bord. Ils viennent des agences partenaires de la Station Spatiale Internationale : NASA, Roscosmos, ESA, JAXA et Agence spatiale canadienne. Leurs journées alternent expériences scientifiques, maintenance, sport et échanges avec les équipes au sol.\n\nChaque membre dispose d'un petit espace pour dormir, mais les repas et une partie du travail sont partagés. L'équipage doit aussi consacrer environ deux heures par jour à l'exercice physique afin de limiter la perte musculaire et osseuse provoquée par l'impesanteur.\n\nLe nombre exact change au fil des missions. Pour découvrir la vie quotidienne à bord, lisez [comment vivent les astronautes dans l'ISS](/blog/vie-quotidienne-astronautes-iss). Les enfants peuvent aussi utiliser [nos fiches pédagogiques gratuites](/ressources) et regarder [la Terre depuis l'ISS en direct](/live).",
    category: "Vie à bord",
    date: "2026-07-25",
    readingTime: 4,
    cover: "🧑‍🚀",
  },
  {
    slug: "expose-iss-primaire",
    title: "Exposé sur l'ISS pour le primaire : plan et informations clés",
    metaDescription:
      "Préparez un exposé sur l'ISS au primaire avec un plan simple, des chiffres essentiels et des ressources gratuites à imprimer.",
    excerpt:
      "Un plan en cinq parties et des repères simples pour préparer un exposé clair sur la Station Spatiale Internationale.",
    content:
      "Pour réussir un exposé sur l'ISS au primaire, commencez par une question simple : qu'est-ce que la Station Spatiale Internationale ? Expliquez qu'il s'agit d'un grand laboratoire habité qui tourne autour de la Terre depuis plus de vingt ans. Elle se trouve à environ 400 kilomètres d'altitude et sa taille est comparable à celle d'un terrain de football.\n\nUn plan efficace comporte cinq parties : présentation de l'ISS, construction internationale, vie des astronautes, expériences scientifiques et observation depuis la Terre. Ajoutez quelques chiffres faciles à retenir : environ 28 000 km/h, un tour de Terre en près de 90 minutes et environ seize orbites par jour.\n\nPour rendre l'exposé vivant, montrez une image de la station, une capture de [sa position actuelle](/position) et expliquez qu'elle peut être observée à l'œil nu. Vous pouvez même annoncer [le prochain passage visible](/passages) pour proposer une observation à la classe.\n\nTéléchargez [les fiches pédagogiques et coloriages gratuits](/ressources) pour préparer une affiche ou distribuer un support. Notre guide [Comment expliquer l'ISS à des élèves de primaire ?](/blog/expliquer-iss-primaire) fournit également des comparaisons et expériences simples.",
    category: "Enfants",
    date: "2026-07-25",
    readingTime: 4,
    cover: "📝",
  },
  {
    slug: "fiche-pedagogique-iss-cycle-2",
    title: "Fiche pédagogique ISS cycle 2 à imprimer",
    metaDescription:
      "Fiche pédagogique gratuite sur l'ISS pour le cycle 2 : notions simples, questions de compréhension et support imprimable.",
    excerpt:
      "Une fiche prête à utiliser en CE1–CE2 pour découvrir l'ISS, son orbite et la vie des astronautes.",
    content:
      "Cette fiche pédagogique sur l'ISS est destinée au cycle 2, principalement aux classes de CE1 et CE2. Elle présente avec des mots simples ce qu'est une station spatiale, à quelle altitude elle se trouve et pourquoi des astronautes y vivent.\n\nLa séance peut commencer par l'observation de [la position de l'ISS sur la carte](/position), puis se poursuivre avec trois notions : la Terre est ronde, l'ISS tourne autour d'elle et la station est un laboratoire international. Les élèves peuvent ensuite répondre à quelques questions courtes et dessiner la station avec ses grands panneaux solaires.\n\nLe document imprimable regroupe le texte, les questions et une zone de dessin. Il peut être utilisé en classe, en instruction en famille ou comme prolongement d'une séquence sur le ciel et l'espace.\n\n[Ouvrir la fiche cycle 2 à imprimer](/print/fiches), puis utilisez la fonction d'impression du navigateur pour l'enregistrer en PDF. Retrouvez aussi [les coloriages de l'ISS](/print/coloriages) et [les prochains passages visibles](/passages).",
    category: "Enseignants",
    date: "2026-07-25",
    readingTime: 3,
    cover: "📘",
  },
  {
    slug: "fiche-pedagogique-iss-cycle-3",
    title: "Fiche pédagogique ISS cycle 3 à imprimer",
    metaDescription:
      "Fiche pédagogique gratuite sur l'ISS pour le cycle 3 : impesanteur, recyclage, sciences et coopération internationale.",
    excerpt:
      "Un support cycle 3 prêt à imprimer sur la vie à bord, les expériences et les contraintes de l'impesanteur.",
    content:
      "La fiche ISS cycle 3 approfondit les notions scientifiques adaptées aux élèves de CM1, CM2 et sixième. Elle aborde l'orbite, l'impesanteur, le recyclage de l'eau, l'entretien du corps et la coopération entre agences spatiales.\n\nLa vitesse de la station permet de travailler les grandeurs et les conversions : l'ISS avance à environ 7,7 kilomètres par seconde et effectue près de seize tours de Terre par jour. L'article [Quelle est la vitesse de l'ISS ?](/blog/vitesse-iss) fournit des comparaisons utiles pour préparer la séance.\n\nLes questions de compréhension invitent les élèves à expliquer pourquoi les astronautes font du sport, comment l'eau est recyclée et quels pays participent au programme. Une observation de [la Terre en direct depuis l'ISS](/live) peut compléter le travail.\n\n[Ouvrir la fiche cycle 3 à imprimer](/print/fiches). Le même espace propose [un quiz et d'autres ressources pédagogiques](/ressources) pour construire une séquence complète.",
    category: "Enseignants",
    date: "2026-07-25",
    readingTime: 3,
    cover: "🔬",
  },
  {
    slug: "coloriage-espace-a-imprimer",
    title: "Coloriage espace à imprimer gratuitement",
    metaDescription:
      "Téléchargez gratuitement cinq coloriages espace à imprimer : ISS, astronaute, fusée, Terre et constellation d'Orion.",
    excerpt:
      "Cinq coloriages gratuits pour découvrir l'ISS et l'espace à la maison ou en classe.",
    content:
      "La collection de coloriages espace comprend cinq dessins en noir et blanc : la Station Spatiale Internationale, un astronaute en sortie extravéhiculaire, une fusée, la Terre vue de l'espace et la constellation d'Orion. Les contours sont conçus pour rester nets sur une imprimante familiale ou scolaire.\n\nLe coloriage de l'ISS permet d'identifier ses panneaux solaires, ses modules habitables et ses antennes. Avant de commencer, montrez aux enfants [la Station Spatiale en direct](/live) ou [sa position autour de la Terre](/position) afin de relier l'activité à un objet réel.\n\nCes supports conviennent à une activité calme, un atelier scolaire ou une séquence sur le système solaire. Ils peuvent être complétés par [le quiz et les fiches pédagogiques](/ressources).\n\n[Ouvrir les cinq coloriages espace à imprimer](/print/coloriages). Dans la fenêtre d'impression, choisissez le noir et blanc et une échelle de 100 % pour conserver les proportions.",
    category: "Enfants",
    date: "2026-07-25",
    readingTime: 3,
    cover: "🎨",
  },
  {
    slug: "carte-observation-iss-imprimable",
    title: "Carte d'observation de l'ISS à imprimer",
    metaDescription:
      "Imprimez un guide d'observation de l'ISS avec conditions de visibilité, directions, étoiles brillantes et cartes saisonnières.",
    excerpt:
      "Un guide imprimable pour préparer une soirée d'observation et reconnaître l'ISS dans le ciel.",
    content:
      "Une carte d'observation aide à préparer la sortie avant le passage de l'ISS. Notez l'heure, la direction d'apparition, la hauteur maximale et la direction de disparition. Ces informations changent selon le lieu : commencez donc par consulter [les passages visibles au-dessus de votre position](/passages).\n\nL'ISS ressemble à une étoile blanche très brillante qui traverse régulièrement le ciel sans clignoter. Arrivez cinq minutes avant l'heure annoncée, éloignez-vous des lampadaires directs et utilisez une boussole pour repérer le bon horizon. Aucun télescope n'est nécessaire.\n\nLe guide imprimable rassemble les principales conditions d'observation, les constellations visibles selon les saisons et les étoiles brillantes utiles pour s'orienter. Il convient aux familles, clubs d'astronomie débutants et enseignants.\n\n[Ouvrir la carte d'observation à imprimer](/print/cartes), puis complétez-la avec [la page de passage ISS de votre ville](/passage-iss) et [la position en temps réel](/position).",
    category: "Observation",
    date: "2026-07-25",
    readingTime: 3,
    cover: "🗺️",
  },
];

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);
