import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Satellite, Lock } from "lucide-react";
import { currentUserIsAdmin } from "@/lib/products";
import { supabase } from "@/integrations/supabase/client";

const NAV = [
  { to: "/", label: "Accueil" },
  { to: "/live", label: "Live ISS" },
  { to: "/position", label: "Position" },
  { to: "/passages", label: "Passages" },
  { to: "/blog", label: "Blog" },
  { to: "/ressources", label: "Ressources" },
  { to: "/a-propos", label: "À propos" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let mounted = true;
    currentUserIsAdmin().then((v) => mounted && setIsAdmin(v));
    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      currentUserIsAdmin().then((v) => mounted && setIsAdmin(v));
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[color:var(--iss-bg)]/80 backdrop-blur">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 md:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[color:var(--iss-blue)]/20 ring-1 ring-[color:var(--iss-blue)]/40">
            <Satellite className="h-5 w-5 text-[color:var(--iss-cyan)]" />
          </span>
          <span className="truncate font-display text-base font-extrabold tracking-tight md:text-lg">
            ISS Direct France
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-lg px-3 py-2 text-sm text-white/80 transition hover:bg-white/5 hover:text-white"
                activeProps={{ className: "text-white bg-white/10" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          {isAdmin ? (
            <div className="hidden items-center gap-1 lg:inline-flex">
              <Link
                to="/admin/products"
                className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--iss-cyan)]/40 px-3 py-2 text-xs font-semibold text-[color:var(--iss-cyan)] hover:bg-[color:var(--iss-cyan)]/10"
              >
                <Lock className="h-3.5 w-3.5" /> Produits
              </Link>
              <Link
                to="/admin/blog"
                className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--iss-cyan)]/40 px-3 py-2 text-xs font-semibold text-[color:var(--iss-cyan)] hover:bg-[color:var(--iss-cyan)]/10"
              >
                <Lock className="h-3.5 w-3.5" /> Blog
              </Link>
              <Link
                to="/admin/settings"
                className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--iss-cyan)]/40 px-3 py-2 text-xs font-semibold text-[color:var(--iss-cyan)] hover:bg-[color:var(--iss-cyan)]/10"
              >
                <Lock className="h-3.5 w-3.5" /> Kit
              </Link>
              <Link
                to="/admin/shorts"
                className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--iss-cyan)]/40 px-3 py-2 text-xs font-semibold text-[color:var(--iss-cyan)] hover:bg-[color:var(--iss-cyan)]/10"
              >
                <Lock className="h-3.5 w-3.5" /> Shorts
              </Link>
              <Link
                to="/admin/analytics"
                className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--iss-cyan)]/40 px-3 py-2 text-xs font-semibold text-[color:var(--iss-cyan)] hover:bg-[color:var(--iss-cyan)]/10"
              >
                <Lock className="h-3.5 w-3.5" /> Stats
              </Link>
            </div>
          ) : null}
          <Link
            to="/"
            hash="alertes"
            className="hidden rounded-full bg-[color:var(--iss-blue)] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[color:var(--iss-blue)]/30 transition hover:opacity-90 sm:inline-flex"
          >
            Recevoir les alertes
          </Link>
          <button
            aria-label="Ouvrir le menu"
            className="rounded-lg p-2 text-white/80 hover:bg-white/10 lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open ? (
        <div className="border-t border-white/10 bg-[color:var(--iss-bg)] lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-white/90 hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/"
              hash="alertes"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-[color:var(--iss-blue)] px-4 py-2 text-center text-sm font-semibold"
            >
              Recevoir les alertes
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
