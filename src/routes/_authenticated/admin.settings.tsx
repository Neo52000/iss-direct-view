import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { currentUserIsAdmin } from "@/lib/products";
import { fetchSetting, upsertSetting, SETTING_KEYS } from "@/lib/settings";
import { Download, LogOut, Save } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/settings")({
  head: () => ({
    meta: [
      { title: "Back office — Réglages du site" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminSettingsPage,
});

function AdminSettingsPage() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [kitUrl, setKitUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    currentUserIsAdmin().then(setIsAdmin);
  }, []);

  useEffect(() => {
    if (isAdmin !== true) return;
    fetchSetting(SETTING_KEYS.kitDownloadUrl)
      .then((v) => setKitUrl(v ?? "/ressources"))
      .catch((e) => setErr(e instanceof Error ? e.message : "Erreur"))
      .finally(() => setLoading(false));
  }, [isAdmin]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setErr(null);
    setMsg(null);
    try {
      await upsertSetting(SETTING_KEYS.kitDownloadUrl, kitUrl.trim());
      setMsg("Lien enregistré ✓");
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Erreur");
    } finally {
      setSaving(false);
    }
  }

  if (isAdmin === null) {
    return <div className="mx-auto max-w-3xl px-4 py-16 text-white/60">Vérification…</div>;
  }
  if (isAdmin === false) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-16">
        <div className="iss-card p-8">
          <h1 className="font-display text-2xl font-extrabold">Accès refusé</h1>
          <p className="mt-3 text-white/70">Votre compte n'est pas administrateur.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-10 md:px-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-extrabold md:text-4xl">Réglages du site</h1>
          <p className="text-sm text-white/60">Liens et contenus globaux affichés sur le site public.</p>
        </div>
        <button
          onClick={handleSignOut}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm"
        >
          <LogOut className="h-4 w-4" /> Sortir
        </button>
      </header>

      <form onSubmit={save} className="iss-card mt-8 flex flex-col gap-4 p-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-[color:var(--iss-cyan)]">
          <Download className="h-4 w-4" /> Kit espace à imprimer
        </div>
        <p className="text-xs text-white/60">
          URL utilisée par le bouton « Télécharger gratuitement » de la section pédagogique.
          Accepte une URL absolue (https://…) ou un chemin interne (/ressources).
        </p>
        <label className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-white/60">Lien du kit</span>
          <input
            required
            value={kitUrl}
            onChange={(e) => setKitUrl(e.target.value)}
            placeholder="https://… ou /ressources"
            disabled={loading}
            className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-[color:var(--iss-blue)]"
          />
        </label>

        {err ? <p className="text-sm text-rose-300">{err}</p> : null}
        {msg ? <p className="text-sm text-emerald-300">{msg}</p> : null}

        <button
          disabled={saving || loading}
          className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-[color:var(--iss-blue)] px-5 py-3 text-sm font-semibold disabled:opacity-60"
        >
          <Save className="h-4 w-4" /> {saving ? "Enregistrement…" : "Enregistrer"}
        </button>
      </form>
    </section>
  );
}