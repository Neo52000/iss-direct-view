import { CalendarPlus, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function NextPassCard() {
  const hasKey = Boolean(import.meta.env.VITE_N2YO_API_KEY);

  return (
    <div className="iss-card p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-[color:var(--iss-cyan)]" />
          <h3 className="font-display text-base font-bold">Prochain passage visible</h3>
        </div>
        <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs text-white/70">
          Au-dessus de chez vous
        </span>
      </div>

      {hasKey ? (
        <div className="mt-4 space-y-3 text-sm">
          <Row label="Localisation" value="Paris, France" />
          <Row label="Date" value="—" />
          <Row label="Heure" value="—" />
          <Row label="Durée" value="—" />
          <Row label="Hauteur max." value="—" />
          <button className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--iss-blue)] px-4 py-2 text-sm font-semibold text-white">
            <CalendarPlus className="h-4 w-4" /> Ajouter à mon calendrier
          </button>
        </div>
      ) : (
        <div className="mt-4 rounded-lg border border-dashed border-white/15 bg-white/[0.02] p-4 text-sm text-white/70">
          Connectez une clé API de passages ISS (N2YO) pour activer cette fonction.
          <Link
            to="/passages"
            className="mt-3 inline-flex font-semibold text-[color:var(--iss-cyan)] hover:underline"
          >
            Voir la page Passages →
          </Link>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0">
      <span className="text-white/60">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}