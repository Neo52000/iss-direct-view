import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";
import type { SupabaseClient } from "@supabase/supabase-js";

// Génère une image de couverture via Lovable AI Gateway et l'upload dans le bucket public
// "blog-covers". Ne doit jamais faire échouer la génération de l'article : toute erreur est
// avalée et journalisée, l'appelant reçoit alors `null` et doit traiter l'absence d'image comme
// bloquante pour la publication (voir admin.blog.tsx / admin.topics.tsx).
async function generateCoverImage(params: {
  supabase: SupabaseClient;
  apiKey: string;
  title: string;
  category: string;
  altText: string;
  slug: string;
}): Promise<string | null> {
  const { supabase, apiKey, title, category, altText, slug } = params;
  try {
    const imagePrompt = `Illustration photoréaliste pour un article de blog sur l'espace/l'astronomie,
catégorie "${category}", titre "${title}". Scène : ${altText || "la Station Spatiale Internationale ou l'observation du ciel étoilé depuis la Terre"}.
Ambiance spatiale, ciel nocturne ou vue orbitale, couleurs bleu/violet profond, esthétique premium.
Format paysage 16:9. Aucun texte, aucune lettre, aucun logo incrusté dans l'image.`;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": apiKey,
        "X-Lovable-AIG-SDK": "fetch",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [{ role: "user", content: imagePrompt }],
        modalities: ["image", "text"],
      }),
    });

    if (!res.ok) {
      console.error(`[cover-image] Erreur gateway (${res.status}): ${await res.text().catch(() => "")}`);
      return null;
    }

    const json = (await res.json()) as {
      choices?: Array<{
        message?: {
          images?: Array<{ image_url?: { url?: string } }>;
          content?: string;
        };
      }>;
    };
    const message = json.choices?.[0]?.message;
    const dataUrl =
      message?.images?.[0]?.image_url?.url ??
      (typeof message?.content === "string" && message.content.startsWith("data:image/")
        ? message.content
        : undefined);
    if (!dataUrl) {
      console.error("[cover-image] Réponse gateway sans image exploitable.", JSON.stringify(json).slice(0, 300));
      return null;
    }

    const match = /^data:(image\/\w+);base64,(.+)$/.exec(dataUrl);
    if (!match) {
      console.error("[cover-image] Format d'image inattendu (pas un data URL base64).");
      return null;
    }
    const [, mimeType, base64] = match;
    const ext = mimeType.split("/")[1] || "png";
    const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

    const path = `${slug || crypto.randomUUID()}-${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("blog-covers")
      .upload(path, bytes, { contentType: mimeType, upsert: true });
    if (uploadError) {
      console.error(`[cover-image] Échec upload storage: ${uploadError.message}`);
      return null;
    }

    const { data: publicUrlData } = supabase.storage.from("blog-covers").getPublicUrl(path);
    return publicUrlData.publicUrl;
  } catch (err) {
    console.error("[cover-image] Génération échouée:", err instanceof Error ? err.message : err);
    return null;
  }
}

const InternalLinkSchema = z.object({ text: z.string(), url: z.string() });

const InputSchema = z.object({
  keyword: z.string().min(3),
  angle: z.string().optional().default(""),
  targetLength: z.number().int().min(200).max(2000).optional().default(700),
  internalLinks: z.array(InternalLinkSchema).optional().default([]),
});

const CANONICAL_FACTS = `- Altitude orbitale ISS : ~400-420 km
- Vitesse : ~27 600 km/h soit ~7,66 km/s
- Durée d'une orbite : ~92-93 minutes
- Orbites par jour : ~15,5 à 16
- Équipage habituel : 6 à 7 astronautes
- L'ISS est visible à l'œil nu comme un point lumineux mobile, sans clignotement (contrairement à un avion), juste après le coucher ou avant le lever du soleil
- Le site n'est PAS affilié à la NASA — ne jamais laisser entendre le contraire`;

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

    const system = `Tu es rédacteur SEO spécialisé espace/astronomie pour le site français
"ISS Direct France" (iss-en-direct.com). Ton lectorat : grand public curieux, parents avec
enfants 6-12 ans, débutants en observation du ciel. Ton : clair, concret, sans jargon non
expliqué, phrases courtes, aucune tournure IA générique ("dans le monde d'aujourd'hui", "il
est important de noter que...", "en conclusion", "il convient de", "de plus, il est essentiel
de"). Écris comme un humain qui rédige, pas comme une IA qui liste : varie la longueur des
phrases (mélange de phrases courtes et plus longues), inclus au moins une anecdote ou
comparaison concrète et non générique (ex. une image sensorielle, un ordre de grandeur
parlant), évite de commencer plusieurs paragraphes par la même tournure, et n'aligne pas une
structure trop symétrique paragraphe par paragraphe. Une légère touche de style personnel est
bienvenue. Tu réponds STRICTEMENT en JSON valide, sans markdown ni texte autour.`;

    const linksInstruction = data.internalLinks.length
      ? `Insère naturellement, dans le corps de l'article, ces liens internes au format markdown [texte](url) :\n${data.internalLinks
          .map((l) => `- [${l.text}](${l.url})`)
          .join("\n")}`
      : `Aucun lien interne obligatoire n'a été fourni ; n'en invente pas.`;

    const user = `Mot-clé cible : ${data.keyword}
Angle : ${data.angle || "libre"}
Longueur cible : ${data.targetLength} mots (±10%)

DONNÉES CANONIQUES À NE JAMAIS CONTREDIRE (fact-check obligatoire, ne pas inventer d'autres
chiffres) :
${CANONICAL_FACTS}

${linksInstruction}

Rédige un article de blog complet, optimisé SEO, 100% original (jamais de citation mot pour
mot d'une source externe). Génère un objet JSON avec exactement ces clés :
- "title" : titre H1 accrocheur, contient le mot-clé cible, <60 caractères.
- "slug" : slug url-friendly (minuscules, tirets, sans accents), max 60 caractères.
- "meta_description" : 140-155 caractères, incite au clic, unique (ne réutilise jamais un
  intitulé générique).
- "excerpt" : chapô de 2-3 phrases qui répond immédiatement à l'intention de recherche.
- "category" : une seule catégorie courte (ex: Observation, Sciences, Live, Photo, Enfants).
- "cover" : un seul emoji représentatif (ex: 🛰️, 🌠, 📡).
- "reading_time" : entier en minutes (2-8).
- "content" : corps de l'article respectant la longueur cible ±10%, structuré en 4-7
  paragraphes séparés par DEUX retours à la ligne ("\\n\\n"), pas de titres markdown, avec des
  exemples concrets et comparaisons accessibles. Le premier paragraphe répond directement à la
  question posée par le mot-clé. Les liens internes fournis y sont insérés naturellement.
- "faq" : tableau de 3 objets {"q": "...", "a": "..."}, questions courtes liées au sujet,
  réponses de 2-3 phrases, compatibles balisage Schema.org FAQPage.
- "cta" : 1 phrase de fin, ton naturel (pas publicitaire), qui incite à s'inscrire aux alertes
  de passage par email.
- "alt_text" : suggestion de texte alternatif pour l'image principale (descriptif, contient le
  mot-clé si pertinent naturellement).
- "social_suggestions" : tableau de 3 phrases courtes de partage social, tons différents
  (factuel / curiosité / enfants-familles).
- "to_verify" : chaîne vide "" si toutes les données utilisées sont dans la liste des données
  canoniques ; sinon, décris précisément la donnée non listée (ex : actualité de mission en
  cours) qui doit être vérifiée avant publication plutôt que d'être inventée.

Réponds uniquement avec cet objet JSON.`;

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

    const stripDiacritics = (s: string) =>
      Array.from(s)
        .filter((ch) => {
          const code = ch.codePointAt(0) ?? 0;
          return code < 0x0300 || code > 0x036f; // plage Unicode des diacritiques combinants
        })
        .join("");

    const slugify = (s: string) =>
      stripDiacritics(s.toLowerCase().normalize("NFD"))
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
        .slice(0, 60);

    const title = String(parsed.title ?? data.keyword)
      .trim()
      .slice(0, 80);
    const faqRaw = Array.isArray(parsed.faq) ? parsed.faq : [];
    const faq = faqRaw
      .filter((f): f is { q?: unknown; a?: unknown } => !!f && typeof f === "object")
      .map((f) => ({ q: String(f.q ?? "").trim(), a: String(f.a ?? "").trim() }))
      .filter((f) => f.q && f.a)
      .slice(0, 5);
    const socialRaw = Array.isArray(parsed.social_suggestions) ? parsed.social_suggestions : [];
    const socialSuggestions = socialRaw
      .map((s) => String(s).trim())
      .filter(Boolean)
      .slice(0, 5);
    const category = String(parsed.category ?? "Sciences")
      .trim()
      .slice(0, 40);
    const altText = String(parsed.alt_text ?? "")
      .trim()
      .slice(0, 160);
    const slug = slugify(String(parsed.slug ?? title));

    const coverImageUrl = await generateCoverImage({
      supabase: context.supabase,
      apiKey: key,
      title,
      category,
      altText,
      slug,
    });

    return {
      title,
      slug,
      meta_description: String(parsed.meta_description ?? "")
        .trim()
        .slice(0, 170),
      excerpt: String(parsed.excerpt ?? "")
        .trim()
        .slice(0, 220),
      category,
      cover: String(parsed.cover ?? "🛰️")
        .trim()
        .slice(0, 4),
      reading_time: Math.max(2, Math.min(15, Number(parsed.reading_time) || 4)),
      content: String(parsed.content ?? "").trim(),
      faq,
      cta: String(parsed.cta ?? "").trim(),
      alt_text: altText,
      social_suggestions: socialSuggestions,
      to_verify: String(parsed.to_verify ?? "").trim(),
      cover_image_url: coverImageUrl,
    };
  });
