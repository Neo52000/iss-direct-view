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
 * Utilise N2YO si la clé est configurée via VITE_N2YO_API_KEY.
 */
export async function getVisiblePasses(
  latitude: number,
  longitude: number,
  altitudeM = 0,
  days = 7,
  minVisibility = 60,
): Promise<PassesResult> {
  const key = import.meta.env.VITE_N2YO_API_KEY;
  if (!key) return { configured: false };
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