import { useState } from "react";
import { Mail, Check } from "lucide-react";
import { submitLead } from "@/services/leadService";

export function EmailCapture() {
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [consent, setConsent] = useState(true);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <section id="alertes" className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[color:var(--iss-surface)] via-[#0a1f4a] to-[#0a1f4a] p-8 md:p-12">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[color:var(--iss-blue)]/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[color:var(--iss-cyan)]/20 blur-3xl" />
        <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs">
              <Mail className="h-3.5 w-3.5" /> Alertes ISS
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold md:text-4xl">
              Ne manquez aucun passage !
            </h2>
            <p className="mt-3 text-white/80">
              Recevez gratuitement les alertes de passage de l'ISS au-dessus de votre ville et nos
              ressources espace à imprimer.
            </p>
          </div>
          {done ? (
            <div className="iss-card flex flex-col items-center justify-center p-8 text-center">
              <Check className="h-10 w-10 text-[color:var(--iss-ok)]" />
              <p className="mt-3 font-display text-lg font-bold">Inscription confirmée</p>
              <p className="mt-1 text-sm text-white/70">
                Vous recevrez bientôt nos alertes et ressources espace.
              </p>
            </div>
          ) : (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!email) return;
                setLoading(true);
                await submitLead(email, city, consent);
                setLoading(false);
                setDone(true);
              }}
              className="flex flex-col gap-3 rounded-2xl bg-black/30 p-5 ring-1 ring-white/10"
            >
              <label className="text-xs font-medium text-white/70">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.fr"
                className="rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-[color:var(--iss-blue)]"
              />
              <label className="mt-2 text-xs font-medium text-white/70">Ville (facultatif)</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Paris"
                className="rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-[color:var(--iss-blue)]"
              />
              <label className="mt-2 flex items-start gap-2 text-xs text-white/60">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5"
                />
                J'accepte de recevoir les alertes ISS et les ressources espace par email.
              </label>
              <button
                disabled={loading}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-[color:var(--iss-blue)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[color:var(--iss-blue)]/30 disabled:opacity-60"
              >
                {loading ? "Inscription…" : "Je m'inscris"}
              </button>
              <p className="text-center text-[11px] text-white/50">
                Pas de spam. Désinscription en un clic.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}