import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  currentUserIsAdmin,
  deleteProduct,
  fetchAllProducts,
  upsertProduct,
  type Product,
  type ProductInput,
} from "@/lib/products";
import { Pencil, Plus, Trash2, ExternalLink, BarChart3, LogOut, Sparkles } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { generateProductCopy } from "@/lib/ai-product.functions";

export const Route = createFileRoute("/_authenticated/admin/products")({
  head: () => ({
    meta: [
      { title: "Back office — Produits d'affiliation" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminProductsPage,
});

const EMPTY: ProductInput = {
  slug: "",
  title: "",
  description: "",
  meta_description: "",
  price: "",
  rating: 4.5,
  category: "",
  image_emoji: "🛰️",
  image_url: "",
  affiliate_url: "",
  badge: "",
  position: 0,
  active: true,
};

function AdminProductsPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [editing, setEditing] = useState<(ProductInput & { id?: string }) | null>(null);

  useEffect(() => {
    currentUserIsAdmin().then(setIsAdmin);
  }, []);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["admin", "products"],
    queryFn: fetchAllProducts,
    enabled: isAdmin === true,
  });

  const totals = useMemo(() => {
    const active = products.filter((p) => p.active).length;
    const clicks = products.reduce((s, p) => s + p.clicks, 0);
    return { total: products.length, active, clicks };
  }, [products]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  async function handleSave(p: ProductInput & { id?: string }) {
    await upsertProduct(p);
    setEditing(null);
    qc.invalidateQueries({ queryKey: ["admin", "products"] });
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer ce produit ?")) return;
    await deleteProduct(id);
    qc.invalidateQueries({ queryKey: ["admin", "products"] });
  }

  if (isAdmin === null) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-white/60">Vérification des droits…</div>
    );
  }

  if (isAdmin === false) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-16">
        <div className="iss-card p-8">
          <h1 className="font-display text-2xl font-extrabold">Accès refusé</h1>
          <p className="mt-3 text-white/70">
            Votre compte n'a pas le rôle <code>admin</code>. Demandez à un administrateur existant
            d'exécuter dans la base :
          </p>
          <pre className="mt-4 overflow-x-auto rounded-lg bg-black/40 p-4 text-xs">
            {`INSERT INTO public.user_roles (user_id, role)
VALUES ('${"<votre user_id>"}', 'admin');`}
          </pre>
          <button
            onClick={handleSignOut}
            className="mt-6 rounded-full border border-white/15 px-4 py-2 text-sm"
          >
            Se déconnecter
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-extrabold md:text-4xl">Liens d'affiliation</h1>
          <p className="text-sm text-white/60">Gérez le catalogue affiché sur la page d'accueil.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setEditing({ ...EMPTY, position: products.length + 1 })}
            className="inline-flex items-center gap-2 rounded-full bg-[color:var(--iss-blue)] px-4 py-2 text-sm font-semibold"
          >
            <Plus className="h-4 w-4" /> Nouveau produit
          </button>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm"
          >
            <LogOut className="h-4 w-4" /> Sortir
          </button>
        </div>
      </header>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Stat label="Produits" value={totals.total} />
        <Stat label="Actifs" value={totals.active} />
        <Stat
          label="Clics affiliés cumulés"
          value={totals.clicks}
          icon={<BarChart3 className="h-4 w-4" />}
        />
      </div>

      <div className="iss-card mt-6 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-white/60">Chargement…</div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center text-white/60">Aucun produit pour l'instant.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-left text-xs uppercase tracking-wider text-white/50">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Produit</th>
                  <th className="px-4 py-3">Cat.</th>
                  <th className="px-4 py-3">Prix</th>
                  <th className="px-4 py-3">Note</th>
                  <th className="px-4 py-3">Clics</th>
                  <th className="px-4 py-3">Statut</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p: Product) => (
                  <tr key={p.id} className="border-t border-white/5">
                    <td className="px-4 py-3 text-white/60">{p.position}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-xl">
                          {p.image_url ? (
                            <img
                              src={p.image_url}
                              alt=""
                              className="h-9 w-9 rounded-lg object-cover"
                            />
                          ) : (
                            p.image_emoji
                          )}
                        </span>
                        <div className="min-w-0">
                          <div className="truncate font-semibold">{p.title}</div>
                          <a
                            href={p.affiliate_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-[color:var(--iss-cyan)] hover:underline"
                          >
                            {p.slug} <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-white/70">{p.category}</td>
                    <td className="px-4 py-3">{p.price}</td>
                    <td className="px-4 py-3">{Number(p.rating).toFixed(1)}</td>
                    <td className="px-4 py-3 font-mono">{p.clicks}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${p.active ? "bg-emerald-500/20 text-emerald-300" : "bg-white/10 text-white/50"}`}
                      >
                        {p.active ? "Actif" : "Brouillon"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex gap-1">
                        <button
                          onClick={() => setEditing(p)}
                          className="rounded-lg p-2 hover:bg-white/10"
                          aria-label="Modifier"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="rounded-lg p-2 text-rose-300 hover:bg-rose-500/10"
                          aria-label="Supprimer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editing ? (
        <EditDrawer initial={editing} onClose={() => setEditing(null)} onSave={handleSave} />
      ) : null}
    </section>
  );
}

function Stat({ label, value, icon }: { label: string; value: number; icon?: React.ReactNode }) {
  return (
    <div className="iss-card flex items-center justify-between p-4">
      <div>
        <div className="text-xs text-white/50">{label}</div>
        <div className="font-display text-2xl font-extrabold">{value}</div>
      </div>
      {icon ? <div className="text-white/40">{icon}</div> : null}
    </div>
  );
}

function EditDrawer({
  initial,
  onClose,
  onSave,
}: {
  initial: ProductInput & { id?: string };
  onClose: () => void;
  onSave: (p: ProductInput & { id?: string }) => Promise<void>;
}) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const generate = useServerFn(generateProductCopy);

  async function handleGenerate() {
    setAiError(null);
    if (!form.title.trim()) {
      setAiError("Renseignez d'abord le titre du produit.");
      return;
    }
    setAiLoading(true);
    try {
      const out = await generate({
        data: {
          title: form.title,
          category: form.category,
          price: form.price,
          affiliate_url: form.affiliate_url,
          hint: form.badge ?? "",
        },
      });
      setForm((f) => ({
        ...f,
        description: out.description || f.description,
        meta_description: out.meta_description || f.meta_description,
      }));
    } catch (err) {
      setAiError(err instanceof Error ? err.message : "Erreur IA");
    } finally {
      setAiLoading(false);
    }
  }

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await onSave(form);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'enregistrement");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-end bg-black/60 backdrop-blur-sm">
      <form
        onSubmit={submit}
        className="flex h-full w-full max-w-xl flex-col overflow-y-auto border-l border-white/10 bg-[color:var(--iss-bg)] p-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-extrabold">
            {form.id ? "Modifier le produit" : "Nouveau produit"}
          </h2>
          <button type="button" onClick={onClose} className="text-white/60 hover:text-white">
            ✕
          </button>
        </div>

        <div className="mt-6 grid gap-4">
          <Field label="Titre">
            <input
              required
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              className={inputCls}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Slug (URL)">
              <input
                required
                value={form.slug}
                onChange={(e) =>
                  set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))
                }
                className={inputCls}
              />
            </Field>
            <Field label="Catégorie">
              <input
                required
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className={inputCls}
              />
            </Field>
          </div>
          <Field label="URL d'affiliation Amazon">
            <input
              required
              type="url"
              value={form.affiliate_url}
              onChange={(e) => set("affiliate_url", e.target.value)}
              placeholder="https://www.amazon.fr/dp/XXXX?tag=votre-tag-21"
              className={inputCls}
            />
          </Field>
          <div className="grid grid-cols-3 gap-3">
            <Field label="Prix">
              <input
                required
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
                placeholder="89,90 €"
                className={inputCls}
              />
            </Field>
            <Field label="Note (0-5)">
              <input
                type="number"
                step="0.1"
                min={0}
                max={5}
                value={form.rating}
                onChange={(e) => set("rating", parseFloat(e.target.value))}
                className={inputCls}
              />
            </Field>
            <Field label="Position">
              <input
                type="number"
                value={form.position}
                onChange={(e) => set("position", parseInt(e.target.value || "0", 10))}
                className={inputCls}
              />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Emoji (fallback)">
              <input
                value={form.image_emoji ?? ""}
                onChange={(e) => set("image_emoji", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Badge">
              <input
                value={form.badge ?? ""}
                onChange={(e) => set("badge", e.target.value)}
                placeholder="Best-seller"
                className={inputCls}
              />
            </Field>
          </div>
          <Field label="URL image réelle">
            <input
              type="url"
              value={form.image_url ?? ""}
              onChange={(e) => set("image_url", e.target.value)}
              placeholder="https://m.media-amazon.com/images/I/..."
              className={inputCls}
            />
          </Field>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white/60">
              Contenu IA (description + meta)
            </span>
            <button
              type="button"
              onClick={handleGenerate}
              disabled={aiLoading}
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--iss-cyan)]/40 bg-[color:var(--iss-cyan)]/10 px-3 py-1.5 text-xs font-semibold text-[color:var(--iss-cyan)] hover:bg-[color:var(--iss-cyan)]/20 disabled:opacity-60"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {aiLoading ? "Génération…" : "Générer avec l'IA"}
            </button>
          </div>
          {aiError ? <p className="-mt-2 text-xs text-rose-300">{aiError}</p> : null}
          <Field label="Description longue">
            <textarea
              rows={4}
              value={form.description ?? ""}
              onChange={(e) => set("description", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Meta description (SEO, ~155 car.)">
            <textarea
              rows={2}
              maxLength={170}
              value={form.meta_description ?? ""}
              onChange={(e) => set("meta_description", e.target.value)}
              className={inputCls}
            />
          </Field>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => set("active", e.target.checked)}
            />
            Produit actif (visible sur le site)
          </label>
        </div>

        {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}

        <div className="mt-auto flex gap-2 pt-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-full border border-white/15 px-4 py-3 text-sm"
          >
            Annuler
          </button>
          <button
            disabled={saving}
            className="flex-1 rounded-full bg-[color:var(--iss-blue)] px-4 py-3 text-sm font-semibold disabled:opacity-60"
          >
            {saving ? "Enregistrement…" : "Enregistrer"}
          </button>
        </div>
      </form>
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-[color:var(--iss-blue)]";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-semibold text-white/60">{label}</span>
      {children}
    </label>
  );
}
