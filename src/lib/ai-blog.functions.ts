import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const InputSchema = z.object({
  topic: z.string().min(3),
  angle: z.string().optional().default(""),
});

export const generateBlogArticle = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");

    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("LOVABLE_API_KEY manquant");

    const system = `Tu es un rédacteur SEO francophone passionné d'astronomie et d'exploration spatiale.
Tu écris pour le site "ISS Direct France" : public francophone, ton clair, factuel, accessible mais rigoureux.
Tu réponds STRICTEMENT en JSON valide, sans markdown ni texte autour.`;

    const user = `Sujet: ${data.topic}
Angle / consigne: ${data.angle || "libre"}

Rédige un article complet de blog optimisé SEO. Génère:
- "title": titre accrocheur, max 65 caractères, contient le mot-clé principal.
- "slug": slug url-friendly (minuscules, tirets, sans accents), max 60 caractères.
- "meta_description": phrase SEO 140-155 caractères.
- "excerpt": chapô court 1-2 phrases (max 180 car.) qui donne envie de lire.
- "category": une seule catégorie courte (ex: Observation, Sciences, Live, Photo, Enfants).
- "cover": un seul emoji représentatif (ex: 🛰️, 🌠, 📡).
- "reading_time": entier en minutes (2-8).
- "content": corps de l'article, 600-900 mots, structuré en 4-6 paragraphes séparés par DEUX retours à la ligne ("\\n\\n"). Pas de markdown, pas de titres ##, juste des paragraphes en texte brut. Cite des chiffres concrets (altitude, vitesse, durée d'orbite, etc.) quand pertinent.

Réponds uniquement avec un objet JSON valide avec ces 8 clés.`;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": key,
        "X-Lovable-AIG-SDK": "fetch",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (res.status === 429) throw new Error("Trop de requêtes IA. Réessayez dans un instant.");
    if (res.status === 402) throw new Error("Crédits IA épuisés. Rechargez le workspace.");
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Erreur IA (${res.status}): ${text.slice(0, 200)}`);
    }

    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = json.choices?.[0]?.message?.content ?? "{}";
    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(content);
    } catch {
      throw new Error("Réponse IA non parsable.");
    }

    const slugify = (s: string) =>
      s
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
        .slice(0, 60);

    const title = String(parsed.title ?? data.topic).trim().slice(0, 80);
    return {
      title,
      slug: slugify(String(parsed.slug ?? title)),
      meta_description: String(parsed.meta_description ?? "").trim().slice(0, 170),
      excerpt: String(parsed.excerpt ?? "").trim().slice(0, 220),
      category: String(parsed.category ?? "Sciences").trim().slice(0, 40),
      cover: String(parsed.cover ?? "🛰️").trim().slice(0, 4),
      reading_time: Math.max(2, Math.min(15, Number(parsed.reading_time) || 4)),
      content: String(parsed.content ?? "").trim(),
    };
  });