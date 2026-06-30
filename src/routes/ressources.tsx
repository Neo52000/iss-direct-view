import { createFileRoute } from "@tanstack/react-router";
import { Download, Printer } from "lucide-react";
import { KitSection } from "@/components/KitSection";

export const Route = createFileRoute("/ressources")({
  head: () => ({
    meta: [
      { title: "Ressources espace gratuites — Kit, activités, fiches pédagogiques" },
      {
        name: "description",
        content:
          "Kit espace à imprimer, coloriages, quiz, fiches pédagogiques, cartes du ciel et glossaire spatial.",
      },
      { property: "og:title", content: "Ressources espace gratuites" },
      { property: "og:description", content: "Kit ISS, activités enfants et fiches pédagogiques à télécharger." },
      { property: "og:url", content: "/ressources" },
    ],
    links: [{ rel: "canonical", href: "/ressources" }],
  }),
  component: ResourcesPage,
});

const RESOURCES = [
  {
    title: "Coloriages ISS",
    emoji: "🎨",
    desc: "5 coloriages vectoriels prêts à imprimer : ISS, astronaute, fusée, Terre, constellation d'Orion.",
    href: "/print/coloriages",
    badge: "5 pages",
  },
  {
    title: "Quiz espace",
    emoji: "❓",
    desc: "20 questions sur l'ISS, l'exploration spatiale et le système solaire. Réponses incluses.",
    href: "/print/quiz",
    badge: "20 questions",
  },
  {
    title: "Fiches pédagogiques",
    emoji: "📘",
    desc: "2 fiches complètes : Cycle 2 (CE1-CM1) sur l'ISS, et Cycle 3 (CM2-5e) sur la vie à bord.",
    href: "/print/fiches",
    badge: "Cycle 2 & 3",
  },
  {
    title: "Cartes du ciel",
    emoji: "🗺️",
    desc: "Guide d'observation saisonnier : constellations visibles, étoiles brillantes, et comment voir l'ISS.",
    href: "/print/cartes",
    badge: "4 saisons",
  },
  {
    title: "Glossaire spatial",
    emoji: "📖",
    desc: "Plus de 65 termes de l'espace définis simplement : apesanteur, EVA, orbite, magnitude…",
    href: "/print/glossaire",
    badge: "65+ termes",
  },
  {
    title: "Poster système solaire",
    emoji: "🪐",
    desc: "Infographie complète : les 8 planètes, le Soleil, la Lune, les comètes et astéroïdes.",
    href: "/print/poster",
    badge: "2 pages A4",
  },
];

function openPrint(href: string) {
  window.open(href, "_blank", "noopener,noreferrer");
}

function ResourcesPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-extrabold md:text-5xl">
              Kit espace à imprimer
            </h1>
            <p className="mt-3 max-w-2xl text-white/70">
              Une bibliothèque gratuite pour découvrir l'ISS, le système solaire et l'astronomie en
              famille ou en classe. Chaque ressource s'ouvre dans un onglet et peut être sauvegardée
              en PDF via votre navigateur.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--iss-ok)]/40 bg-[color:var(--iss-ok)]/10 px-3 py-1.5 text-sm font-semibold text-[color:var(--iss-ok)]">
            <Printer className="h-4 w-4" /> 100 % gratuit
          </span>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RESOURCES.map((r) => (
            <article key={r.title} className="iss-card flex flex-col p-6">
              <div className="flex items-start justify-between">
                <span className="text-4xl" aria-hidden>{r.emoji}</span>
                <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/60">
                  {r.badge}
                </span>
              </div>
              <h2 className="mt-4 font-display text-lg font-bold">{r.title}</h2>
              <p className="mt-2 flex-1 text-sm text-white/70">{r.desc}</p>
              <button
                onClick={() => openPrint(r.href)}
                className="mt-5 inline-flex items-center gap-2 self-start rounded-full bg-[color:var(--iss-blue)] px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-90"
              >
                <Download className="h-4 w-4" /> Télécharger
              </button>
            </article>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-white/40">
          Cliquez sur « Télécharger » → dans le nouvel onglet, utilisez Fichier › Imprimer › Enregistrer en PDF
        </p>
      </section>
      <KitSection />
    </>
  );
}