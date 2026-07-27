import { createFileRoute } from "@tanstack/react-router";
import { printDoc } from "@/lib/print-utils";

const PLANETES = [
  {
    nom: "Mercure",
    emoji: "⚫",
    couleur: "#8a8a8a",
    distance: "58 millions km",
    diametre: "4 879 km",
    masse: "0,055 × Terre",
    orbite: "88 jours",
    rotation: "59 jours",
    satellites: "0",
    temp: "−180 à +430°C",
    note: "La plus petite planète et la plus proche du Soleil. Sans atmosphère, les températures y sont extrêmes.",
  },
  {
    nom: "Vénus",
    emoji: "🟡",
    couleur: "#e8c84a",
    distance: "108 millions km",
    diametre: "12 104 km",
    masse: "0,815 × Terre",
    orbite: "225 jours",
    rotation: "243 jours (rétrograde)",
    satellites: "0",
    temp: "+465°C (constante)",
    note: "La planète la plus chaude du système solaire, malgré sa position plus éloignée que Mercure. Épaisse atmosphère de CO₂.",
  },
  {
    nom: "Terre",
    emoji: "🔵",
    couleur: "#2a7de1",
    distance: "150 millions km",
    diametre: "12 742 km",
    masse: "5,97 × 10²⁴ kg",
    orbite: "365,25 jours",
    rotation: "24 heures",
    satellites: "1 (Lune)",
    temp: "−89 à +58°C",
    note: "La seule planète connue abritant la vie. 71% de sa surface est couverte d'eau liquide.",
  },
  {
    nom: "Mars",
    emoji: "🔴",
    couleur: "#c0392b",
    distance: "228 millions km",
    diametre: "6 779 km",
    masse: "0,107 × Terre",
    orbite: "687 jours",
    rotation: "24h 37min",
    satellites: "2 (Phobos, Deimos)",
    temp: "−125 à +20°C",
    note: "La planète rouge. Possède le plus grand volcan du système solaire : Olympus Mons (25 km de haut).",
  },
  {
    nom: "Jupiter",
    emoji: "🟤",
    couleur: "#c8834a",
    distance: "778 millions km",
    diametre: "139 820 km",
    masse: "318 × Terre",
    orbite: "11,9 ans",
    rotation: "9h 56min",
    satellites: "95+",
    temp: "−110°C (nuages)",
    note: "La plus grande planète du système solaire. La Grande Tache Rouge est une tempête géante en activité depuis +350 ans.",
  },
  {
    nom: "Saturne",
    emoji: "🪐",
    couleur: "#e8d58a",
    distance: "1,4 milliard km",
    diametre: "116 460 km",
    masse: "95 × Terre",
    orbite: "29,5 ans",
    rotation: "10h 42min",
    satellites: "146+",
    temp: "−140°C (nuages)",
    note: "Ses anneaux sont composés de glace et de roches. Sa densité est si faible qu'elle flotterait sur l'eau.",
  },
  {
    nom: "Uranus",
    emoji: "🩵",
    couleur: "#72c0d6",
    distance: "2,9 milliards km",
    diametre: "50 724 km",
    masse: "14,5 × Terre",
    orbite: "84 ans",
    rotation: "17h 14min (rétrograde)",
    satellites: "28",
    temp: "−195°C",
    note: "Tourne sur le côté (axe incliné à 98°). La planète la plus froide du système solaire.",
  },
  {
    nom: "Neptune",
    emoji: "🔵",
    couleur: "#2055c8",
    distance: "4,5 milliards km",
    diametre: "49 244 km",
    masse: "17 × Terre",
    orbite: "165 ans",
    rotation: "16h 6min",
    satellites: "16",
    temp: "−200°C",
    note: "Les vents les plus rapides du système solaire (jusqu'à 2 100 km/h). Triton, son plus grand satellite, orbite à l'envers.",
  },
];

