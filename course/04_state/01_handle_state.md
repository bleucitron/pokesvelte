---
scope: svelte
subtitle: L'Élysée est à portée de main !
description: Définir et mettre à jour un état avec la rune $state dans un composant Svelte 5
---

# Gérer l'état

L'état d'un composant est l'ensemble des données pouvant évoluer au cours de la vie du composant.
**Si les props sont comme l'ADN d'un composant, l'état est un peu comme son expérience de vie**.

Sans état, un composant interactif ne peut pas réagir "physiquement" aux interactions, c'est-à-dire
en modifiant ce qu'il affiche.

Si l'on veut que notre composant soit vraiment interactif, il faut donc être capable de définir des
états, de les modifier, et de réagir à ces changements.

Le moteur de Svelte étant réactif par construction, si un état change, tout ce qui en dépend va être
mis à jour. Il ne nous reste donc qu'à voir comment définir et modifier un état.

## Définir un état : la rune `$state`

Dans un fichier `.svelte`, vous pouvez définir un état avec la rune `$state`. La valeur initiale de
cet état est la valeur fournie à `$state` :

```svelte
<script>
	let count = $state(0);
</script>
```

## Modifier un état

Une fois un state défini, ici `count`, vous pouvez le modifier comme vous le souhaitez, de la même
façon que vous modifieriez une variable JavaScript normale.

Mais puisqu'il s'agit d'un état, Svelte va mettre à jour automatiquement tout le markup dépendant de
cet état, et de manière optimisée.

```svelte
<script>
	let count = $state(0);
</script>

<button
	onclick={() => {
		count = count + 1;
		// ou count ++
	}}
>
	clicks: {count}
</button>
```

> Tout ce qui ne dépend pas de `count` ne sera pas du tout modifié.

## TypeScript

Si vous utilisez TypeScript, vous pouvez utiliser cette syntaxe pour déclarer le type d'un état :

```svelte
<script lang="ts">
	let numbers = $state<number[]>([]);
</script>
```

<fieldset class='task'>
<legend>À vous !</legend>

Notre page d'accueil a 2 affichages différents, mais rien pour passer de l'un à l'autre sans
modifier le code. Corrigeons ça !

_Dans la page d'accueil_

- Transformer la variable `started` par un état avec `$state`

- Ajouter un `<button>` quelque part, et faites en sorte que ce bouton inverse la valeur de
  `started`

- Changer le texte affiché par le bouton en fonction de la valeur de `started`

</fieldset>

---

[Plus de détails sur ce chapitre](https://svelte-5-preview.vercel.app/docs/runes#$state)
