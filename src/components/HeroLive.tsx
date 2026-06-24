import { Link } from "@tanstack/react-router";
import { LiveVideo } from "./LiveVideo";
import { IssStatusCard } from "./IssStatusCard";
import { NextPassCard } from "./NextPassCard";

export function HeroLive() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 md:px-6 md:pt-14">
        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div className="flex flex-col">
            <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--iss-ok)]" />
              Données ISS en temps réel
            </span>
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              Regardez la Terre depuis l'ISS{" "}
              <span className="bg-gradient-to-r from-[color:var(--iss-cyan)] to-[color:var(--iss-blue)] bg-clip-text text-transparent">
                en direct
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-base text-white/70 md:text-lg">
              Live vidéo de la Station Spatiale Internationale, position en temps réel et prochains
              passages visibles au-dessus de chez vous.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/live"
                className="inline-flex items-center gap-2 rounded-full bg-[color:var(--iss-blue)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[color:var(--iss-blue)]/30 hover:opacity-90"
              >
                Voir le direct
              </Link>
              <a
                href="#alertes"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold hover:bg-white/10"
              >
                Recevoir les alertes
              </a>
            </div>
            <p className="mt-5 max-w-xl text-xs text-white/40">
              Flux vidéo fourni par NASA / YouTube. Des interruptions peuvent se produire lors des
              pertes de signal.
            </p>
            <div className="mt-6">
              <LiveVideo />
            </div>
          </div>

          <aside className="flex flex-col gap-5">
            <IssStatusCard />
            <NextPassCard />
          </aside>
        </div>
      </div>
    </section>
  );
}