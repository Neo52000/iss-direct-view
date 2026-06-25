import { Link } from "@tanstack/react-router";
import { blogPosts } from "@/data/blogPosts";
import { getReadableDay } from "@/lib/iss-utils";

export function BlogPreview({ count = 3 }: { count?: number }) {
  const posts = blogPosts.slice(0, count);
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
        {posts.map((p) => (
          <article key={p.slug} className="iss-card flex flex-col overflow-hidden">
            <div className="grid aspect-[16/10] place-items-center bg-gradient-to-br from-[color:var(--iss-surface)] to-[#0a1f4a] text-6xl">
              <span aria-hidden>{p.cover}</span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[color:var(--iss-cyan)]">
                {p.category} · {p.readingTime} min
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