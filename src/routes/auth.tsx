import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Connexion administrateur — ISS Direct France" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin/products" });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/admin/products" },
        });
        if (error) throw error;
        setError("Compte créé. Demandez à un admin existant de vous attribuer le rôle 'admin'.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin/products" });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-md px-4 py-16 md:px-6">
      <h1 className="font-display text-3xl font-extrabold">Espace administrateur</h1>
      <p className="mt-2 text-white/70">
        {mode === "signin" ? "Connectez-vous pour gérer le catalogue." : "Créez un compte admin."}
      </p>
      <form onSubmit={onSubmit} className="iss-card mt-6 flex flex-col gap-3 p-6">
        <input
          required
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@exemple.fr"
          className="rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-[color:var(--iss-blue)]"
        />
        <input
          required
          minLength={6}
          type="password"
          autoComplete={mode === "signin" ? "current-password" : "new-password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          className="rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-[color:var(--iss-blue)]"
        />
        {error ? <p className="text-sm text-amber-300">{error}</p> : null}
        <button
          disabled={loading}
          className="rounded-full bg-[color:var(--iss-blue)] px-5 py-3 text-sm font-semibold disabled:opacity-60"
        >
          {loading ? "..." : mode === "signin" ? "Se connecter" : "Créer un compte"}
        </button>
        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="text-xs text-white/60 hover:text-white"
        >
          {mode === "signin"
            ? "Pas encore de compte ? S'inscrire"
            : "Déjà un compte ? Se connecter"}
        </button>
        <Link to="/" className="text-center text-xs text-white/40 hover:text-white/70">
          ← Retour au site
        </Link>
      </form>
    </section>
  );
}
