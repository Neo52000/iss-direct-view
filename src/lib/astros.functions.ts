import { createServerFn } from "@tanstack/react-start";

export interface AstrosResult {
  number: number;
  people: { name: string; craft: string }[];
}

// Récupère l'équipage actuellement en orbite (source publique open-notify).
// Appel côté serveur → pas de problème de mixed-content sur le domaine HTTPS.
export const getAstros = createServerFn({ method: "GET" }).handler(
  async (): Promise<AstrosResult | null> => {
    try {
      const res = await fetch("https://api.open-notify.org/astros.json", {
        signal: AbortSignal.timeout(6000),
      });
      if (!res.ok) return null;
      const data = (await res.json()) as {
        number: number;
        people: { name: string; craft: string }[];
      };
      // Ne garder que l'équipage à bord de l'ISS.
      const people = (data.people ?? []).filter((p) => p.craft === "ISS");
      return { number: people.length, people };
    } catch {
      return null;
    }
  },
);
