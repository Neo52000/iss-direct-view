import { Link } from "@tanstack/react-router";
import { Satellite } from "lucide-react";
import { useState } from "react";
import { submitLead } from "@/services/leadService";
import { trackConversion } from "@/lib/analytics";

export function Footer() {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);
  const [consent, setConsent] = useState(false);

  return (
    <footer className="mt-24 border-t border-white/10 bg-[color:var(--iss-surface)]/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-2 md:px-6 lg:grid-cols-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[color:var(--iss-blue)]/20 ring-1 ring-[color:var(--iss-blue)]/40">
              <Satellite className="h-5 w-5 text-[color:var(--iss-cyan)]" />
            </span>
            <span className="font-display text-base font-extrabold">ISS Direct France</span>
          </div>
          <p className="mt-3 text-sm text-white/70">
            ISS Direct France vous permet de suivre la Station Spatiale Internationale en direct, de
            connaître sa position et de savoir quand l'observer depuis chez vous.
          </p>
          <p className="mt-3 text-xs text-white/50">
            Sources de données : NASA, YouTube et APIs publiques de suivi orbital. Site indépendant,
            non affilié à la NASA.
          </p>
        </div>

        <FooterCol title="Liens utiles">
          <FooterLink to="/live">Live ISS</FooterLink>
          <FooterLink to="/position">Position en temps réel</FooterLink>
          <FooterLink to="/passages">Passages au-dessus de chez vous</FooterLink>
          <FooterLink to="/blog">Blog</FooterLink>
          <FooterLink to="/ressources">Ressources</FooterLink>
        </FooterCol>

        <FooterCol title="Ressources">
          <FooterLink to="/ressources">Kit espace à imprimer</FooterLink>
          <FooterLink to="/ressources">Activités enfants</FooterLink>
          <FooterLink to="/ressources">Fiches pédagogiques</FooterLink>
          <FooterLink to="/ressources">Cartes du ciel</FooterLink>
          <FooterLink to="/ressources">Glossaire spatial</FooterLink>
        </FooterCol>

        <FooterCol title="Légal">
          <FooterLink to="/mentions-legales">Mentions légales</FooterLink>
          <FooterLink to="/confidentialite">Politique de confidentialité</FooterLink>
          <FooterLink to="/confidentialite">Cookies</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
        </FooterCol>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white/90">
            Recevez les alertes
          </h3>
          <form
            className="mt-3 flex flex-col gap-2"
            onSubmit={async (e) => {
              e.preventDefault();
              if (!email || !consent) return;
              await submitLead(email, undefined, consent);
              trackConversion("alert_signup", { source: "footer" });
              setOk(true);
              setEmail("");
            }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.fr"
              className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm outline-none focus:border-[color:var(--iss-blue)]"
            />
            <label className="flex items-start gap-2 text-[11px] text-white/60">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
                className="mt-0.5"
              />
              J'accepte de recevoir les alertes ISS par email.
            </label>
            <button
              disabled={!consent}
              className="rounded-lg bg-[color:var(--iss-blue)] px-3 py-2 text-sm font-semibold disabled:opacity-60"
            >
              OK
            </button>
            {ok ? <p className="text-xs text-[color:var(--iss-ok)]">Merci, à bientôt !</p> : null}
          </form>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/50 md:px-6">
        © {new Date().getFullYear()} ISS Direct France — Site indépendant. Flux vidéo et données
        provenant de sources publiques externes.
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white/90">
        {title}
      </h3>
      <ul className="mt-3 flex flex-col gap-2 text-sm text-white/70">{children}</ul>
    </div>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link to={to} className="hover:text-white">
        {children}
      </Link>
    </li>
  );
}
