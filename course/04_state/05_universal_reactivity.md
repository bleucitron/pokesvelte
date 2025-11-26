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

Nous pouvons tout à fait écrire la même chose de cette manière :

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

Un "état global" est un état qui est défini une seule fois mais consommé ou modifié à différents
endroits d'une application.

Pour vous servir d'un état global, il vous suffit de créer une instance de cet état à l'extérieur de
vos composants, et de l'importer là où il est nécessaire.

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

## Classes réactives

Reprenons l'exemple de notre `createCounter` :

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

Même si techniquement valide et fonctionnelle, il est fort possible que cette façon d'écrire les
choses paraisse complexe, notamment l'usage de `get count()`.

Pour rappel, cette fonction `createCounter` permet de créer des instances d'un `counter`, afin que
l'on puisse faire évoluer certaines quantités. C'est une "usine à `counter`", un peu comme un
composant est une usine à instances... tout comme le concept de classe dans la Programmation
Orientée Objet. Et il se trouve JavaScript permet de définir des classes !

> Ne partez pas tout de suite en courant, je sais que les classes ont mauvaise presse dans
> l'écosystème JavaScript. Mais je vous promets que ça va bien se passer.

En utilisant donc la syntaxe de `class`, nous pouvons écrire la même chose de la manière suivante :

```ts
// Counter.svelte.ts
export class Counter() {
	count = $state(0);

	increment = () => {
		this.count += 1;
	}
}
```

Et l'utiliser de cette façon :

```svelte
<!-- Ailleurs.svelte -->
<script>
	import { Counter } from './Counter.svelte.ts';

	const cars = new Counter();
	const bikes = new Counter();
</script>

<button onclick={cars.increment}>{cars.count}</button>
<button onclick={bikes.increment}>{bikes.count}</button>
```

Je sais pas vous, mais moi je trouve cette façon de définir des états plutôt claire.

Vous pouvez choisir l'une ou l'autre des écritures à votre convenance. Dans la suite de ce cours,
nous allons choisir l'usage des `class`.

> Il est également possible de définir des états avec `$state` dans des fichiers `*.svelte.ts` sans
> passer par une fonction ou par une classe. Mais cela est [généralement
> déconseillé](https://svelte.dev/docs/svelte/$state#Passing-state-across-modules).

<fieldset class='task'>
<legend>À vous !</legend>

Nous allons créer un état global représentant les Pokémons découverts.

_Dans un nouveau fichier `$lib/states/pokedex.svelte.ts`_

- Créer une classe `Pokedex` qui possède un `$state` `found` représentant un tableau des
  identifiants des Pokémons que l'on a découvert.

- Ajouter une méthode `discover` permettant d'ajouter des éléments à `found`. Faites bien attention
  à ne pas ajouter deux fois le même `id` à votre tableau.

- Instancier `Pokedex` et exportez-le en tant que variable `pokedex`. C'est notre état global.

_Dans la page d'accueil_

- Remplacer l'état local `foundSpecies` par l'état global `pokedex`. N'oubliez pas d'utiliser
  `pokedex.discover` pour y ajouter de nouvelles espèces.

_Dans le header_

- Utiliser la valeur de `pokedex` pour afficher le nombre de Pokémons attrapés.

_Dans les pages `/pokedex` et `/pokedex/[id]`_

- Utilisez la valeur de `pokedex` pour différencier le style d'un composant en fonction de
  s'il a été découvert ou non.

</fieldset>

---

Plus de détails sur ce chapitre [ici](https://svelte.dev/docs/svelte/svelte-js-files) et
[là](https://svelte.dev/tutorial/svelte/universal-reactivity)
