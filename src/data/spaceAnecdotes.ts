// Banque d'anecdotes espace / ISS pour le Studio Shorts.
// Chaque anecdote alimente un script de short/Reel (voir src/lib/shortsStudio.ts).

export interface SpaceAnecdote {
  hook: string; // accroche des 3 premières secondes
  fact: string; // corps de l'anecdote
  source?: string;
}

export const spaceAnecdotes: SpaceAnecdote[] = [
  {
    hook: "L'ISS voit 16 levers de soleil par jour",
    fact: "En orbite à 28 000 km/h, la station boucle un tour de la Terre en 92 minutes. Ses occupants assistent donc à 16 levers et 16 couchers de soleil chaque jour.",
  },
  {
    hook: "L'ISS file à 7,7 km par seconde",
    fact: "À cette vitesse, elle traverserait la France en moins de deux minutes. C'est la vitesse nécessaire pour rester en orbite sans retomber.",
  },
  {
    hook: "La station est grande comme un terrain de foot",
    fact: "Avec ses panneaux solaires déployés, l'ISS mesure environ 109 mètres de long — la taille d'un terrain de football américain.",
  },
  {
    hook: "On peut la voir à l'œil nu",
    fact: "Pas besoin de télescope : l'ISS est l'objet artificiel le plus brillant du ciel. Elle apparaît comme une étoile très vive qui glisse sans clignoter.",
  },
  {
    hook: "L'image du live devient parfois noire",
    fact: "Quand l'ISS passe du côté nuit de la Terre, ses caméras extérieures manquent de lumière. L'écran devient noir : c'est normal et temporaire.",
  },
  {
    hook: "Les astronautes grandissent dans l'espace",
    fact: "En apesanteur, la colonne vertébrale se détend : un astronaute peut gagner jusqu'à 5 cm. Il retrouve sa taille en revenant sur Terre.",
  },
  {
    hook: "Il y a un filet à outils flottant à bord",
    fact: "En impesanteur, tout objet lâché s'envole. Les astronautes attachent leurs outils avec des sangles pour ne pas les perdre dans la station.",
  },
  {
    hook: "L'ISS perd de l'altitude chaque mois",
    fact: "Le frottement résiduel de l'atmosphère la fait descendre de quelques centaines de mètres par mois. Des vaisseaux la repoussent régulièrement vers le haut.",
  },
  {
    hook: "Dormir dans l'espace, c'est flotter attaché",
    fact: "Les astronautes dorment dans des sacs de couchage fixés au mur. Sans haut ni bas, la position n'a aucune importance.",
  },
  {
    hook: "L'eau est recyclée à 98 % à bord",
    fact: "Sueur, humidité de l'air et urine sont filtrées et purifiées pour redevenir de l'eau potable. Rien ne se perd en orbite.",
  },
  {
    hook: "Le premier module a 25 ans",
    fact: "Zarya, le premier élément de l'ISS, a été lancé en 1998. La station est habitée en continu depuis novembre 2000.",
  },
  {
    hook: "Une sortie dans l'espace dure 6 à 8 heures",
    fact: "Lors d'une sortie extravéhiculaire, la combinaison est un véritable vaisseau miniature avec oxygène, chauffage et refroidissement.",
  },
  {
    hook: "Les larmes ne coulent pas dans l'espace",
    fact: "En apesanteur, les larmes forment une bulle qui reste collée aux yeux au lieu de couler sur les joues.",
  },
  {
    hook: "L'ISS a coûté environ 150 milliards de dollars",
    fact: "C'est l'objet le plus cher jamais construit par l'humanité, fruit de la coopération de 15 pays.",
  },
  {
    hook: "On y fait du sport 2 heures par jour",
    fact: "Sans gravité, les muscles et les os s'affaiblissent. Tapis de course et vélo attachés sont indispensables pour rester en forme.",
  },
  {
    hook: "La station traverse 16 fuseaux horaires par orbite",
    fact: "Pour éviter la confusion, l'ISS vit à l'heure UTC, quelle que soit la région survolée.",
  },
  {
    hook: "Le café se boit dans une poche",
    fact: "Impossible de remplir une tasse en apesanteur. Les boissons se sirotent dans des poches scellées à l'aide d'une paille.",
  },
  {
    hook: "L'ISS est visible depuis presque toute la Terre",
    fact: "Son orbite inclinée à 51,6° la fait survoler les régions où vit la grande majorité de l'humanité.",
  },
  {
    hook: "Un boulon perdu peut devenir un projectile",
    fact: "En orbite, le moindre débris file à des milliers de km/h. La station effectue parfois des manœuvres pour éviter des débris spatiaux.",
  },
  {
    hook: "On cultive des salades dans l'ISS",
    fact: "L'expérience Veggie a permis aux astronautes de faire pousser et de manger de la laitue cultivée en orbite.",
  },
  {
    hook: "La Terre vue de l'ISS n'a pas de frontières",
    fact: "De nombreux astronautes décrivent l'« effet de survol » : voir la planète entière, fragile et sans frontières, change leur regard sur le monde.",
  },
  {
    hook: "Les aurores boréales se voient d'en haut",
    fact: "Depuis l'ISS, les aurores apparaissent comme des voiles verts ondulant au-dessus des pôles — un des spectacles préférés des équipages.",
  },
  {
    hook: "L'ISS n'est jamais vraiment silencieuse",
    fact: "Ventilateurs et systèmes de survie bourdonnent en permanence. Les astronautes portent parfois des bouchons d'oreille pour dormir.",
  },
  {
    hook: "Un jour à bord dure officiellement 24 h",
    fact: "Malgré les 16 orbites, l'équipage suit un rythme de 24 heures calé sur l'heure UTC pour préserver le sommeil.",
  },
  {
    hook: "La combinaison spatiale a des ongles chauffants",
    fact: "Les gants des combinaisons de sortie intègrent des chauffages, car les extrémités sont les plus exposées au froid extrême de l'espace.",
  },
  {
    hook: "L'ISS pèse plus de 400 tonnes",
    fact: "Assemblée pièce par pièce en orbite, la station a la masse d'environ 320 voitures.",
  },
  {
    hook: "On peut suivre l'ISS en temps réel",
    fact: "Sa position est publique et actualisée en continu : on peut voir survoler océans et continents seconde après seconde depuis un simple navigateur.",
  },
  {
    hook: "Les astronautes votent depuis l'espace",
    fact: "Un dispositif permet aux astronautes américains de voter aux élections directement depuis l'orbite via un bulletin électronique sécurisé.",
  },
  {
    hook: "Le Soleil se lève en 45 minutes de nuit",
    fact: "Chaque orbite, l'ISS passe environ 45 minutes dans l'ombre de la Terre avant de retrouver la lumière du Soleil.",
  },
  {
    hook: "L'odeur de l'espace existe",
    fact: "De retour de sortie, les astronautes décrivent une odeur de métal chaud et de poudre imprégnant les combinaisons.",
  },
  {
    hook: "L'ISS sera désorbitée vers 2030",
    fact: "En fin de vie, la station sera guidée pour retomber dans une zone isolée du Pacifique, loin de toute terre habitée.",
  },
  {
    hook: "Il fait -270 °C à l'ombre, +120 °C au Soleil",
    fact: "Sans atmosphère pour tempérer, l'ISS subit des écarts de température extrêmes entre sa face éclairée et sa face à l'ombre.",
  },
  {
    hook: "On dort bien mieux la tête calée",
    fact: "Sans point d'appui, la tête flotte pendant le sommeil. Les astronautes calent souvent leur oreiller pour se sentir plus stables.",
  },
  {
    hook: "La station a sa propre imprimante 3D",
    fact: "Pour fabriquer des pièces à la demande, l'ISS embarque une imprimante 3D — utile quand la prochaine livraison est à des semaines.",
  },
  {
    hook: "Voir un passage prend moins de 6 minutes",
    fact: "Un passage visible de l'ISS dure généralement entre 2 et 6 minutes, le temps qu'elle traverse le ciel d'un horizon à l'autre.",
  },
  {
    hook: "Le Canadarm2 déplace des modules entiers",
    fact: "Ce bras robotique de 17 mètres attrape les vaisseaux de ravitaillement et déplace des charges de plusieurs tonnes avec précision.",
  },
  {
    hook: "L'ISS a une coupole à 7 fenêtres",
    fact: "La Cupola offre une vue panoramique sur la Terre : c'est l'endroit préféré des astronautes pour observer et photographier.",
  },
  {
    hook: "On ne ronfle presque pas en orbite",
    fact: "L'apesanteur réduit la pression sur les voies respiratoires : le ronflement est nettement moins fréquent dans l'espace.",
  },
  {
    hook: "Un vaisseau met 3 h à rejoindre l'ISS",
    fact: "Grâce à des trajectoires optimisées, certains vaisseaux atteignent la station en quelques heures seulement après le décollage.",
  },
  {
    hook: "La station est un labo en apesanteur unique",
    fact: "Des milliers d'expériences y sont menées : cristaux, combustion, biologie… autant de recherches impossibles à mener sur Terre.",
  },
];
