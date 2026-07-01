import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const N2YO_API_KEY = Deno.env.get("N2YO_API_KEY")!;
const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY")!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Nominatim geocoding (city name → lat/lon)
async function geocode(city: string): Promise<{ lat: number; lon: number } | null> {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", city);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");
  url.searchParams.set("accept-language", "fr");
  const res = await fetch(url.toString(), {
    headers: { "User-Agent": "ISS Direct France / contact@iss-direct-france.fr" },
  });
  if (!res.ok) return null;
  const data = await res.json();
  if (!data[0]) return null;
  return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
}

// N2YO visible passes
async function getPasses(lat: number, lon: number) {
  const url = `https://api.n2yo.com/rest/v1/satellite/visualpasses/25544/${lat}/${lon}/0/2/60/&apiKey=${N2YO_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  return (data.passes ?? []) as Array<{
    startUTC: number;
    duration: number;
    maxEl: number;
    startAzCompass: string;
    endAzCompass: string;
  }>;
}

function formatDate(unix: number, tz = "Europe/Paris") {
  return new Date(unix * 1000).toLocaleString("fr-FR", {
    timeZone: tz,
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}

async function sendEmail(to: string, subject: string, html: string) {
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: { name: "ISS Direct France", email: "no-reply@iss-direct-france.fr" },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    }),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Brevo API error: ${res.status} - ${errText}`);
  }
  await res.body?.cancel();
}

Deno.serve(async () => {
  if (!N2YO_API_KEY || !BREVO_API_KEY) {
    return new Response("Missing env vars", { status: 500 });
  }

  // Fetch all leads with a city set
  const { data: leads, error } = await supabase
    .from("leads")
    .select("email, city")
    .not("city", "is", null);

  if (error) return new Response(error.message, { status: 500 });
  if (!leads?.length) return new Response("No leads", { status: 200 });

  let sent = 0;

  for (const lead of leads) {
    const geo = await geocode(lead.city!);
    if (!geo) continue;

    const passes = await getPasses(geo.lat, geo.lon);
    // Only alert for passes in the next 24h
    const now = Math.floor(Date.now() / 1000);
    const upcoming = passes.filter((p) => p.startUTC > now && p.startUTC < now + 86400);
    if (!upcoming.length) continue;

    const passLines = upcoming
      .map(
        (p) =>
          `<li><strong>${formatDate(p.startUTC)}</strong> — ${Math.round(p.duration / 60)} min, élévation max <strong>${Math.round(p.maxEl)}°</strong>, direction ${p.startAzCompass} → ${p.endAzCompass}</li>`,
      )
      .join("");

    const html = `
<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto">
  <h2 style="color:#2F80FF">🛰️ L'ISS passe au-dessus de ${lead.city} ce soir !</h2>
  <p>Voici les passages visibles dans les prochaines 24 heures :</p>
  <ul style="line-height:2">${passLines}</ul>
  <p style="color:#555;font-size:13px">Pour observer l'ISS : ciel dégagé, regardez vers la direction indiquée. L'ISS apparaît comme un point brillant qui se déplace en 1 à 6 minutes.</p>
  <hr style="border:none;border-top:1px solid #eee;margin:20px 0"/>
  <p style="font-size:12px;color:#aaa">Vous recevez cet email car vous êtes inscrit sur <a href="https://iss-direct-france.fr">iss-direct-france.fr</a>.</p>
</div>`;

    try {
      await sendEmail(lead.email, `🛰️ ISS visible depuis ${lead.city} ce soir`, html);
      sent++;
    } catch (err) {
      console.error(`Failed to send alert to ${lead.email}:`, err);
    }
  }

  return new Response(`Sent ${sent} alerts`, { status: 200 });
});
