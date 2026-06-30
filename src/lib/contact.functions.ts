import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const InputSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(5000),
});

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      throw new Error("BREVO_API_KEY non configurée. Ajoutez-la dans les variables d'environnement.");
    }

    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: { name: `${data.name} via ISS Direct`, email: "contact@iss-direct-france.fr" },
        to: [{ email: "contact@iss-direct-france.fr", name: "ISS Direct France" }],
        replyTo: { email: data.email, name: data.name },
        subject: `[Contact] Message de ${data.name}`,
        htmlContent: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
            <h2>Nouveau message de contact</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px;font-weight:bold;width:120px">Nom</td><td style="padding:8px">${escapeHtml(data.name)}</td></tr>
              <tr><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
            </table>
            <hr style="margin:16px 0"/>
            <div style="white-space:pre-wrap;line-height:1.6">${escapeHtml(data.message)}</div>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.text().catch(() => "");
      throw new Error(`Erreur Brevo (${res.status}): ${err.slice(0, 200)}`);
    }

    return { sent: true };
  });

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
}
