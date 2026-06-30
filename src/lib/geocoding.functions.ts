import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const InputSchema = z.object({ query: z.string().min(1) });

export interface GeocodingResult {
  lat: number;
  lon: number;
  label: string;
}

export const geocodeCity = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }): Promise<GeocodingResult | null> => {
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.set("q", data.query);
    url.searchParams.set("format", "json");
    url.searchParams.set("limit", "1");
    url.searchParams.set("accept-language", "fr");

    const res = await fetch(url.toString(), {
      headers: { "User-Agent": "ISS Direct France / contact@iss-direct-france.fr" },
    });

    if (!res.ok) return null;

    const results = (await res.json()) as Array<{
      lat: string;
      lon: string;
      display_name: string;
    }>;

    if (!results.length) return null;

    const first = results[0];
    // Raccourcir le label : garder seulement les 2 premières parties (ville, pays)
    const parts = first.display_name.split(", ");
    const label = parts.slice(0, 2).join(", ");

    return {
      lat: parseFloat(first.lat),
      lon: parseFloat(first.lon),
      label,
    };
  });
