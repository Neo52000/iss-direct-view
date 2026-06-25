import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useIssPosition } from "@/services/issApi";
import {
  formatAltitude,
  formatCoordinates,
  formatSpeed,
  getReadableDate,
} from "@/lib/iss-utils";
import { Crosshair, Satellite, AlertTriangle, Loader2 } from "lucide-react";

export const Route = createFileRoute("/position")({
  head: () => ({
    meta: [
      { title: "Position ISS en temps réel — Où est l'ISS maintenant ?" },
      {
        name: "description",
        content:
          "Suivez en direct la position de la Station Spatiale Internationale sur une carte interactive : latitude, longitude, altitude, vitesse.",
      },
      { property: "og:title", content: "Position ISS en temps réel" },
      { property: "og:description", content: "Carte interactive en direct de l'ISS." },
      { property: "og:url", content: "/position" },
    ],
    links: [{ rel: "canonical", href: "/position" }],
  }),
  component: PositionPage,
});

function PositionPage() {
  const { position, error, loading } = useIssPosition(7000);
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletRef = useRef<{
    map: unknown;
    marker: unknown;
    polyline: unknown;
    follow: boolean;
    L: typeof import("leaflet") | null;
  }>({ map: null, marker: null, polyline: null, follow: true, L: null });
  const [history, setHistory] = useState<[number, number][]>([]);
  const [mapStatus, setMapStatus] = useState<"loading" | "ready" | "error">("loading");
  const [tilesLoaded, setTilesLoaded] = useState(false);
  const tileLayerRef = useRef<import("leaflet").TileLayer | null>(null);
  const preloadCacheRef = useRef<Set<string>>(new Set());
  const lastPreloadRef = useRef<{ lat: number; lon: number; t: number } | null>(null);

  // init Leaflet client-side
  useEffect(() => {
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    (async () => {
      try {
        const L = (await import("leaflet")).default;
        await import("leaflet/dist/leaflet.css");
        if (cancelled || !mapRef.current || leafletRef.current.map) return;
        const map = L.map(mapRef.current, {
        center: [0, 0],
        zoom: 3,
        worldCopyJump: true,
        zoomControl: true,
      });
      const tileLayer = L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          attribution: "© OpenStreetMap, © CartoDB",
          subdomains: "abcd",
          maxZoom: 19,
          keepBuffer: 4,
          updateWhenIdle: false,
          updateWhenZooming: false,
        },
      ).addTo(map);
      tileLayerRef.current = tileLayer;

      // Fallback: if tiles don't load within 10s, mark as error
      timeoutId = setTimeout(() => {
        if (!cancelled) {
          setMapStatus((s) => (s === "loading" ? "error" : s));
        }
      }, 10000);

      tileLayer.on("load", () => {
        if (cancelled) return;
        if (timeoutId) clearTimeout(timeoutId);
        setTilesLoaded(true);
        setMapStatus("ready");
      });
      tileLayer.on("tileerror", () => {
        if (cancelled) return;
        // Only flip to error if no tile ever loaded
        setMapStatus((s) => (s === "ready" ? s : "error"));
      });

      const icon = L.divIcon({
        className: "iss-marker",
        html: `<div style="width:34px;height:34px;border-radius:50%;background:rgba(47,128,255,.25);display:grid;place-items:center;border:2px solid #71D7FF;box-shadow:0 0 30px rgba(113,215,255,.6)"><span style="font-size:18px">🛰️</span></div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });
      const marker = L.marker([0, 0], { icon }).addTo(map);
      const polyline = L.polyline([], { color: "#71D7FF", weight: 2, opacity: 0.7 }).addTo(map);

      leafletRef.current = { map, marker, polyline, follow: true, L };
      } catch (e) {
        console.error("Leaflet init failed", e);
        if (!cancelled) setMapStatus("error");
      }
    })();
    return () => {
      cancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
      const { map } = leafletRef.current as { map: import("leaflet").Map | null };
      if (map) {
        map.remove();
        leafletRef.current = { map: null, marker: null, polyline: null, follow: true, L: null };
      }
    };
  }, []);

  /**
   * Warm the browser HTTP cache for tiles around (lat, lon) at the current zoom
   * and the next zoom level — gives instant tiles on pan/zoom/recenter.
   */
  const preloadTilesAround = (lat: number, lon: number) => {
    const layer = tileLayerRef.current;
    const map = leafletRef.current.map as import("leaflet").Map | null;
    if (!layer || !map) return;
    const subdomains = ["a", "b", "c", "d"];
    const r = (map.options as { detectRetina?: boolean }).detectRetina ? "@2x" : "";
    const cache = preloadCacheRef.current;
    const zoom = map.getZoom();
    const targets = [
      { z: zoom, radius: 2 },
      { z: Math.min(zoom + 1, 19), radius: 1 },
    ];
    for (const { z, radius } of targets) {
      const n = 2 ** z;
      const xC = Math.floor(((lon + 180) / 360) * n);
      const latRad = (lat * Math.PI) / 180;
      const yC = Math.floor(
        ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n,
      );
      for (let dx = -radius; dx <= radius; dx++) {
        for (let dy = -radius; dy <= radius; dy++) {
          const x = ((xC + dx) % n + n) % n;
          const y = yC + dy;
          if (y < 0 || y >= n) continue;
          const s = subdomains[Math.abs(x + y) % subdomains.length];
          const url = `https://${s}.basemaps.cartocdn.com/dark_all/${z}/${x}/${y}${r}.png`;
          if (cache.has(url)) continue;
          cache.add(url);
          const img = new Image();
          img.decoding = "async";
          img.loading = "eager";
          img.src = url;
        }
      }
    }
    // Cap cache size to avoid unbounded growth
    if (cache.size > 600) {
      const arr = Array.from(cache).slice(-400);
      preloadCacheRef.current = new Set(arr);
    }
  };

  const retryMap = () => {
    setMapStatus("loading");
    setTilesLoaded(false);
    const { map } = leafletRef.current as { map: import("leaflet").Map | null };
    if (map) {
      map.remove();
      leafletRef.current = { map: null, marker: null, polyline: null, follow: true, L: null };
    }
    // Force re-run of init effect via reload trigger
    window.location.reload();
  };

  // sync position
  useEffect(() => {
    if (!position) return;
    const { L, map, marker, polyline, follow } = leafletRef.current as {
      L: typeof import("leaflet") | null;
      map: import("leaflet").Map | null;
      marker: import("leaflet").Marker | null;
      polyline: import("leaflet").Polyline | null;
      follow: boolean;
    };
    if (!L || !map || !marker || !polyline) return;
    const latlng: [number, number] = [position.latitude, position.longitude];
    marker.setLatLng(latlng);
    setHistory((prev) => {
      const next = [...prev, latlng].slice(-50);
      polyline.setLatLngs(next);
      return next;
    });
    if (follow) map.panTo(latlng, { animate: true });

    // Throttle preloads: only run if >15s or >2° drift
    const last = lastPreloadRef.current;
    const drift = last
      ? Math.hypot(position.latitude - last.lat, position.longitude - last.lon)
      : Infinity;
    if (!last || Date.now() - last.t > 15000 || drift > 2) {
      lastPreloadRef.current = { lat: position.latitude, lon: position.longitude, t: Date.now() };
      preloadTilesAround(position.latitude, position.longitude);
    }
  }, [position]);

  const recenter = () => {
    leafletRef.current.follow = true;
    if (position && leafletRef.current.map) {
      (leafletRef.current.map as import("leaflet").Map).setView(
        [position.latitude, position.longitude],
        4,
      );
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-extrabold md:text-4xl">
            Position de l'ISS en temps réel
          </h1>
          <p className="mt-2 text-white/70">
            Données rafraîchies toutes les 7 secondes via l'API publique « Where The ISS At ».
          </p>
        </div>
        <button
          onClick={recenter}
          className="inline-flex items-center gap-2 rounded-full bg-[color:var(--iss-blue)] px-4 py-2 text-sm font-semibold"
        >
          <Crosshair className="h-4 w-4" /> Centrer sur l'ISS
        </button>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="relative h-[60vh] min-h-[420px] overflow-hidden rounded-2xl border border-white/10 bg-black">
          <div
            ref={mapRef}
            className="absolute inset-0"
            aria-label="Carte de la position actuelle de l'ISS"
          />
          {mapStatus === "loading" || !tilesLoaded ? (
            <div
              className="pointer-events-none absolute inset-0 grid place-items-center bg-[color:var(--iss-bg)]/80 backdrop-blur-sm"
              aria-live="polite"
            >
              <div className="flex flex-col items-center gap-3 text-white/70">
                <div className="relative h-16 w-16">
                  <div className="absolute inset-0 animate-ping rounded-full bg-[color:var(--iss-cyan)]/30" />
                  <div className="absolute inset-2 grid place-items-center rounded-full bg-[color:var(--iss-surface)] border border-white/10">
                    <Loader2 className="h-6 w-6 animate-spin text-[color:var(--iss-cyan)]" />
                  </div>
                </div>
                <p className="text-sm">Chargement de la carte…</p>
              </div>
            </div>
          ) : null}
          {mapStatus === "error" ? (
            <div className="pointer-events-auto absolute inset-0 grid place-items-center bg-[color:var(--iss-bg)]/90 backdrop-blur-sm p-6">
              <div className="iss-card flex max-w-sm flex-col items-center gap-3 p-6 text-center">
                <AlertTriangle className="h-8 w-8 text-[color:var(--iss-red,#FF3B4A)]" />
                <h3 className="font-display text-lg font-bold">Carte indisponible</h3>
                <p className="text-sm text-white/70">
                  Les tuiles cartographiques n'ont pas pu se charger. Vérifiez votre connexion ou
                  réessayez.
                </p>
                <button
                  onClick={retryMap}
                  className="mt-1 rounded-full bg-[color:var(--iss-blue)] px-4 py-2 text-sm font-semibold"
                >
                  Réessayer
                </button>
              </div>
            </div>
          ) : null}
        </div>

        <aside className="iss-card flex flex-col gap-4 p-5">
          <div className="flex items-center gap-2">
            <Satellite className="h-5 w-5 text-[color:var(--iss-cyan)]" />
            <h2 className="font-display text-lg font-bold">Télémétrie</h2>
          </div>
          {loading && !position ? (
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-12 animate-pulse rounded-lg bg-white/5" />
              ))}
            </div>
          ) : position ? (
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <Cell label="Latitude" value={`${position.latitude.toFixed(3)}°`} />
              <Cell label="Longitude" value={`${position.longitude.toFixed(3)}°`} />
              <Cell label="Altitude" value={formatAltitude(position.altitude)} />
              <Cell label="Vitesse" value={formatSpeed(position.velocity)} />
            </dl>
          ) : (
            <p className="text-white/70">{error}</p>
          )}
          {position ? (
            <p className="text-xs text-white/50">
              MAJ : {getReadableDate(position.timestamp * 1000)}<br />
              {formatCoordinates(position.latitude, position.longitude)}
            </p>
          ) : null}
          <div className="mt-2 rounded-lg bg-white/[0.04] p-3 text-xs text-white/60">
            La trace bleu cyan représente les 50 dernières positions enregistrées dans cette
            session.
          </div>
        </aside>
      </div>
    </section>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white/[0.04] px-3 py-2">
      <dt className="text-[11px] uppercase tracking-wider text-white/50">{label}</dt>
      <dd className="mt-1 font-display text-base font-bold">{value}</dd>
    </div>
  );
}