import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
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
  { title: "Coloriages ISS", emoji: "🎨", desc: "5 coloriages haute-résolution prêts à imprimer." },
  { title: "Quiz espace", emoji: "❓", desc: "20 questions pour tester ses connaissances." },
  { title: "Fiches pédagogiques", emoji: "📘", desc: "Cycle 2 et cycle 3, prêtes pour la classe." },
  { title: "Cartes du ciel", emoji: "🗺️", desc: "Cartes mensuelles pour repérer les constellations." },
  { title: "Glossaire spatial", emoji: "📖", desc: "Plus de 80 termes expliqués simplement." },
  { title: "Poster système solaire", emoji: "🪐", desc: "Format A2, prêt à afficher." },
];

function ResourcesPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <h1 className="font-display text-3xl font-extrabold md:text-5xl">
          Ressources espace
        </h1>
        <p className="mt-3 max-w-2xl text-white/70">
          Une bibliothèque gratuite pour découvrir l'ISS, le système solaire et l'astronomie en
          famille ou en classe.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RESOURCES.map((r) => (
            <article key={r.title} className="iss-card flex flex-col p-6">
              <span className="text-4xl" aria-hidden>{r.emoji}</span>
              <h2 className="mt-4 font-display text-lg font-bold">{r.title}</h2>
              <p className="mt-2 flex-1 text-sm text-white/70">{r.desc}</p>
              <button className="mt-4 inline-flex items-center gap-2 self-start rounded-full bg-[color:var(--iss-blue)] px-4 py-2 text-sm font-semibold">
                <Download className="h-4 w-4" /> Télécharger
              </button>
            </article>
          ))}
        </div>
      </section>
      <KitSection />
    </>
  );
}