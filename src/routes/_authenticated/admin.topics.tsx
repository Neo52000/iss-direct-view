import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { currentUserIsAdmin } from "@/lib/products";
import {
  deleteTopic,
  fetchAllTopics,
  upsertTopic,
  type ContentTopicInput,
  type ContentTopicRow,
  type TopicStatus,
} from "@/lib/topics";
import { upsertPost } from "@/lib/blog";
import { generateBlogArticle } from "@/lib/ai-blog.functions";
import { Pencil, Plus, Trash2, ExternalLink, LogOut, Sparkles, Loader2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/topics")({
  head: () => ({
    meta: [
      { title: "Back office — Banque de sujets" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminTopicsPage,
});

const EMPTY: ContentTopicInput = {
  keyword: "",
  intent: "",
  format: "Article",
  priority: "P2",
  monetization_lever: "",
  target_length: 700,
  internal_links: [],
  status: "a_produire",
  blog_post_id: null,
  notes: "",
};

const STATUS_LABEL: Record<TopicStatus, string> = {
  a_produire: "À produire",
  draft_genere: "Brouillon généré",
  en_revision: "En révision",
  publie: "Publié",
};

function parseInternalLinks(links: string[]): { text: string; url: string }[] {
  return links
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      if (l.includes("|")) {
        const [text, url] = l.split("|").map((s) => s.trim());
        return { text: text || url, url };
      }
      return { text: l, url: l };
    });
}

function AdminTopicsPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [editing, setEditing] = useState<(ContentTopicInput & { id?: string }) | null>(null);
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [genError, setGenError] = useState<string | null>(null);
  const generate = useServerFn(generateBlogArticle);

  useEffect(() => {
    currentUserIsAdmin().then(setIsAdmin);
  }, []);

  const { data: topics = [], isLoading } = useQuery({
    queryKey: ["admin", "topics"],
    queryFn: fetchAllTopics,
    enabled: isAdmin === true,
  });

  const sorted = useMemo(
    () =>
      [...topics].sort(
        (a, b) => a.priority.localeCompare(b.priority) || a.status.localeCompare(b.status),
      ),
    [topics],
  );

  const totals = useMemo(() => {
    const p1Pending = topics.filter((t) => t.priority === "P1" && t.status === "a_produire").length;
    const drafted = topics.filter((t) => t.status !== "a_produire").length;
    return { total: topics.length, p1Pending, drafted };
  }, [topics]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  async function handleSave(t: ContentTopicInput & { id?: string }) {
    await upsertTopic(t);
    setEditing(null);
    qc.invalidateQueries({ queryKey: ["admin", "topics"] });
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer ce sujet ?")) return;
    await deleteTopic(id);
    qc.invalidateQueries({ queryKey: ["admin", "topics"] });
  }

  async function handleStatusChange(topic: ContentTopicRow, status: TopicStatus) {
    await upsertTopic({ id: topic.id, status });
    qc.invalidateQueries({ queryKey: ["admin", "topics"] });
  }

  async function handleGenerate(topic: ContentTopicRow) {
    setGenError(null);
    setGeneratingId(topic.id);
    try {
      const out = await generate({
        data: {
          keyword: topic.keyword,
          angle: topic.intent ?? "",
          targetLength: topic.target_length,
          internalLinks: parseInternalLinks(topic.internal_links),
        },
      });
      const content = out.cta ? `${out.content}\n\n${out.cta}` : out.content;
      const slugify = (s: string) =>
        s
          .toLowerCase()
          .normalize("NFD")
          .replace(/[̀-ͯ]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
          .slice(0, 60);

      await upsertPost({
        slug: out.slug || slugify(topic.keyword),
        title: out.title,
        meta_description: out.meta_description,
        excerpt: out.excerpt,
        content,
        category: out.category,
        cover: out.cover,
        reading_time: out.reading_time,
        published: !out.to_verify,
        published_at: new Date().toISOString(),
        cover_image_url: null,
        cover_image_alt: out.alt_text || null,
        faq: out.faq,
        social_suggestions: out.social_suggestions,
        to_verify: out.to_verify || null,
      });

      // Le post généré n'a pas d'id renvoyé par upsertPost (insert) ; on relie via slug.
      const { data: created } = await supabase
        .from("blog_posts")
        .select("id")
        .eq("slug", out.slug || slugify(topic.keyword))
        .maybeSingle();

      await upsertTopic({
        id: topic.id,
        status: "draft_genere",
        blog_post_id: created?.id ?? null,
      });

      qc.invalidateQueries({ queryKey: ["admin", "topics"] });
      qc.invalidateQueries({ queryKey: ["admin", "blog"] });
    } catch (err) {
      setGenError(err instanceof Error ? err.message : "Erreur de génération");
    } finally {
      setGeneratingId(null);
    }
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
          <h1 className="font-display text-3xl font-extrabold md:text-4xl">Banque de sujets</h1>
          <p className="text-sm text-white/60">
            Pipeline éditorial : priorité, statut, génération IA.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setEditing({ ...EMPTY })}
            className="inline-flex items-center gap-2 rounded-full bg-[color:var(--iss-blue)] px-4 py-2 text-sm font-semibold"
          >
            <Plus className="h-4 w-4" /> Nouveau sujet
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
        <Stat label="Sujets" value={totals.total} />
        <Stat label="P1 à produire" value={totals.p1Pending} />
        <Stat label="Engagés (draft+)" value={totals.drafted} />
      </div>

      {genError ? <p className="mt-4 text-sm text-rose-300">{genError}</p> : null}

      <div className="iss-card mt-6 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-white/60">Chargement…</div>
        ) : sorted.length === 0 ? (
          <div className="p-8 text-center text-white/60">Aucun sujet pour l'instant.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-left text-xs uppercase tracking-wider text-white/50">
                <tr>
                  <th className="px-4 py-3">Sujet</th>
                  <th className="px-4 py-3">Priorité</th>
                  <th className="px-4 py-3">Format</th>
                  <th className="px-4 py-3">Statut</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((t) => (
                  <tr key={t.id} className="border-t border-white/5">
                    <td className="px-4 py-3">
                      <div className="min-w-0">
                        <div className="truncate font-semibold">{t.keyword}</div>
                        {t.blog_post_id ? (
                          <button
                            onClick={() => navigate({ to: "/admin/blog" })}
                            className="inline-flex items-center gap-1 text-xs text-[color:var(--iss-cyan)] hover:underline"
                          >
                            Voir le brouillon <ExternalLink className="h-3 w-3" />
                          </button>
                        ) : null}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-white/10 px-2 py-1 text-xs font-semibold">
                        {t.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white/70">{t.format}</td>
                    <td className="px-4 py-3">
                      <select
                        value={t.status}
                        onChange={(e) => handleStatusChange(t, e.target.value as TopicStatus)}
                        className="rounded-lg border border-white/15 bg-white/5 px-2 py-1 text-xs"
                      >
                        {(Object.keys(STATUS_LABEL) as TopicStatus[]).map((s) => (
                          <option key={s} value={s}>
                            {STATUS_LABEL[s]}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => handleGenerate(t)}
                          disabled={generatingId === t.id}
                          className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--iss-cyan)]/40 bg-[color:var(--iss-cyan)]/10 px-3 py-1.5 text-xs font-semibold text-[color:var(--iss-cyan)] hover:bg-[color:var(--iss-cyan)]/20 disabled:opacity-60"
                        >
                          {generatingId === t.id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Sparkles className="h-3.5 w-3.5" />
                          )}
                          {generatingId === t.id ? "Génération…" : "Générer brouillon"}
                        </button>
                        <button
                          onClick={() => setEditing(t)}
                          className="rounded-lg p-2 hover:bg-white/10"
                          aria-label="Modifier"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(t.id)}
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
  onClose,
  onSave,
}: {
  initial: ContentTopicInput & { id?: string };
  onClose: () => void;
  onSave: (t: ContentTopicInput & { id?: string }) => Promise<void>;
}) {
  const [form, setForm] = useState(initial);
  const [linksText, setLinksText] = useState(initial.internal_links.join("\n"));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await onSave({
        ...form,
        internal_links: linksText
          .split("\n")
          .map((l) => l.trim())
          .filter(Boolean),
      });
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
            {form.id ? "Modifier le sujet" : "Nouveau sujet"}
          </h2>
          <button type="button" onClick={onClose} className="text-white/60 hover:text-white">
            ✕
          </button>
        </div>

        <div className="mt-6 grid gap-4">
          <Field label="Mot-clé cible">
            <input
              required
              value={form.keyword}
              onChange={(e) => set("keyword", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Intention / angle">
            <input
              value={form.intent ?? ""}
              onChange={(e) => set("intent", e.target.value)}
              className={inputCls}
            />
          </Field>
          <div className="grid grid-cols-3 gap-3">
            <Field label="Format">
              <input
                value={form.format ?? ""}
                onChange={(e) => set("format", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Priorité">
              <select
                value={form.priority}
                onChange={(e) => set("priority", e.target.value as ContentTopicInput["priority"])}
                className={inputCls}
              >
                <option value="P1">P1</option>
                <option value="P2">P2</option>
                <option value="P3">P3</option>
              </select>
            </Field>
            <Field label="Longueur cible (mots)">
              <input
                type="number"
                min={200}
                max={2000}
                value={form.target_length}
                onChange={(e) => set("target_length", parseInt(e.target.value || "700", 10))}
                className={inputCls}
              />
            </Field>
          </div>
          <Field label="Levier de monétisation">
            <input
              value={form.monetization_lever ?? ""}
              onChange={(e) => set("monetization_lever", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Liens internes obligatoires (1 par ligne, format « Texte du lien|/url »)">
            <textarea
              rows={4}
              value={linksText}
              onChange={(e) => setLinksText(e.target.value)}
              placeholder={"Voir les passages visibles|/passages"}
              className={`${inputCls} font-mono text-xs`}
            />
          </Field>
          <Field label="Notes">
            <textarea
              rows={3}
              value={form.notes ?? ""}
              onChange={(e) => set("notes", e.target.value)}
              className={inputCls}
            />
          </Field>
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
