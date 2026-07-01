import { Link } from "@tanstack/react-router";
import { blogPosts } from "@/data/blogPosts";
import { getReadableDay } from "@/lib/iss-utils";
import { useQuery } from "@tanstack/react-query";
import { fetchPublishedPosts } from "@/lib/blog";
import { Skeleton } from "@/components/ui/skeleton";

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

export function BlogPreview({ count = 3 }: { count?: number }) {
  const { data: dbPosts = [], isLoading } = useQuery({
    queryKey: ["blog", "published"],
    queryFn: fetchPublishedPosts,
  });
  const fromDb = dbPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt ?? "",
    category: p.category,
    cover: p.cover,
    date: p.published_at,
    readingTime: p.reading_time,
    image: p.cover_image_url ?? STATIC_IMAGES[p.slug] ?? null,
  }));
  const seen = new Set(fromDb.map((p) => p.slug));
  const fromStatic = blogPosts
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
  const posts = [...fromDb, ...fromStatic]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, count);
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-3xl font-extrabold md:text-4xl">Blog & actualités</h2>
          <p className="mt-2 text-white/70">
            Comprendre l'ISS, observer le ciel, transmettre la passion de l'espace.
          </p>
        </div>
        <Link
          to="/blog"
          className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-semibold hover:bg-white/10"
        >
          Tous les articles
        </Link>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {isLoading && dbPosts.length === 0
          ? Array.from({ length: count }).map((_, i) => (
              <div key={i} className="iss-card flex flex-col overflow-hidden">
                <Skeleton className="aspect-[16/10] w-full rounded-none" />
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="mt-2 h-4 w-1/3" />
                </div>
              </div>
            ))
          : posts.map((p) => (
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
              <h3 className="mt-2 font-display text-lg font-bold leading-snug">{p.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-white/70">{p.excerpt}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-white/40">{getReadableDay(p.date)}</span>
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="text-sm font-semibold text-[color:var(--iss-cyan)] hover:underline"
                >
                  Lire l'article →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

    </section>
  );
}