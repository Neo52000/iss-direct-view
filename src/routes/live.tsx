import { createFileRoute, Link } from "@tanstack/react-router";
import { LiveVideo } from "@/components/LiveVideo";
import { FAQ, faqJsonLd } from "@/components/FAQ";
import { homeFaq } from "@/data/faq";
import { EmailCapture } from "@/components/EmailCapture";
import { SponsorBanner } from "@/components/AdSlot";

export const Route = createFileRoute("/live")({
  head: () => ({
    meta: [
      { title: "ISS en Direct Maintenant — Live Vidéo NASA Gratuit 24/7" },
      {
        name: "description",
        content:
          "Regardez l'ISS en direct maintenant : flux vidéo officiel NASA, gratuit et sans inscription. Vue en temps réel de la Terre depuis l'espace, 24h/24, 7j/7.",
      },
      { property: "og:title", content: "ISS en Direct Maintenant — Live Vidéo NASA Gratuit 24/7" },
      {
        property: "og:description",
        content:
          "Regardez l'ISS en direct maintenant : flux vidéo officiel NASA, gratuit et sans inscription. Vue en temps réel de la Terre depuis l'espace, 24h/24, 7j/7.",
      },
      { property: "og:url", content: "/live" },
      { property: "og:type", content: "website" },
      {
        name: "twitter:title",
        content: "ISS en Direct Maintenant — Live Vidéo NASA Gratuit 24/7",
      },
      {
        name: "twitter:description",
        content:
          "Regardez l'ISS en direct maintenant : flux vidéo officiel NASA, gratuit et sans inscription. Vue en temps réel de la Terre depuis l'espace, 24h/24, 7j/7.",
      },
    ],
    links: [{ rel: "canonical", href: "/live" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqJsonLd(homeFaq)) }],
  }),
  component: LivePage,
});

function LivePage() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-4 py-10 md:px-6">
        <h1 className="font-display text-3xl font-extrabold md:text-5xl">
          ISS en direct : regardez la Terre depuis l'ISS
        </h1>
        <p className="mt-4 text-white/70 md:text-lg">
          Le flux vidéo ci-dessous est diffusé en continu depuis la Station Spatiale Internationale,
          via les caméras extérieures opérées par la NASA et retransmises sur YouTube.
        </p>
        <div className="mt-8">
          <LiveVideo />
        </div>
        <div className="mt-6">
          <SponsorBanner>
            Cette page peut être sponsorisée par une marque éducative ou scientifique.
          </SponsorBanner>
        </div>
      </section>

      <article className="mx-auto max-w-3xl space-y-5 px-4 pb-12 text-white/80 md:px-6">
        <h2 className="font-display text-2xl font-extrabold text-white">
          Comment fonctionne le live ?
        </h2>
        <p>
          Le live est composé de plusieurs flux vidéo issus des caméras montées à l'extérieur de la
          Station Spatiale Internationale. Lorsque l'ISS passe du côté nuit de la Terre, l'image
          devient naturellement sombre : les caméras n'ont plus assez de lumière pour produire une
          image exploitable. Le flux peut aussi être interrompu lors des transitions de signal entre
          les stations relais TDRSS.
        </p>
        <h2 className="font-display text-2xl font-extrabold text-white">Qu'est-ce que l'ISS ?</h2>
        <p>
          La Station Spatiale Internationale est un laboratoire orbital habité en permanence depuis
          novembre 2000. Elle file à environ 28 000 km/h, à 400 km d'altitude, et fait le tour de la
          Terre toutes les 90 minutes environ. Elle est exploitée conjointement par la NASA,
          Roscosmos, l'ESA, la JAXA et l'Agence spatiale canadienne.
        </p>
        <h2 className="font-display text-2xl font-extrabold text-white">
          Le live est-il continu ?
        </h2>
        <p>
          Oui, hors interruptions techniques. Quand la caméra principale est indisponible, la NASA
          diffuse une mire bleue ou grise. Le live reprend automatiquement dès que possible. Pour
          une expérience optimale, nous vous recommandons d'activer le son uniquement lors des
          interventions en direct avec l'équipage.
        </p>
        <h2 className="font-display text-2xl font-extrabold text-white">Aller plus loin</h2>
        <p>
          Découvrez la{" "}
          <Link to="/position" className="text-[color:var(--iss-cyan)] underline">
            position en temps réel
          </Link>{" "}
          de l'ISS sur une carte interactive, ou consultez les{" "}
          <Link to="/passages" className="text-[color:var(--iss-cyan)] underline">
            prochains passages visibles
          </Link>{" "}
          au-dessus de votre ville.
        </p>
      </article>

      <FAQ items={homeFaq} title="Questions sur le live ISS" />
      <EmailCapture />
    </>
  );
}
