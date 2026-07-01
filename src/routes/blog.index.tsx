import { createFileRoute, Link } from "@tanstack/react-router";
import { blogPosts } from "@/data/blogPosts";
import { getReadableDay } from "@/lib/iss-utils";
import { useQuery } from "@tanstack/react-query";
import { fetchPublishedPosts, type BlogPostRow } from "@/lib/blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog ISS — Articles sur la Station Spatiale Internationale" },
      {
        name: "description",
        content:
          "Articles pour comprendre l'ISS : observation, vitesse, altitude, astronautes, ressources pédagogiques.",
      },
      { property: "og:title", content: "Blog ISS Direct France" },
      { property: "og:description", content: "Articles ISS, observation et activités espace." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const { data: dbPosts = [] } = useQuery({
    queryKey: ["blog", "published"],
    queryFn: fetchPublishedPosts,
  });
  const merged = mergePosts(dbPosts);
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <h1 className="font-display text-3xl font-extrabold md:text-5xl">Blog ISS</h1>
      <p className="mt-3 max-w-2xl text-white/70">
        Tout pour comprendre l'ISS, l'observer et la faire découvrir aux enfants.
      </p>
      <a
        href="/rss.xml"
        className="mt-4 inline-flex items-center gap-2 rounded-full border border-[color:var(--iss-cyan)]/40 bg-[color:var(--iss-cyan)]/10 px-4 py-2 text-sm font-semibold text-[color:var(--iss-cyan)] transition hover:bg-[color:var(--iss-cyan)]/20"
          target="_blank"
        rel="noopener"
      >
        <span aria-hidden>📡</span> S'abonner au flux RSS
      </a>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {merged.map((p) => (
          <article key={p.slug} className="iss-card flex flex-col overflow-hidden">
            {p.image ? (
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                width={1024}
                height={640}
                className="aspect-[16/10] w-full object-cover"
              />
            ) : (
              <div className="grid aspect-[16/10] place-items-center bg-gradient-to-br from-[color:var(--iss-surface)] to-[#0a1f4a] text-6xl">
                <span aria-hidden>{p.cover}</span>
              </div>
            )}
            <div className="flex flex-1 flex-col p-5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[color:var(--iss-cyan)]">
                {p.category}{p.readingTime ? ` · ${p.readingTime} min` : null}
              </span>
              <h2 className="mt-2 font-display text-lg font-bold leading-snug">{p.title}</h2>
              <p className="mt-2 line-clamp-3 text-sm text-white/70">{p.excerpt}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-white/40">{getReadableDay(p.date)}</span>
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="text-sm font-semibold text-[color:var(--iss-cyan)] hover:underline"
                >
                  Lire →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

type CardPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  cover: string;
  date: string;
  readingTime: number;
  image?: string | null;
};

const STATIC_IMAGES: Record<string, string> = {
  "voir-iss-oeil-nu-france": "/blog/iss-trail-france.jpg",
  "pourquoi-live-iss-noir": "/blog/iss-live-night.jpg",
  "altitude-iss": "/blog/iss-night-orbit.jpg",
  "iss-tours-terre-par-jour": "/blog/earth-orbit-sunrise.jpg",
  "vitesse-iss": "/blog/iss-night-orbit.jpg",
  "photographier-iss-smartphone": "/blog/observation-telescope.jpg",
  "activite-espace-a-imprimer": "/blog/kids-tracking-iss.jpg",
  "expliquer-iss-primaire": "/blog/kids-tracking-iss.jpg",
};

function mergePosts(dbPosts: BlogPostRow[]): CardPost[] {
  const fromDb: CardPost[] = dbPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt ?? "",
    category: p.category,
    cover: p.cover,
    date: p.published_at,
    readingTime: p.reading_time,
    image: p.cover_image_url,
  }));
  const seen = new Set(fromDb.map((p) => p.slug));
  const fromStatic: CardPost[] = blogPosts
    .filter((p) => !seen.has(p.slug))
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      category: p.category,
      cover: p.cover,
      date: p.date,
      readingTime: p.readingTime,
      image: STATIC_IMAGES[p.slug] ?? null,
    }));
  return [...fromDb, ...fromStatic].sort((a, b) => (a.date < b.date ? 1 : -1));
}