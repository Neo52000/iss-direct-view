import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { LocateFixed, MapPin, Loader2 } from "lucide-react";
import { getVisiblePasses, type VisiblePass } from "@/services/passesApi";
import { geocodeCity } from "@/lib/geocoding.functions";
import { BackToTop } from "@/components/BackToTop";
import { PassesList } from "@/components/PassesList";

export const Route = createFileRoute("/passages")({
  head: () => ({
    meta: [
      { title: "Passages ISS visibles — Quand voir l'ISS au-dessus de chez vous ?" },
      {
        name: "description",
        content:
          "Calculez les prochains passages visibles de l'ISS au-dessus de votre ville et ajoutez-les à votre calendrier.",
      },
      { property: "og:title", content: "Prochains passages visibles de l'ISS" },
      { property: "og:description", content: "Quand voir l'ISS à l'œil nu depuis votre ville." },
      { property: "og:url", content: "/passages" },
    ],
    links: [{ rel: "canonical", href: "/passages" }],
  }),
  component: PassesPage,
});

function PassesPage() {
  const [coords, setCoords] = useState<{ lat: number; lon: number; label: string } | null>(null);
  const [manual, setManual] = useState("");
  const [loading, setLoading] = useState(false);
  const [geocoding, setGeocoding] = useState(false);
  const [result, setResult] = useState<
    { configured: false } | { configured: true; passes: VisiblePass[]; error?: string } | null
  >(null);

  const fetchPasses = async (lat: number, lon: number) => {
    setLoading(true);
    const r = await getVisiblePasses(lat, lon);
    setResult(r);
    setLoading(false);
  };

  const detect = () => {
    if (!("geolocation" in navigator)) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude, label: "Ma position" });
        fetchPasses(pos.coords.latitude, pos.coords.longitude);
      },
      () => {
        alert("Géolocalisation refusée. Entrez votre ville ou des coordonnées manuellement.");
      },
    );
  };

  const submitManual = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manual.trim()) return;

    // Coordonnées directes (ex: "48.85, 2.35")
    const m = manual.match(/(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)/);
    if (m) {
      const lat = parseFloat(m[1]);
      const lon = parseFloat(m[2]);
      setCoords({ lat, lon, label: manual });
      fetchPasses(lat, lon);
      return;
    }

    // Géocodage via Nominatim
    setGeocoding(true);
    try {
      const result = await geocodeCity({ data: { query: manual.trim() } });
      if (result) {
        setCoords({ lat: result.lat, lon: result.lon, label: result.label });
        fetchPasses(result.lat, result.lon);
      } else {
        alert(
          `Ville introuvable : "${manual}". Essayez d'entrer les coordonnées directement (ex: 48.85, 2.35).`,
        );
      }
    } catch {
      alert("Erreur de géocodage. Vérifiez votre connexion ou entrez des coordonnées.");
    } finally {
      setGeocoding(false);
    }
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 md:px-6">
      <h1 className="font-display text-3xl font-extrabold md:text-4xl">
        Passages visibles au-dessus de chez vous
      </h1>
      <p className="mt-2 text-white/70">
        L'ISS est visible uniquement dans certaines conditions : ciel sombre, station éclairée par
        le Soleil, passage suffisamment haut au-dessus de l'horizon.
      </p>
      <p className="mt-1 text-xs text-white/40">
        Calcul en temps réel à partir des données orbitales (TLE) de la station — précision
        indicative, sans clé API.
      </p>

      <div className="iss-card mt-8 p-6">
        <div className="grid gap-3 md:grid-cols-[auto_1fr_auto]">
          <button
            onClick={detect}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--iss-blue)] px-4 py-2.5 text-sm font-semibold"
          >
            <LocateFixed className="h-4 w-4" /> Détecter ma position
          </button>
          <form onSubmit={submitManual} className="contents">
            <input
              value={manual}
              onChange={(e) => setManual(e.target.value)}
              placeholder="Ville ou coordonnées (ex. 48.85, 2.35)"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-[color:var(--iss-blue)]"
            />
            <button
              disabled={geocoding || loading}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold hover:bg-white/10 disabled:opacity-60"
            >
              {geocoding ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {geocoding ? "Recherche…" : "Rechercher"}
            </button>
          </form>
        </div>
        {coords ? (
          <p className="mt-4 inline-flex items-center gap-2 text-sm text-white/70">
            <MapPin className="h-4 w-4 text-[color:var(--iss-cyan)]" /> {coords.label} —{" "}
            {coords.lat.toFixed(2)}°, {coords.lon.toFixed(2)}°
          </p>
        ) : null}
      </div>

      <div className="mt-8">
        {loading ? (
          <div className="iss-card p-10 text-center text-white/70">Calcul des passages…</div>
        ) : result === null ? (
          <div className="iss-card p-8 text-white/70">
            Détectez votre position ou indiquez une ville pour afficher les prochains passages.
          </div>
        ) : result.configured === false ? null : result.passes.length === 0 ? (
          <div className="iss-card p-8 text-white/70">
            {result.error
              ? `Erreur API : ${result.error}`
              : "Aucun passage visible trouvé pour cette position dans les prochains jours."}
          </div>
        ) : (
          <PassesList passes={result.passes} location={coords?.label} />
        )}
      </div>
      <BackToTop />
    </section>
  );
}
