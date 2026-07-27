import { createFileRoute } from "@tanstack/react-router";
import { printDoc } from "@/lib/print-utils";

const QUESTIONS = [
  {
    q: "À quelle altitude l'ISS orbite-t-elle autour de la Terre ?",
    options: ["A. 200 km", "B. 400 km", "C. 800 km", "D. 1 200 km"],
    answer: "B",
  },
  {
    q: "À quelle vitesse se déplace l'ISS ?",
    options: ["A. 8 000 km/h", "B. 15 000 km/h", "C. 28 000 km/h", "D. 40 000 km/h"],
    answer: "C",
  },
  {
    q: "En combien de temps l'ISS fait-elle le tour de la Terre ?",
    options: ["A. 45 minutes", "B. 90 minutes", "C. 3 heures", "D. 24 heures"],
    answer: "B",
  },
  {
    q: "Combien de fois l'ISS tourne-t-elle autour de la Terre chaque jour ?",
    options: ["A. 4 fois", "B. 8 fois", "C. 16 fois", "D. 24 fois"],
    answer: "C",
  },
  {
    q: "En quelle année le premier module de l'ISS a-t-il été lancé ?",
    options: ["A. 1993", "B. 1998", "C. 2001", "D. 2004"],
    answer: "B",
  },
  {
    q: "Combien d'astronautes vivent en général à bord de l'ISS ?",
    options: ["A. 2", "B. 4", "C. 6", "D. 10"],
    answer: "C",
  },
  {
    q: "Quelle est la longueur de l'ISS (panneaux solaires compris) ?",
    options: ["A. 50 m", "B. 80 m", "C. 109 m", "D. 150 m"],
    answer: "C",
  },
  {
    q: "Que signifie l'acronyme ISS ?",
    options: [
      "A. Institut Spatial Suisse",
      "B. International Space Station",
      "C. Integrated Satellite System",
      "D. Institute of Space Science",
    ],
    answer: "B",
  },
  {
    q: "Quel pays a envoyé le premier être humain dans l'espace ?",
    options: ["A. États-Unis", "B. France", "C. Chine", "D. URSS (Russie)"],
    answer: "D",
  },
  {
    q: "Comment s'appelait le premier homme dans l'espace (1961) ?",
    options: [
      "A. Neil Armstrong",
      "B. Youri Gagarine",
      "C. Buzz Aldrin",
      "D. Valentina Terechkova",
    ],
    answer: "B",
  },
  {
    q: "Qu'est-ce qu'une EVA ?",
    options: [
      "A. Évaluation Aéronautique",
      "B. Activité extra-atmosphérique",
      "C. Activité extravéhiculaire",
      "D. Éjection de Véhicule Autonome",
    ],
    answer: "C",
  },
  {
    q: "Quel gaz est indispensable à la respiration des astronautes ?",
    options: ["A. Azote", "B. CO₂", "C. Oxygène", "D. Argon"],
    answer: "C",
  },
  {
    q: "Comment les astronautes font-ils leur lessive à bord de l'ISS ?",
    options: [
      "A. Machine à laver spéciale",
      "B. Ils ne peuvent pas laver leurs vêtements",
      "C. Nettoyage à sec",
      "D. Eau recyclée",
    ],
    answer: "B",
  },
  {
    q: "Quelle agence spatiale européenne envoie des astronautes à l'ISS ?",
    options: ["A. CNES", "B. ESA", "C. NASA", "D. JAXA"],
    answer: "B",
  },
  {
    q: "Quel astronaute français a passé le plus de temps dans l'espace ?",
    options: [
      "A. Jean-Loup Chrétien",
      "B. Claudie Haigneré",
      "C. Thomas Pesquet",
      "D. Michel Tognini",
    ],
    answer: "C",
  },
  {
    q: "Comment appelle-t-on le premier satellite artificiel lancé dans l'espace (1957) ?",
    options: ["A. Vostok", "B. Explorer 1", "C. Spoutnik", "D. Soyouz"],
    answer: "C",
  },
  {
    q: "Combien de modules composent l'ISS (environ) ?",
    options: ["A. 5", "B. 10", "C. 16", "D. 25"],
    answer: "C",
  },
  {
    q: "Comment est produite l'eau potable à bord de l'ISS ?",
    options: [
      "A. Elle est apportée depuis la Terre",
      "B. Elle est recyclée depuis l'urine et la vapeur d'eau",
      "C. Elle est produite par électrolyse",
      "D. Elle provient des météorites",
    ],
    answer: "B",
  },
  {
    q: "Quel est le nom du premier homme à avoir marché sur la Lune (1969) ?",
    options: ["A. Buzz Aldrin", "B. Neil Armstrong", "C. Michael Collins", "D. Alan Shepard"],
    answer: "B",
  },
  {
    q: "Combien de temps dure environ la mission d'un astronaute à bord de l'ISS ?",
    options: ["A. 2 semaines", "B. 2 mois", "C. 6 mois", "D. 1 an"],
    answer: "C",
  },
];

export const Route = createFileRoute("/print/quiz")({
  server: {
    handlers: {
      GET: async () => {
        const questionsHtml = QUESTIONS.map(
          (q, i) => `
<div style="margin-bottom:18px;break-inside:avoid">
  <p style="font-weight:700;font-size:13px;margin-bottom:6px">${i + 1}. ${q.q}</p>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px 16px;padding-left:12px">
    ${q.options.map((o) => `<p style="font-size:12px;margin:0">☐ ${o}</p>`).join("")}
  </div>
</div>`,
        ).join("");

        const answersHtml = QUESTIONS.map(
          (q, i) =>
            `<span style="display:inline-block;width:28px;font-weight:700">${i + 1}.${q.answer}</span>`,
        ).join("");

        const body = `
<h1>❓ Quiz espace — 20 questions</h1>
<p style="font-family:Arial,sans-serif;font-size:12px;color:#555;margin-bottom:8px">Testez vos connaissances sur l'ISS et l'exploration spatiale !</p>
<div style="display:flex;gap:16px;margin-bottom:20px;font-family:Arial,sans-serif;font-size:11px;color:#333">
  <span>📛 Prénom : ___________________________</span>
  <span>📅 Date : ___________________________</span>
  <span>⭐ Score : _____ / 20</span>
</div>
<hr style="border:none;border-top:1px solid #ddd;margin-bottom:16px"/>

<div style="columns:2;column-gap:24px">
${questionsHtml}
</div>

<div style="margin-top:24px;border:1.5px solid #111;border-radius:6px;padding:12px;font-family:Arial,sans-serif">
  <p style="font-weight:700;font-size:12px;margin-bottom:8px">✅ Réponses (à découper ou retourner)</p>
  <div style="font-size:11px;color:#555">${answersHtml}</div>
</div>

<p style="font-family:Arial,sans-serif;font-size:10px;color:#888;margin-top:16px;text-align:center">
  © ISS Direct France · iss-direct-france.fr · Reproduction autorisée à usage pédagogique
</p>
`;

        return new Response(
          printDoc(
            "Quiz espace — 20 questions",
            body,
            `
  @media print { .columns{columns:2} }
  .columns{columns:2;column-gap:24px}
`,
          ),
          {
            headers: {
              "Content-Type": "text/html; charset=utf-8",
              "Cache-Control": "public, max-age=3600",
            },
          },
        );
      },
    },
  },
});
