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

// SVG illustrations — space-themed, white on accent background
function IssIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      {/* Solar panels left */}
      <rect x="2" y="18" width="12" height="6" rx="1" fill="white" fillOpacity="0.9"/>
      <rect x="2" y="26" width="12" height="6" rx="1" fill="white" fillOpacity="0.7"/>
      {/* Truss left */}
      <rect x="13" y="22" width="5" height="2" rx="0.5" fill="white"/>
      {/* Main body */}
      <rect x="17" y="19" width="14" height="10" rx="2" fill="white"/>
      {/* Module node */}
      <rect x="20" y="15" width="8" height="4" rx="1" fill="white" fillOpacity="0.8"/>
      <rect x="20" y="29" width="8" height="4" rx="1" fill="white" fillOpacity="0.8"/>
      {/* Truss right */}
      <rect x="30" y="22" width="5" height="2" rx="0.5" fill="white"/>
      {/* Solar panels right */}
      <rect x="34" y="18" width="12" height="6" rx="1" fill="white" fillOpacity="0.9"/>
      <rect x="34" y="26" width="12" height="6" rx="1" fill="white" fillOpacity="0.7"/>
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      {/* Body */}
      <path d="M24 6 C20 14 18 22 18 30 L30 30 C30 22 28 14 24 6Z" fill="white"/>
      {/* Nose */}
      <path d="M24 6 C22 10 22 12 24 6Z" fill="white" fillOpacity="0.6"/>
      {/* Fins */}
      <path d="M18 30 L13 38 L18 36Z" fill="white" fillOpacity="0.8"/>
      <path d="M30 30 L35 38 L30 36Z" fill="white" fillOpacity="0.8"/>
      {/* Window */}
      <circle cx="24" cy="22" r="3.5" fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.5"/>
      {/* Flame */}
      <path d="M20 36 C20 40 22 44 24 46 C26 44 28 40 28 36Z" fill="white" fillOpacity="0.5"/>
      <path d="M21 36 C21 40 23 43 24 44 C25 43 27 40 27 36Z" fill="white" fillOpacity="0.8"/>
    </svg>
  );
}

function TelescopeIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      {/* Main tube */}
      <rect x="8" y="19" width="26" height="8" rx="4" fill="white" transform="rotate(-30 8 19)"/>
      {/* Eyepiece */}
      <rect x="26" y="26" width="8" height="5" rx="2" fill="white" fillOpacity="0.8" transform="rotate(-30 26 26)"/>
      {/* Stars */}
      <circle cx="10" cy="10" r="1.5" fill="white" fillOpacity="0.7"/>
      <circle cx="18" cy="6" r="1" fill="white" fillOpacity="0.5"/>
      <circle cx="6" cy="16" r="1" fill="white" fillOpacity="0.4"/>
      {/* Tripod */}
      <line x1="20" y1="36" x2="14" y2="46" stroke="white" strokeWidth="1.5" strokeOpacity="0.8" strokeLinecap="round"/>
      <line x1="24" y1="36" x2="24" y2="46" stroke="white" strokeWidth="1.5" strokeOpacity="0.8" strokeLinecap="round"/>
      <line x1="28" y1="36" x2="34" y2="46" stroke="white" strokeWidth="1.5" strokeOpacity="0.8" strokeLinecap="round"/>
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      {/* Book left page */}
      <path d="M8 10 C8 10 16 12 24 10 L24 40 C16 42 8 40 8 40Z" fill="white" fillOpacity="0.85"/>
      {/* Book right page */}
      <path d="M24 10 C32 12 40 10 40 10 L40 40 C40 40 32 42 24 40Z" fill="white"/>
      {/* Spine */}
      <rect x="22.5" y="10" width="3" height="30" rx="1" fill="white" fillOpacity="0.4"/>
      {/* Lines on right page */}
      <line x1="28" y1="18" x2="37" y2="17" stroke="white" strokeWidth="1" strokeOpacity="0.4" strokeLinecap="round"/>
      <line x1="28" y1="22" x2="37" y2="21" stroke="white" strokeWidth="1" strokeOpacity="0.4" strokeLinecap="round"/>
      <line x1="28" y1="26" x2="37" y2="25" stroke="white" strokeWidth="1" strokeOpacity="0.4" strokeLinecap="round"/>
      {/* Star on left page */}
      <path d="M16 22 L17 19 L18 22 L21 22 L19 24 L20 27 L17 25 L14 27 L15 24 L13 22Z" fill="white" fillOpacity="0.5"/>
    </svg>
  );
}

function GlobeStarsIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      {/* Planet */}
      <circle cx="22" cy="26" r="14" stroke="white" strokeWidth="2" fill="none"/>
      {/* Meridians */}
      <ellipse cx="22" cy="26" rx="7" ry="14" stroke="white" strokeWidth="1.2" strokeOpacity="0.5" fill="none"/>
      <line x1="8" y1="26" x2="36" y2="26" stroke="white" strokeWidth="1.2" strokeOpacity="0.5"/>
      <line x1="10" y1="19" x2="34" y2="19" stroke="white" strokeWidth="1" strokeOpacity="0.3"/>
      <line x1="10" y1="33" x2="34" y2="33" stroke="white" strokeWidth="1" strokeOpacity="0.3"/>
      {/* Stars */}
      <circle cx="38" cy="10" r="2" fill="white" fillOpacity="0.9"/>
      <circle cx="8" cy="8" r="1.5" fill="white" fillOpacity="0.7"/>
      <circle cx="42" cy="20" r="1" fill="white" fillOpacity="0.5"/>
    </svg>
  );
}

function PlanetIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      {/* Planet body */}
      <circle cx="24" cy="26" r="12" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="2"/>
      {/* Ring */}
      <ellipse cx="24" cy="26" rx="20" ry="6" stroke="white" strokeWidth="2" fill="none" strokeOpacity="0.8"/>
      {/* Ring hidden part (behind planet) */}
      <ellipse cx="24" cy="26" rx="20" ry="6" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeDasharray="17 26" strokeDashoffset="-3"/>
      {/* Surface bands */}
      <path d="M13 23 Q24 21 35 23" stroke="white" strokeWidth="1" strokeOpacity="0.4" fill="none"/>
      <path d="M13 29 Q24 27 35 29" stroke="white" strokeWidth="1" strokeOpacity="0.4" fill="none"/>
      {/* Moons */}
      <circle cx="10" cy="10" r="2.5" fill="white" fillOpacity="0.7"/>
      <circle cx="40" cy="8" r="1.5" fill="white" fillOpacity="0.5"/>
    </svg>
  );
}

const RESOURCES = [
  {
    title: "Coloriages ISS",
    icon: <IssIcon />,
    iconBg: "from-blue-600 to-blue-800",
    desc: "5 coloriages vectoriels prêts à imprimer : ISS, astronaute, fusée, Terre, constellation d'Orion.",
    href: "/print/coloriages",
    badge: "5 pages",
  },
  {
    title: "Quiz espace",
    icon: <RocketIcon />,
    iconBg: "from-violet-600 to-violet-800",
    desc: "20 questions sur l'ISS, l'exploration spatiale et le système solaire. Réponses incluses.",
    href: "/print/quiz",
    badge: "20 questions",
  },
  {
    title: "Fiches pédagogiques",
    icon: <BookIcon />,
    iconBg: "from-emerald-600 to-emerald-800",
    desc: "2 fiches complètes : Cycle 2 (CE1-CM1) sur l'ISS, et Cycle 3 (CM2-5e) sur la vie à bord.",
    href: "/print/fiches",
    badge: "Cycle 2 & 3",
  },
  {
    title: "Cartes du ciel",
    icon: <TelescopeIcon />,
    iconBg: "from-indigo-600 to-indigo-800",
    desc: "Guide d'observation saisonnier : constellations visibles, étoiles brillantes, et comment voir l'ISS.",
    href: "/print/cartes",
    badge: "4 saisons",
  },
  {
    title: "Glossaire spatial",
    icon: <GlobeStarsIcon />,
    iconBg: "from-cyan-600 to-cyan-800",
    desc: "Plus de 65 termes de l'espace définis simplement : apesanteur, EVA, orbite, magnitude…",
    href: "/print/glossaire",
    badge: "65+ termes",
  },
  {
    title: "Poster système solaire",
    icon: <PlanetIcon />,
    iconBg: "from-amber-600 to-orange-700",
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
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br p-3 ${r.iconBg}`} aria-hidden>
                  {r.icon}
                </div>
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
