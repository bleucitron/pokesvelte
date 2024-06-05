# Inspecter des variables réactives

Soyez honnêtes, vous utilisez beaucoup `console.log()` pour débugger et suivre l'évolution de certaines variables lors de vos développements.

Néanmoins, avec Svelte (5), vous allez devoir vous adapter.

En effet, [on a vu](../03_svelte_components/01_syntax_basics#script) que le script d'un composant n'était exécuté qu'une seule fois. Par conséquence le `console.log()` dans l'exemple suivant ne sera également exécuté qu'une seule fois, et n'est pas donc pas très utile pour suivre l'évolution de la variable.

```svelte
<script>
	let count = $state(0);

	console.log(count); // ne va afficher qu'une seule fois, avec la valeur 0
</script>

<button
	onclick={() => {
		count = count + 1;
	}}
>
	clicks: {count}
</button>
```

## La rune `$inspect`

**La rune `$inspect` de logguer la valeur des variables réactives lorsque leur valeur change.**

```svelte
<script>
	let count = $state(0);

	$inspect(count);
</script>

<button
	onclick={() => {
		count = count + 1;
	}}
>
	clicks: {count}
</button>
```

> Il n'y a pas que les variables créées avec `$state` qui sont considérées "réactives". Les variables créées avec la rune `$props` sont aussi des variables réactives, et vous pouvez donc également utiliser `$inspect` pour suivre leur valeur.

Vous pouvez fournir plusieurs variables réactives à `$inspect`, pour suivre conjointement les évolutions de chacune des variables.

```svelte
<script>
	let count = $state(0);
	let name = $state('Romain');

	$inspect(count, name); // affichera les valeurs quand `count` ou `name` change
</script>
```

> La rune `$insect` écoute chaque variable "profondément" : elle s'exécutera aussi lorsque des changements profonds sont détectés au sein d'un objet ou d'un tableau.

> La rune `$inspect` ne s'exécute qu'en mode développement.

## À vous !

<section class='task'>

- Jouer avec la rune `$inspect` sur les variables de votre choix.
</section>

[Plus de détails sur ce chapitre](https://svelte-5-preview.vercel.app/docs/runes#$inspect)
