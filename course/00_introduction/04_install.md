---
subtitle: Allez hop, on y va. En route pour l'aventure !
description: Premières étapes pour commencer un projet Svelte ou SvelteKit
---

# Se lancer avec Svelte(Kit)

Il existe plusieurs façons d'utiliser Svelte avec ou sans SvelteKit.

## Installation officielle

La [documentation officielle conseille](https://svelte.dev/docs/introduction#start-a-new-project)
d'installer Svelte avec SvelteKit, quitte à ce que vous ne vous serviez pas du tout des
fonctionnalités de SvelteKit.

Vous pouvez installer Svelte avec SvelteKit en lançant la commande :

```bash
npm create svelte@latest my-svelte-app # puis suivre les indications
```

Vous pourrez alors choisir différentes options, et notamment installer Svelte 5 (actuellement RC).

## Installation avec Vite

[Vite](https://vitejs.dev/) propose des [templates
d'installation](https://vitejs.dev/guide/#scaffolding-your-first-vite-project) de projets
clés-en-main, dont un avec Svelte (mais sans SvelteKit) :

```bash
npm create vite@latest my-svelte-app -- --template svelte
```

## Installation du projet Pokésvelte

Pour faciliter le déroulé de cette formation, j'ai préparé un projet à partir de l'installation
officielle de Svelte. Vous pouvez le retrouver
[sur ce repo](https://github.com/bleucitron/pokesvelte).

> Vous pouvez retrouver les différentes modifications que j'ai ajoutées à la configuration de base
> [ici](https://github.com/bleucitron/pokesvelte/commit/05e6c524850af9f447828050c30ea22e3c167c4f).

Clonez (ou téléchargez) le projet.

## Développer

Une fois l'installation terminée – peu importe celle que vous avez choisie –, vous devrez
certainement installer les dépendances liées à Svelte(Kit), puis lancer le serveur de développement
:

```bash
cd my-svelte-app npm install # installe les dépendances

npm run dev # lance le serveur de développement
```

> Vous pouvez bien sûr faire toutes ces étapes avec d'autres package managers, comme Bun ou Yarn.

Il ne vous reste plus qu'à ouvrir votre navigateur sur l'adresse
[http://localhost:5173](http://localhost:5173), et écrire votre code.

### TypeScript

Nous allons supposer l'utilisation de TypeScript tout au long de ce projet, mais SvelteKit
fonctionne aussi avec JavaScript. Il vous suffit simplement ne pas choisir l'option TypeScript lors
de la création du projet.

Dans ce cas, il vous faudra utiliser des fichiers `*.js` partout où nous utiliserons des fichiers
`*.ts`, et supprimer l'attribut `lang='ts'` de vos `<script>`.

```svelte
<script lang="ts">
	let a: number = 1;
</script>
```

```svelte
<script>
	let a = 1;
</script>
```
