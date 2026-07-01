// Dynamic import so a createServerFn startup failure doesn't crash all routes
async function loadServerFn() {
  try {
    const mod = await import("@/lib/passes.functions");
    return mod.getVisiblePassesServer;
  } catch {
    return null;
  }
}

export interface VisiblePass {
  startUTC: number;
  duration: number;
  maxEl: number;
  startAz: number;
  endAz: number;
  mag?: number;
}

export type PassesResult =
  | { configured: false }
  | { configured: true; passes: VisiblePass[] }
  | { configured: true; passes: []; error: string };

/**
 * Récupère les prochains passages visibles de l'ISS.
 * Par défaut : calcul embarqué à partir des TLE (satellite.js), sans clé API.
 * Fallbacks optionnels : server function N2YO, puis clé client legacy.
 */
export async function getVisiblePasses(
  latitude: number,
  longitude: number,
  altitudeM = 0,
  days = 7,
  minVisibility = 60,
): Promise<PassesResult> {
  // 1) Calcul embarqué via TLE — fonctionne toujours, sans clé.
  try {
    const { computeVisiblePasses } = await import("@/lib/issPasses");
    const passes = await computeVisiblePasses(latitude, longitude, altitudeM, days);
    return { configured: true, passes };
  } catch (tleError) {
    // 2) Fallback N2YO via server function (si clé N2YO_API_KEY configurée).
    const getVisiblePassesServer = await loadServerFn();
    try {
      if (!getVisiblePassesServer) throw new Error("server fn unavailable");
      const result = await getVisiblePassesServer({
        data: { latitude, longitude, altitudeM, days, minVisibility },
      });
      if (result.configured) return result;
    } catch {
      /* passe au fallback client legacy */
    }
    // 3) Fallback clé client legacy (mode dev).
    const key = import.meta.env.VITE_N2YO_API_KEY;
    if (key) return fetchN2YODirect(key, latitude, longitude, altitudeM, days, minVisibility);
    // Aucun fallback disponible : renvoie l'erreur du calcul TLE.
    return { configured: true, passes: [], error: (tleError as Error).message };
  }
}

async function fetchN2YODirect(
  key: string,
  latitude: number,
  longitude: number,
  altitudeM: number,
  days: number,
  minVisibility: number,
): Promise<PassesResult> {
  try {
    const url = `https://api.n2yo.com/rest/v1/satellite/visualpasses/25544/${latitude}/${longitude}/${altitudeM}/${days}/${minVisibility}/&apiKey=${key}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("N2YO " + res.status);
    const data = await res.json();
    const passes: VisiblePass[] = (data.passes ?? []).map((p: Record<string, number>) => ({
      startUTC: p.startUTC,
      duration: p.duration,
      maxEl: p.maxEl,
      startAz: p.startAz,
      endAz: p.endAz,
      mag: p.mag,
    }));
    return { configured: true, passes };
  } catch (e) {
    return { configured: true, passes: [], error: (e as Error).message };
  }
}
