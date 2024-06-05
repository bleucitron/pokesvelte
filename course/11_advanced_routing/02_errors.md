---
scope: kit
description: Créer des erreurs dans une application SvelteKit
---

# Erreurs

Il est à peu près inévitable que vous ayez à faire à des erreurs dans votre application. Nous avons
déjà vu [comment afficher des pages d'erreurs](../01_sveltekit_basics/10_error_pages.md) lorsqu'une
page est introuvable (erreur 404), ou lorsqu'une erreur inattendue se produit sur le serveur (erreur
500).

Mais vous pouvez aussi vous-même décider que quelque n'est pas correct, et afficher une page d'erreur.

## Erreurs attendues

Si vous décidez que quelque chose ne va pas sur le serveur, vous pouvez utiliser l'utilitaire
`error` du module `@sveltejs/kit`. Vous pouvez utiliser `error` dans les fonctions `load` ou les
`action`s des fichiers `+page.server.ts`, ou dans les fonctions de endpoint des fichiers
`+server.ts`.

```ts
// +page.server.ts de la route /article par exemple
import { redirect } from '@sveltejs/kit';

export function load() {
	// on suppose qu'on récupère des données dans la variable `article`
	if (!article) {
		error(404, { message: 'Aucune donnée sur cette page' });
	}

	return {};
}
```

Vous devez fournir 2 choses à `redirect`:

- un code d'erreur (généralement `4xx` ou`5xx`)
- un objet de données comprenant au minimum le champ `message`

> Utiliser `error()` revient à utiliser `throw`. Vous pourriez aussi arriver au même résultat avec
> un `throw`, mais utiliser `error` est plus pratique avec SvelteKit.

<fieldset class='task'>
<legend>À vous !</legend>

Il n'existe que des Pokémons entre les `id` 1 et 151.

Or actuellement, si on essaie d'accéder à la page `/pokedex/200`, le code du fichier
`/pokedex/[id]/+page.server.ts` produit probablement une erreur inattendue, ou bien affiche des
choses bizarres sur la page (selon ce que vous avez écrit).

- Dans la fonction `load` de la page `/pokedex/[id]`, renvoyer une erreur `404` si on ne trouve pas
  de Pokémon correspondant à cet `id`, avec un message expliquant le problème.

</fieldset>

---

[Plus d'infos sur ce chapitre](https://kit.svelte.dev/docs/load#errors)
