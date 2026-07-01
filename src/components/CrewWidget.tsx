import { useQuery } from "@tanstack/react-query";
import { Loader2, UserRound } from "lucide-react";
import { getAstros } from "@/lib/astros.functions";

/** Affiche l'équipage actuellement à bord de l'ISS (mis à jour automatiquement). */
export function CrewWidget() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["astros"],
    queryFn: () => getAstros(),
    staleTime: 1000 * 60 * 60, // 1 h
  });

  return (
    <div className="iss-card my-8 p-6">
      <h2 className="font-display text-xl font-bold">Équipage actuellement à bord</h2>
      {isLoading ? (
        <p className="mt-3 inline-flex items-center gap-2 text-white/70">
          <Loader2 className="h-4 w-4 animate-spin" /> Chargement de l'équipage…
        </p>
      ) : isError || !data ? (
        <p className="mt-3 text-white/60">
          Données d'équipage momentanément indisponibles. Réessayez plus tard.
        </p>
      ) : (
        <>
          <p className="mt-1 text-sm text-white/60">
            {data.number} personne{data.number > 1 ? "s" : ""} à bord de l'ISS en ce moment.
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {data.people.map((p) => (
              <li
                key={p.name}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm"
              >
                <UserRound className="h-4 w-4 text-[color:var(--iss-cyan)]" />
                {p.name}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
