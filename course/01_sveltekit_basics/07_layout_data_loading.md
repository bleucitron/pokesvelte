# Chargement des données de layout

SvelteKit permet également de fournir des données à un layout.

Les données d'un layout sont chargées dès qu'une page utilisant ce layout est chargée, mais ne seront pas rechargées si vous naviguez vers une autre page utilisant le même layout.

## `+layout.server.ts`

Charger les données d'un layout se fait exactement de la même manière que pour une page, mais en utilisant un fichier `+layout.server.ts`.

```
my-project/
└ src/
  └ routes/
    ├ +layout.svelte
    ├ +layout.server.ts
    └ profil/
      ├ +page.svelte
      └ +page.server.ts
```

> Si vous utilisez Javascript, le fichier en question sera `+layout.server.js`.

Ce fichier, comme son nom l'indique, est **exécuté uniquement sur le serveur**.

## Fonction `load`

De la même manière que pour une page, ce fichier doit exporter une fonction `load`.

```ts
// +layout.server.ts
export function load() {
	return {
		initials: 'RC',
		level: 4
	};
}
```

L'objet que cette fonction renvoie sera fourni comme données de layout dans le fichier `+layout.svelte` correspondant.

## `data` de layout

```svelte
<!-- +layout.svelte -->
<script lang="ts">
	const { data } = $props(); // encore un peu de patience
</script>

<header><p>{data.initials} (lvl. {data.level})</p></header>
```

Les mêmes remarques que pour le chargement des données de page s'appliquent :

- il est généralement requis de faire des appels asynchrones dans cette fonction `load`
- évitez les cascades de chargement avec `Promise.all` si nécessaire
- tant que la fonction `load` n'a pas fini de charger, le layout ne sera pas construit, ni affiché

À noter que les `data` de layout sont aussi accessibles dans l'objet `data` de toutes les pages dépendant de ce layout.

```svelte
<!-- profil/+page.svelte -->
<script lang="ts">
	const {
		data: // contient name, familyName, occupation, initials, level
	} = $props();
</script>
```

## À vous !

<section class='task'>

- Charger des données de layout fictives

  - nombre de Pokémons découverts
  - nombre total de Pokémons
  - nombre de Pokémons dans mon équipe

- Afficher ces informations dans le header
</section>

[Plus de détails sur ce chapitre](https://kit.sveltefr.dev/docs/load#donn-es-de-layout)
