import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const InputSchema = z.object({
  email: z.string().email(),
  city: z.string().optional(),
});

export const sendLeadConfirmation = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) return { sent: false, reason: "BREVO_API_KEY non configurée" };

    const escapeHtml = (s: string) =>
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
    const cityLine = data.city ? ` depuis ${escapeHtml(data.city)}` : "";

    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: { name: "ISS Direct France", email: "contact@iss-direct-france.fr" },
        to: [{ email: data.email }],
        subject: "Bienvenue — vos alertes ISS sont activées !",
        htmlContent: `
          <div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#0a0f1e;color:#fff;padding:32px;border-radius:12px">
            <h1 style="color:#71D7FF;font-size:24px;margin-bottom:8px">🛰️ ISS Direct France</h1>
            <h2 style="font-size:18px;margin-bottom:16px">Inscription confirmée !</h2>
            <p style="color:#ccc;line-height:1.6">
              Merci de vous être inscrit${cityLine}. Vous recevrez désormais les alertes de passages
              visibles de la Station Spatiale Internationale au-dessus de chez vous.
            </p>
            <p style="color:#ccc;line-height:1.6;margin-top:16px">
              En attendant, suivez l'ISS en direct sur
              <a href="https://iss-direct-france.fr" style="color:#71D7FF">iss-direct-france.fr</a>.
            </p>
            <p style="color:#666;font-size:12px;margin-top:32px">
              Pour vous désinscrire, répondez simplement à cet email avec "désinscription".
            </p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.text().catch(() => "");
      console.error("[Brevo] Erreur envoi confirmation lead:", res.status, err);
      return { sent: false, reason: `Brevo ${res.status}` };
    }

    return { sent: true };
  });
