-- Seed SEO articles (drip sur 60 jours via published_at).
-- Les pages n'apparaissent dans le blog/sitemap/rss qu'une fois published_at <= now()
-- (filtrage au niveau des requêtes de lecture — voir src/lib/blog.ts).
-- Idempotent : ON CONFLICT (slug) DO NOTHING.

INSERT INTO public.blog_posts
  (slug, title, meta_description, excerpt, content, category, cover, reading_time, published, published_at)
VALUES
(
  $md$quand-voir-iss-ce-soir$md$, $md$Quand voir l'ISS ce soir ? Le guide simple$md$, $md$Comment savoir si l'ISS est visible ce soir depuis chez vous : créneaux, direction, durée et outil de passages en temps réel.$md$, $md$L'ISS est-elle visible ce soir près de chez vous ? Voici comment le vérifier en 30 secondes.$md$,
  $md$« Est-ce que je peux voir l'ISS ce soir ? » La réponse dépend de trois conditions réunies au même moment : le ciel doit être sombre au sol, la station doit être éclairée par le Soleil, et son passage doit être suffisamment haut au-dessus de l'horizon pour émerger des immeubles et des arbres.

Concrètement, les meilleurs créneaux se situent dans les deux heures qui suivent le coucher du soleil, ou dans les deux heures avant le lever. À ces moments, vous êtes déjà dans la pénombre alors que l'ISS, à 400 km d'altitude, reçoit encore la lumière solaire et brille comme une étoile très vive qui se déplace.

Pour savoir précisément si l'ISS passe ce soir au-dessus de votre ville, utilisez notre outil de passages : indiquez votre commune ou activez la géolocalisation, et vous obtiendrez l'heure de début, la durée, la hauteur maximale et la direction du passage. Un passage « excellent » culmine à plus de 60° au-dessus de l'horizon.

Le soir venu, placez-vous à l'écart des lampadaires, laissez vos yeux s'habituer à l'obscurité pendant quelques minutes, et regardez dans la direction indiquée. L'ISS apparaît comme un point blanc fixe en luminosité, qui traverse le ciel en ligne droite pendant deux à six minutes, sans clignoter — c'est ce qui la distingue d'un avion.$md$, $md$Observation$md$, $md$🌠$md$, 4,
  true, now() + interval '0 days'
),
(
  $md$heure-passage-iss-france$md$, $md$À quelle heure passe l'ISS en France ?$md$, $md$Les horaires de passage de l'ISS changent chaque jour. Voici comment les connaître pour votre ville et pourquoi ils varient autant.$md$, $md$Pourquoi l'heure de passage de l'ISS change chaque jour — et comment trouver la vôtre.$md$,
  $md$Il n'existe pas d'heure fixe de passage de l'ISS : la station tourne autour de la Terre en environ 92 minutes, soit près de 16 fois par jour. Comme la Terre tourne aussi sous elle, la trace au sol se décale à chaque orbite, et l'heure à laquelle l'ISS survole une ville donnée change tous les jours.

En France, un passage visible peut avoir lieu aussi bien à 5 h du matin qu'à 22 h le soir, selon la période. Sur plusieurs jours consécutifs, les passages du soir ont tendance à s'avancer d'environ 20 à 25 minutes chaque jour.

Tous les passages ne sont pas visibles à l'œil nu. Beaucoup se produisent en pleine journée, quand le ciel est trop lumineux, ou en pleine nuit, quand l'ISS est dans l'ombre de la Terre. Seuls comptent les passages « visibles », au crépuscule ou à l'aube.

Pour connaître l'heure exacte du prochain passage visible au-dessus de chez vous, entrez votre ville dans notre outil de passages. Vous pouvez même ajouter le créneau à votre agenda pour recevoir un rappel avant de sortir observer.$md$, $md$Observation$md$, $md$🕐$md$, 3,
  true, now() + interval '4 days'
),
(
  $md$observer-iss-avec-enfants$md$, $md$Observer l'ISS avec des enfants : mode d'emploi$md$, $md$Une activité gratuite et magique en famille : observer le passage de l'ISS avec des enfants. Préparation, explications et astuces.$md$, $md$Une sortie du soir gratuite et mémorable : repérer la Station Spatiale avec vos enfants.$md$,
  $md$Observer l'ISS est l'une des activités d'astronomie les plus accessibles avec des enfants : pas de matériel, pas de nuit blanche, et un « effet waouh » garanti quand le point lumineux traverse le ciel en sachant qu'il y a des astronautes à bord.

Préparez la sortie en amont. Repérez l'heure du prochain passage visible pour votre ville, notez la direction d'apparition et la durée. Expliquez aux enfants qu'ils vont voir un vaisseau de la taille d'un terrain de football, filant à 28 000 km/h à 400 km au-dessus de leur tête.

Le jour J, sortez cinq minutes avant l'heure annoncée pour laisser les yeux s'adapter à l'obscurité. Choisissez un endroit dégagé, loin des lampadaires. Faites-en un petit jeu : qui repérera le premier le point lumineux ? Comptez ensemble les minutes pendant lesquelles il reste visible.

Prolongez l'expérience à la maison avec notre kit pédagogique à imprimer : coloriages, quiz et fiches sur la vie à bord. Vous pouvez aussi montrer le live vidéo de la Terre vue depuis l'ISS pour faire le lien entre le point dans le ciel et les images de l'espace.$md$, $md$Enfants$md$, $md$👨‍👧$md$, 4,
  true, now() + interval '8 days'
),
(
  $md$qui-est-dans-iss-aujourdhui$md$, $md$Qui est dans l'ISS aujourd'hui ?$md$, $md$Combien d'astronautes se trouvent à bord de l'ISS en ce moment et qui sont-ils ? Liste de l'équipage mise à jour automatiquement.$md$, $md$L'équipage actuellement à bord de la Station Spatiale Internationale, en temps réel.$md$,
  $md$À bord de la Station Spatiale Internationale se relaient en permanence des équipages internationaux, généralement composés de six à sept astronautes et cosmonautes issus de la NASA, de Roscosmos, de l'ESA, de la JAXA et de l'agence canadienne. La liste ci-dessus est mise à jour automatiquement à partir des données publiques de vol spatial.

Les équipages sont organisés en « expéditions » qui durent environ six mois. Les relèves se font par vaisseaux Soyouz ou Crew Dragon, avec un chevauchement de quelques jours pendant lequel la station peut compter jusqu'à onze occupants.

Au quotidien, l'équipage partage son temps entre les expériences scientifiques, la maintenance des systèmes, le sport (indispensable pour lutter contre la fonte musculaire en apesanteur) et, parfois, des sorties extravéhiculaires. Chaque astronaute assiste à seize levers et couchers de soleil par jour.

Pour suivre la station de plus près, découvrez sa position en temps réel sur une carte, ou regardez le live vidéo de la Terre filmée depuis les caméras extérieures.$md$, $md$Sciences$md$, $md$👨‍🚀$md$, 3,
  true, now() + interval '12 days'
),
(
  $md$difference-satellite-etoile-iss$md$, $md$Différence entre satellite, étoile et ISS dans le ciel$md$, $md$Comment distinguer l'ISS d'un satellite, d'une étoile ou d'un avion dans le ciel nocturne ? Les critères simples pour ne pas se tromper.$md$, $md$Point fixe, point qui bouge, point qui clignote : le petit guide pour identifier ce que vous voyez.$md$,
  $md$Un point lumineux dans le ciel du soir peut être bien des choses : une étoile, une planète, un satellite, un avion… ou l'ISS. Quelques critères simples permettent de trancher.

Une étoile ou une planète reste immobile par rapport à l'horizon sur quelques minutes et scintille légèrement (pour les étoiles). Elles ne traversent pas le ciel en temps réel.

Un avion se déplace, mais il possède des feux clignotants — souvent rouges et verts — et on finit par entendre son moteur. L'ISS et les satellites, eux, ne clignotent pas et sont totalement silencieux.

L'ISS se distingue des autres satellites par son éclat : c'est de loin l'objet artificiel le plus brillant du ciel, comparable à la planète Vénus. Elle se déplace d'un bord à l'autre du ciel en deux à six minutes, d'un mouvement régulier, avant de disparaître brusquement quand elle entre dans l'ombre de la Terre. Un satellite ordinaire est bien plus discret et lent en apparence.

En résumé : point fixe qui scintille = étoile ; point qui clignote et vrombit = avion ; point brillant, silencieux et rapide = très probablement l'ISS. Vérifiez l'heure de passage prévue pour votre ville pour confirmer.$md$, $md$Observation$md$, $md$✨$md$, 4,
  true, now() + interval '16 days'
),
(
  $md$combien-de-temps-iss-tour-terre$md$, $md$Combien de temps met l'ISS pour faire le tour de la Terre ?$md$, $md$L'ISS boucle une orbite complète en environ 92 minutes, soit près de 16 tours par jour. Explications sur cette vitesse vertigineuse.$md$, $md$92 minutes par orbite, 16 tours par jour : d'où vient ce rythme effréné ?$md$,
  $md$L'ISS fait le tour complet de la Terre en environ 92 minutes. À raison de 24 heures par jour, cela représente près de 16 orbites quotidiennes — et donc 16 levers et 16 couchers de soleil pour les astronautes à bord.

Ce rythme s'explique par sa vitesse : la station file à environ 28 000 km/h, soit près de 7,7 kilomètres chaque seconde. À cette allure, elle traverse un pays comme la France en quelques minutes seulement.

Pourquoi aller si vite ? À 400 km d'altitude, la gravité terrestre reste forte. Pour ne pas retomber, l'ISS doit « tomber » en permanence à côté de la Terre : sa vitesse horizontale est exactement celle qui équilibre l'attraction gravitationnelle. Trop lente, elle retomberait ; trop rapide, elle s'éloignerait dans l'espace.

Ce mouvement perpétuel de chute libre est aussi ce qui crée l'impesanteur ressentie à bord : astronautes et objets tombent tous ensemble, à la même vitesse, ce qui donne l'impression de flotter.$md$, $md$Sciences$md$, $md$🌍$md$, 3,
  true, now() + interval '20 days'
),
(
  $md$kit-pedagogique-iss-imprimer$md$, $md$Kit pédagogique ISS à imprimer (gratuit)$md$, $md$Téléchargez un kit pédagogique gratuit sur l'ISS : coloriages, fiches, quiz et poster à imprimer pour la maison ou la classe.$md$, $md$Coloriages, fiches, quiz et poster : tout un kit espace gratuit à imprimer.$md$,
  $md$Pour prolonger la découverte de l'espace à la maison ou en classe, nous avons rassemblé un kit pédagogique gratuit entièrement consacré à l'ISS et à l'exploration spatiale, à télécharger et imprimer librement.

Le kit comprend des coloriages (fusée, station spatiale, planètes, astronaute), des fiches documentaires adaptées aux cycles 2 et 3, un quiz pour tester les connaissances, un glossaire illustré et un poster récapitulatif à afficher.

Ces supports sont pensés pour être utilisés sans préparation : un enseignant peut les distribuer en classe, un parent peut occuper un mercredi après-midi pluvieux tout en apprenant. Chaque fiche relie une notion (la vitesse, l'altitude, l'apesanteur) à une activité concrète.

Retrouvez l'ensemble des documents sur notre page Ressources. Astuce : imprimez le poster en A3 et complétez-le au fil des observations réelles de l'ISS depuis votre jardin.$md$, $md$Enfants$md$, $md$🖨️$md$, 2,
  true, now() + interval '24 days'
),
(
  $md$activite-espace-maternelle$md$, $md$Activité espace en maternelle : idées simples$md$, $md$Des idées d'activités sur l'espace et l'ISS pour la maternelle : coloriages, jeux, comptines et petites expériences adaptées aux 3-6 ans.$md$, $md$Des activités espace simples et concrètes pour les tout-petits de maternelle.$md$,
  $md$L'espace fascine les enfants dès la maternelle. À cet âge, l'objectif n'est pas de tout comprendre, mais d'éveiller la curiosité avec des activités concrètes, sensorielles et ludiques autour du thème de l'ISS et des astronautes.

Commencez par des coloriages simples de fusées et de planètes, en nommant les couleurs et les formes. Prolongez avec un jeu de mime : marcher « comme un astronaute » au ralenti pour évoquer l'apesanteur, ou compter à rebours avant un décollage imaginaire.

Une petite expérience marquante : lâcher en même temps une plume et une balle pour parler de la chute, puis expliquer que dans l'ISS, tout flotte parce que tout tombe ensemble. Les images du live vidéo de la Terre depuis l'espace captivent les tout-petits et donnent du sens au mot « planète ».

Terminez par une comptine ou une histoire du soir sur les étoiles. Nos coloriages et fiches les plus simples, disponibles dans le kit à imprimer, conviennent parfaitement à la grande section.$md$, $md$Enfants$md$, $md$🎨$md$, 3,
  true, now() + interval '28 days'
),
(
  $md$carte-du-ciel-enfant-imprimer$md$, $md$Carte du ciel pour enfant à imprimer$md$, $md$Une carte du ciel simplifiée à imprimer pour aider les enfants à repérer les constellations, les planètes et le passage de l'ISS.$md$, $md$Repérer les constellations et l'ISS avec une carte du ciel adaptée aux enfants.$md$,
  $md$Une carte du ciel aide les enfants à transformer un fouillis d'étoiles en repères identifiables : la Grande Ourse, l'étoile polaire, quelques planètes visibles, et la trajectoire d'un passage de l'ISS.

Pour être utile aux plus jeunes, une carte du ciel doit rester simplifiée : peu de constellations, des dessins clairs, et une orientation facile (on tient la carte au-dessus de la tête, face au nord). L'idée est de réussir à pointer du doigt une ou deux constellations, pas de tout mémoriser.

Associez la carte à un passage réel de l'ISS. Repérez l'heure et la direction du prochain passage visible pour votre ville, puis montrez sur la carte le trajet approximatif : l'ISS ne figure pas sur les cartes fixes puisqu'elle se déplace, mais l'exercice apprend à s'orienter.

Vous trouverez une carte du ciel simplifiée ainsi que d'autres supports à imprimer dans notre kit pédagogique gratuit. Plastifiez-la pour l'emmener dehors sans craindre l'humidité.$md$, $md$Enfants$md$, $md$🗺️$md$, 3,
  true, now() + interval '32 days'
),
(
  $md$meilleur-telescope-enfant-debutant$md$, $md$Quel télescope pour un enfant débutant ?$md$, $md$Faut-il un télescope pour observer l'ISS et débuter l'astronomie avec un enfant ? Conseils pour bien choisir un premier instrument.$md$, $md$Jumelles ou télescope pour débuter ? Comment choisir un premier instrument pour un enfant.$md$,
  $md$Bonne nouvelle : pour observer l'ISS, aucun instrument n'est nécessaire. La station est visible à l'œil nu et se déplace trop vite pour être suivie facilement au télescope. Un premier instrument sert plutôt à découvrir la Lune, les planètes et quelques amas d'étoiles.

Pour un enfant débutant, une paire de jumelles (par exemple 10x50) est souvent le meilleur point de départ : simple, robuste, peu coûteuse, elle révèle déjà les cratères de la Lune et les satellites de Jupiter, et sert aussi de jour.

Si vous visez un télescope, privilégiez la simplicité d'usage à la puissance affichée. Un petit télescope de type Dobson (100 à 130 mm) offre des images lumineuses et se manipule intuitivement, sans réglages compliqués qui découragent. Méfiez-vous des modèles vendus sur des grossissements exagérés : la stabilité du trépied et le diamètre comptent davantage.

Quel que soit le choix, l'essentiel est de pouvoir sortir facilement l'instrument : un matériel simple qu'on utilise souvent vaut mieux qu'un télescope complexe qui reste au placard. Retrouvez notre sélection de matériel adapté aux familles sur la page Ressources.$md$, $md$Enfants$md$, $md$🔭$md$, 4,
  true, now() + interval '36 days'
),
(
  $md$reconnaitre-iss-avion-satellite$md$, $md$Comment reconnaître l'ISS d'un avion la nuit ?$md$, $md$ISS ou avion ? Les différences visuelles pour identifier à coup sûr la Station Spatiale dans le ciel nocturne.$md$, $md$Trois indices infaillibles pour ne plus confondre l'ISS avec un avion de nuit.$md$,
  $md$De nuit, un point lumineux mobile intrigue souvent : est-ce un avion ou l'ISS ? Trois indices permettent de trancher sans hésiter.

Premier indice : le clignotement. Un avion porte des feux qui clignotent, souvent colorés (rouge, vert, blanc). L'ISS brille d'une lumière blanche parfaitement continue, sans aucun clignotement.

Deuxième indice : le bruit. Un avion, même haut, finit par se faire entendre. L'ISS est totalement silencieuse : elle est à 400 km d'altitude, bien au-delà de l'atmosphère respirable.

Troisième indice : le comportement. L'ISS suit une trajectoire rectiligne et régulière, puis disparaît souvent brusquement en plein ciel — c'est le moment où elle entre dans l'ombre de la Terre et cesse d'être éclairée par le Soleil. Un avion, lui, s'éloigne progressivement à l'horizon.

En cas de doute, le plus sûr reste de vérifier à l'avance l'heure et la direction du passage de l'ISS prévu pour votre ville : si le point lumineux correspond, c'est bien elle.$md$, $md$Observation$md$, $md$🛩️$md$, 3,
  true, now() + interval '40 days'
),
(
  $md$iss-visible-meteo-conditions$md$, $md$Météo et pollution lumineuse : voir l'ISS dans de bonnes conditions$md$, $md$Nuages, pleine lune, pollution lumineuse : quels facteurs influencent la visibilité de l'ISS et comment mettre toutes les chances de son côté.$md$, $md$Ciel dégagé, coin sombre, bon timing : les conditions idéales pour observer l'ISS.$md$,
  $md$Un passage de l'ISS peut être annoncé « excellent » et pourtant passer inaperçu si les conditions au sol ne suivent pas. Trois facteurs jouent un rôle majeur.

La couverture nuageuse d'abord : l'ISS brille fort, mais elle ne perce pas une couche de nuages épaisse. Consultez la météo locale pour l'heure précise du passage, et non pour la journée entière — une éclaircie de quelques minutes peut suffire.

La pollution lumineuse ensuite. Contrairement aux étoiles filantes ou aux galaxies, l'ISS reste visible même depuis une ville, car elle est extrêmement brillante. Mais s'éloigner des lampadaires directs et laisser ses yeux s'adapter à l'obscurité améliore nettement le confort d'observation.

Enfin, la hauteur du passage. Un passage qui culmine bas sur l'horizon sera masqué par les bâtiments et l'épaisseur de l'atmosphère. Privilégiez les passages dont la hauteur maximale dépasse 40°, indiqués comme « bons » ou « excellents » dans notre outil.

Réunissez ciel dégagé, coin dégagé de l'horizon et bon timing, et l'ISS devient l'un des spectacles les plus faciles du ciel.$md$, $md$Observation$md$, $md$🌤️$md$, 3,
  true, now() + interval '44 days'
),
(
  $md$application-suivi-iss$md$, $md$Suivre l'ISS sans application : tout faire depuis le web$md$, $md$Pas besoin d'installer une application pour suivre l'ISS : position en direct, passages et alertes se consultent directement depuis un navigateur.$md$, $md$Position, passages et alertes de l'ISS : tout est accessible depuis le web, sans installer d'app.$md$,
  $md$Beaucoup cherchent « application ISS » pour suivre la station, mais l'essentiel se fait directement depuis un navigateur, sans rien installer ni créer de compte.

Pour voir où se trouve l'ISS en ce moment, une carte en temps réel affiche sa position, son altitude et sa vitesse, mises à jour en continu. Vous visualisez ainsi son survol des océans et des continents seconde après seconde.

Pour savoir quand elle sera visible depuis chez vous, l'outil de passages calcule les prochains créneaux à partir de votre ville : heure, durée, direction et hauteur. Vous pouvez ajouter un passage à votre agenda pour recevoir un rappel, ou vous inscrire pour être alerté par e-mail avant un passage au-dessus de votre commune.

L'avantage du web : rien à mettre à jour, tout fonctionne sur ordinateur comme sur téléphone, et vous gardez le contrôle sur vos données. Ajoutez simplement la page à votre écran d'accueil pour un accès rapide, comme une application.$md$, $md$Observation$md$, $md$📱$md$, 3,
  true, now() + interval '48 days'
),
(
  $md$iss-fin-de-vie-2030$md$, $md$Que va devenir l'ISS après 2030 ?$md$, $md$La fin de vie de l'ISS est programmée autour de 2030. Désorbitation, stations privées : ce qui attend la Station Spatiale Internationale.$md$, $md$La retraite de l'ISS approche : voici ce qui est prévu autour de 2030.$md$,
  $md$Après plus de deux décennies d'occupation continue, l'ISS approche de sa fin de vie. Les agences spatiales prévoient de l'exploiter jusque vers 2030, avant une désorbitation contrôlée.

Une station en orbite basse se dégrade avec le temps : frottements résiduels de l'atmosphère, fatigue des structures, coûts de maintenance croissants. Plutôt que de la laisser retomber de façon incontrôlée, un vaisseau dédié doit la faire plonger vers un point isolé de l'océan Pacifique, loin de toute terre habitée.

L'après-ISS se prépare déjà. Plusieurs projets de stations privées et de nouveaux modules commerciaux visent à prendre le relais en orbite basse, tandis que l'attention se tourne aussi vers la Lune avec la station Gateway.

D'ici là, l'ISS reste pleinement active et visible dans le ciel : chaque passage observé est une occasion de plus d'admirer un objet qui appartiendra bientôt à l'histoire de la conquête spatiale. Profitez-en pour la montrer aux enfants tant qu'elle brille au-dessus de nos têtes.$md$, $md$Sciences$md$, $md$🛰️$md$, 4,
  true, now() + interval '52 days'
),
(
  $md$photographier-iss-pose-longue$md$, $md$Photographier le passage de l'ISS en pose longue$md$, $md$Comment photographier la traînée lumineuse de l'ISS avec un appareil ou un smartphone en pose longue : réglages et astuces.$md$, $md$Transformer un passage de l'ISS en filé lumineux : le B.A.-BA de la pose longue.$md$,
  $md$Photographier l'ISS ne demande pas de matériel de pro : le principe est de garder l'obturateur ouvert pendant que la station traverse le champ, pour enregistrer une belle traînée lumineuse.

Installez l'appareil sur un trépied ou une surface stable — toute vibration ruinerait la netteté. Cadrez large en direction du passage annoncé, avec un premier plan (arbre, clocher, horizon) pour donner de l'échelle.

Côté réglages, visez une pose longue de 15 à 30 secondes, une sensibilité modérée (ISO 400 à 800) et une mise au point sur l'infini. Déclenchez juste avant l'arrivée de l'ISS et laissez-la traverser : elle laissera un trait blanc régulier sur l'image. Un déclencheur à distance ou le retardateur évite de bouger l'appareil.

Les smartphones récents s'en sortent aussi grâce au mode nuit ou astrophotographie, qui cumule plusieurs secondes d'exposition. Pour enchaîner plusieurs poses et reconstituer toute la trajectoire, utilisez un mode intervallomètre et empilez les images ensuite.

Vérifiez toujours l'heure et la direction du passage à l'avance : en photo de nuit, on n'a pas droit à une seconde chance.$md$, $md$Photo$md$, $md$📷$md$, 4,
  true, now() + interval '56 days'
)
ON CONFLICT (slug) DO NOTHING;
