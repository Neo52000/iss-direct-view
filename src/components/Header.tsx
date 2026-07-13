import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Satellite, Lock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
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
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-all duration-300 ${
        scrolled
          ? "border-white/10 bg-[color:var(--iss-bg)]/95 py-0 backdrop-blur-md shadow-lg shadow-black/20"
          : "border-white/5 bg-[color:var(--iss-bg)]/70 backdrop-blur"
      }`}
    >
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
            {NAV.map((item) => {
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="relative rounded-lg px-3 py-2 text-sm text-white/80 transition hover:text-white"
                >
                  {active ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg bg-white/10"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  ) : null}
                  <span className={`relative ${active ? "text-white" : ""}`}>{item.label}</span>
                </Link>
              );
            })}
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
                to="/admin/topics"
                className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--iss-cyan)]/40 px-3 py-2 text-xs font-semibold text-[color:var(--iss-cyan)] hover:bg-[color:var(--iss-cyan)]/10"
              >
                <Lock className="h-3.5 w-3.5" /> Sujets
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
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="hidden sm:inline-flex"
          >
            <Link
              to="/"
              hash="alertes"
              className="inline-flex items-center rounded-full bg-[color:var(--iss-blue)] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[color:var(--iss-blue)]/30 transition hover:opacity-90"
            >
              Recevoir les alertes
            </Link>
          </motion.div>
          <motion.button
            aria-label="Ouvrir le menu"
            whileTap={{ scale: 0.9 }}
            className="rounded-lg p-2 text-white/80 hover:bg-white/10 lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.button>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/10 bg-[color:var(--iss-bg)] lg:hidden"
          >
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-white/90 hover:bg-white/5"
                  activeProps={{ className: "text-white bg-white/10" }}
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
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
