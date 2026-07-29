import { createFileRoute, Link } from "@tanstack/react-router";
import { frenchCities } from "@/data/frenchCities";
import { BackToTop } from "@/components/BackToTop";

export const Route = createFileRoute("/passage-iss/")({
  head: () => ({
    meta: [
      { title: "Passage de l'ISS au-dessus de ma ville — horaires par ville" },
      {
        name: "description",
        content:
          "Trouvez quand l'ISS passe au-dessus de votre ville en France : horaires des passages visibles à l'œil nu, ville par ville.",
      },
      { property: "og:title", content: "Passage de l'ISS au-dessus de ma ville" },
      {
        property: "og:description",
        content: "Horaires des passages visibles de l'ISS, ville par ville.",
      },
      { property: "og:url", content: "/passage-iss" },
      { name: "twitter:title", content: "Passage de l'ISS au-dessus de ma ville" },
      {
        name: "twitter:description",
        content: "Horaires des passages visibles de l'ISS, ville par ville.",
      },
    ],
    links: [{ rel: "canonical", href: "/passage-iss" }],
  }),
  component: PassageHub,
});

function PassageHub() {
  const byRegion = frenchCities.reduce<Record<string, typeof frenchCities>>((acc, c) => {
    (acc[c.region] ??= []).push(c);
    return acc;
  }, {});
  const regions = Object.keys(byRegion).sort();

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 md:px-6">
      <h1 className="font-display text-3xl font-extrabold md:text-5xl">
        Passage de l'ISS au-dessus de ma ville
      </h1>
      <p className="mt-3 max-w-2xl text-white/70">
        Sélectionnez votre ville pour connaître les prochains passages visibles de la Station
        Spatiale Internationale à l'œil nu. Vous ne trouvez pas votre commune ?{" "}
        <Link to="/passages" className="text-[color:var(--iss-cyan)] hover:underline">
          Utilisez l'outil par géolocalisation ou coordonnées
        </Link>
        .
      </p>

      <div className="mt-10 space-y-8">
        {regions.map((region) => (
          <div key={region}>
            <h2 className="font-display text-lg font-bold text-white/80">{region}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {byRegion[region]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((c) => (
                  <Link
                    key={c.slug}
                    to="/passage-iss/$ville"
                    params={{ ville: c.slug }}
                    className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-semibold hover:bg-white/10"
                  >
                    {c.name}
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </div>
      <BackToTop />
    </section>
  );
}
