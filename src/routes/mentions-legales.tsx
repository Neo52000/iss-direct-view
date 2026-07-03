import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: "Mentions légales — ISS Direct France" },
      { name: "description", content: "Mentions légales du site ISS Direct France." },
      { property: "og:url", content: "/mentions-legales" },
    ],
    links: [{ rel: "canonical", href: "/mentions-legales" }],
  }),
  component: LegalPage,
});

function LegalPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="font-display text-3xl font-extrabold md:text-5xl">Mentions légales</h1>
      <div className="mt-6 space-y-4 text-white/80">
        <h2 className="font-display text-xl font-bold text-white">Éditeur</h2>
        <p>
          {/* SIREN/RCS non communiqué à ce jour — à ajouter si applicable (obligation LCEN art. 6-III
              pour toute activité commerciale). */}
          ISS Direct France est édité par Ma Papeterie, domiciliée 10 rue Toupot de Béveaux, 52000
          Chaumont, France. Directeur de la publication : Ma Papeterie. Contact :{" "}
          <a href="/contact" className="text-[color:var(--iss-cyan)] underline">
            page contact
          </a>
          .
        </p>
        <h2 className="font-display text-xl font-bold text-white">Hébergement</h2>
        <p>
          Le site est hébergé par Netlify, Inc. — 44 Montgomery Street, Suite 300, San Francisco, CA
          94104, États-Unis (
          <a
            href="https://www.netlify.com"
            className="text-[color:var(--iss-cyan)] underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            netlify.com
          </a>
          ). La base de données est hébergée par Supabase.
        </p>
        <h2 className="font-display text-xl font-bold text-white">Sources & droits</h2>
        <p>
          Le flux vidéo en direct est fourni par la NASA et diffusé via YouTube. Les données de
          position et de passages proviennent d'APIs publiques (Where The ISS At, N2YO). ISS Direct
          France n'est pas affilié ni mandaté par la NASA.
        </p>
        <h2 className="font-display text-xl font-bold text-white">Propriété intellectuelle</h2>
        <p>
          Les textes éditoriaux et le design sont la propriété d'ISS Direct France. Le logo et le
          nom NASA appartiennent à leurs propriétaires respectifs.
        </p>
        <p className="text-sm text-white/50">Dernière mise à jour : {new Date().getFullYear()}.</p>
      </div>
    </section>
  );
}
