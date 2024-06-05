---
subtitle: Les dossiers et fichiers importants
scope: kit
---

# Structure d'un projet SvelteKit

Lorsque vous installez un projet SvelteKit, une arborescence de fichiers de base est construite.

La structure suivante représente un projet SvelteKit de base. C'est celle de ce projet.

```
my-project/
├ src/
│ ├ lib/
│ │ └ [your lib files]
│ ├ routes/
│ │ └ [your routes]
│ ├ app.html
├ static/
│ └ [your static assets]
├ package.json
├ svelte.config.js
├ tsconfig.json
└ vite.config.js
```

## `src/`

Le dossier `src`contient les fichiers sources de votre projet. Il contient notamment:

- `lib/`: un dossier pour organiser vos fichiers de composants, vos utilitaires,... vous pouvez y faire référence depuis n'importe quel fichier du projet avec l**'alias `$lib` fourni par défaut**.
- `routes/`: le dossier contenant vos fichiers de routes. C'est ici que vous construisez vos pages en vous servant du système de routing basé sur les noms de fichiers que SvelteKit fournit.
- `app.html`: la racine HTML de votre application.

> Notez que vous pouvez ne pas utiliser le dossier `lib/` ou le supprimer sans conséquence. Vous pouvez également ajouter d'autres dossiers dans `src/`. En revanche le dossier `routes` et le fichier `app.html` sont indispensables au fonctionnement de SvelteKit.

## `static/`

Le dossier pour stocker vos fichiers statiques, tels que vos images, feuilles de styles, polices de caractères...

## Fichiers de configuration

- `package.json`: la configuration relative à NPM
- `svelte.config.js`: la configuration relative à Svelte et SvelteKit
- `vite.config.js`: la configuration relative à Vite (bundling, HMR, ...)

> Souvent, vous y trouverez aussi d'autres fichiers de configuration pour Git, NPM, Typescript, Eslint, Prettier, ou d'autres.

## `.svelte-kit/`

Un dossier `.svelte-kit/` est généré lorsque vous utilisez les commandes `npm run dev` ou `npm run build`. Il contient des fichiers nécessaires au fonctionnement de votre serveur de développement, ou nécessaires au build de votre projet.

Vous pouvez supprimer ce dossier sans conséquence, il sera regénéré automatiquement.

> Vous pouvez jeter un oeil dans ce dossier, mais vous devriez probablement l'ignorer.

[Plus de détails sur ce chapitre](https://kit.sveltefr.dev/docs/project-structure)