export const Route = createFileRoute("/print/poster")({
  server: {
    handlers: {
      GET: async () => {
        const planetesHtml = PLANETES.map(
          (p, i) => `
<div style="margin-bottom:16px;break-inside:avoid;border-left:4px solid ${p.couleur};padding-left:12px">
  <div style="display:flex;align-items:baseline;gap:8px;margin-bottom:4px">
    <span style="font-size:22px">${p.emoji}</span>
    <h2 style="font-size:16px;margin:0">${p.nom}</h2>
    <span style="font-family:Arial,sans-serif;font-size:10px;color:#888">#${i + 1} depuis le Soleil</span>
  </div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px 12px;font-family:Arial,sans-serif;font-size:10.5px;margin-bottom:6px">
    <span>📏 Ø : <strong>${p.diametre}</strong></span>
    <span>📡 Distance : <strong>${p.distance}</strong></span>
    <span>⚖️ Masse : <strong>${p.masse}</strong></span>
    <span>🔄 Orbite : <strong>${p.orbite}</strong></span>
    <span>🌀 Rotation : <strong>${p.rotation}</strong></span>
    <span>🌙 Satellites : <strong>${p.satellites}</strong></span>
    <span>🌡️ Températures : <strong>${p.temp}</strong></span>
  </div>
  <p style="font-family:Arial,sans-serif;font-size:11px;color:#444;margin:0">${p.note}</p>
</div>`,
        ).join("");

        const body = `
<h1>🪐 Poster — Le système solaire</h1>
<p style="font-family:Arial,sans-serif;font-size:12px;color:#555;margin-bottom:4px">Données scientifiques sur les 8 planètes du système solaire. Distances moyennes au Soleil.</p>

<!-- Schéma des tailles relatives -->
<div style="margin:14px 0;text-align:center;font-family:Arial,sans-serif">
  <p style="font-size:11px;color:#666;margin-bottom:8px">Tailles relatives des planètes (non à l'échelle des distances)</p>
  <svg viewBox="0 0 700 80" width="100%" xmlns="http://www.w3.org/2000/svg" style="border:1px solid #eee;border-radius:6px;background:#fafafa">
    <!-- Soleil (tronqué) -->
    <circle cx="30" cy="40" r="38" fill="none" stroke="#FFB020" stroke-width="2.5"/>
    <text x="15" y="75" font-family="Arial" font-size="8" fill="#666">☀️</text>
    <!-- Mercure -->
    <circle cx="90" cy="40" r="4" fill="none" stroke="#8a8a8a" stroke-width="1.5"/>
    <text x="86" y="60" font-family="Arial" font-size="7.5" fill="#666">Merc.</text>
    <!-- Vénus -->
    <circle cx="120" cy="40" r="9" fill="none" stroke="#e8c84a" stroke-width="1.5"/>
    <text x="112" y="60" font-family="Arial" font-size="7.5" fill="#666">Vénus</text>
    <!-- Terre -->
    <circle cx="160" cy="40" r="10" fill="none" stroke="#2a7de1" stroke-width="2"/>
    <text x="153" y="60" font-family="Arial" font-size="7.5" fill="#666">Terre</text>
    <!-- Mars -->
    <circle cx="200" cy="40" r="6" fill="none" stroke="#c0392b" stroke-width="1.5"/>
    <text x="195" y="60" font-family="Arial" font-size="7.5" fill="#666">Mars</text>
    <!-- Jupiter -->
    <circle cx="270" cy="40" r="36" fill="none" stroke="#c8834a" stroke-width="2.5"/>
    <text x="260" y="82" font-family="Arial" font-size="7.5" fill="#666">Jupiter</text>
    <!-- Saturne + anneaux -->
    <ellipse cx="380" cy="40" rx="52" ry="6" fill="none" stroke="#e8d58a" stroke-width="1.5"/>
    <circle cx="380" cy="40" r="28" fill="none" stroke="#e8d58a" stroke-width="2.5"/>
    <text x="368" y="82" font-family="Arial" font-size="7.5" fill="#666">Saturne</text>
    <!-- Uranus -->
    <circle cx="470" cy="40" r="18" fill="none" stroke="#72c0d6" stroke-width="2"/>
    <text x="461" y="70" font-family="Arial" font-size="7.5" fill="#666">Uranus</text>
    <!-- Neptune -->
    <circle cx="540" cy="40" r="17" fill="none" stroke="#2055c8" stroke-width="2"/>
    <text x="529" y="70" font-family="Arial" font-size="7.5" fill="#666">Neptune</text>
  </svg>
</div>

<div style="columns:2;column-gap:24px">
${planetesHtml}
</div>

<div class="page-break"></div>

<h2>☀️ Le Soleil — Notre étoile</h2>
<div style="border-left:4px solid #FFB020;padding-left:12px;margin-bottom:16px">
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px 12px;font-family:Arial,sans-serif;font-size:11px;margin-bottom:8px">
    <span>📏 Diamètre : <strong>1 392 700 km</strong> (109× Terre)</span>
    <span>⚖️ Masse : <strong>333 000× Terre</strong></span>
    <span>🌡️ Surface : <strong>5 500°C</strong></span>
    <span>🌡️ Cœur : <strong>15 000 000°C</strong></span>
    <span>⭐ Type : <strong>Naine jaune (G2V)</strong></span>
    <span>🕰️ Âge : <strong>4,6 milliards d'années</strong></span>
  </div>
  <p style="font-family:Arial,sans-serif;font-size:11px;color:#444">Le Soleil représente 99,86% de la masse du système solaire. Il est composé d'hydrogène (73%) et d'hélium (25%). La lumière du Soleil met 8 minutes 20 secondes pour atteindre la Terre.</p>
</div>

<h2>🌙 La Lune — Notre satellite naturel</h2>
<div style="border-left:4px solid #aaa;padding-left:12px;margin-bottom:16px">
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px 12px;font-family:Arial,sans-serif;font-size:11px;margin-bottom:8px">
    <span>📏 Diamètre : <strong>3 474 km</strong></span>
    <span>📡 Distance : <strong>384 400 km</strong></span>
    <span>🔄 Orbite : <strong>27,3 jours</strong></span>
    <span>🌡️ Temp. : <strong>−170 à +120°C</strong></span>
    <span>🌊 Influence : <strong>marées terrestres</strong></span>
    <span>👨‍🚀 Premiers humains : <strong>21 juillet 1969</strong></span>
  </div>
  <p style="font-family:Arial,sans-serif;font-size:11px;color:#444">La Lune montre toujours la même face à la Terre (rotation synchrone). 12 astronautes ont marché sur la Lune entre 1969 et 1972, lors des missions Apollo.</p>
</div>

<h2>☄️ Autres objets du système solaire</h2>
<table style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif;font-size:11px">
  <tr style="background:#111;color:#fff">
    <th style="padding:6px 8px;text-align:left">Type</th>
    <th style="padding:6px 8px;text-align:left">Description</th>
    <th style="padding:6px 8px;text-align:left">Exemple célèbre</th>
  </tr>
  ${[
    [
      "Planète naine",
      "Corps sphérique en orbite autour du Soleil, n'ayant pas nettoyé son voisinage orbital",
      "Pluton, Cérès, Éris",
    ],
    [
      "Astéroïde",
      "Petit corps rocheux orbitant autour du Soleil, principalement dans la ceinture d'astéroïdes (entre Mars et Jupiter)",
      "Cérès, Vesta, Bennu",
    ],
    [
      "Comète",
      "Corps de glace et de poussière qui développe une chevelure (coma) et une queue en approchant du Soleil",
      "Halley, Tchouri (67P)",
    ],
    [
      "Météore",
      "Trace lumineuse laissée par un météoroïde entrant dans l'atmosphère terrestre (étoile filante)",
      "Pluies des Perséides",
    ],
    [
      "Nuage d'Oort",
      "Réservoir sphérique de corps glacés à la périphérie du système solaire, source probable des comètes à longue période",
      "Comète Bopp-Hale",
    ],
  ]
    .map(
      (r, i) => `<tr style="background:${i % 2 === 0 ? "#f9f9f9" : "#fff"}">
    ${r.map((c) => `<td style="padding:5px 8px">${c}</td>`).join("")}
  </tr>`,
    )
    .join("")}
</table>

<p style="font-family:Arial,sans-serif;font-size:10px;color:#888;margin-top:20px;text-align:center">
  © ISS Direct France · iss-direct-france.fr · Sources : NASA, ESA, IAU · Reproduction autorisée à usage pédagogique
</p>
`;

        return new Response(printDoc("Poster — Le système solaire", body), {
          headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
