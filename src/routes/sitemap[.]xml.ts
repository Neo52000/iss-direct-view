import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { blogPosts } from "@/data/blogPosts";
import { frenchCities } from "@/data/frenchCities";

const BASE_URL = process.env.VITE_SITE_URL || "https://iss-direct-view.lovable.app";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticEntries: SitemapEntry[] = [
          { path: "/", changefreq: "daily", priority: "1.0" },
          { path: "/live", changefreq: "daily", priority: "0.9" },
          { path: "/position", changefreq: "always", priority: "0.9" },
          { path: "/passages", changefreq: "daily", priority: "0.8" },
          { path: "/passage-iss", changefreq: "weekly", priority: "0.8" },
          { path: "/blog", changefreq: "weekly", priority: "0.7" },
          { path: "/ressources", changefreq: "monthly", priority: "0.6" },
          { path: "/a-propos", changefreq: "yearly", priority: "0.3" },
          { path: "/contact", changefreq: "yearly", priority: "0.3" },
          { path: "/mentions-legales", changefreq: "yearly", priority: "0.2" },
          { path: "/confidentialite", changefreq: "yearly", priority: "0.2" },
        ];

        // Pages villes programmatiques (« passage ISS au-dessus de {ville} »).
        const cityEntries: SitemapEntry[] = frenchCities.map((c) => ({
          path: `/passage-iss/${c.slug}`,
          changefreq: "daily",
          priority: "0.7",
        }));

        // Articles : Supabase (drip, published_at <= now) fusionnés aux statiques.
        const seen = new Set<string>();
        const postEntries: SitemapEntry[] = [];
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
              .select("slug,published_at")
              .eq("published", true)
              .lte("published_at", new Date().toISOString())
              .order("published_at", { ascending: false });
            for (const p of data ?? []) {
              seen.add(p.slug);
              postEntries.push({
                path: `/blog/${p.slug}`,
                lastmod: p.published_at,
                changefreq: "monthly",
                priority: "0.6",
              });
            }
          }
        } catch {
          /* fall back to static below */
        }
        for (const p of blogPosts) {
          if (seen.has(p.slug)) continue;
          postEntries.push({
            path: `/blog/${p.slug}`,
            lastmod: p.date,
            changefreq: "monthly",
            priority: "0.6",
          });
        }

        const entries = [...staticEntries, ...cityEntries, ...postEntries];
        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});