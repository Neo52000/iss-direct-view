import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { getCity, frenchCities, type FrenchCity } from "@/data/frenchCities";
import { getVisiblePasses, type VisiblePass } from "@/services/passesApi";
import { PassesList } from "@/components/PassesList";
import { EmailCapture } from "@/components/EmailCapture";
import { BackToTop } from "@/components/BackToTop";
import { faqJsonLd } from "@/components/FAQ";
import type { FaqItem } from "@/data/faq";

export const Route = createFileRoute("/passage-iss/$ville")({
  loader: ({ params }) => {
    const city = getCity(params.ville);
    if (!city) throw notFound();
    return { city };
  },
  head: ({ loaderData }) => {
    const city = loaderData?.city;
    if (!city) return { meta: [{ title: "Passage ISS — ISS Direct France" }] };
    const title = `Passage de l'ISS au-dessus de ${city.name} — horaires ce soir`;
    const description = `Quand voir la Station Spatiale Internationale au-dessus de ${city.name} (${city.region}) ? Prochains passages visibles à l'œil nu : heure, durée, direction et hauteur.`;
    const url = `/passage-iss/${city.slug}`;
    return {
      meta: [
        { title: `${title} — ISS Direct France` },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Place",
            name: `Observation de l'ISS depuis ${city.name}`,
            address: {
              "@type": "PostalAddress",
              addressLocality: city.name,
              addressRegion: city.region,
              addressCountry: "FR",
            },
            geo: { "@type": "GeoCoordinates", latitude: city.lat, longitude: city.lon },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(faqJsonLd(cityFaq(city))),
        },
      ],
    };
  },
  component: CityPassPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="font-display text-3xl font-extrabold">Ville introuvable</h1>
      <Link to="/passage-iss" className="mt-4 inline-block text-[color:var(--iss-cyan)] underline">
        Voir toutes les villes
      </Link>
    </div>
  ),
});

function cityFaq(city: FrenchCity): FaqItem[] {
  return [
    {
      q: `Comment voir l'ISS depuis ${city.name} ?`,
      a: `L'ISS est visible à l'œil nu depuis ${city.name} lors de ses passages, sans télescope. Elle apparaît comme un point lumineux blanc qui traverse le ciel en quelques minutes, sans clignoter. Repérez ci-dessus le prochain créneau visible et regardez dans la direction indiquée par temps dégagé.`,
    },
    {
      q: `À quelle heure passe l'ISS au-dessus de ${city.name} ce soir ?`,
      a: `Les meilleurs créneaux se situent juste après le coucher du soleil ou avant l'aube : la station est éclairée par le Soleil tandis que le ciel de ${city.name} est déjà sombre. Les horaires exacts, calculés à partir des données orbitales, s'affichent en haut de page.`,
    },
    {
      q: `L'ISS est-elle visible tous les soirs depuis ${city.name} ?`,
      a: `Non. Les passages visibles dépendent de l'orbite de l'ISS et de l'ensoleillement. Certaines périodes offrent plusieurs passages par soirée, d'autres aucun pendant quelques jours. Consultez régulièrement cette page pour ${city.name}.`,
    },
  ];
}

function CityPassPage() {
  const { city } = Route.useLoaderData();
  const [passes, setPasses] = useState<VisiblePass[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setPasses(null);
    setError(null);
    getVisiblePasses(city.lat, city.lon)
      .then((r) => {
        if (cancelled) return;
        if (r.configured && "error" in r && r.error) setError(r.error);
        setPasses(r.configured ? r.passes : []);
      })
      .catch((e) => {
        if (!cancelled) setError((e as Error).message);
      });
    return () => {
      cancelled = true;
    };
  }, [city.lat, city.lon]);

  return (
    <>
      <section className="mx-auto max-w-5xl px-4 py-10 md:px-6">
        <Link to="/passage-iss" className="text-sm text-[color:var(--iss-cyan)] hover:underline">
          ← Toutes les villes
        </Link>
        <h1 className="mt-4 font-display text-3xl font-extrabold md:text-4xl">
          Passage de l'ISS au-dessus de {city.name}
        </h1>
        <p className="mt-2 inline-flex items-center gap-2 text-sm text-white/60">
          <MapPin className="h-4 w-4 text-[color:var(--iss-cyan)]" /> {city.region} —{" "}
          {city.lat.toFixed(2)}°, {city.lon.toFixed(2)}°
        </p>
        <p className="mt-4 max-w-2xl text-white/70">
          Envie de voir la Station Spatiale Internationale passer au-dessus de {city.name} ? Voici
          les prochains passages visibles à l'œil nu, calculés en temps réel à partir des données
          orbitales (TLE) de l'ISS. Aucun télescope n'est nécessaire : cherchez un point lumineux
          blanc qui traverse le ciel sans clignoter.
        </p>

        <div className="mt-8">
          {passes === null ? (
            <div className="iss-card flex items-center justify-center gap-2 p-10 text-white/70">
              <Loader2 className="h-4 w-4 animate-spin" /> Calcul des passages au-dessus de{" "}
              {city.name}…
            </div>
          ) : passes.length === 0 ? (
            <div className="iss-card p-8 text-white/70">
              {error
                ? `Impossible de calculer les passages pour le moment (${error}).`
                : `Aucun passage visible de l'ISS au-dessus de ${city.name} dans les prochains jours. Revenez bientôt : les créneaux évoluent au fil de l'orbite.`}
            </div>
          ) : (
            <PassesList passes={passes} location={city.name} />
          )}
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          <Link to="/position" className="iss-card p-5 transition hover:bg-white/[0.06]">
            <span className="text-2xl">🛰️</span>
            <h2 className="mt-2 font-display text-base font-bold">Position en direct</h2>
            <p className="mt-1 text-sm text-white/60">Où se trouve l'ISS en ce moment ?</p>
          </Link>
          <Link to="/live" className="iss-card p-5 transition hover:bg-white/[0.06]">
            <span className="text-2xl">📺</span>
            <h2 className="mt-2 font-display text-base font-bold">Live vidéo</h2>
            <p className="mt-1 text-sm text-white/60">La Terre vue depuis l'ISS, en direct.</p>
          </Link>
          <Link to="/passages" className="iss-card p-5 transition hover:bg-white/[0.06]">
            <span className="text-2xl">📍</span>
            <h2 className="mt-2 font-display text-base font-bold">Autre ville</h2>
            <p className="mt-1 text-sm text-white/60">Calculez les passages ailleurs.</p>
          </Link>
        </div>

        <NearbyCities current={city} />
      </section>

      <EmailCapture />
      <BackToTop />
    </>
  );
}

function NearbyCities({ current }: { current: FrenchCity }) {
  const nearest = [...frenchCities]
    .filter((c) => c.slug !== current.slug)
    .sort(
      (a, b) =>
        Math.hypot(a.lat - current.lat, a.lon - current.lon) -
        Math.hypot(b.lat - current.lat, b.lon - current.lon),
    )
    .slice(0, 6);
  return (
    <div className="mt-12">
      <h2 className="font-display text-xl font-bold">Passages de l'ISS dans d'autres villes</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {nearest.map((c) => (
          <Link
            key={c.slug}
            to="/passage-iss/$ville"
            params={{ ville: c.slug }}
            className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-sm hover:bg-white/10"
          >
            {c.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
