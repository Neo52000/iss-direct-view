import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const InputSchema = z.object({
  title: z.string().min(2),
  category: z.string().optional().default(""),
  price: z.string().optional().default(""),
  affiliate_url: z.string().optional().default(""),
  hint: z.string().optional().default(""),
});

export const generateProductCopy = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data, context }) => {
    // Vérifier que l'appelant est admin
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");

    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("LOVABLE_API_KEY manquant");

    const system = `Tu es un copywriter e-commerce francophone spécialisé en astronomie et espace.
Tu écris pour un site français qui recommande des produits via Amazon Partenaires.
Ton: passionné, clair, factuel, sans superlatifs creux ni emojis.
Tu réponds STRICTEMENT en JSON valide, sans markdown.`;

    const user = `Produit: ${data.title}
Catégorie: ${data.category}
Prix indicatif: ${data.price}
Lien: ${data.affiliate_url}
Notes: ${data.hint}

Génère:
- "description": 3 à 4 phrases (max 600 caractères), met en avant les usages concrets (observer l'ISS, la Lune, débuter en astronomie, etc.), ton naturel.
- "meta_description": une seule phrase SEO de 140 à 155 caractères, contenant le nom du produit et une intention d'achat/découverte.

Réponds uniquement avec un objet JSON: {"description": "...", "meta_description": "..."}`;

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
    let parsed: { description?: string; meta_description?: string };
    try {
      parsed = JSON.parse(content);
    } catch {
      throw new Error("Réponse IA non parsable.");
    }
    return {
      description: (parsed.description ?? "").trim(),
      meta_description: (parsed.meta_description ?? "").trim().slice(0, 170),
    };
  });