import { createFileRoute } from "@tanstack/react-router";
import { blogPosts } from "@/data/blogPosts";

const BASE_URL = process.env.VITE_SITE_URL || "https://iss-direct-view.lovable.app";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const Route = createFileRoute("/rss.xml")({
  server: {
    handlers: {
      GET: async () => {
        type Item = {
          slug: string;
          title: string;
          excerpt: string;
          date: string;
          category: string;
          image?: string | null;
        };
        let items: Item[] = blogPosts.map((p) => ({
          slug: p.slug,
          title: p.title,
          excerpt: p.excerpt,
          date: p.date,
          category: p.category,
        }));
        try {
          const { createClient } = await import("@supabase/supabase-js");
          const url = process.env.SUPABASE_URL;
          const key = process.env.SUPABASE_PUBLISHABLE_KEY;
          if (url && key) {
            const supabase = createClient(url, key, {
              auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
            });
            const { data } = await supabase
              .from("blog_posts")
              .select("slug,title,excerpt,meta_description,published_at,category,cover_image_url")
              .eq("published", true)
              .order("published_at", { ascending: false });
            if (data && data.length) {
              const dbItems: Item[] = data.map((p: any) => ({
                slug: p.slug,
                title: p.title,
                excerpt: p.excerpt ?? p.meta_description ?? "",
                date: p.published_at,
                category: p.category,
                image: p.cover_image_url,
              }));
              const seen = new Set(dbItems.map((i) => i.slug));
              items = [...dbItems, ...items.filter((i) => !seen.has(i.slug))];
            }
          }
        } catch {
          /* fall back to static */
        }
        items.sort((a, b) => (a.date < b.date ? 1 : -1));

        const rssItems = items
          .map((it) => {
            const link = `${BASE_URL}/blog/${it.slug}`;
            const pubDate = new Date(it.date).toUTCString();
            return [
              `    <item>`,
              `      <title>${escapeXml(it.title)}</title>`,
              `      <link>${link}</link>`,
              `      <guid isPermaLink="true">${link}</guid>`,
              `      <pubDate>${pubDate}</pubDate>`,
              `      <category>${escapeXml(it.category)}</category>`,
              `      <description>${escapeXml(it.excerpt)}</description>`,
              it.image ? `      <enclosure url="${escapeXml(it.image)}" type="image/jpeg" />` : null,
            ]
              .filter(Boolean)
              .join("\n") + `\n    </item>`;
          })
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ISS Direct France — Blog</title>
    <link>${BASE_URL}/blog</link>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Articles sur la Station Spatiale Internationale, son observation et l'astronomie.</description>
    <language>fr-FR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${rssItems}
  </channel>
</rss>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
            "Cache-Control": "public, max-age=1800",
          },
        });
      },
    },
  },
});
