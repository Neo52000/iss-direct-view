import { createFileRoute } from "@tanstack/react-router";
import { printDoc } from "@/lib/print-utils";

// Constellations majeures par saison (hémisphère nord, latitude ~46°N France)
const SAISONS = [
  {
    nom: "Printemps (mars – mai)",
    emoji: "🌸",
    constellations: [
      { nom: "Lion", etoile: "Régulus", mag: "1.4", note: "Reconnaissable à sa forme de point d'interrogation inversé" },
      { nom: "Vierge", etoile: "Spica", mag: "1.0", note: "Étoile bleue très brillante au sud" },
      { nom: "Chevelure de Bérénice", etoile: "aucune très brillante", mag: "—", note: "Amas d'étoiles faibles mais nombreuses" },
      { nom: "Bouvier", etoile: "Arcturus", mag: "−0.05", note: "La 4e étoile la plus brillante du ciel nocturne" },
      { nom: "Grande Ourse", etoile: "Alioth", mag: "1.7", note: "Haute dans le ciel, permet de trouver l'étoile polaire" },
    ],
  },
  {
    nom: "Été (juin – août)",
    emoji: "☀️",
    constellations: [
      { nom: "Scorpion", etoile: "Antares", mag: "1.1", note: "Visible bas sur l'horizon sud, étoile rouge-orangé" },
      { nom: "Lyre", etoile: "Véga", mag: "0.0", note: "Quasi au zénith, très brillante, forme le Triangle d'Été" },
      { nom: "Cygne", etoile: "Deneb", mag: "1.3", note: "Grande croix dans la Voie lactée" },
      { nom: "Aigle", etoile: "Altaïr", mag: "0.8", note: "3e sommet du Triangle d'Été, reconnaissable à ses 2 étoiles flanquantes" },
      { nom: "Sagittaire", etoile: "Nunki", mag: "2.0", note: "Forme une théière, centre galactique derrière" },
    ],
  },
  {
    nom: "Automne (sept. – nov.)",
    emoji: "🍂",
    constellations: [
      { nom: "Pégase", etoile: "Markab", mag: "2.5", note: "Grand carré facilement repérable au zénith" },
      { nom: "Andromède", etoile: "Mirach", mag: "2.1", note: "Contient la galaxie M31 visible à l'œil nu" },
      { nom: "Persée", etoile: "Algol (étoile variable)", mag: "2.1-3.4", note: "Double étoile à éclipses, clignote tous les 2,9 jours" },
      { nom: "Cassiopée", etoile: "Shedir", mag: "2.2", note: "Forme un W très visible toute l'année vers le nord" },
      { nom: "Bélier", etoile: "Hamal", mag: "2.0", note: "Triangle légèrement aplati" },
    ],
  },
  {
    nom: "Hiver (déc. – fév.)",
    emoji: "❄️",
    constellations: [
      { nom: "Orion", etoile: "Rigel + Bételgeuse", mag: "0.1 / 0.4", note: "La plus reconnaissable : ceinture de 3 étoiles alignées" },
      { nom: "Taureau", etoile: "Aldébaran", mag: "0.9", note: "Les Pléiades (amas des 7 Sœurs) sont dans cette constellation" },
      { nom: "Gémeaux", etoile: "Castor & Pollux", mag: "1.6 / 1.1", note: "Deux étoiles brillantes côte à côte" },
      { nom: "Grand Chien", etoile: "Sirius", mag: "−1.5", note: "L'étoile la plus brillante du ciel nocturne" },
      { nom: "Cocher", etoile: "Capella", mag: "0.1", note: "Presque au zénith en hiver, étoile jaune très brillante" },
    ],
  },
];

