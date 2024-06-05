---
scope: svelte
description: Utiliser la rune $effect pour gérer les effets de bord en Svelte 5
---

# Utiliser les effets

La plupart du temps, les "effets" impliquent la gestion du temps qui passe, des appels au réseau, ou
bien l'accès direct au DOM. On peut vouloir par exemple s'abonner à un flux de messages lorsqu'on
sélectionne un canal de discussion, ou lancer un chronomètre quand un bouton est cliqué.

> L'accès direct au DOM est non recommandé lorsqu'on utilise un framework tel que Svelte, React ou
> autre. Il est toutefois nécessaire dans de rares cas.

Pour faire ce genre de choses, il faut pouvoir écouter les changements des variables réactives et
exécuter une fonction en réponse.

## La rune `$effect`

Svelte fournit la rune `$effect` pour utiliser des effets. Elle permet d'exécuter une fonction
lorsque ses dépendances – des variables réactives – changent de valeur.

```svelte
<script>
	let size = $state(50);
	let active = $state(true);

	$effect(() => {
		console.log('Size', size); // exécuté si size change
	});
	$effect(() => {
		console.log('Active', active); // exécuté si active change
	});
</script>
```

Chaque effet est capable de lister lui-même les variables réactives qu'il contient comme
dépendance, que ces variables proviennent d'une rune `$props`, `$state` ou `$derived`. Puis, si une
des dépendances d'un effet change, l'effet est exécuté. Un effet peut donc avoir plusieurs
dépendances :

```svelte
<script>
	let size = $state(50);
	let active = $state(true);

	$effect(() => {
		// exécuté si `size` ou `active` change
		console.log('Size', size);
		console.log('Active', active);
	});
</script>
```

Les effets sont exécutés par "batch", c'est-à-dire que si `size` ou `active` changent l'un juste
après l'autre, l'effet ci-dessous ne sera pas joué 2 fois, mais une seule. Svelte "attend" un
certain temps avant de mettre à jour les variables réactives le nécessitant, ainsi qu'avant
d'exécuter les effets qui en dépendent.

> N'utilisez pas `$effect` pour mettre à jour une variable réactive lorsqu'une autre change,
> utilisez plutôt `$derived`.

## Réagir au montage

Un effet est joué lorsqu'une de ses dépendances change. Mais il est aussi exécuté lorsque le
composant est monté, au début du cycle de vie de l'instance.

```svelte
<script>
	let size = $state(50);
	// exécuté à chaque fois que `size` change, exécuté également lorsque le composant apparaît
	// dans le DOM
	$effect(() => {
		console.log('Size', size);
	});
</script>
```

Néanmoins, si vous souhaitez uniquement réagir au montage du composant, donc lorsqu'il arrive dans
le DOM, vous pouvez utiliser `onMount`, importé depuis `svelte`.

```svelte
<script>
	import { onMount } from 'svelte';

	let size = $state(50);

	onMount(() => {
		// exécuté uniquement lorsque le composant apparaît dans le DOM
		console.log('Size', size);
	});
</script>
```

> Le callback de `onMount` ne sera joué que côté client, jamais côté serveur.

<fieldset class='task'>
<legend>À vous !</legend>

Dans la page d'accueil

- Créer un état `wild` représentant un nombre (un `id`), et donner lui un nombre entre 1 et 151
  comme valeur initiale.

- Créer un effet qui crée un intervalle lorsque `started` est `true`.

- L'intervalle doit, toutes les 2 secondes :
  - créer un nombre aléatoire entre 1 et 151
  - mettre à jour `wild` avec ce nombre
  - logguer dans la console le nom du Pokémon correspondant

> Utiliser [`setInterval`](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) et
> `getRandomNumber` (fonction fournie dans `$lib/utils`).

- Lorsque `started` vaut `true`, remplacer le texte précédemment affiché par une instance de `Wild`
  utilisant les infos de l'état `wild`.

- Faites en sorte de pouvoir attraper ce nouveau Pokémon sauvage en cliquant dessus.

</fieldset>

---

[Plus de détails sur ce chapitre](https://svelte-5-preview.vercel.app/docs/runes#$effect)
