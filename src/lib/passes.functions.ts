import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const InputSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  altitudeM: z.number().default(0),
  days: z.number().default(7),
  minVisibility: z.number().default(60),
});

export interface VisiblePassRaw {
  startUTC: number;
  duration: number;
  maxEl: number;
  startAz: number;
  endAz: number;
  mag?: number;
}

export const getVisiblePassesServer = createServerFn({ method: "GET" })
  .validator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }): Promise<{ configured: false } | { configured: true; passes: VisiblePassRaw[]; error?: string }> => {
    const key = process.env.N2YO_API_KEY;
    if (!key) return { configured: false };
    try {
      const { latitude, longitude, altitudeM, days, minVisibility } = data;
      const url = `https://api.n2yo.com/rest/v1/satellite/visualpasses/25544/${latitude}/${longitude}/${altitudeM}/${days}/${minVisibility}/&apiKey=${key}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("N2YO " + res.status);
      const json = await res.json();
      const passes: VisiblePassRaw[] = (json.passes ?? []).map((p: Record<string, number>) => ({
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
  });
