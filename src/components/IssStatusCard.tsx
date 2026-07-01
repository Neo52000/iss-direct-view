import { Link } from "@tanstack/react-router";
import { Globe2, ArrowRight, Eye, EclipseIcon, Sun } from "lucide-react";
import { useIssPosition } from "@/services/issApi";
import {
  formatAltitude,
  formatCoordinates,
  formatSpeed,
  getReadableDate,
} from "@/lib/iss-utils";

function VisibilityBadge({ visibility }: { visibility: string }) {
  if (visibility === "visible")
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--iss-ok)]/15 px-2.5 py-1 text-xs font-semibold text-[color:var(--iss-ok)]">
        <Eye className="h-3 w-3" /> Visible à l'œil nu
      </span>
    );
  if (visibility === "eclipsed")
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/15 px-2.5 py-1 text-xs font-semibold text-orange-300">
        <EclipseIcon className="h-3 w-3" /> En éclipse
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-white/60">
      <Sun className="h-3 w-3" /> Plein jour
    </span>
  );
}

export function IssStatusCard() {
  const { position, error, loading } = useIssPosition();

  return (
    <div className="iss-card p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe2 className="h-5 w-5 text-[color:var(--iss-cyan)]" />
          <h3 className="font-display text-base font-bold">Où est l'ISS maintenant ?</h3>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--iss-ok)]/15 px-2.5 py-1 text-xs font-semibold text-[color:var(--iss-ok)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--iss-ok)]" />
          En temps réel
        </span>
      </div>

      {loading && !position ? (
        <div className="mt-4 grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-14 animate-pulse rounded-lg bg-white/5" />
          ))}
        </div>
      ) : error && !position ? (
        <p className="mt-4 text-sm text-white/70">{error}</p>
      ) : position ? (
        <>
          <div className="mt-3">
            <VisibilityBadge visibility={position.visibility ?? "daylight"} />
          </div>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <Stat label="Altitude" value={formatAltitude(position.altitude)} />
            <Stat label="Vitesse" value={formatSpeed(position.velocity)} />
            <Stat
              label="Latitude"
              value={`${position.latitude.toFixed(3)}°`}
            />
            <Stat
              label="Longitude"
              value={`${position.longitude.toFixed(3)}°`}
            />
          </dl>
          <p className="mt-3 text-[11px] text-white/40">
            MAJ : {getReadableDate(position.timestamp * 1000)} ·{" "}
            {formatCoordinates(position.latitude, position.longitude)}
          </p>
        </>
      ) : null}

      <Link
        to="/position"
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--iss-cyan)] hover:underline"
      >
        Voir sur la carte <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white/[0.04] px-3 py-2">
      <dt className="text-[11px] uppercase tracking-wider text-white/50">{label}</dt>
      <dd className="mt-1 font-display text-lg font-bold text-white">{value}</dd>
    </div>
  );
}