import { useState } from "react";
import { Share2, Check } from "lucide-react";
import type { VisiblePass } from "@/services/passesApi";
import { generateCalendarEvent, getReadableDate } from "@/lib/iss-utils";

export function PassQuality({ maxEl }: { maxEl: number }) {
  const pct = Math.min(100, Math.round((maxEl / 90) * 100));
  const label = maxEl >= 60 ? "Excellent" : maxEl >= 30 ? "Bon" : "Faible";
  const color =
    maxEl >= 60 ? "bg-[color:var(--iss-ok)]" : maxEl >= 30 ? "bg-amber-400" : "bg-red-400";
  return (
    <div className="flex items-center gap-2 text-xs text-white/60">
      <span className="w-14 shrink-0">{label}</span>
      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/10">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span>{Math.round(maxEl)}°</span>
    </div>
  );
}

export function SharePassButton({ pass, location }: { pass: VisiblePass; location?: string }) {
  const [copied, setCopied] = useState(false);
  const date = getReadableDate(pass.startUTC * 1000);
  const text = `🛰️ L'ISS passe au-dessus de ${location ?? "chez moi"} le ${date} (${Math.round(pass.duration / 60)} min, élévation max ${Math.round(pass.maxEl)}°) — iss-en-direct.com/passages`;

  const share = async () => {
    if (navigator.share) {
      await navigator.share({ title: "Passage ISS", text });
    } else {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={share}
      title="Partager ce passage"
      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3 py-2 text-sm font-semibold hover:bg-white/10"
    >
      {copied ? (
        <Check className="h-4 w-4 text-[color:var(--iss-ok)]" />
      ) : (
        <Share2 className="h-4 w-4" />
      )}
      {copied ? "Copié !" : "Partager"}
    </button>
  );
}

/** Liste des passages visibles + actions (partage, calendrier). */
export function PassesList({ passes, location }: { passes: VisiblePass[]; location?: string }) {
  return (
    <ul className="space-y-3">
      {passes.map((p) => (
        <li
          key={p.startUTC}
          className="iss-card flex flex-wrap items-center justify-between gap-3 p-4"
        >
          <div className="min-w-0 flex-1">
            <p className="font-display text-lg font-bold">{getReadableDate(p.startUTC * 1000)}</p>
            <p className="mt-0.5 text-sm text-white/60">Durée {Math.round(p.duration / 60)} min</p>
            <div className="mt-2">
              <PassQuality maxEl={p.maxEl} />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <SharePassButton pass={p} location={location} />
            <button
              onClick={() => generateCalendarEvent(p, location)}
              className="rounded-full bg-[color:var(--iss-blue)] px-4 py-2 text-sm font-semibold"
            >
              Ajouter au calendrier
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
