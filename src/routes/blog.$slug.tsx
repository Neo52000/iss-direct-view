import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { blogPosts, getPost } from "@/data/blogPosts";
import { getReadableDate } from "@/lib/iss-utils";
import { EmailCapture } from "@/components/EmailCapture";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => {
    const post = loaderData;
    if (!post) return { meta: [{ title: "Article — ISS Direct France" }] };
    return {
      meta: [
        { title: `${post.title} — ISS Direct France` },
        { name: "description", content: post.metaDescription },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.metaDescription },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${post.slug}` },
        { property: "article:published_time", content: post.date },
      ],
      links: [{ rel: "canonical", href: `/blog/${post.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.metaDescription,
            datePublished: post.date,
            articleSection: post.category,
          }),
        },
      ],
    };
  },
  component: BlogPostPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="font-display text-3xl font-extrabold">Article introuvable</h1>
      <Link to="/blog" className="mt-4 inline-block text-[color:var(--iss-cyan)] underline">
        Retour au blog
      </Link>
    </div>
  ),
});

function BlogPostPage() {
  const post = Route.useLoaderData();
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-10 md:px-6">
        <Link to="/blog" className="text-sm text-[color:var(--iss-cyan)] hover:underline">
          ← Tous les articles
        </Link>
        <span className="mt-6 block text-xs font-semibold uppercase tracking-wider text-[color:var(--iss-cyan)]">
          {post.category} · {post.readingTime} min
        </span>
        <h1 className="mt-2 font-display text-3xl font-extrabold leading-tight md:text-5xl">
          {post.title}
        </h1>
        <p className="mt-3 text-sm text-white/50">Publié le {getReadableDate(post.date)}</p>
        <div className="my-8 grid aspect-[16/9] place-items-center rounded-2xl bg-gradient-to-br from-[color:var(--iss-surface)] to-[#0a1f4a] text-8xl">
          <span aria-hidden>{post.cover}</span>
        </div>
        <div className="space-y-5 text-white/85 md:text-lg">
          {post.content.split("\n\n").map((para: string, i: number) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </article>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <h2 className="font-display text-2xl font-extrabold">À lire ensuite</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {related.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="iss-card flex flex-col p-5 transition hover:bg-white/[0.06]"
            >
              <span className="text-2xl">{p.cover}</span>
              <h3 className="mt-3 font-display text-base font-bold">{p.title}</h3>
              <p className="mt-1 text-sm text-white/60">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      <EmailCapture />
    </>
  );
}