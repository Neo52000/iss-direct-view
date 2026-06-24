import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useIssPosition } from "@/services/issApi";
import {
  formatAltitude,
  formatCoordinates,
  formatSpeed,
  getReadableDate,
} from "@/lib/iss-utils";
import { Crosshair, Satellite } from "lucide-react";

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

  // init Leaflet client-side
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");
      if (cancelled || !mapRef.current || leafletRef.current.map) return;
      const map = L.map(mapRef.current, {
        center: [0, 0],
        zoom: 3,
        worldCopyJump: true,
        zoomControl: true,
      });
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          attribution: "© OpenStreetMap, © CartoDB",
          subdomains: "abcd",
          maxZoom: 19,
        },
      ).addTo(map);

      const icon = L.divIcon({
        className: "iss-marker",
        html: `<div style="width:34px;height:34px;border-radius:50%;background:rgba(47,128,255,.25);display:grid;place-items:center;border:2px solid #71D7FF;box-shadow:0 0 30px rgba(113,215,255,.6)"><span style="font-size:18px">🛰️</span></div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });
      const marker = L.marker([0, 0], { icon }).addTo(map);
      const polyline = L.polyline([], { color: "#71D7FF", weight: 2, opacity: 0.7 }).addTo(map);

      leafletRef.current = { map, marker, polyline, follow: true, L };
    })();
    return () => {
      cancelled = true;
    };
  }, []);

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
        <div
          ref={mapRef}
          className="h-[60vh] min-h-[420px] overflow-hidden rounded-2xl border border-white/10 bg-black"
          aria-label="Carte de la position actuelle de l'ISS"
        />

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