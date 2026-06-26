# Guide de transfert et déploiement d'ISS Direct France sur Netlify

Puisque TanStack Start est un framework full-stack moderne (utilisant Vite et Nitro sous le capot), nous pouvons déployer l'application sur Netlify soit en mode **Full-Stack / Serverless (recommandé)** via l'adaptateur Netlify Edge/Functions de Nitro, soit en export statique (SPA) si l'on souhaite se passer de serveur dynamique.

Voici le plan détaillé pour configurer le projet pour Netlify.

---

## 📋 Plan de configuration pour Netlify

### Étape 1 : Choix de l'adaptateur de déploiement (Preset Nitro)
Par défaut, TanStack Start cible `cloudflare-workers`. Pour déployer sur Netlify avec des fonctions serverless (permettant aux Server Functions et Server Routes de fonctionner), nous allons configurer le preset Nitro pour Netlify dans `vite.config.ts` ou via une variable d'environnement lors de la compilation.

### Étape 2 : Création du fichier de configuration `netlify.toml`
Création d'un fichier `netlify.toml` à la racine pour indiquer à Netlify comment build le projet et où trouver les fichiers générés :
- Commande de build : `bun run build` ou `npm run build`
- Dossier de publication (fichiers statiques) : `.output/public`
- Configuration des redirects pour les routes dynamiques de TanStack Start.

### Étape 3 : Export et déploiement
Deux méthodes pour le transfert :
1. **Automatique (recommandé) :** Connecter le dépôt Git (GitHub/GitLab) directement à Netlify pour un déploiement continu à chaque push.
2. **Manuel (Netlify CLI) :** Compiler en local (`bun run build`) et déployer via `netlify deploy --prod`.

---

## 🛠️ Modifications à apporter au projet

### 1. Création de `netlify.toml`
```toml
[build]
  command = "bun run build"
  publish = ".output/public"

[build.environment]
  NITRO_PRESET = "netlify" # Force Nitro à compiler pour Netlify

[[redirects]]
  from = "/*"
  to = "/.netlify/functions/server"
  status = 200
```

### 2. Adaptation du build dans `package.json`
S'assurer que la commande de build utilise bien la configuration Nitro pour Netlify si nécessaire.

---

## ❓ Questions pour l'utilisateur
1. Souhaites-tu lier ton site à un dépôt **GitHub** pour que Netlify se mette à jour automatiquement à chaque mise à jour de code ?
2. Utilises-tu **Bun** ou **NPM/Yarn** en local pour tes installations ? (Cela adaptera la commande de build dans le fichier `netlify.toml`).
