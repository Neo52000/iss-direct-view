import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { currentUserIsAdmin } from "@/lib/products";
import {
  deletePost,
  fetchAllPosts,
  upsertPost,
  type BlogPostInput,
  type BlogPostRow,
} from "@/lib/blog";
import { Pencil, Plus, Trash2, ExternalLink, LogOut, Sparkles } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { generateBlogArticle } from "@/lib/ai-blog.functions";

export const Route = createFileRoute("/_authenticated/admin/blog")({
  head: () => ({
    meta: [
      { title: "Back office — Articles de blog" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminBlogPage,
});

const EMPTY: BlogPostInput = {
  slug: "",
  title: "",
  meta_description: "",
  excerpt: "",
  content: "",
  category: "Sciences",
  cover: "🛰️",
  reading_time: 4,
  published: true,
  published_at: new Date().toISOString(),
  cover_image_url: null,
  cover_image_alt: null,
  faq: [],
  social_suggestions: [],
  to_verify: null,
};

function AdminBlogPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [editing, setEditing] = useState<(BlogPostInput & { id?: string }) | null>(null);

  useEffect(() => {
    currentUserIsAdmin().then(setIsAdmin);
  }, []);

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["admin", "blog"],
    queryFn: fetchAllPosts,
    enabled: isAdmin === true,
  });

  const totals = useMemo(() => {
    const published = posts.filter((p) => p.published).length;
    return { total: posts.length, published };
  }, [posts]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  async function handleSave(p: BlogPostInput & { id?: string }) {
    await upsertPost(p);
    setEditing(null);
    qc.invalidateQueries({ queryKey: ["admin", "blog"] });
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cet article ?")) return;
    await deletePost(id);
    qc.invalidateQueries({ queryKey: ["admin", "blog"] });
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
            Votre compte n'a pas le rôle <code>admin</code>.
          </p>
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
          <h1 className="font-display text-3xl font-extrabold md:text-4xl">Articles de blog</h1>
          <p className="text-sm text-white/60">Créez, générez par IA et publiez vos articles.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setEditing({ ...EMPTY, published_at: new Date().toISOString() })}
            className="inline-flex items-center gap-2 rounded-full bg-[color:var(--iss-blue)] px-4 py-2 text-sm font-semibold"
          >
            <Plus className="h-4 w-4" /> Nouvel article
          </button>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm"
          >
            <LogOut className="h-4 w-4" /> Sortir
          </button>
        </div>
      </header>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Stat label="Articles" value={totals.total} />
        <Stat label="Publiés" value={totals.published} />
      </div>

      <div className="iss-card mt-6 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-white/60">Chargement…</div>
        ) : posts.length === 0 ? (
          <div className="p-8 text-center text-white/60">Aucun article pour l'instant.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-left text-xs uppercase tracking-wider text-white/50">
                <tr>
                  <th className="px-4 py-3">Article</th>
                  <th className="px-4 py-3">Cat.</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Statut</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((p: BlogPostRow) => (
                  <tr key={p.id} className="border-t border-white/5">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-xl">
                          {p.cover}
                        </span>
                        <div className="min-w-0">
                          <div className="truncate font-semibold">{p.title}</div>
                          <a
                            href={`/blog/${p.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-[color:var(--iss-cyan)] hover:underline"
                          >
                            /{p.slug} <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-white/70">{p.category}</td>
                    <td className="px-4 py-3 text-white/60">
                      {new Date(p.published_at).toLocaleDateString("fr-FR")}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${p.published ? "bg-emerald-500/20 text-emerald-300" : "bg-white/10 text-white/50"}`}
                      >
                        {p.published ? "Publié" : "Brouillon"}
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
        <EditDrawer
          initial={editing}
          existingPosts={posts}
          onClose={() => setEditing(null)}
          onSave={handleSave}
        />
      ) : null}
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="iss-card p-4">
      <div className="text-xs text-white/50">{label}</div>
      <div className="font-display text-2xl font-extrabold">{value}</div>
    </div>
  );
}

function EditDrawer({
  initial,
  existingPosts,
  onClose,
  onSave,
}: {
  initial: BlogPostInput & { id?: string };
  existingPosts: BlogPostRow[];
  onClose: () => void;
  onSave: (p: BlogPostInput & { id?: string }) => Promise<void>;
}) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [topic, setTopic] = useState(initial.title);
  const [angle, setAngle] = useState("");
  const generate = useServerFn(generateBlogArticle);

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function handleGenerate() {
    setAiError(null);
    const subject = topic.trim() || form.title.trim();
    if (!subject) {
      setAiError("Renseignez d'abord un sujet ou un titre.");
      return;
    }
    setAiLoading(true);
    try {
      const out = await generate({ data: { keyword: subject, angle } });
      const content = out.cta ? `${out.content}\n\n${out.cta}` : out.content;
      setForm((f) => ({
        ...f,
        title: out.title || f.title,
        slug: f.slug || out.slug,
        meta_description: out.meta_description || f.meta_description,
        excerpt: out.excerpt || f.excerpt,
        category: out.category || f.category,
        cover: out.cover || f.cover,
        reading_time: out.reading_time || f.reading_time,
        content: content || f.content,
        cover_image_alt: out.alt_text || f.cover_image_alt,
        faq: out.faq.length ? out.faq : f.faq,
        social_suggestions: out.social_suggestions.length
          ? out.social_suggestions
          : f.social_suggestions,
        to_verify: out.to_verify || null,
        published: out.to_verify ? false : f.published,
      }));
    } catch (err) {
      setAiError(err instanceof Error ? err.message : "Erreur IA");
    } finally {
      setAiLoading(false);
    }
  }

  const duplicateWarnings = useMemo(() => {
    const warnings: string[] = [];
    const others = existingPosts.filter((p) => p.id !== form.id);
    if (
      form.title &&
      others.some((p) => p.meta_description && p.meta_description === form.meta_description)
    ) {
      warnings.push("Meta description déjà utilisée par un autre article.");
    }
    if (
      form.title &&
      others.some((p) => p.title.trim().toLowerCase() === form.title.trim().toLowerCase())
    ) {
      warnings.push("Titre déjà utilisé par un autre article.");
    }
    if (form.cover_image_url && others.some((p) => p.cover_image_url === form.cover_image_url)) {
      warnings.push("Image de couverture déjà utilisée par un autre article.");
    }
    return warnings;
  }, [existingPosts, form.id, form.title, form.meta_description, form.cover_image_url]);

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
        className="flex h-full w-full max-w-2xl flex-col overflow-y-auto border-l border-white/10 bg-[color:var(--iss-bg)] p-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-extrabold">
            {form.id ? "Modifier l'article" : "Nouvel article"}
          </h2>
          <button type="button" onClick={onClose} className="text-white/60 hover:text-white">
            ✕
          </button>
        </div>

        <div className="iss-card mt-5 space-y-3 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white/70">Générer l'article avec l'IA</span>
            <button
              type="button"
              onClick={handleGenerate}
              disabled={aiLoading}
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--iss-cyan)]/40 bg-[color:var(--iss-cyan)]/10 px-3 py-1.5 text-xs font-semibold text-[color:var(--iss-cyan)] hover:bg-[color:var(--iss-cyan)]/20 disabled:opacity-60"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {aiLoading ? "Génération…" : "Générer"}
            </button>
          </div>
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Sujet (ex: Voir l'ISS depuis Lyon en hiver)"
            className={inputCls}
          />
          <input
            value={angle}
            onChange={(e) => setAngle(e.target.value)}
            placeholder="Angle / consigne (optionnel)"
            className={inputCls}
          />
          {aiError ? <p className="text-xs text-rose-300">{aiError}</p> : null}
        </div>

        {form.to_verify ? (
          <div className="mt-4 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
            <strong>À vérifier avant publication :</strong> {form.to_verify}
          </div>
        ) : null}

        {duplicateWarnings.length ? (
          <div className="mt-4 space-y-1 rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
            {duplicateWarnings.map((w) => (
              <p key={w}>⚠ {w}</p>
            ))}
          </div>
        ) : null}

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
            <Field label="Slug">
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
          <div className="grid grid-cols-3 gap-3">
            <Field label="Emoji">
              <input
                value={form.cover}
                onChange={(e) => set("cover", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Lecture (min)">
              <input
                type="number"
                min={1}
                max={30}
                value={form.reading_time}
                onChange={(e) => set("reading_time", parseInt(e.target.value || "3", 10))}
                className={inputCls}
              />
            </Field>
            <Field label="Date publication">
              <input
                type="date"
                value={form.published_at.slice(0, 10)}
                onChange={(e) => set("published_at", new Date(e.target.value).toISOString())}
                className={inputCls}
              />
            </Field>
          </div>
          <Field label="Meta description (SEO, ~155 car.)">
            <textarea
              rows={2}
              maxLength={170}
              value={form.meta_description ?? ""}
              onChange={(e) => set("meta_description", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Chapô / extrait">
            <textarea
              rows={2}
              value={form.excerpt ?? ""}
              onChange={(e) => set("excerpt", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Contenu (paragraphes séparés par une ligne vide)">
            <textarea
              rows={14}
              value={form.content}
              onChange={(e) => set("content", e.target.value)}
              className={`${inputCls} font-mono text-xs`}
            />
          </Field>
          <Field label="Texte alternatif image de couverture">
            <input
              value={form.cover_image_alt ?? ""}
              onChange={(e) => set("cover_image_alt", e.target.value || null)}
              className={inputCls}
            />
          </Field>
          <Field label="FAQ (JSON [{q,a}], 3 questions max recommandé)">
            <textarea
              rows={5}
              value={JSON.stringify(form.faq ?? [], null, 2)}
              onChange={(e) => {
                try {
                  set("faq", JSON.parse(e.target.value));
                } catch {
                  /* JSON invalide en cours de frappe, ignoré */
                }
              }}
              className={`${inputCls} font-mono text-xs`}
            />
          </Field>
          {form.social_suggestions?.length ? (
            <Field label="Suggestions de partage social (générées par l'IA, à copier-coller)">
              <ul className="space-y-1 rounded-lg border border-white/10 bg-white/5 p-3 text-xs text-white/70">
                {form.social_suggestions.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </Field>
          ) : null}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => set("published", e.target.checked)}
            />
            Publié (visible sur le blog)
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
