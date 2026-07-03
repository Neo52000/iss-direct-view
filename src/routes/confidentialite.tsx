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
          formulaire d'alertes : adresse email et ville (facultative). Ces données sont stockées de
          façon sécurisée dans notre base de données (Supabase), protégée par des règles d'accès
          strictes : personne ne peut consulter la liste des inscrits en dehors de l'équipe d'ISS
          Direct France, et ces données ne sont jamais revendues ni transmises à des tiers à des
          fins commerciales.
        </p>
        <p>
          Elles servent uniquement à vous envoyer un email de confirmation d'inscription et, si vous
          avez indiqué une ville, des alertes automatiques lorsqu'un passage visible de l'ISS est
          prévu dans les 24 heures. L'envoi de ces emails est assuré par notre prestataire Brevo
          (Sendinblue).
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
          Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression
          de vos données. Vous pouvez exercer ce droit à tout moment en écrivant via la{" "}
          <a href="/contact" className="text-[color:var(--iss-cyan)] underline">page contact</a>,
          ou en répondant "désinscription" à n'importe quel email reçu.
        </p>
      </div>
    </section>
  );
}
