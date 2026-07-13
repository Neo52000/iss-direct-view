import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const N2YO_API_KEY = Deno.env.get("N2YO_API_KEY")!;
const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY")!;

const SITE_URL = "https://iss-direct-france.fr";
const DIGEST_INTERVAL_DAYS = 6; // évite un double envoi si le cron est redéclenché le même jour
const REACTIVATION_AFTER_DAYS = 60;

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

function isMondayInParis(): boolean {
  const weekday = new Date().toLocaleDateString("en-US", {
    timeZone: "Europe/Paris",
    weekday: "long",
  });
  return weekday === "Monday";
}

function daysSince(iso: string | null): number {
  if (!iso) return Infinity;
  return (Date.now() - new Date(iso).getTime()) / 86_400_000;
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

function footer() {
  return `<hr style="border:none;border-top:1px solid #eee;margin:20px 0"/>
  <p style="font-size:12px;color:#aaa">Vous recevez cet email car vous êtes inscrit sur <a href="${SITE_URL}">iss-direct-france.fr</a>.</p>`;
}

async function sendPassAlerts() {
  const { data: leads, error } = await supabase
    .from("leads")
    .select("id, email, city, last_alert_pass_start")
    .not("city", "is", null);
  if (error) throw error;
  if (!leads?.length) return 0;

  const now = Math.floor(Date.now() / 1000);
  let sent = 0;

  // Beaucoup de leads partagent la même ville : on met en cache le géocodage et les
  // passages par ville pour cette exécution afin d'éviter de spammer Nominatim/N2YO.
  const geoCache = new Map<string, { lat: number; lon: number } | null>();
  const passesCache = new Map<string, Awaited<ReturnType<typeof getPasses>>>();

  for (const lead of leads) {
    const city = lead.city!;
    let geo = geoCache.get(city);
    if (geo === undefined) {
      geo = await geocode(city);
      geoCache.set(city, geo);
    }
    if (!geo) continue;

    const cacheKey = `${geo.lat},${geo.lon}`;
    let passes = passesCache.get(cacheKey);
    if (passes === undefined) {
      passes = await getPasses(geo.lat, geo.lon);
      passesCache.set(cacheKey, passes);
    }
    const upcoming = passes.filter((p) => p.startUTC > now && p.startUTC < now + 86400);
    if (!upcoming.length) continue;

    // Idempotence : si on a déjà alerté pour ce même prochain passage, on n'envoie pas deux fois.
    // last_alert_pass_start est un bigint : Postgrest peut le sérialiser en string, d'où le Number().
    const nextPassStart = upcoming[0].startUTC;
    if (lead.last_alert_pass_start != null && Number(lead.last_alert_pass_start) === nextPassStart)
      continue;

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
  ${footer()}
</div>`;

    try {
      await sendEmail(lead.email, `🛰️ ISS visible depuis ${lead.city} ce soir`, html);
      await supabase
        .from("leads")
        .update({
          last_alert_pass_start: nextPassStart,
          last_alert_sent_at: new Date().toISOString(),
        })
        .eq("id", lead.id);
      sent++;
    } catch (err) {
      console.error(`Failed to send pass alert to ${lead.email}:`, err);
    }
  }

  return sent;
}

async function sendWeeklyDigest() {
  if (!isMondayInParis()) return 0;

  const { data: posts, error: postsError } = await supabase
    .from("blog_posts")
    .select("title, slug, excerpt")
    .eq("published", true)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false })
    .limit(2);
  if (postsError) throw postsError;
  if (!posts?.length) return 0;

  const { data: leads, error } = await supabase
    .from("leads")
    .select("id, email, last_digest_sent_at")
    .or(
      `last_digest_sent_at.is.null,last_digest_sent_at.lt.${new Date(Date.now() - DIGEST_INTERVAL_DAYS * 86_400_000).toISOString()}`,
    );
  if (error) throw error;
  if (!leads?.length) return 0;

  const postLines = posts
    .map(
      (p) =>
        `<li><a href="${SITE_URL}/blog/${p.slug}" style="color:#2F80FF">${p.title}</a>${p.excerpt ? ` — ${p.excerpt}` : ""}</li>`,
    )
    .join("");

  let sent = 0;
  for (const lead of leads) {
    const html = `
<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto">
  <h2 style="color:#2F80FF">🛰️ Cette semaine sur ISS Direct France</h2>
  <ul style="line-height:2">${postLines}</ul>
  ${footer()}
</div>`;
    try {
      await sendEmail(lead.email, "🛰️ Vos actus ISS de la semaine", html);
      await supabase
        .from("leads")
        .update({
          last_digest_sent_at: new Date().toISOString(),
          last_alert_sent_at: new Date().toISOString(),
        })
        .eq("id", lead.id);
      sent++;
    } catch (err) {
      console.error(`Failed to send digest to ${lead.email}:`, err);
    }
  }

  return sent;
}

async function sendReactivation() {
  const { data: leads, error } = await supabase
    .from("leads")
    .select("id, email, created_at, last_alert_sent_at, reactivation_sent_at")
    .is("reactivation_sent_at", null);
  if (error) throw error;
  if (!leads?.length) return 0;

  let sent = 0;
  for (const lead of leads) {
    const idleDays = daysSince(lead.last_alert_sent_at ?? lead.created_at);
    if (idleDays < REACTIVATION_AFTER_DAYS) continue;

    const html = `
<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto">
  <h2 style="color:#2F80FF">🛰️ Ça fait un moment...</h2>
  <p>Saviez-vous que l'ISS ne restera pas en orbite indéfiniment ? Découvrez ce qui va se passer
  lors de sa fin de vie prévue en 2030-2031, et retrouvez vos alertes de passage sur
  <a href="${SITE_URL}/blog" style="color:#2F80FF">le blog ISS Direct France</a>.</p>
  ${footer()}
</div>`;
    try {
      await sendEmail(lead.email, "🛰️ La fin de vie de l'ISS approche — le saviez-vous ?", html);
      await supabase
        .from("leads")
        .update({
          reactivation_sent_at: new Date().toISOString(),
          last_alert_sent_at: new Date().toISOString(),
        })
        .eq("id", lead.id);
      sent++;
    } catch (err) {
      console.error(`Failed to send reactivation to ${lead.email}:`, err);
    }
  }

  return sent;
}

Deno.serve(async () => {
  if (!N2YO_API_KEY || !BREVO_API_KEY) {
    return new Response("Missing env vars", { status: 500 });
  }

  const passAlerts = await sendPassAlerts();
  const digests = await sendWeeklyDigest();
  const reactivations = await sendReactivation();

  return new Response(
    `Sent ${passAlerts} pass alerts, ${digests} digests, ${reactivations} reactivations`,
    { status: 200 },
  );
});
