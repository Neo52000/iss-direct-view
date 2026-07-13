import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { blogPosts, getPost } from "@/data/blogPosts";
import { getReadableDay } from "@/lib/iss-utils";
import { EmailCapture } from "@/components/EmailCapture";
import { fetchPostBySlug, type BlogFaqItem } from "@/lib/blog";
import { BackToTop } from "@/components/BackToTop";
import { CrewWidget } from "@/components/CrewWidget";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqJsonLd } from "@/components/FAQ";

const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

function renderParagraph(text: string, key: number) {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  LINK_PATTERN.lastIndex = 0;
  let linkIndex = 0;
  while ((match = LINK_PATTERN.exec(text))) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    parts.push(
      <a
        key={`link-${key}-${linkIndex++}`}
        href={match[2]}
        className="text-[color:var(--iss-cyan)] underline underline-offset-2"
      >
        {match[1]}
      </a>,
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return <p key={key}>{parts}</p>;
}

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    try {
      const row = await fetchPostBySlug(params.slug);
      if (row) {
        return {
          slug: row.slug,
          title: row.title,
          metaDescription: row.meta_description ?? row.excerpt ?? row.title,
          excerpt: row.excerpt ?? "",
          content: row.content,
          category: row.category,
          date: row.published_at,
          readingTime: row.reading_time,
          cover: row.cover,
          image: row.cover_image_url ?? null,
          imageAlt: row.cover_image_alt ?? null,
          faq: row.faq ?? [],
          toVerify: row.to_verify ?? null,
        };
      }
    } catch {
      /* fallback below */
    }
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return {
      ...post,
      image: null as string | null,
      imageAlt: null as string | null,
      faq: [] as BlogFaqItem[],
      toVerify: null as string | null,
    };
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
        ...(post.image
          ? [
              { property: "og:image", content: post.image },
              { name: "twitter:image", content: post.image },
              { name: "twitter:card", content: "summary_large_image" },
            ]
          : []),
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
        ...(post.faq?.length
          ? [
              {
                type: "application/ld+json",
                children: JSON.stringify(faqJsonLd(post.faq)),
              },
            ]
          : []),
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
        <p className="mt-3 text-sm text-white/50">Publié le {getReadableDay(post.date)}</p>
        {post.toVerify ? (
          <div className="mt-6 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
            Brouillon — à vérifier avant publication définitive : {post.toVerify}
          </div>
        ) : null}
        {post.image ? (
          <img
            src={post.image}
            alt={post.imageAlt || post.title}
            width={1280}
            height={720}
            className="my-8 aspect-[16/9] w-full rounded-2xl object-cover"
          />
        ) : (
          <div className="my-8 grid aspect-[16/9] place-items-center rounded-2xl bg-gradient-to-br from-[color:var(--iss-surface)] to-[#0a1f4a] text-8xl">
            <span aria-hidden>{post.cover}</span>
          </div>
        )}
        {post.slug === "qui-est-dans-iss-aujourdhui" ? <CrewWidget /> : null}
        <div className="space-y-5 text-white/85 md:text-lg">
          {post.content.split("\n\n").map((para: string, i: number) => renderParagraph(para, i))}
        </div>

        {post.faq?.length ? (
          <div className="mt-10">
            <h2 className="font-display text-2xl font-extrabold">Questions fréquentes</h2>
            <Accordion type="single" collapsible className="mt-4">
              {post.faq.map((item: BlogFaqItem, i: number) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-b border-white/10 px-1">
                  <AccordionTrigger className="text-left font-display text-base font-bold hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/75">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ) : null}
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
      <BackToTop />
    </>
  );
}
