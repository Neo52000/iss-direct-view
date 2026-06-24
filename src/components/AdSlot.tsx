export function AdSlot({ label = "Emplacement publicitaire", className = "" }: { label?: string; className?: string }) {
  return (
    <div
      className={`grid place-items-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-6 text-xs uppercase tracking-wider text-white/40 ${className}`}
      style={{ minHeight: 90 }}
      aria-label="Emplacement publicitaire"
    >
      {label}
    </div>
  );
}

export function SponsorBanner({ children }: { children?: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6">
      <div className="iss-card flex flex-wrap items-center justify-between gap-3 p-4 text-sm text-white/70">
        <span>
          {children ??
            "Cette page peut être sponsorisée par une marque éducative ou scientifique."}
        </span>
        <a
          href="/contact"
          className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold hover:bg-white/10"
        >
          Devenir sponsor
        </a>
      </div>
    </div>
  );
}