# Pages d'erreur

Il y a une question que l'on ne se pose souvent pas assez lorsqu'on construit une application web : la gestion des erreurs.

C'est un problème complexe qui n'a pas de réponse universelle, mais il faut a minima être capable d'afficher une page d'erreur si quelque chose se passe mal.

En résumant à la truelle, il existe deux types d'erreurs nécessitant l'affichage d'une page dédiée :

- la page introuvable (erreur 404)
- l'erreur serveur imprévue (erreur 500)

## Page d'erreur par défaut

**SvelteKit est capable d'afficher une page d'erreur par défaut lorsque nécessaire**.

Par exemple, si vous naviguez sur une page n'existant pas, vous devriez avoir une page affichant le message "404: Not Found".

De même, si quelque chose d'imprévu se produit sur le serveur, par exemple dans une page `+page.server.ts`, la page qui s'affiche devrait afficher le message "500: Internal error".

```ts
// n'importe quel fichier +page.server.ts ou +layout.server.ts
export async function load() {
	// on peut simuler une erreur imprévue de cette manière
	throw new Error('Boum !');
}
```

Dans les deux cas, la page affichée est la page d'erreur par défaut de SvelteKit.

## Pages d'erreur personnalisées

Si cette page d'erreur par défaut ne vous convient pas, vous pouvez tout à fait la personnaliser.

Pour cela, il suffit de créer un fichier `+error.svelte` dans le dossier `routes/`.<script>

```svelte
<!-- +error.svelte -->

<h1>Oh nooooon !!!</h1>
```

Cette page manque un peu d'informations, comme le status de l'erreur, ou un message un peu plus explicite.

Vous trouverez ces informations dans le store de page, que nous avons déjà [croisé précédemment](./05_page_store.md). Il ne vous reste plus qu'à créer la page d'erreur de vos rêves.

```svelte
<!-- +error.svelte -->
<script>
	import { page } from '$app/stores';
</script>

<h1>Oh noooon !!! Erreur {$page.status}...</h1>

<p>({$page.error?.message})</p>
```

Vous pouvez créer une page d'erreur pour chaque route de votre dossier `routes/`. Si un imprévu se produit sur une de vos routes, SvelteKit va remonter l'arborescence de vos routes, et afficher la première page d'erreur qu'il trouvera.

> Pour les erreurs 404, SvelteKit affichera toujours la page d'erreur à la racine du dossier `routes/`, c'est-à-dire celle décrite par le fichier `src/routes/+error.svelte`.

## Sauver les meubles

Il se peut que SvelteKit rencontre une erreur qu'il ne soit pas capable de gérer, par exemple parce qu'elle se produit au sein d'une page d'erreur. Une page d'erreur statique "de secours" est alors affichée. Vous pouvez si besoin personnaliser cette page en créant un fichier `src/routes/error.html`.

À noter que puisqu'il est servi de manière statique, ce fichier HTML ne bénéficie pas des fonctionnalités normales de Svelte ou SvelteKit.

## À vous !

<section class='task'>

- Créer une route `/trainer` dont la fonction `load` jette une erreur systématiquement

- Ajouter un lien dans le header pour pouvoir accéder à cette page

- Créer une page d'erreur à la racine du dossier `routes/`
</section>

[Plus de détails sur ce chapitre](https://kit.sveltefr.dev/docs/routing#error)
