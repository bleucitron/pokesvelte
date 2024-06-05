---
scope: svelte
subtitle: Elle est partout
description: Utiliser la réactivité de Svelte en dehors des fichiers de composant
---

# Réactivité universelle

Nous sommes maintenant capables de faire évoluer l'état de nos composants. Mais uniquement au sein
du composant lui-même. Les états que nous savons déclarer sont locaux au composant dans lequel ils
sont déclarés. Nous ne sommes pas encore capables de faire évoluer un état de manière globale,
c'est-à-dire le modifier dans un composant, mais en voir les effets dans un autre.

Pour cela, il faut comprendre que **la réactivité de Svelte est universelle**. Vous pouvez créer des
états réactifs n'importe où : à la racine d'un composant, au sein d'une fonction dans un composant,
mais aussi en dehors d'un composant. Ce qui permet plusieurs choses :

- créer plusieurs instances d'un même état dans un même composant...
- ... ou dans des composants différents
- consommer un même état dans des composants différents

> Créer des états globaux avec Svelte 4 était également possible : il fallait utiliser des _stores_.
> Un des désavantages néanmoins était que déclarer un store était très différent de déclarer un
> état, ce qui rendait le concept dur à appréhender.

## Créer plusieurs instances d'un même état

Par exemple, si nous déclarons un état de cette manière :

```svelte
<script>
	let count = $state(0); // déclaration

	function increment() {
		// mise à jour
		count += 1;
	}
</script>

<button onclick={increment}>
	<!-- consommation -->
	clicks: {count}
</button>
```

Nous avons ici trois choses concernant l'état : sa déclaration, sa mise à jour, et sa consommation.

Nous pouvons tout à fait écrire la même de cette manière :

```svelte
<script>
	// création d'une machine à créer des états de type counter
	function createCounter() {
		let count = $state(0); // déclaration

		function increment() {
			// mise à jour
			count += 1;
		}

		return {
			get count() {
				return count;
			},
			increment
		};
	}

	const counter = createCounter(); // création d'un état de type counter
</script>

<button onclick={counter.increment}>
	<!-- consommation -->
	clicks: {counter.count}
</button>
```

> Utiliser un accesseur `get()` permet de toujours avoir accès à la valeur courante de `count`.

La fonction `createCounter` nous permet maintenant de créer plusieurs d'états fonctionnant de la
même façon, mais évoluant chacun indépendamment :

```svelte
<script>
	function createCounter() {...}

	const bikes = createCounter();
	const cars = createCounter();
</script>

<button onclick={bikes.increment}> bikes: {bikes.count} </button>
<button onclick={cars.increment}>
	cars: {cars.count}
</button>
```

## Modules `.svelte.ts`

Jusque là, nous avons uniquement défini des `$state` au sein de composants Svelte, c'est-à-dire dans
des fichiers `.svelte`.

Mais il est possible d'utiliser n'importe quelle rune en dehors d'un composant, dans des fichiers
`.svelte.ts` (ou `.svelte.js`).

```ts
// createCounter.svelte.ts
export function createCounter() {
	let count = $state(0);

	function increment() {
		count += 1;
	}

	return {
		get count() {
			return count;
		},
		increment
	};
}
```

> Vous n'avez pas besoin d'importer quoi que ce soit pour utiliser une rune dans un fichier
> `.svelte.js` ou `.svelte.ts`. Svelte se charge de les rendre disponibles.

Ainsi, nous pouvons créer des états sur un même modèle dans des composants différents.

```svelte
<script>
	import { createCounter } from './createCounter.svelte.ts';

	const bikes = createCounter();
</script>
```

## État global

Si vous avez besoin de suivre une même valeur à plusieurs endroits de votre application, il vous
suffit de créer une instance de cet état à l'extérieur de vos composants, et de l'importer là où il
est nécessaire.

```js
// points.svelte.ts
function createCounter() { ... }

export const points = createCounter();
```

```svelte
<!-- Board.svelte -->
<script>
	import { points } from './points.svelte.ts';
</script>

<div>{points.value}</div>
```

```svelte
<!-- Player.svelte -->
<script>
	import { points } from './points.svelte.ts';
</script>

<button onclick={points.increment}> Jouer </button>
```

> Usuellement, on appelle appelle un état global un **store**.

<fieldset class='task'>
<legend>À vous !</legend>

Dans un nouveau fichier `$lib/stores/index.svelte.ts`

- Créer une fonction `createPokedex` qui crée un `$state` et renvoie un objet contenant la
  valeur du state `found` ainsi qu'une méthode `discover` permettant d'ajouter des éléments au
  state.

- Utiliser `createPokedex` pour créer et exporter un store `pokedex`.

Dans la page d'accueil,

- Remplacer l'état local `foundSpecies` par le store `pokedex`. N'oubliez pas d'utiliser
  `pokedex.discover` pour ajouter des espèces au store.

Dans le header

- Utiliser la valeur du store `pokedex` pour afficher le nombre de Pokémons attrapés.

Dans les pages `/pokedex` et `/pokedex/[id]`

- Utilisez la valeur du store `pokedex` pour différencier le style d'un composant en fonction de
  s'il a été découvert ou non. </fieldset>

</fieldset>

---

[Plus de détails sur ce chapitre](https://svelte-5-preview.vercel.app/docs/universal-reactivity)
