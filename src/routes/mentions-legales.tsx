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
        <p>ISS Direct France — site indépendant. Coordonnées disponibles via la page contact.</p>
        <h2 className="font-display text-xl font-bold text-white">Hébergement</h2>
        <p>Site hébergé via une infrastructure edge moderne.</p>
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