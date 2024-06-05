# Atelier de démo SvelteKit

Ce projet a pour objectif de montrer les fonctionnalités principales de
[Svelte](https://svelte.dev/docs/svelte/svelte) et
[SvelteKit](https://svelte.dev/docs/kit/introduction).

## Contenu

Les différents contenus de formation sont disponibles dans le dossier [`course/`](./course/).

Un déploiement du contenu est également disponible [ici](https://pokesvelte.bleucitron.dev/), vous
pourrez notamment y retrouver [la table de matières](https://pokesvelte.bleucitron.dev/contents).

## Matière première

Ce projet pédagogique a été construit à partir du template de base mis à disposition par l'équipe de
Svelte pour [créer un projet SvelteKit
facilement](https://svelte.dev/docs/kit/creating-a-project).

Afin de fluidifier le déroulement de l'atelier, quelques fichiers ont été modifiés ou ajoutés. Il
s'agit principalement de fichiers utilitaires – notamment pour simuler une base de données – ainsi
que quelques feuilles de style. Vous les trouverez pour la plupart dans :

- `src/lib`
- `static`

> Vous pouvez trouver le détail de ces modifications
> [ici](https://github.com/bleucitron/pokesvelte/commit/56fb458424776eda7b9f0e9c728d12b59ab07fc2)

## Démarrer le projet

La première fois que vous démarrez ce projet, vous avez besoin d'installer ses dépendances.

```bash
pnpm install

# ou alternativement
yarn

# ou si vous vous sentez l'âme hipster
bun install

# ou si vraiment vous y tenez...
npm install
```

> Une fois l'installation réussie, vous n'aurez plus à lancer cette commande.

Puis, vous pouvez lancer votre serveur de développement...

```sh
pnpm dev # ou l'équivalent pour votre package manager
```

...et ouvrir votre navigateur sur la page [http://localhost:5173](http://localhost:5173)
