import { useEffect, useRef, useState } from "react";

export interface IssPosition {
  latitude: number;
  longitude: number;
  altitude: number; // km
  velocity: number; // km/h
  timestamp: number; // unix seconds
  visibility: string;
}

export async function fetchIssPosition(signal?: AbortSignal): Promise<IssPosition> {
  const res = await fetch("https://api.wheretheiss.at/v1/satellites/25544", { signal });
  if (!res.ok) throw new Error("ISS API error " + res.status);
  const data = await res.json();
  return {
    latitude: data.latitude,
    longitude: data.longitude,
    altitude: data.altitude,
    velocity: data.velocity,
    timestamp: data.timestamp,
    visibility: data.visibility,
  };
}

export interface IssHistoryPoint {
  t: number; // unix ms
  altitude: number;
  velocity: number;
}

export function useIssPosition(intervalMs = 7000) {
  const [position, setPosition] = useState<IssPosition | null>(null);
  const [history, setHistory] = useState<IssHistoryPoint[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const lastErrorRef = useRef(0);

  useEffect(() => {
    let cancelled = false;
    const ctrl = new AbortController();

    const tick = async () => {
      try {
        const p = await fetchIssPosition(ctrl.signal);
        if (cancelled) return;
        setPosition(p);
        setHistory((prev) =>
          [...prev, { t: p.timestamp * 1000, altitude: p.altitude, velocity: p.velocity }].slice(-60),
        );
        setError(null);
        setLoading(false);
      } catch (e) {
        if (cancelled || (e as Error).name === "AbortError") return;
        lastErrorRef.current += 1;
        if (lastErrorRef.current > 2) setError("Données momentanément indisponibles");
        setLoading(false);
      }
    };

    tick();
    const id = setInterval(tick, intervalMs);
    return () => {
      cancelled = true;
      ctrl.abort();
      clearInterval(id);
    };
  }, [intervalMs]);

  return { position, history, error, loading };
}