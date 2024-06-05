# Les effets

Un composant peut être soumis à différents changements : de nouvelles props, un état qui change... et on a vu que la réactivité permet d'écouter ces changements pour faire évoluer l'interface des composants.

Mais parfois, il est nécessaire d'écouter ces changements pour faire d'autres choses, un peu comme des effets secondaires. La plupart du temps, les "effets" impliquent la gestion du temps qui passe, des appels au réseau, ou bien l'accès direct au DOM. On peut vouloir par exemple s'abonner à un flux de messages lorsqu'on sélectionne un canal de discussion, ou lancer un chronomètre quand un bouton est cliqué.

> L'accès direct est non recommandé lorsqu'on utilise un framework tel que Svelte, React ou autre. Il est toutefois nécessaire dans de rares cas.

Pour faire ce genre de choses, il faut pouvoir écouter les changements des variables réactives et exécuter une fonction en réponse.

## La rune `$effect`

Svelte fournit la rune `$effect` pour utiliser des effets.

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

Chaque effet est capable de lister lui-même les variables réactives qu'il contient comme dépendance, que ces variables proviennent d'une rune `$props`, `$state` ou `$derived`. Puis, si une des dépendances d'un effet change, l'effet est exécuté.

Un effet peut donc avoir plusieurs dépendances :

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

Les effets sont exécutés par "batch", c'est-à-dire que si `size` ou `active` changent l'un juste après l'autre, l'effet ci-dessous ne sera pas joué 2 fois, mais une seule. Svelte "attend" un certain temps avant de mettre à jour les variables réactives le nécessitant, ainsi qu'avant d'exécuter les effets qui en dépendent.

> N'utilisez pas `$effect` pour mettre à jour une variable réactive lorsqu'une autre change, utilisez plutôt `$derived`.

## Réagir au montage

Les effets sont joués lorsqu'une de ses dépendances change. Mais ils sont aussi exécutés lorsque le composant est monté, au début du cycle de vie de l'instance.

```svelte
<script>
	let size = $state(50);

	$effect(() => {
		// exécuté également lorsque le composant apparaît dans le DOM
		console.log('Size', size);
	});
</script>
```

> Dans le cas où l'on souhaite uniquement réagir au montage, et plus jamais après, il est possible d'utiliser `onMount` importé depuis `svelte`. On considère que `onMount` est un effet à usage unique.

## À vous !

<section class='task'>

Dans la page d'accueil

- Créer un état `wild` représentant un nombre (un `id`), et donner lui un nombre entre 1 et 151 comme valeur initiale.

- Créer un effet qui crée un intervale lorsque `started` est `true`.

- L'intervale doit, toutes les 2 secondes :
  - créer un nombre aléatoire entre 1 et 151
  - mettre à jour `wild` avec ce nombre
  - logguer dans la console le nom du Pokémon correspondant

> Utiliser [`setInterval`](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) et `getRandomNumber` (fonction fournie dans `$lib/utils`.

- Lorsque `started` vaut `true`, remplacer le texte précédemment affiché par une instance de `Wild` utilisant les infos de l'état `wild`.

- Faites en sorte de pouvoir attraper ce nouveau Pokémon sauvage en cliquant dessus.

</section>

[Plus de détails sur ce chapitre](https://svelte-5-preview.vercel.app/docs/runes#$effect)
