import { useEffect, useState } from "react";
import { CalendarPlus, MapPin, Loader2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { getVisiblePasses, type VisiblePass } from "@/services/passesApi";
import { generateCalendarEvent, getReadableDate } from "@/lib/iss-utils";

function useCountdown(targetMs: number) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const remaining = Math.max(0, Math.floor((targetMs - now) / 1000));
  return {
    days: Math.floor(remaining / 86400),
    hours: Math.floor((remaining % 86400) / 3600),
    minutes: Math.floor((remaining % 3600) / 60),
    seconds: remaining % 60,
  };
}

function CountdownDigit({ value, label }: { value: number; label: string }) {
  const padded = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative h-9 w-11 overflow-hidden rounded-lg bg-white/[0.06]">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={padded}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute inset-0 grid place-items-center font-display text-base font-bold text-white"
          >
            {padded}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[10px] uppercase tracking-wider text-white/40">{label}</span>
    </div>
  );
}

function Countdown({ targetMs }: { targetMs: number }) {
  const { days, hours, minutes, seconds } = useCountdown(targetMs);
  return (
    <div className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] py-3">
      <CountdownDigit value={days} label="jours" />
      <span className="pb-4 text-white/30">:</span>
      <CountdownDigit value={hours} label="h" />
      <span className="pb-4 text-white/30">:</span>
      <CountdownDigit value={minutes} label="min" />
      <span className="pb-4 text-white/30">:</span>
      <CountdownDigit value={seconds} label="sec" />
    </div>
  );
}

type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "nokey" }
  | { status: "nolocation" }
  | { status: "error"; message: string }
  | { status: "ok"; pass: VisiblePass; label: string };

export function NextPassCard() {
  const hasKey = Boolean(import.meta.env.VITE_N2YO_API_KEY);
  const [state, setState] = useState<State>(hasKey ? { status: "loading" } : { status: "nokey" });

  useEffect(() => {
    if (!hasKey) return;
    if (!("geolocation" in navigator)) {
      setState({ status: "nolocation" });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude: lat, longitude: lon } = pos.coords;
          const result = await getVisiblePasses(lat, lon);
          if (!result.configured) {
            setState({ status: "nokey" });
            return;
          }
          if ("error" in result || !result.passes.length) {
            setState({ status: "error", message: "error" in result ? result.error : "Aucun passage trouvé" });
            return;
          }
          const label = `${lat.toFixed(1)}°N, ${Math.abs(lon).toFixed(1)}°${lon >= 0 ? "E" : "O"}`;
          setState({ status: "ok", pass: result.passes[0], label });
        } catch (err) {
          setState({ status: "error", message: err instanceof Error ? err.message : "Erreur réseau" });
        }
      },
      () => setState({ status: "nolocation" }),
      { timeout: 8000 },
    );
  }, [hasKey]);

  return (
    <div className="iss-card iss-card-interactive p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-[color:var(--iss-cyan)]" />
          <h3 className="font-display text-base font-bold">Prochain passage visible</h3>
        </div>
        <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs text-white/70">
          Au-dessus de chez vous
        </span>
      </div>

      {state.status === "loading" && (
        <div className="mt-4 flex items-center gap-2 text-sm text-white/60">
          <Loader2 className="h-4 w-4 animate-spin" /> Localisation en cours…
        </div>
      )}

      {state.status === "ok" && (
        <div className="mt-4 space-y-3 text-sm">
          <Countdown targetMs={state.pass.startUTC * 1000} />
          <Row label="Localisation" value={state.label} />
          <Row label="Date" value={getReadableDate(state.pass.startUTC * 1000)} />
          <Row label="Durée" value={`${Math.round(state.pass.duration / 60)} min`} />
          <Row label="Hauteur max." value={`${Math.round(state.pass.maxEl)}°`} />
          <button
            onClick={() => generateCalendarEvent(state.pass, state.label)}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--iss-blue)] px-4 py-2 text-sm font-semibold text-white"
          >
            <CalendarPlus className="h-4 w-4" /> Ajouter à mon calendrier
          </button>
        </div>
      )}

      {state.status === "nolocation" && (
        <div className="mt-4 rounded-lg border border-dashed border-white/15 bg-white/[0.02] p-4 text-sm text-white/70">
          Autorisez la géolocalisation pour voir le prochain passage près de chez vous.
          <Link
            to="/passages"
            className="mt-3 block font-semibold text-[color:var(--iss-cyan)] hover:underline"
          >
            Entrer ma ville manuellement →
          </Link>
        </div>
      )}

      {state.status === "error" && (
        <div className="mt-4 rounded-lg border border-dashed border-white/15 bg-white/[0.02] p-4 text-sm text-white/70">
          Aucun passage visible dans les prochains jours pour votre position.
          <Link
            to="/passages"
            className="mt-3 block font-semibold text-[color:var(--iss-cyan)] hover:underline"
          >
            Voir tous les passages →
          </Link>
        </div>
      )}

      {state.status === "nokey" && (
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
