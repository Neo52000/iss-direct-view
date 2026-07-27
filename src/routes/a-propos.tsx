import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — ISS Direct France" },
      {
        name: "description",
        content:
          "ISS Direct France est un média indépendant dédié au suivi de la Station Spatiale Internationale.",
      },
      { property: "og:title", content: "À propos — ISS Direct France" },
      { property: "og:description", content: "Notre mission : rendre l'espace accessible à tous." },
      { property: "og:url", content: "/a-propos" },
    ],
    links: [{ rel: "canonical", href: "/a-propos" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="font-display text-3xl font-extrabold md:text-5xl">À propos</h1>
      <div className="mt-6 space-y-5 text-white/80 md:text-lg">
        <p>
          ISS Direct France est un site indépendant dédié au suivi de la Station Spatiale
          Internationale en direct depuis la France. Notre mission : rendre l'observation spatiale
          accessible, fiable et passionnante pour tous.
        </p>
        <p>
          Nous agrégeons des données issues de la NASA, de YouTube et d'APIs publiques de suivi
          orbital (Where The ISS At, N2YO). Nous ne sommes ni affiliés ni mandatés par la NASA.
        </p>
        <p>
          Le site est financé par des liens d'affiliation et de futurs partenariats sponsorisés —
          toujours signalés clairement. Aucune donnée personnelle n'est revendue.
        </p>
      </div>
    </section>
  );
}
