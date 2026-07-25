import type { Config, Context } from "@netlify/edge-functions";

// Domaine Netlify par défaut, redirigé vers le domaine personnalisé.
const DEFAULT_HOST = "france-iss-live.netlify.app";
const TARGET_ORIGIN = "https://iss-en-direct.com";
const CANONICAL_HOST = "iss-en-direct.com";
const LEGACY_PATHS: Record<string, string> = {
  "/iss-en-direct": "/live",
  "/position-iss": "/position",
  "/quand-voir-iss-ce-soir": "/passages",
  "/kit-espace-a-imprimer": "/ressources",
};

// Ce site est rendu côté serveur (TanStack Start + Nitro). Le preset Netlify
// génère un catch-all `/* -> fonction serveur` qui est évalué avant les règles
// de `netlify.toml`, si bien qu'une redirection de domaine placée dans la config
// ne se déclenchait jamais. Les edge functions, elles, s'exécutent avant toute
// redirection et avant la fonction SSR : on force donc ici la redirection du
// domaine .netlify.app vers le domaine personnalisé, en conservant le chemin et
// la query string. Les deploy previews et branch deploys ne sont pas affectés.
export default async (request: Request, _context: Context) => {
  const url = new URL(request.url);

  if (url.host === DEFAULT_HOST || url.host === `www.${CANONICAL_HOST}`) {
    // Autre domaine (domaine personnalisé, preview, dev) : on laisse passer.
    const targetPath = LEGACY_PATHS[url.pathname] ?? url.pathname;
    return Response.redirect(`${TARGET_ORIGIN}${targetPath}${url.search}`, 301);
  }

  if (url.host === CANONICAL_HOST && LEGACY_PATHS[url.pathname]) {
    return Response.redirect(`${TARGET_ORIGIN}${LEGACY_PATHS[url.pathname]}${url.search}`, 301);
  }

  return;
};

export const config: Config = {
  path: "/*",
};
