import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/confidentialite")({
  head: () => ({
    meta: [
      { title: "Politique de confidentialité — ISS Direct France" },
      { name: "description", content: "Politique de confidentialité et cookies du site ISS Direct France." },
      { property: "og:url", content: "/confidentialite" },
    ],
    links: [{ rel: "canonical", href: "/confidentialite" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="font-display text-3xl font-extrabold md:text-5xl">
        Politique de confidentialité
      </h1>
      <div className="mt-6 space-y-4 text-white/80">
        <h2 className="font-display text-xl font-bold text-white">Données collectées</h2>
        <p>
          Les seules données collectées sont celles que vous fournissez volontairement via le
          formulaire d'alertes (email, ville facultative). Ces données sont conservées localement en
          V1 (stockage navigateur) et ne sont pas transmises à des tiers.
        </p>
        <h2 className="font-display text-xl font-bold text-white">Cookies</h2>
        <p>
          Le site n'utilise pas de cookies de mesure d'audience à ce jour. Si un outil d'analytics
          ou de publicité est ajouté, un bandeau de consentement sera mis en place conformément au
          RGPD.
        </p>
        <h2 className="font-display text-xl font-bold text-white">Liens d'affiliation</h2>
        <p>
          Certains liens sortants peuvent être affiliés. Cliquer sur ces liens peut nous reverser
          une commission sans surcoût pour vous.
        </p>
        <h2 className="font-display text-xl font-bold text-white">Vos droits</h2>
        <p>
          Vous pouvez à tout moment demander la suppression de vos données via la page contact.
        </p>
      </div>
    </section>
  );
}