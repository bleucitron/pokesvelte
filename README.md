# Atelier de démo SvelteKit

Ce projet a pour objectif de montrer les fonctionnalités principales de [Svelte](https://svelte.dev) et [SvelteKit](https://kit.svelte.dev).

## Contenu

Les différents contenus de formation sont disponibles dans le dossier [`course/`](./course/).

Vous pouvez retrouver la table de matières [ici](./course/content.md).

## Matière première

Ce projet pédagogique a été construit à partir du template de base mis à disposition par l'équipe de Svelte pour [créer un projet SvelteKit facilement](https://svelte.dev/docs/introduction#start-a-new-project).

Afin de fluidifier le déroulement de l'atelier, quelques fichiers ont été modifiés ou ajoutés. Il s'agit principalement de fichiers utilitaires – notamment pour simuler une base de données – ainsi que quelques feuilles de style. Vous les trouverez pour la plupart dans :

- `src/lib`
- `static`

> Vous pouvez trouver le détail de ces modifications [ici](https://github.com/bleucitron/pokesvelte/commit/05e6c524850af9f447828050c30ea22e3c167c4f)

## Démarrer le projet

La première fois que vous démarrez ce projet, vous avez besoin d'installer ses dépendances.

```bash
npm install
# ou alternativement
pnpm install
# ou encore
yarn
# ou si vous vous sentez l'âme hipster
bun install
```

> Une fois l'installation réussie, vous n'aurez plus à lancer cette commande.

Puis, vous pouvez lancer votre serveur de développement...

```bash
npm run dev
```

...et ouvrir votre navigateur sur la page [http://localhost:5173](http://localhost:5173)
