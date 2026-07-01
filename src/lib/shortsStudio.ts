// Studio Shorts — génération déterministe de 2 shorts/Reels par jour à partir de
// la banque d'anecdotes. Aucune dépendance externe : le planning est stable et
// reproductible (même date → mêmes shorts), et produit exactement 2 idées/jour.

import { spaceAnecdotes, type SpaceAnecdote } from "@/data/spaceAnecdotes";

// Suggestions de plans « vue Terre » (b-roll) à alterner.
const EARTH_VIEWS = [
  "Lever de soleil orbital au-dessus de l'océan",
  "Survol de la Méditerranée de nuit, villes illuminées",
  "Aurore boréale ondulant au-dessus du pôle",
  "Traversée d'un système orageux, éclairs vus d'en haut",
  "Panorama depuis la Cupola vers la Terre",
  "Panneaux solaires de l'ISS avec la Terre en fond",
  "Survol du Sahara aux teintes ocre",
  "Passage jour/nuit : le terminateur qui défile",
];

const HASHTAG_SETS = [
  "#ISS #espace #astronomie #Terre #station spatiale",
  "#ISS #NASA #cosmos #sciences #cielétoilé",
  "#espace #astronaute #orbite #ISS #vueDeLespace",
  "#ISS #spatial #planète #astro #shorts",
];

export interface ShortIdea {
  date: string; // YYYY-MM-DD
  slot: 1 | 2;
  hook: string;
  script: string;
  caption: string;
  hashtags: string;
  earthView: string;
  cta: string;
}

const CTAS = [
  "👉 Position de l'ISS en direct sur iss-en-direct.com",
  "👉 Regarde la Terre en live sur iss-en-direct.com",
  "👉 Quand la voir chez toi ? iss-en-direct.com/passages",
  "👉 Abonne-toi pour un fait spatial chaque jour 🚀",
];

/** Nombre de jours entiers écoulés depuis l'epoch pour une date locale. */
function dayIndex(date: Date): number {
  const utcMidnight = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor(utcMidnight / 86_400_000);
}

function isoDate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;
}

function buildScript(anecdote: SpaceAnecdote, earthView: string, cta: string): string {
  return [
    `🎬 Plan d'ouverture : ${earthView}.`,
    ``,
    `Accroche (0-3 s) : « ${anecdote.hook} ! »`,
    ``,
    `Développement : ${anecdote.fact}`,
    ``,
    `Appel à l'action : ${cta}`,
  ].join("\n");
}

/** Génère le short d'un créneau (1 ou 2) pour une date donnée. */
function shortFor(date: Date, slot: 1 | 2): ShortIdea {
  const di = dayIndex(date);
  // Deux anecdotes distinctes par jour, rotation stable sur toute la banque.
  const idx = (di * 2 + (slot - 1)) % spaceAnecdotes.length;
  const anecdote = spaceAnecdotes[idx];
  const earthView = EARTH_VIEWS[(di + slot) % EARTH_VIEWS.length];
  const cta = CTAS[(di + slot) % CTAS.length];
  const hashtags = HASHTAG_SETS[(di + slot) % HASHTAG_SETS.length];
  return {
    date: isoDate(date),
    slot,
    hook: anecdote.hook,
    script: buildScript(anecdote, earthView, cta),
    caption: `${anecdote.hook} 🛰️ ${anecdote.fact.split(".")[0]}. ${cta}`,
    hashtags,
    earthView,
    cta,
  };
}

/** Les 2 shorts d'une journée. */
export function shortsForDate(date: Date): ShortIdea[] {
  return [shortFor(date, 1), shortFor(date, 2)];
}

/** Planning des `days` prochains jours (2 shorts par jour), à partir de `from`. */
export function shortsSchedule(from: Date = new Date(), days = 14): ShortIdea[][] {
  const out: ShortIdea[][] = [];
  for (let i = 0; i < days; i++) {
    const d = new Date(from.getFullYear(), from.getMonth(), from.getDate() + i);
    out.push(shortsForDate(d));
  }
  return out;
}
