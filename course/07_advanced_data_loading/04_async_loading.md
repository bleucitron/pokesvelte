# Chargement asynchrone

De manière générale, il est important de faire attention à la façon dont vous chargez vos données, car cela peut impacter très fortement les performances de votre application.

Par exemple, il est souvent recommandé de charger vos données en parallèle.

## Chargement parallèle

Prenons cet exemple :

```ts
async function doShopping() {
	const fruits = await getFruits(); // prend 2s
	const videogames = await getVideoGames(); // prend 2s

	console.log('Les courses sont finies'); // s'affiche au bout de 4s
}
```

Supposons que les fonctions `getFruits` et `getVideoGames` sont indépendantes. Ici, le log s'affichera au bout de 4 secondes. Ce chargement est mal optimisé, car on attend la fin de `getFruits` pour commencer `getVideoGames`, alors que ces deux requêtes ne dépendent pas l'une de l'autre.

> On appelle ce type de chargement mal optimisé des "cascades".

En JavaScript, si 2 requêtes (autrement dit 2 fonctions aynchrones) sont indépendantes, c'est une bonne idée de les charger en parallèle. Cela permet d'attendre moins longtemps. Pour cela, vous pouvez utiliser `Promise.all`.

```ts
async function doShopping() {
	const [fruits, videoGames] = await Promise.all([
		getFruits(), // prend 2s
		getVideGames() // prend 2s
	];

	console.log('Les courses sont finies'); // s'affiche au bout de 2s
}
```

## Chargement différé

Nous pouvons bien sûr appliquer le chargement parallèle à nos fonctions `load`, lorsque c'est pertinent. Mais il reste une situation problématique : parfois, une donnée pas très importante peut ralentir le chargement d'une page toute entière.

> Rappelez-vous : par défaut SvelteKit construit les pages en entier sur le serveur (SSR), et a donc besoin d'attendre sur le serveur le chargement complet des fonctions `load`.

```ts
// +page.server.ts
async function load() {
	const [main, relevant, secondary] = await Promise.all([
		getMainData(), // 2s
		getRelevantData(), // 2s
		getSecondaryData() // 20s
	]);

	return {
		main,
		relevant,
		secondary
	};
}
```

Ici, le chargement de `secondary` est moins important que les autres données, mais prend plus de temps. Même avec `Promise.all`, le temps de chargement total ne pourra pas être plus court que le temps maximal de chargement, donc 20s dans notre exemple.

SvelteKit nous permet de résoudre ce problème en renvoyant des données en tant que Promesses.

```ts
// +page.server.ts
async function load() {
	const [main, relevant] = await Promise.all([
		getMainData(), // 2s
		getRelevantData() // 2s
	]);

	const secondary = getSecondaryData(); // ici, on utilise pas 'await', 'secondary' est donc une Promesse

	return {
		main,
		relevant,
		secondary
	};
}
```

En n'utilisant pas `await` sur les données non nécessaires, nous disont à SvelteKit de ne pas attendre la fin du chargement des données concernées, et de renvoyer les autres données dès qu'elles ont fini de charger. Il faudra en revanche attendre les données non nécessaires au niveau de la page.

```svelte
<!-- +page.svelte -->
<script>
	const { data } = $props();
	const { main, relevant, secondary } = $derived(data);
</script>

<p>{main}</p>
<p>{relevant}</p>

{#await secondary}
	<p>Chargement des données secondaires..</p>
{:then secondaryData}
	<p>{secondaryData}</p>
{/await
```

> Nous avons ici un exemple d'utilisation du bloc logique `#await`.

> Une autre option pour charger ces données non essentielles sans alourdir le premier rendu de page serait de faire manuellement un requête côté client. C'est équivalent, même si le chargement dans ce cas sera un peu plus lent, car il faut attendre d'être arrivé sur le client pour commencer le chargement.

## À vous !

<section class='task'>

- Utiliser `Promise.all` dans les fonctions `load` qui chargent plusieurs données de manière indépendante pour optimiser la chargement de nos pages.

- Utiliser la fonction `getTotalPopulation` de `$lib/pokemons` pour charger un nombre aléatoire représentant le total de Pokémons présents dans les environs. Ce calcul prend entre 0.5s et 4s, et risque d'alourdir le chargement normal de la page.

- Afficher le résultat du scan des environs dans la page, une fois que le chargement est terminé, en utilisant `#await`.
</section>

Plus de détails sur ce chapitre :

- [Streaming de Promesses](https://kit.svelte.dev/docs/load#streaming-with-promises)
- [`#await`](https://svelte.dev/docs/logic-blocks#await)
