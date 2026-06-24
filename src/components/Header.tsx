import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Satellite } from "lucide-react";

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