# ISS Direct France

Voir l'ISS en direct depuis l'espace — site francophone moderne pour suivre la Station Spatiale Internationale : live vidéo, position temps réel, passages visibles, blog, kit pédagogique et grille produits.

## Stack

- TanStack Start v1 (React 19, Vite 7)
- TypeScript strict
- Tailwind CSS v4 (tokens dans `src/styles.css`)
- Leaflet pour la carte temps réel (tuiles CartoDB Dark Matter, sans clé)
- Données ISS : [Where The ISS At](https://wheretheiss.at/w/developer)
- Passages visibles : [N2YO API](https://www.n2yo.com/api/) (clé optionnelle)
- Live vidéo : flux YouTube NASA (iframe configurable)

## Installation

```bash
bun install
bun run dev
```

Build :

```bash
bun run build
```

## Variables d'environnement

Copiez `.env.example` en `.env` et renseignez :

| Variable | Description |
|---|---|
| `VITE_YOUTUBE_LIVE_ID` | ID de la vidéo YouTube du live ISS (défaut `FuuC4dpSQ1M`). |
| `VITE_N2YO_API_KEY` | Clé N2YO pour activer le calcul des passages visibles. Sans clé, la page Passages affiche un état « bientôt disponible ». ⚠️ La clé est exposée côté client : pour un usage en prod intensif, proxifiez via une server function quand Lovable Cloud sera activé. |
| `VITE_SITE_URL` | URL canonique du site une fois publié. |

## Personnalisation rapide

- **Produits affiliés** : éditez `src/data/products.ts` (remplacez `affiliateUrl` par vos liens Amazon Partenaires, Awin, Fnac, etc.).
- **Articles de blog** : éditez `src/data/blogPosts.ts`.
- **FAQ** : éditez `src/data/faq.ts`.
- **Couleurs / palette** : ajustez les tokens `--iss-*` dans `src/styles.css`.
- **Live YouTube** : changez `VITE_YOUTUBE_LIVE_ID` ou le défaut dans `src/components/LiveVideo.tsx`.

## Déploiement

Le projet cible le runtime edge (Cloudflare Workers) via TanStack Start.

- **Lovable** : cliquez sur Publish dans l'éditeur.
- **Netlify** : nécessite l'adaptateur edge correspondant ou un export SPA — non couvert par défaut.

## Conformité & sources

- Site indépendant, non affilié à la NASA.
- Flux vidéo fourni par NASA via YouTube. Données de position issues d'APIs publiques.
- Les liens d'affiliation sont signalés clairement.
- Pages légales : `/mentions-legales` et `/confidentialite`.

## Roadmap V2 (préparée mais non implémentée)

- Activer Lovable Cloud pour stocker les leads (`leadService.submitLeadToSupabase`).
- Envoi d'alertes email automatiques (cron + Resend).
- Pack enseignant payant via Stripe.
- Géocodage des villes (ex. Nominatim) sur la page Passages.