export const Route = createFileRoute("/print/cartes")({
  server: {
    handlers: {
      GET: async () => {
        const saisonsHtml = SAISONS.map(s => `
<div style="margin-bottom:24px;break-inside:avoid">
  <h2>${s.emoji} ${s.nom}</h2>
  <table style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif;font-size:11px;margin-top:8px">
    <thead>
      <tr style="background:#111;color:#fff">
        <th style="padding:6px 8px;text-align:left;width:22%">Constellation</th>
        <th style="padding:6px 8px;text-align:left;width:22%">Étoile principale</th>
        <th style="padding:6px 8px;text-align:left;width:10%">Magnitude</th>
        <th style="padding:6px 8px;text-align:left">Comment la reconnaître</th>
      </tr>
    </thead>
    <tbody>
      ${s.constellations.map((c, i) => `
      <tr style="background:${i % 2 === 0 ? "#f9f9f9" : "#fff"}">
        <td style="padding:5px 8px;font-weight:700">${c.nom}</td>
        <td style="padding:5px 8px">${c.etoile}</td>
        <td style="padding:5px 8px;text-align:center">${c.mag}</td>
        <td style="padding:5px 8px;color:#444">${c.note}</td>
      </tr>`).join("")}
    </tbody>
  </table>
</div>`).join("");

        const body = `
<h1>🗺️ Cartes du ciel — Guide d'observation</h1>
<p style="font-family:Arial,sans-serif;font-size:12px;color:#555;margin-bottom:4px">Hémisphère nord · Latitude France (43°–51°N) · Heure d'observation : 22h-23h heure locale</p>

<div style="background:#f5f5f5;border-left:4px solid #111;padding:10px 14px;margin:12px 0;font-family:Arial,sans-serif;font-size:12px">
  <strong>Comment observer ?</strong> Attendez que vos yeux s'adaptent à l'obscurité (20 minutes). Éloignez-vous des lumières. Utilisez une lampe rouge pour lire cette carte sans perdre l'adaptation.
  La <em>magnitude</em> indique la brillance : plus elle est faible (voire négative), plus l'étoile est brillante.
</div>

${saisonsHtml}

<div class="page-break"></div>

<h2>🛰️ Observer l'ISS à l'œil nu</h2>
<table style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif;font-size:12px;margin-top:8px">
  <tr style="background:#111;color:#fff">
    <th style="padding:8px">Condition</th>
    <th style="padding:8px">Ce qu'il faut</th>
  </tr>
  <tr style="background:#f9f9f9">
    <td style="padding:7px 8px;font-weight:700">Ciel</td>
    <td style="padding:7px 8px">Clair, sans nuages, loin des lumières de la ville</td>
  </tr>
  <tr>
    <td style="padding:7px 8px;font-weight:700">Heure</td>
    <td style="padding:7px 8px">Juste après le coucher du soleil ou avant le lever (ISS doit être éclairée)</td>
  </tr>
  <tr style="background:#f9f9f9">
    <td style="padding:7px 8px;font-weight:700">Ce que vous verrez</td>
    <td style="padding:7px 8px">Un point lumineux blanc, aussi brillant que Vénus, qui se déplace en ~4-6 minutes</td>
  </tr>
  <tr>
    <td style="padding:7px 8px;font-weight:700">Direction</td>
    <td style="padding:7px 8px">Variable — utilisez la page Passages sur iss-direct-france.fr pour connaître l'heure exacte</td>
  </tr>
  <tr style="background:#f9f9f9">
    <td style="padding:7px 8px;font-weight:700">Durée visible</td>
    <td style="padding:7px 8px">1 à 6 minutes selon l'angle de passage</td>
  </tr>
  <tr>
    <td style="padding:7px 8px;font-weight:700">Magnitude ISS</td>
    <td style="padding:7px 8px">Jusqu'à −5.9 (plus brillante que Vénus !)</td>
  </tr>
</table>

<h2 style="margin-top:20px">⭐ Les 10 étoiles les plus brillantes visibles depuis la France</h2>
<table style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif;font-size:12px;margin-top:8px">
  <tr style="background:#111;color:#fff">
    <th style="padding:6px 8px">#</th>
    <th style="padding:6px 8px;text-align:left">Étoile</th>
    <th style="padding:6px 8px;text-align:left">Constellation</th>
    <th style="padding:6px 8px">Magnitude</th>
    <th style="padding:6px 8px;text-align:left">Couleur</th>
    <th style="padding:6px 8px;text-align:left">Meilleure saison</th>
  </tr>
  ${[
    ["1", "Sirius", "Grand Chien", "−1.5", "Bleu-blanc", "Hiver"],
    ["2", "Arcturus", "Bouvier", "−0.05", "Orange", "Printemps/Été"],
    ["3", "Véga", "Lyre", "0.0", "Bleu-blanc", "Été"],
    ["4", "Capella", "Cocher", "0.1", "Jaune", "Hiver"],
    ["5", "Rigel", "Orion", "0.1", "Bleu", "Hiver"],
    ["6", "Procyon", "Petit Chien", "0.4", "Blanc-jaune", "Hiver"],
    ["7", "Bételgeuse", "Orion", "0.4–1.3*", "Rouge-orange", "Hiver"],
    ["8", "Altaïr", "Aigle", "0.8", "Blanc", "Été"],
    ["9", "Aldébaran", "Taureau", "0.9", "Orange-rouge", "Hiver"],
    ["10", "Antares", "Scorpion", "1.1", "Rouge", "Été (bas)"],
  ].map((r, i) => `<tr style="background:${i%2===0?"#f9f9f9":"#fff"}">
    ${r.map(c => `<td style="padding:5px 8px;text-align:${["#","Magnitude"].includes(r[0]) ? "center" : "left"}">${c}</td>`).join("")}
  </tr>`).join("")}
</table>
<p style="font-family:Arial,sans-serif;font-size:10px;color:#888;margin-top:4px">* Bételgeuse est une étoile variable — sa magnitude varie dans le temps.</p>

<p style="font-family:Arial,sans-serif;font-size:10px;color:#888;margin-top:20px;text-align:center">
  © ISS Direct France · iss-direct-france.fr · Reproduction autorisée à usage pédagogique
</p>
`;

        return new Response(printDoc("Cartes du ciel — Guide d'observation", body), {
          headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
