---
scope: kit
subtitle: Alimenter ses pages en données depuis le serveur
description: Alimenter les pages d'une application SvelteKit en données
---

# Charger les données de page

Notre application commence à prendre forme, mais il manque une chose essentielle : des données.

L'approche de SvelteKit est de considérer que **les pages ont la responsabilité du chargement de
leurs données**.

Pour charger les données d'une page, il est nécessaire d'utiliser un fichier `+page.server.ts` au
même niveau que le fichier `+page.svelte`.

Par exemple, pour charger les données de la route `/profile`, il faut créer l'arborescence suivante
:

```
my-project/
└ src/
  └ routes/
    └ profile/
      ├ +page.svelte
      └ +page.server.ts
```

> Si vous utilisez Javascript, le fichier en question sera `+page.server.js`.

Ce fichier, comme son nom l'indique, est **exécuté uniquement sur le serveur**.

Pour charger les données d'une page, ce fichier doit exporter une fonction `load`.

```ts
// +page.server.ts
export function load() {
	return {
		name: 'Romain',
		familyName: "l'Ourson",
		occupation: 'Rockstar'
	};
}
```

L'objet que cette fonction renvoie sera fourni comme données de page dans le fichier `+page.svelte`
correspondant, en utilisant la `props` `data` :

```svelte
<!-- +page.svelte -->
<script lang="ts">
	const { data } = $props(); // l'heure n'est pas encore venue d'en apprendre plus sur $props
</script>

<p>Nom: {data.name} {data.familyName}</p>

<p>Occupation: {data.occupation}</p>
```

Bien sûr, dans la vraie vie il est courant de venir charger des données depuis une base de données
ou une API externe. Il est alors indispensable d'utiliser `async/await` pour attendre la résolution
des appels asynchrones correspondants.

```ts
// +page.server.ts
export async function load() {
	return { profile: await getProfile() }; // dans ce cas data contiendra un champ profile
}
```

SvelteKit va attendre que l'exécution de la fonction `load` se termine pour construire et afficher
la page.

> Attention à ne pas introduire de "cascades" de chargement, c'est-à-dire des `await` qui se
> succèdent sans raison particulière, et qui vont de facto ralentir le chargement complet de vos
> données. Si vous faites plusieurs appels asynchrones dans le même fichier, pensez à utiliser
> `Promise.all()`.

<fieldset class='task'>
<legend>À vous !</legend>

- Charger les données des Pokémons sur la page `/pokedex` à l'aide de la fonction `fetchPokemons`
  dans `$lib/pokemons.ts` (`$lib` est un alias de `src/lib`)

- Afficher les images des 3 premiers Pokémons. Utiliser le champ `.sprites.front_default` comme
  source de l'image.

</fieldset>

---

[Plus de détails sur ce chapitre](https://kit.svelte.dev/docs/load#page-data)
