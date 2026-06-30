import { createFileRoute } from "@tanstack/react-router";
import { printDoc } from "@/lib/print-utils";

const TERMES: Array<[string, string]> = [
  ["Apesanteur", "État ressenti par un astronaute en orbite où l'attraction gravitationnelle est compensée par la chute libre permanente. Les objets semblent flotter."],
  ["Apogée", "Point de l'orbite d'un satellite le plus éloigné de la Terre."],
  ["Astronaute", "Personne formée pour voyager dans l'espace (terme utilisé par les États-Unis et l'Europe)."],
  ["Atmosphère", "Couche de gaz entourant la Terre, composée d'azote (78 %), d'oxygène (21 %) et d'autres gaz. Essentielle à la vie."],
  ["Azimut", "Angle de direction d'un objet céleste mesuré horizontalement depuis le nord vers l'est (0° = nord, 90° = est)."],
  ["Cargo spatial", "Vaisseau automatique transportant des provisions, matériels et carburant vers l'ISS (ex. Progress, Cygnus, Dragon Cargo)."],
  ["Combinaison spatiale", "Scaphandre pressurisé porté par les astronautes lors des sorties extravéhiculaires (EVA) ou des décollages/atterrissages."],
  ["Cosmodrome", "Centre de lancement spatial (Baïkonour au Kazakhstan, Plesetsk en Russie)."],
  ["Cosmonaut", "Terme russe désignant un astronaute (« kósmos » = espace, « naút » = navigateur)."],
  ["Décollage", "Moment où une fusée quitte le sol grâce à la poussée de ses moteurs."],
  ["Dragon (SpaceX)", "Vaisseau spatial réutilisable développé par SpaceX pour transporter astronautes et cargo vers l'ISS."],
  ["Éclipse", "Phénomène où un astre passe dans l'ombre d'un autre (éclipse solaire : Lune devant le Soleil ; éclipse lunaire : Lune dans l'ombre de la Terre)."],
  ["Électrolyse", "Procédé chimique utilisé sur l'ISS pour produire de l'oxygène en décomposant l'eau (H₂O) en hydrogène et oxygène."],
  ["ESA", "Agence Spatiale Européenne (European Space Agency). Regroupe 22 pays membres dont la France."],
  ["EVA", "Extra-Vehicular Activity (activité extravéhiculaire). Sortie d'un astronaute dans l'espace en dehors de son vaisseau."],
  ["Exoplanète", "Planète qui orbite autour d'une étoile autre que le Soleil."],
  ["Fenêtre de lancement", "Plage de temps restreinte pendant laquelle un lancement spatial peut avoir lieu pour atteindre sa cible."],
  ["Fusée", "Véhicule propulsé par réaction chimique. La fusée expulse des gaz à grande vitesse vers le bas pour s'élever."],
  ["Galaxie", "Immense rassemblement d'étoiles, de gaz, de poussières et de matière noire liés par la gravité. La Voie lactée est notre galaxie."],
  ["Gravité", "Force d'attraction entre les masses. La gravité terrestre maintient les objets au sol et garde la Lune en orbite."],
  ["Hublot", "Fenêtre pressurisée d'un vaisseau spatial permettant aux astronautes d'observer l'extérieur."],
  ["Inclinaison orbitale", "Angle entre le plan de l'orbite et l'équateur terrestre. L'ISS a une inclinaison de 51,6°."],
  ["ISS", "International Space Station — Station Spatiale Internationale. Laboratoire orbital habité en permanence depuis 2000, à ~400 km d'altitude."],
  ["JAXA", "Japan Aerospace Exploration Agency. Agence spatiale japonaise, partenaire de l'ISS avec le module Kibō."],
  ["Laboratoire Kibō", "Module japonais de l'ISS, le plus grand de la station. Équipé d'une « fenêtre vers l'espace » pour lancer de petits satellites."],
  ["Lune", "Seul satellite naturel de la Terre. Distance : ~384 000 km. Diamètre : ~3 474 km."],
  ["Magnitude", "Mesure de la brillance apparente d'un astre vue depuis la Terre. Plus la valeur est faible (ou négative), plus l'astre est brillant."],
  ["Manœuvre orbitale", "Activation des moteurs d'un vaisseau pour modifier son orbite (montée, descente, rendez-vous, freinage)."],
  ["Météorite", "Fragment de roche ou de métal extraterrestre qui a traversé l'atmosphère et touché la surface terrestre."],
  ["Microgravité", "Terme plus précis qu'apesanteur : il reste une infime gravité à bord de l'ISS (environ 10⁻⁶ g), d'où le préfixe « micro »."],
  ["Mission spatiale", "Ensemble d'objectifs définis qu'un vaisseau ou des astronautes doivent accomplir dans l'espace."],
  ["Module", "Compartiment pressurisé d'une station spatiale ou d'un vaisseau. L'ISS est composée de plus de 16 modules interconnectés."],
  ["NASA", "National Aeronautics and Space Administration. Agence spatiale américaine, fondée en 1958."],
  ["Nébuleuse", "Nuage de gaz et de poussières dans l'espace, souvent le berceau d'étoiles nouvelles (ex. Nébuleuse d'Orion, M42)."],
  ["Orbite", "Trajectoire courbe qu'un objet (satellite, planète) décrit autour d'un autre corps céleste sous l'effet de la gravité."],
  ["Orbite basse (LEO)", "Low Earth Orbit. Altitude entre 160 et 2 000 km. C'est là que se trouvent l'ISS et la majorité des satellites."],
  ["Oxygène", "Gaz vital pour la respiration humaine. Produit sur l'ISS par électrolyse de l'eau."],
  ["Périgée", "Point de l'orbite d'un satellite le plus proche de la Terre (opposé de l'apogée)."],
  ["Période orbitale", "Temps mis par un satellite pour accomplir une orbite complète. Pour l'ISS : ~90 minutes."],
  ["Planète", "Corps céleste sphérique qui orbite autour d'une étoile et a « nettoyé » son voisinage orbital. Le système solaire compte 8 planètes."],
  ["Point de Lagrange", "Position dans l'espace où les forces gravitationnelles de deux corps massifs (ex. Terre-Soleil) s'équilibrent. Le télescope James Webb est au point L2."],
  ["Pression atmosphérique", "Force exercée par l'air sur une surface. À bord de l'ISS, une pression identique à celle du sol est maintenue artificiellement."],
  ["Propulsion", "Force qui fait avancer un vaisseau. Dans l'espace, les moteurs-fusées brûlent un carburant et un comburant pour expulser des gaz."],
  ["Quarantaine (spatiale)", "Isolement médical des astronautes avant le départ (pour protéger l'ISS) et après le retour (pour réadaptation et prévention)."],
  ["Radiations", "Rayonnements énergétiques (ultraviolets, rayons X, particules cosmiques) dangereux dans l'espace. L'ISS dispose de protections."],
  ["Ravitaillement", "Envoi de provisions (nourriture, eau, carburant, équipements) vers l'ISS via des cargos automatiques."],
  ["Recyclage", "Sur l'ISS, l'air et l'eau sont recyclés en boucle fermée pour économiser les ressources vitales."],
  ["Rentrée atmosphérique", "Phase de retour d'un vaisseau qui pénètre dans l'atmosphère à grande vitesse, générant une chaleur intense par friction."],
  ["Roscosmos", "Agence spatiale russe. Gère les vaisseaux Soyouz et les modules russes de l'ISS (Zarya, Zvezda…)."],
  ["Satellite", "Objet en orbite autour d'un corps céleste. Peut être naturel (Lune) ou artificiel (ISS, GPS, météo)."],
  ["Scintillement", "Clignotement apparent des étoiles dû à la turbulence atmosphérique. Les planètes scintillent peu car elles ont un diamètre apparent plus grand."],
  ["Soyouz", "Vaisseau spatial russe encore utilisé pour transporter les astronautes vers l'ISS. En service depuis 1966."],
  ["SpaceX", "Entreprise privée américaine fondée par Elon Musk. Développe les fusées Falcon 9/Heavy et les vaisseaux Dragon."],
  ["Station spatiale", "Vaisseau spatial habitable placé en orbite pour permettre à des équipages de séjourner dans l'espace."],
  ["Système solaire", "Ensemble composé du Soleil et de tout ce qui orbite autour : 8 planètes, planètes naines, astéroïdes, comètes, Oort…"],
  ["Télescope James Webb", "Télescope spatial infrarouge lancé en 2021. Placé au point L2, à 1,5 million de km de la Terre. Il observe l'univers primordial."],
  ["Télescope Hubble", "Télescope spatial lancé en 1990 en orbite à 550 km. A révolutionné notre connaissance de l'univers avec ses images."],
  ["Trou noir", "Région de l'espace-temps où la gravité est si intense que rien, pas même la lumière, ne peut s'en échapper."],
  ["Vaisseau Crew Dragon", "Capsule spatiale de SpaceX pour transporter jusqu'à 4 astronautes vers l'ISS. Réutilisable."],
  ["Véhicule de rentrée", "Capsule conçue pour revenir sur Terre en résistant à la chaleur de la rentrée atmosphérique (ex. Soyouz, Dragon)."],
  ["Vitesse de libération", "Vitesse minimale (~11,2 km/s depuis la Terre) pour qu'un objet échappe définitivement à la gravité d'un corps céleste."],
  ["Voie lactée", "Notre galaxie spirale, contenant entre 100 et 400 milliards d'étoiles. Le Soleil se trouve dans un de ses bras spiraux."],
  ["Zénith", "Point de la sphère céleste situé directement au-dessus de l'observateur (opposé du nadir)."],
  ["Zéro absolu", "Température la plus basse théoriquement possible : −273,15 °C (0 kelvin). Dans l'espace profond, on approche −270 °C."],
];

export const Route = createFileRoute("/print/glossaire")({
  server: {
    handlers: {
      GET: async () => {
        const sorted = [...TERMES].sort((a, b) => a[0].localeCompare(b[0], "fr"));

        const termesHtml = sorted.map(([terme, def]) => `
<div style="margin-bottom:8px;break-inside:avoid">
  <span style="font-weight:700;font-family:Arial,sans-serif">${terme}</span>
  <span style="font-family:Arial,sans-serif;font-size:11px;color:#333"> — ${def}</span>
</div>`).join("");

        const body = `
<h1>📖 Glossaire spatial — ${sorted.length} termes</h1>
<p style="font-family:Arial,sans-serif;font-size:12px;color:#555;margin-bottom:16px">Définitions claires et accessibles pour comprendre le vocabulaire de l'espace et de l'ISS.</p>

<div style="columns:2;column-gap:24px;font-size:12px;line-height:1.5">
${termesHtml}
</div>

<p style="font-family:Arial,sans-serif;font-size:10px;color:#888;margin-top:20px;text-align:center">
  © ISS Direct France · iss-direct-france.fr · Reproduction autorisée à usage pédagogique
</p>
`;

        return new Response(printDoc("Glossaire spatial", body, `columns{columns:2}`), {
          headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
