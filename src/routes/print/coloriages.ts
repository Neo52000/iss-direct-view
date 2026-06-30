import { createFileRoute } from "@tanstack/react-router";
import { printDoc } from "@/lib/print-utils";

export const Route = createFileRoute("/print/coloriages")({
  server: {
    handlers: {
      GET: async () => {
        const body = `
<h1>🎨 Coloriages ISS</h1>
<p style="margin-bottom:20px;font-family:Arial,sans-serif;font-size:13px;color:#444">5 coloriages haute résolution sur l'ISS et l'exploration spatiale. À imprimer en noir &amp; blanc.</p>

<!-- COLORIAGE 1 : LA STATION SPATIALE INTERNATIONALE -->
<h2>1. La Station Spatiale Internationale (ISS)</h2>
<div style="margin:16px 0">
<svg viewBox="0 0 700 280" width="100%" xmlns="http://www.w3.org/2000/svg" style="border:1.5px solid #ccc;border-radius:8px;background:#fafafa">
  <!-- Corps principal -->
  <rect x="240" y="110" width="220" height="60" rx="6" fill="none" stroke="#111" stroke-width="3"/>
  <!-- Module gauche -->
  <rect x="160" y="120" width="80" height="40" rx="4" fill="none" stroke="#111" stroke-width="2.5"/>
  <!-- Module droit -->
  <rect x="460" y="120" width="80" height="40" rx="4" fill="none" stroke="#111" stroke-width="2.5"/>
  <!-- Petit module central haut -->
  <rect x="310" y="80" width="80" height="30" rx="4" fill="none" stroke="#111" stroke-width="2"/>
  <!-- Connecteur vertical -->
  <rect x="340" y="110" width="20" height="0" fill="none" stroke="#111" stroke-width="2"/>
  <!-- Bras de panneau gauche -->
  <rect x="60" y="128" width="100" height="24" rx="3" fill="none" stroke="#111" stroke-width="2"/>
  <!-- Panneaux solaires gauche -->
  <rect x="20" y="100" width="44" height="80" rx="3" fill="none" stroke="#111" stroke-width="2"/>
  <line x1="42" y1="100" x2="42" y2="180" stroke="#111" stroke-width="1.5"/>
  <line x1="20" y1="120" x2="64" y2="120" stroke="#111" stroke-width="1"/>
  <line x1="20" y1="140" x2="64" y2="140" stroke="#111" stroke-width="1"/>
  <line x1="20" y1="160" x2="64" y2="160" stroke="#111" stroke-width="1"/>
  <!-- Bras de panneau droit -->
  <rect x="540" y="128" width="100" height="24" rx="3" fill="none" stroke="#111" stroke-width="2"/>
  <!-- Panneaux solaires droit -->
  <rect x="636" y="100" width="44" height="80" rx="3" fill="none" stroke="#111" stroke-width="2"/>
  <line x1="658" y1="100" x2="658" y2="180" stroke="#111" stroke-width="1.5"/>
  <line x1="636" y1="120" x2="680" y2="120" stroke="#111" stroke-width="1"/>
  <line x1="636" y1="140" x2="680" y2="140" stroke="#111" stroke-width="1"/>
  <line x1="636" y1="160" x2="680" y2="160" stroke="#111" stroke-width="1"/>
  <!-- Hublots -->
  <circle cx="300" cy="140" r="10" fill="none" stroke="#111" stroke-width="2"/>
  <circle cx="350" cy="140" r="10" fill="none" stroke="#111" stroke-width="2"/>
  <circle cx="400" cy="140" r="10" fill="none" stroke="#111" stroke-width="2"/>
  <!-- Antenne -->
  <line x1="350" y1="80" x2="350" y2="55" stroke="#111" stroke-width="2"/>
  <circle cx="350" cy="52" r="5" fill="none" stroke="#111" stroke-width="2"/>
  <!-- Étoiles -->
  <text x="80" y="60" font-size="14" fill="#bbb">★</text>
  <text x="580" y="50" font-size="10" fill="#bbb">★</text>
  <text x="120" y="240" font-size="8" fill="#bbb">★</text>
  <text x="600" y="230" font-size="12" fill="#bbb">★</text>
  <!-- Légende -->
  <text x="254" y="105" font-family="Arial" font-size="9" fill="#888">Module habitable</text>
  <text x="30" y="96" font-family="Arial" font-size="8" fill="#888">Panneaux</text>
  <text x="28" y="106" font-family="Arial" font-size="8" fill="#888">solaires</text>
</svg>
</div>

<div class="page-break"></div>

<!-- COLORIAGE 2 : ASTRONAUTE EN EVA -->
<h2>2. Astronaute en sortie spatiale (EVA)</h2>
<div style="margin:16px 0">
<svg viewBox="0 0 400 420" width="60%" xmlns="http://www.w3.org/2000/svg" style="border:1.5px solid #ccc;border-radius:8px;background:#fafafa;display:block;margin:0 auto">
  <!-- Casque -->
  <circle cx="200" cy="90" r="60" fill="none" stroke="#111" stroke-width="3"/>
  <circle cx="200" cy="90" r="42" fill="none" stroke="#111" stroke-width="2"/>
  <!-- Reflet casque -->
  <path d="M175 68 Q185 55 205 60" fill="none" stroke="#111" stroke-width="1.5"/>
  <!-- Yeux -->
  <circle cx="185" cy="88" r="8" fill="none" stroke="#111" stroke-width="2"/>
  <circle cx="215" cy="88" r="8" fill="none" stroke="#111" stroke-width="2"/>
  <!-- Corps combinaison -->
  <rect x="150" y="148" width="100" height="120" rx="20" fill="none" stroke="#111" stroke-width="3"/>
  <!-- Poitrine - panneau de contrôle -->
  <rect x="168" y="168" width="64" height="40" rx="6" fill="none" stroke="#111" stroke-width="2"/>
  <circle cx="182" cy="183" r="5" fill="none" stroke="#111" stroke-width="1.5"/>
  <circle cx="200" cy="183" r="5" fill="none" stroke="#111" stroke-width="1.5"/>
  <circle cx="218" cy="183" r="5" fill="none" stroke="#111" stroke-width="1.5"/>
  <rect x="172" y="196" width="56" height="6" rx="2" fill="none" stroke="#111" stroke-width="1.5"/>
  <!-- Épaules -->
  <circle cx="145" cy="160" r="18" fill="none" stroke="#111" stroke-width="2.5"/>
  <circle cx="255" cy="160" r="18" fill="none" stroke="#111" stroke-width="2.5"/>
  <!-- Bras gauche -->
  <path d="M128 170 Q100 200 90 230" fill="none" stroke="#111" stroke-width="3"/>
  <!-- Gant gauche -->
  <circle cx="86" cy="240" r="16" fill="none" stroke="#111" stroke-width="2.5"/>
  <!-- Bras droit -->
  <path d="M272 170 Q300 200 310 230" fill="none" stroke="#111" stroke-width="3"/>
  <!-- Gant droit -->
  <circle cx="314" cy="240" r="16" fill="none" stroke="#111" stroke-width="2.5"/>
  <!-- Jambes -->
  <path d="M160 268 L155 340" stroke="#111" stroke-width="12" stroke-linecap="round" fill="none"/>
  <path d="M240 268 L245 340" stroke="#111" stroke-width="12" stroke-linecap="round" fill="none"/>
  <!-- Bottes -->
  <ellipse cx="152" cy="348" rx="20" ry="12" fill="none" stroke="#111" stroke-width="2.5"/>
  <ellipse cx="248" cy="348" rx="20" ry="12" fill="none" stroke="#111" stroke-width="2.5"/>
  <!-- Réservoir d'oxygène dos (visible sur côté) -->
  <rect x="120" y="158" width="16" height="50" rx="4" fill="none" stroke="#111" stroke-width="2"/>
  <!-- Étoiles fond -->
  <text x="30" y="50" font-size="16" fill="#ccc">★</text>
  <text x="350" y="80" font-size="10" fill="#ccc">★</text>
  <text x="40" y="350" font-size="8" fill="#ccc">★</text>
  <text x="360" y="380" font-size="14" fill="#ccc">★</text>
</svg>
</div>

<div class="page-break"></div>

<!-- COLORIAGE 3 : FUSÉE ARIANE -->
<h2>3. Fusée spatiale</h2>
<div style="margin:16px 0">
<svg viewBox="0 0 300 500" width="45%" xmlns="http://www.w3.org/2000/svg" style="border:1.5px solid #ccc;border-radius:8px;background:#fafafa;display:block;margin:0 auto">
  <!-- Corps -->
  <rect x="105" y="150" width="90" height="220" fill="none" stroke="#111" stroke-width="3"/>
  <!-- Cône -->
  <polygon points="150,30 105,150 195,150" fill="none" stroke="#111" stroke-width="3"/>
  <!-- Hublot -->
  <circle cx="150" cy="200" r="22" fill="none" stroke="#111" stroke-width="2.5"/>
  <circle cx="150" cy="200" r="14" fill="none" stroke="#111" stroke-width="1.5"/>
  <!-- Panneaux décoration -->
  <rect x="113" y="240" width="74" height="8" fill="none" stroke="#111" stroke-width="1.5"/>
  <rect x="113" y="280" width="74" height="8" fill="none" stroke="#111" stroke-width="1.5"/>
  <!-- Aileron gauche -->
  <polygon points="105,320 65,400 105,370" fill="none" stroke="#111" stroke-width="2.5"/>
  <!-- Aileron droit -->
  <polygon points="195,320 235,400 195,370" fill="none" stroke="#111" stroke-width="2.5"/>
  <!-- Tuyères -->
  <rect x="120" y="370" width="24" height="30" rx="4" fill="none" stroke="#111" stroke-width="2"/>
  <rect x="156" y="370" width="24" height="30" rx="4" fill="none" stroke="#111" stroke-width="2"/>
  <!-- Flammes -->
  <path d="M125 400 Q132 430 120 450 Q138 420 150 445 Q162 420 180 450 Q168 430 175 400" fill="none" stroke="#111" stroke-width="2"/>
  <!-- Drapeau français -->
  <rect x="120" y="310" width="10" height="18" fill="none" stroke="#111" stroke-width="1.5"/>
  <rect x="130" y="310" width="10" height="18" fill="none" stroke="#111" stroke-width="1.5"/>
  <rect x="140" y="310" width="10" height="18" fill="none" stroke="#111" stroke-width="1.5"/>
  <!-- Étoiles -->
  <text x="30" y="80" font-size="12" fill="#ccc">★</text>
  <text x="250" y="120" font-size="8" fill="#ccc">★</text>
  <text x="20" y="300" font-size="10" fill="#ccc">★</text>
  <text x="265" y="280" font-size="14" fill="#ccc">★</text>
</svg>
</div>

<div class="page-break"></div>

<!-- COLORIAGE 4 : PLANÈTE TERRE -->
<h2>4. La Terre vue de l'espace</h2>
<div style="margin:16px 0">
<svg viewBox="0 0 400 400" width="70%" xmlns="http://www.w3.org/2000/svg" style="border:1.5px solid #ccc;border-radius:8px;background:#fafafa;display:block;margin:0 auto">
  <!-- Globe -->
  <circle cx="200" cy="200" r="160" fill="none" stroke="#111" stroke-width="3"/>
  <!-- Continents simplifiés -->
  <!-- Europe/Afrique -->
  <path d="M190 100 Q205 95 215 105 Q225 115 222 130 Q228 145 220 160 Q215 175 220 195 Q225 215 215 235 Q205 255 195 265 Q185 275 180 260 Q175 245 172 230 Q168 215 170 195 Q172 175 165 160 Q160 145 168 130 Q175 115 185 108 Z" fill="none" stroke="#111" stroke-width="2"/>
  <!-- Amériques -->
  <path d="M110 110 Q125 100 138 110 Q148 120 145 140 Q142 160 148 175 Q155 195 150 215 Q145 235 135 250 Q125 260 115 250 Q105 240 100 220 Q95 200 98 180 Q100 160 95 140 Q92 120 100 112 Z" fill="none" stroke="#111" stroke-width="2"/>
  <!-- Asie -->
  <path d="M230 95 Q260 88 275 100 Q290 112 285 130 Q280 148 290 165 Q295 180 288 195 Q280 208 268 210 Q255 212 245 205 Q235 198 228 185 Q220 172 225 155 Q230 138 225 122 Q222 108 228 98 Z" fill="none" stroke="#111" stroke-width="2"/>
  <!-- Australie -->
  <path d="M265 260 Q285 250 295 265 Q305 280 298 298 Q290 315 272 318 Q255 320 248 305 Q242 290 250 273 Z" fill="none" stroke="#111" stroke-width="2"/>
  <!-- Nuages -->
  <path d="M90 160 Q110 150 130 158 Q150 150 165 162 Q145 175 120 170 Q100 175 90 160 Z" fill="none" stroke="#111" stroke-width="1.5" stroke-dasharray="4 2"/>
  <path d="M240 130 Q265 118 285 128 Q270 142 245 138 Z" fill="none" stroke="#111" stroke-width="1.5" stroke-dasharray="4 2"/>
  <!-- Latitude/longitude légères -->
  <line x1="40" y1="200" x2="360" y2="200" stroke="#ddd" stroke-width="1"/>
  <line x1="200" y1="40" x2="200" y2="360" stroke="#ddd" stroke-width="1"/>
  <ellipse cx="200" cy="200" rx="160" ry="60" fill="none" stroke="#ddd" stroke-width="1"/>
  <!-- Légende -->
  <text x="60" y="390" font-family="Arial" font-size="10" fill="#888">🌍 Colorier les océans en bleu, les terres en vert/brun</text>
</svg>
</div>

<div class="page-break"></div>

<!-- COLORIAGE 5 : CONSTELLATION ORION -->
<h2>5. La constellation d'Orion</h2>
<div style="margin:16px 0">
<svg viewBox="0 0 400 400" width="70%" xmlns="http://www.w3.org/2000/svg" style="border:1.5px solid #ccc;border-radius:8px;background:#fafafa;display:block;margin:0 auto">
  <!-- Étoiles Orion (coordonnées simplifiées) -->
  <!-- Betelgeuse (épaule gauche) -->
  <circle cx="130" cy="130" r="14" fill="none" stroke="#111" stroke-width="2.5"/>
  <text x="105" y="120" font-family="Arial" font-size="9" fill="#555">Bételgeuse</text>
  <!-- Bellatrix (épaule droite) -->
  <circle cx="280" cy="140" r="10" fill="none" stroke="#111" stroke-width="2"/>
  <text x="285" y="132" font-family="Arial" font-size="9" fill="#555">Bellatrix</text>
  <!-- Mintaka (ceinture gauche) -->
  <circle cx="150" cy="215" r="8" fill="none" stroke="#111" stroke-width="2"/>
  <!-- Alnilam (ceinture centre) -->
  <circle cx="200" cy="220" r="8" fill="none" stroke="#111" stroke-width="2"/>
  <!-- Alnitak (ceinture droite) -->
  <circle cx="250" cy="215" r="8" fill="none" stroke="#111" stroke-width="2"/>
  <text x="150" y="242" font-family="Arial" font-size="9" fill="#555">← Ceinture d'Orion →</text>
  <!-- Saiph (jambe gauche) -->
  <circle cx="145" cy="310" r="9" fill="none" stroke="#111" stroke-width="2"/>
  <text x="115" y="330" font-family="Arial" font-size="9" fill="#555">Saiph</text>
  <!-- Rigel (jambe droite) -->
  <circle cx="275" cy="305" r="12" fill="none" stroke="#111" stroke-width="2.5"/>
  <text x="278" y="328" font-family="Arial" font-size="9" fill="#555">Rigel</text>
  <!-- Tête (lambda Ori) -->
  <circle cx="200" cy="65" r="7" fill="none" stroke="#111" stroke-width="2"/>
  <!-- Lignes constellation -->
  <line x1="200" y1="65" x2="130" y2="130" stroke="#aaa" stroke-width="1.5" stroke-dasharray="5 3"/>
  <line x1="200" y1="65" x2="280" y2="140" stroke="#aaa" stroke-width="1.5" stroke-dasharray="5 3"/>
  <line x1="130" y1="130" x2="150" y2="215" stroke="#aaa" stroke-width="1.5" stroke-dasharray="5 3"/>
  <line x1="280" y1="140" x2="250" y2="215" stroke="#aaa" stroke-width="1.5" stroke-dasharray="5 3"/>
  <line x1="150" y1="215" x2="200" y2="220" stroke="#aaa" stroke-width="1.5" stroke-dasharray="5 3"/>
  <line x1="200" y1="220" x2="250" y2="215" stroke="#aaa" stroke-width="1.5" stroke-dasharray="5 3"/>
  <line x1="150" y1="215" x2="145" y2="310" stroke="#aaa" stroke-width="1.5" stroke-dasharray="5 3"/>
  <line x1="250" y1="215" x2="275" y2="305" stroke="#aaa" stroke-width="1.5" stroke-dasharray="5 3"/>
  <!-- Petites étoiles de fond -->
  <circle cx="50" cy="50" r="2" fill="#ccc"/>
  <circle cx="360" cy="70" r="3" fill="#ccc"/>
  <circle cx="30" cy="250" r="2" fill="#ccc"/>
  <circle cx="370" cy="200" r="2.5" fill="#ccc"/>
  <circle cx="80" cy="360" r="2" fill="#ccc"/>
  <circle cx="340" cy="350" r="2" fill="#ccc"/>
  <circle cx="100" cy="180" r="1.5" fill="#ccc"/>
  <circle cx="330" cy="260" r="2" fill="#ccc"/>
  <!-- Légende -->
  <text x="10" y="390" font-family="Arial" font-size="9" fill="#888">Visible de novembre à avril depuis l'hémisphère nord · Colorier les étoiles en jaune/orange/bleu</text>
</svg>
</div>

<p style="font-family:Arial,sans-serif;font-size:11px;color:#666;margin-top:20px;text-align:center">
  © ISS Direct France · iss-direct-france.fr · Reproduction autorisée à usage pédagogique
</p>
`;

        return new Response(printDoc("Coloriages ISS", body), {
          headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
