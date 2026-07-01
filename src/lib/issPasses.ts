// Calcul embarqué des passages visibles de l'ISS à partir des TLE (satellite.js).
// Aucune clé API requise : les TLE sont récupérés depuis wheretheiss.at, puis la
// position est propagée côté client (SGP4). Un passage est retenu comme
// « visible à l'œil nu » quand : l'ISS est assez haute sur l'horizon, l'ISS est
// éclairée par le Soleil, et l'observateur est dans l'obscurité (Soleil bas).

import {
  twoline2satrec,
  propagate,
  gstime,
  eciToEcf,
  ecfToLookAngles,
  geodeticToEcf,
  jday,
  sunPos,
  degreesToRadians,
  radiansToDegrees,
} from "satellite.js";
import type { VisiblePass } from "@/services/passesApi";

const TLE_URL = "https://api.wheretheiss.at/v1/satellites/25544/tles";
const AU_KM = 149_597_870.7;
const EARTH_RADIUS_KM = 6378.137;
const TLE_TTL_MS = 2 * 60 * 60 * 1000; // 2 h

interface Tle {
  line1: string;
  line2: string;
}

let tleCache: { tle: Tle; fetchedAt: number } | null = null;
let tlePromise: Promise<Tle> | null = null;

/** Récupère les TLE de l'ISS (cache mémoire ~2 h, requête en vol mutualisée). */
export async function fetchIssTLE(): Promise<Tle> {
  if (tleCache && Date.now() - tleCache.fetchedAt < TLE_TTL_MS) {
    return tleCache.tle;
  }
  if (tlePromise) return tlePromise;
  tlePromise = (async () => {
    try {
      const res = await fetch(TLE_URL);
      if (!res.ok) throw new Error("TLE fetch error " + res.status);
      const data = (await res.json()) as { line1: string; line2: string };
      if (!data.line1 || !data.line2) throw new Error("TLE indisponible");
      const tle: Tle = { line1: data.line1, line2: data.line2 };
      tleCache = { tle, fetchedAt: Date.now() };
      return tle;
    } finally {
      tlePromise = null;
    }
  })();
  return tlePromise;
}

// La position ECI du Soleil évolue très lentement : un cache horaire suffit.
const sunEciCache = new Map<string, { x: number; y: number; z: number }>();

/** Vecteur ECI (km) du Soleil à une date donnée (rsun renvoyé en UA par satellite.js). */
function sunEciKm(date: Date) {
  const key = `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}-${date.getUTCHours()}`;
  const cached = sunEciCache.get(key);
  if (cached) return cached;
  const jd = jday(
    date.getUTCFullYear(),
    date.getUTCMonth() + 1,
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  );
  const { rsun } = sunPos(jd); // rsun : [x, y, z] en UA
  const result = { x: rsun[0] * AU_KM, y: rsun[1] * AU_KM, z: rsun[2] * AU_KM };
  sunEciCache.set(key, result);
  return result;
}

/** L'ISS est-elle éclairée par le Soleil (hors ombre de la Terre) ? */
function isSatelliteSunlit(
  satEci: { x: number; y: number; z: number },
  sunEci: { x: number; y: number; z: number },
): boolean {
  const sunMag = Math.hypot(sunEci.x, sunEci.y, sunEci.z);
  const sunHat = { x: sunEci.x / sunMag, y: sunEci.y / sunMag, z: sunEci.z / sunMag };
  // Projection du satellite sur l'axe Terre→Soleil.
  const dot = satEci.x * sunHat.x + satEci.y * sunHat.y + satEci.z * sunHat.z;
  // Du côté jour : forcément éclairé.
  if (dot >= 0) return true;
  // Côté nuit : éclairé seulement si en dehors du cylindre d'ombre terrestre.
  const perpX = satEci.x - dot * sunHat.x;
  const perpY = satEci.y - dot * sunHat.y;
  const perpZ = satEci.z - dot * sunHat.z;
  const perp = Math.hypot(perpX, perpY, perpZ);
  return perp > EARTH_RADIUS_KM;
}

interface Sample {
  date: Date;
  elevation: number; // deg
  azimuth: number; // deg
  visible: boolean; // ISS éclairée + observateur dans le noir
}

function sampleAt(
  satrec: ReturnType<typeof twoline2satrec>,
  observer: { longitude: number; latitude: number; height: number },
  date: Date,
): Sample | null {
  const pv = propagate(satrec, date);
  if (!pv || typeof pv.position === "boolean" || !pv.position) return null;
  const gmst = gstime(date);
  const positionEci = pv.position;
  const positionEcf = eciToEcf(positionEci, gmst);
  const look = ecfToLookAngles(observer, positionEcf);
  const elevation = radiansToDegrees(look.elevation);
  const azimuth = (radiansToDegrees(look.azimuth) + 360) % 360;

  // Soleil : élévation à l'observateur (obscurité si < -6°) + ISS éclairée.
  const sunEci = sunEciKm(date);
  const sunEcf = eciToEcf(sunEci, gmst);
  const sunLook = ecfToLookAngles(observer, sunEcf);
  const sunElevation = radiansToDegrees(sunLook.elevation);
  const observerInDark = sunElevation < -6;
  const satLit = isSatelliteSunlit(positionEci, sunEci);

  return { date, elevation, azimuth, visible: observerInDark && satLit };
}

/**
 * Calcule les prochains passages visibles de l'ISS au-dessus d'un point.
 * @param minEl élévation minimale (deg) pour considérer un passage.
 */
export async function computeVisiblePasses(
  latitude: number,
  longitude: number,
  altitudeM = 0,
  days = 7,
  minEl = 10,
): Promise<VisiblePass[]> {
  const { line1, line2 } = await fetchIssTLE();
  const satrec = twoline2satrec(line1, line2);
  const observer = {
    longitude: degreesToRadians(longitude),
    latitude: degreesToRadians(latitude),
    height: altitudeM / 1000, // km
  };
  // Valide les coordonnées observateur (throw tôt si TLE/inputs invalides).
  geodeticToEcf(observer);

  const stepSec = 30;
  const totalSteps = Math.floor((days * 86400) / stepSec);
  const start = Date.now();

  const passes: VisiblePass[] = [];
  let current: {
    samples: Sample[];
  } | null = null;

  for (let i = 0; i <= totalSteps; i++) {
    const date = new Date(start + i * stepSec * 1000);
    const s = sampleAt(satrec, observer, date);
    if (!s) continue;

    if (s.elevation >= minEl) {
      if (!current) current = { samples: [] };
      current.samples.push(s);
    } else if (current) {
      passes.push(...finalizePass(current.samples));
      current = null;
    }
  }
  if (current) passes.push(...finalizePass(current.samples));

  return passes;
}

/** Transforme une fenêtre au-dessus de l'horizon en passage visible (ou rien). */
function finalizePass(samples: Sample[]): VisiblePass[] {
  if (samples.length < 2) return [];
  // Un passage n'est retenu que s'il est visible à l'œil nu à un moment donné.
  if (!samples.some((s) => s.visible)) return [];

  const first = samples[0];
  const last = samples[samples.length - 1];
  const maxEl = samples.reduce((m, s) => Math.max(m, s.elevation), 0);
  const startUTC = Math.floor(first.date.getTime() / 1000);
  const duration = Math.round((last.date.getTime() - first.date.getTime()) / 1000);

  return [
    {
      startUTC,
      duration,
      maxEl,
      startAz: first.azimuth,
      endAz: last.azimuth,
    },
  ];
}
