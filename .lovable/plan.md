# ISS Direct France — Plan de construction

Site francophone "média spatial" complet, design dashboard sombre, monétisation prête (affiliation + lead magnet + ad slots).

## Stack et adaptations

Le projet tourne sur **TanStack Start + Vite + TypeScript + Tailwind v4** (pas React Router / Vite classique). J'adapte la demande :
- Routes dans `src/routes/` (file-based) au lieu de `src/routes/Home.tsx` + React Router.
- SEO via `head()` par route (titres FR, meta, OG, JSON-LD FAQ + Article).
- Déploiement : la stack vise Cloudflare Workers ; je documente le build + déploiement Lovable, en notant que le portage Netlify nécessiterait un export statique (je le mentionne dans le README, pas un blocage).
- Pas de backend V1 : Lovable Cloud non activé. `submitLead` stocke en `localStorage` + hook prêt pour Supabase.

## Pages (routes file-based)

| Fichier | URL | Rôle |
|---|---|---|
| `index.tsx` | `/` | Landing complète (8 sections) |
| `live.tsx` | `/live` | Lecteur grand format + texte SEO long |
| `position.tsx` | `/position` | Carte Leaflet + télémétrie temps réel |
| `passages.tsx` | `/passages` | Form ville/géoloc + état vide ou N2YO |
| `blog.tsx` | `/blog` | Grille articles |
| `blog.$slug.tsx` | `/blog/:slug` | Article (JSON-LD Article) |
| `ressources.tsx` | `/ressources` | Kit + activités |
| `a-propos.tsx` | `/a-propos` | À propos |
| `contact.tsx` | `/contact` | Form contact (mailto V1) |
| `mentions-legales.tsx` | `/mentions-legales` | Légal |
| `confidentialite.tsx` | `/confidentialite` | RGPD |
| `sitemap[.]xml.ts` | `/sitemap.xml` | Sitemap serveur |

`public/robots.txt` ajouté.

## Composants

`Header` (nav + CTA Alertes, menu mobile), `Footer` (5 colonnes), `HeroLive`, `LiveVideo` (iframe YouTube responsive 16:9), `IssStatusCard`, `NextPassCard`, `EmailCapture`, `FeatureCards`, `FAQ` (accordéon shadcn + JSON-LD), `BlogPreview`, `ProductGrid`, `SponsorBanner`, `AdSlot` (placeholder), `Seo` helpers via `head()`.

## Données (`src/data/`)

- `blogPosts.ts` — 8 articles (slug, title, metaDescription, excerpt, content markdown-light, category, date, readingTime).
- `faq.ts` — 8 Q/R accueil + variantes par page.
- `products.ts` — 6 produits affiliés (title, price, rating, image, affiliateUrl, category). Placeholders SVG/gradients, pas de stock photo générique.

## Services (`src/services/`)

- `issApi.ts` — `fetchIssPosition()` → `https://api.wheretheiss.at/v1/satellites/25544`, polling 7s via hook `useIssPosition`, retry/fallback propre.
- `passesApi.ts` — `getVisiblePasses(lat, lon)` : si `VITE_N2YO_API_KEY` présente → appel N2YO `visualpasses`, sinon retourne `{ configured: false }` → UI état vide.
- `leadService.ts` — `submitLead(email, city)` localStorage + stub `submitLeadToSupabase` commenté.
- `utils.ts` — `formatCoordinates`, `formatSpeed`, `formatAltitude`, `getReadableDate`, `generateCalendarEvent` (génère un fichier `.ics`).

## Design system

Tokens dans `src/styles.css` (Tailwind v4 `@theme`), valeurs oklch équivalentes à la palette :

```
#050B1F bg | #07152F surface | #2F80FF primary | #71D7FF cyan
#35C77B live-ok | #FF3B4A live-red | #FFB020 kit-cta
#FFFFFF fg | #AEB8D8 muted
```

Police : **Space Grotesk** (titres 800/900) + **Inter** (corps), chargées via `<link>` dans `__root.tsx` (jamais `@import` URL).

Cartes : `rounded-2xl`, bordure `border-white/10`, glassmorphism léger (`bg-white/[0.03] backdrop-blur`), ombres douces. Boutons arrondis, hover subtil. Pas d'animations excessives.

Sections commerciales (kit, produits, avantages) sur fond clair pour le contraste éditorial demandé.

## Carte temps réel (page Position)

Leaflet + leaflet/dist/leaflet.css (paquets installés via `bun add`). Tuiles **CartoDB Dark Matter** (cohérent fond spatial, pas de clé API). Marker ISS custom, polyline historique (50 derniers points en mémoire), bouton "Centrer sur l'ISS", panneau télémétrie.

## SEO

- `head()` par route : title FR ciblé, meta description < 160, OG title/desc/type, canonical relatif, og:url relatif.
- `__root.tsx` : defaults sitewide (charset, viewport, og:site_name, og:type website, JSON-LD Organization), pas de canonical root, pas d'og:image root.
- Pages FAQ : JSON-LD `FAQPage`. Articles blog : JSON-LD `Article`. Sitemap serveur listant toutes les routes + un entry par slug d'article. `robots.txt` permissif (pas de directive Sitemap tant que pas de domaine).
- H1 unique par page, hiérarchie H2/H3, alt sur toutes images, lazy loading natif.

## Monétisation & conformité

- `ProductGrid` lit `data/products.ts` — URLs faciles à remplacer ; mention "Certains liens peuvent être affiliés" en bas du bloc.
- `AdSlot` rendu en placeholder neutre (3 emplacements : sous le live, entre FAQ/blog, sidebar desktop sur `/live`).
- `SponsorBanner` composant prêt, masqué par défaut.
- `EmailCapture` : champ email + ville facultative + checkbox consentement RGPD, success state, stockage local.
- Bandeau permanent footer : "Site indépendant. Flux vidéo et données provenant de sources publiques externes (NASA, YouTube, APIs publiques)." Aucun logo NASA.

## Variables d'env

`.env.example` :
```
VITE_YOUTUBE_LIVE_ID=FuuC4dpSQ1M
VITE_N2YO_API_KEY=
VITE_SITE_URL=
```
⚠️ Note : `VITE_N2YO_API_KEY` exposée au client (clé requise côté browser pour appel direct N2YO). Documenté dans le README, recommandation future de proxifier via server function quand Cloud sera activé.

## Accessibilité & responsive

- Mobile-first ; hero passe en 1 colonne avec vidéo en haut, télémétrie dessous.
- Pattern responsive : `grid-cols-[minmax(0,1fr)_auto]` sur header avec `min-w-0` + `shrink-0` + `truncate`.
- `aria-label` sur boutons icône, focus visible, contrastes AA vérifiés sur la palette, navigation clavier sur l'accordéon FAQ.

## Robustesse

- Skeleton loaders sur cartes ISS pendant fetch initial.
- Try/catch sur tous les fetch ; en cas d'échec, état "Données momentanément indisponibles" + bouton retry.
- Aucune API ne peut bloquer le rendu (toutes côté client, après mount).

## README (FR)

Sections : présentation, installation (`bun install` / `bun run dev`), build, déploiement (Lovable Publish principal ; note Netlify : nécessite adaptation export statique), configuration des variables, où éditer produits/articles/FAQ, notes légales sur sources NASA/YouTube/N2YO.

## Hors-scope V1 (notés mais non implémentés)

- Envoi réel d'emails d'alertes (nécessite Cloud + edge function + cron + Resend).
- Pack enseignant payant (mention "bientôt").
- Auth utilisateur, base Supabase.

Tout est préparé architecturalement pour brancher Lovable Cloud ensuite sans refonte.
