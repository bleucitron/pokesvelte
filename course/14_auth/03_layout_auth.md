# Le problème d'authentifier/autoriser dans un layout

Nous rendons donc nos données utilisateur disponibles dans toute notre application grâce aux
fonctionnalités du layout racine.

```ts
// +layout.server.ts
export async function load() {
	const user = await getUserData(); // on devrait utiliser les cookies, mais on simplifie ici

	return {
		user
	};
}
```

Même si cette approche fonctionne, elle peut tout de même poser des problèmes de sécurité et de
performances.

## Chargements parallèles

Supposons que notre application ne soit accessible qu'aux personnes authentifiées, car elle contient
des données top secrètes. Pour cela, il paraît sensé d'authentifier, puis d'autoriser l'accès à
la page uniquement si la personne possède un compte.

On pourrait écrire quelque chose comme ça :

```ts
// +layout.server.ts
export async function load() {
	const user = await getUserData();

	if (!user) error(403, { message: 'Non autorisé' }); // on autorise que si `user` existe

	return {
		user
	};
}
```

```ts
// +page.server.ts
export async function load() {
	const secret = await getTopSecretData();

	return {
		secret
	};
}
```

Et pouf ! On vient de rendre disponible les données secrètes à tout le monde...

Alors oui, le fait d'autoriser l'accès à la page uniquement si `user` existe empêche de facto de
voir la page et son contenu secret s'afficher dans le navigateur. Mais en réalité les données de la
page ont quand même été chargées, car **toutes les fonctions `load` concernant une page sont par
défaut exécutées en parallèle**.

Donc avant même de savoir si `user` existe, le chargement des données secrètes est lancé, puis reçu
par le navigateur, donc techniquement accessibles pour tout le monde. Ce n'est pas un bug,
simplement le fonctionnement normal de SvelteKit.

Pour régler ce problème, il faut donc être capable d'attendre que les données `user` soient
chargées pour effectuer des opérations d'autorisation.

## La cascade de chargement

SvelteKit permet de ne pas effectuer les appels de `load` en parallèle, en utilisant une méthode
`parent`.

```ts
// +page.server.ts
export async function load({ parent }) {
	const { user } = await parent(); // permet d'accéder aux données du layout parent

	if (!user) error(403, { message: 'Non autorisé' }); // on autorise que si `user` existe

	const secret = await getTopSecretData();

	return {
		secret
	};
}
```

Dans ce cas, plus de problèmes de sécurité. On attend d'avoir les données `user` provenant du layout
parent, puis on décide si oui ou non la personne a le droit d'accéder à la page.

Mais le problème maintenant s'est déplacé : on a potentiellement dégradé les performances de
l'application en introduisant une _cascade_ de chargement : on est obligé d'attendre que la fonction
`load` du layout ait _complètement_ terminé afin d'autoriser l'accès à la page. Les chargements du
layout et de la page ne sont plus parallélisés, mais séquentiels, l'un après l'autre.

Imaginez la fonction `load` de layout suivante :

```ts
// +layout.server.ts
export async function load() {
	const user = await getUserData();
	const otherFatData = await getOtherFatData(); // prend beaucoup de temps

	return {
		user,
		otherFatData
	};
}
```

Cette fonction `load` prend beaucoup de temps à charger à cause de `otherFatData`. Or la fonction
`load` de la page attend que la fonction `load` du layout ait terminé pour continuer son travail,
même si le chargement de `otherFatData` ne participe en rien à l'autorisation que l'on souhaite
faire.

> Le problème serait moins pire, mais toujours présent en utilisant `Promise.all`.

Et cela peut s'aggraver si on suppose plusieurs fonctions `load` de layout imbriquées, qui viendrait
chacune retarder le chargement de la page. Sans compter qu'il est possible que l'on finisse par ne
pas autoriser l'accès tout en ayant chargé pour rien tout un tas de données non impliquées dans l'autorisation.

Le problème ici est que l'on doit attendre toutes les données des layouts pour pouvoir continuer le
chargement de la page, alors qu'on n'a réellement besoin que des données du `user`.

## Sécuriser chaque endpoint

La solution à ce problème est de charger les données de `user` à chaque entrée de votre application – layout, page,
action, endpoint – nécessitant une autorisation, plutôt que de le faire dans un layout.

```ts
// +page.server.ts
export async function load() {
	const user = await getUserData();

	if (!user) error(403, { message: 'Non autorisé' });

	const secret = await getTopSecretData();

	return {
		secret
	};
}
```

Néanmoins, ce n'est pas idéal :

- les chargements des layouts et des pages se faisant en parallèle, il est toujours plausible de
  charger les données d'un layout alors que finalement l'autorisation ne sera pas donnée, ce qui
  implique des chargements inutiles
- il faut répéter le code de l'appel à `getUserData` dans chaque fonction le nécessitant, ce qui est
  un peu répétitif.

SvelteKit offre une solution adaptée à ce genre de besoins : les _hooks_.

---

[Plus d'infos sur ce sujet](https://captaincodeman.com/securing-your-sveltekit-app)
