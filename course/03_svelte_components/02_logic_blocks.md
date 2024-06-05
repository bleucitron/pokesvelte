---
scope: svelte
subtitle: Donner des super-pouvoirs au HTML
description: Écrire des opérations logiques dans le markup de Svelte
---

# Blocs de logique

On l'a vu, Svelte est un compilateur. C'est-à-dire que les fichiers `.svelte` sont transformés par
Svelte en du JavaScript équivalent.

Cela permet notamment d'ajouter de la logique à notre markup, ce qui n'est pas possible avec du
HTML. Cette logique sera transcrite par le compilateur en du JavaScript permettant de construire le
HTML désiré.

Cette "logique HTML" se concrétise par des **blocs de logique**.

## `{#if}`

On peut choisir d'afficher conditionnellement des éléments HTML à l'aide d'un bloc `{#if}`. Un bloc
`{#if}` doit toujours être fermé par un `{/if}`.

```svelte
{#if age > 18}
	<p>Bienvenue !</p>
{:else if age > 0}
	<p>Interdit !</p>
{:else}
	<p>...wut ?</p>
{/if}
```

Les sous-blocs `{:else if}` et `{:else}` sont optionnels.

## `{#each}`

Lorsque vous avez besoin d'afficher plusieurs éléments selon un modèle similaire, vous pouvez
utiliser un bloc `{#each}` pour boucler sur les éléments d'un tableau. Un bloc `{#each}` doit
toujours être fermé par un `{/each}`.

```svelte
{#each items as item}
	<li>Le produit {item.name} coûte {item.price} €</li>
{:else}
	Pas de produits
{/each}
```

Le sous-bloc `{:else}` est optionnel, et sera affiché si le tableau fourni n'a pas d'éléments.

Si d'aventure vous avez besoin d'accéder à la position de l'élément courant (aussi appelée indice),
vous pouvez utiliser cette syntaxe :

```svelte
{#each items as item, index}
	<li>Produit numéro {index + 1} : {item.name} - {item.price} €</li>
{/each}
```

> N'oubliez pas qu'en JavaScript, les indices de boucles commencent à 0 !

> Vous pouvez bien sûr nommer `items`, `item` et `index` comme vous le souhaitez.

Si vous le souhaitez, vous pouvez déstructurer votre élément de boucle (ici `item`) :

```svelte
{#each items as { name, price }, index}
	<li>Produit numéro {index + 1} : {name} - {price} €</li>
{/each}
```

## `{#await}`

Il est également possible de gérer des Promesses dans le markup avec un bloc `{#await}`. Nous en
reparlerons [plus tard](../08_advanced_data_loading/04_async_loading.md).

## `{@const}`

Vous pourriez avoir besoin de faire des calculs sur des variables au sein d'un bloc logique. Pour
cela, vous pouvez utiliser `{@const}`.

```svelte
{#each items as item}
	{@const name = item.name.toUpperCase()}
	{@const price = item.price}

	<li>Le produit {name} coûte {price} €</li>
{/each}
```

> Les variables créées avec `{@const}` ne sont accessibles qu'au sein de bloc logique dans lequel
> elles ont été créées.

<fieldset class='task'>
<legend>À vous !</legend>

- Sur la page d'accueil, créer une variable `started` initialisée à `false`, et n'afficher le
  `<Pokemon />` que si `started` vaut `false`, sinon, afficher un texte de votre choix

- Sur la page du Pokédex, afficher les images des 151 Pokémons

- Utiliser `{@const}` pour accéder aux champs de `pokemon` dans le bloc `{#each}`

Vous pouvez utiliser ce style sur la page `pokedex/` si vous le souhaitez :

```css
ul {
	display: flex;
	flex-wrap: wrap;
	margin-block: 1rem;
	gap: 1rem;
}
li:hover img {
	filter: drop-shadow(0px 0px 10px #333);
}
```

</fieldset>

---

[Plus de détails sur ce chapitre](https://svelte.dev/docs/logic-blocks)
