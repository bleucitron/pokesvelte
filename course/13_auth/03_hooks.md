# Hooks

SvelteKit possède un fichier un peu spécial, `src/hooks.server.ts`.

Ce fichier permet d'exporter certaines fonctions aidant au fonctionnement de SvelteKit – les hooks –, dont la plus utile est `handle`.

## `handle`

Cette fonction est le hook à-tout-faire : **la fonction `handle` est exécutée avant chaque requête vers le serveur SvelteKit**, que ce soit une fonction `load`, une `action`, ou un endpoint.

`handle` reçoit l'évènement de requête (`event`), et permet de faire de opérations sur la requête avant de la laisser continuer son chemin vers sa destination initiale.

```ts
// hooks.server.ts
export async function handle({ event, resolve }) {
	console.log('This is a request to SvelteKit'); // loggué à chaque requête vers SvelteKit

	// ces 2 lignes permettent de faire continuer la requête vers sa destination initiale
	const response = await resolve(event);
	return response;
}
```

> On peut considérer que `handle` permet en quelque sorte d'appliquer des _middlewares_ à nos requêtes.

Il est également possible de complètement court-circuiter certaines requêtes pour répondre autre chose dans certaines conditions, de modifier les headers de réponse, rediriger, etc.

```ts
// hooks.server.ts
export async function handle({ event, resolve }) {
	// toutes les requêtes vers un path qui commence par `/custom` sont court-circuitées dans ce cas
	if (event.url.pathname.startsWith('/custom')) {
		return new Response('custom response');
	}
	const response = await resolve(event);
	return response;
}
```

> Il également possible d'impacter les headers de réponse au niveau de chaque fonction `load`.

## `locals`

La propriété `locals` de `event` est un endroit que vous utiliser pour mettre ce que vous voulez à l'intérieur. Ces informations seront disponibles dans toutes les fonctions `load`, les `actions` et les endpoints.

```ts
// hooks.server.ts
export async function handle({ event, resolve }) {
	event.locals.favoriteBeatle = 'george';

	const response = await resolve(event);
	return response;
}
```

Cela permet de communiquer depuis le serveur SvelteKit des informations dont vous avez besoin absolument partout.

> Si vous utilisez TypeScript, vous pouvez déclarer le type des `locals` dans le fichier `src/app.d.ts`, à l'endroit prévu.

## `handle` et authentification

Cette fonction est notamment très utile pour sécuriser son application SvelteKit. En effet, puisqu'elle est exécutée avant chaque requête, on peut avoir la garantie de l'identité de la personne au moment où la requête atteindra sa destination, après être passée par `handle`.

Pour cela, il suffit de lire les `cookies` associés à la requête, de récupérer les informations du `user` correspondant, et de les fournir à `locals` :

```ts
// hooks.server.ts
export async function handle({ event, resolve }) {
	const cookie = event.cookies.get('my-cookie');
	const user = await getUserInfo(cookie);
	event.locals.user = user;

	const response = await resolve(event);
	return response;
}
```

Ainsi, vous aurez accès aux informations du `user` à tout moment, notamment au moment de faire des requêtes sensibles, nécessitant des vérifications particulières.

> C'est notamment dans cette fonction `handle` que vous pouvez rediriger toutes les requêtes essayant d'aller vers une route à laquelle l'utilisateur n'a pas accès, permettant d'éviter de commencer à faire les chargements de données potentiellement sensibles.

## À vous !

<section class='task'>

- Remplir les `locals` avec les données du `user` dans `hooks.server.ts`.

- Se servir des `locals` pour remplir les props de layout avec les données du `user`. Supprimer le code obsolète.

Dans les fonction de serveur `/team`

- à l'aide de `locals`, protéger toutes les opérations impactant sur la constitution de l'équipe, en levant une erreur si l'utilisateur n'est pas connecté.

- dans le fichier `team/+page.server.ts`, supprimer la redirection un peu nulle lorsque la taille de l'équipe est à 0. À la placel vers la page `/trainer` si l'utilisateur n'est pas connecté, en utilisant `locals` dans `team/+page.server.ts`.
</section>

[En savoir plus sur ce chapitre](https://kit.svelte.dev/docs/hooks)
