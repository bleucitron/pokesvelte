---
scope: kit
---

# Redirections

Parfois, vous pouvez avoir besoin de faire des redirections en fonction de certaines informations.

Pour cela, SvelteKit met à votre disposition un utilitaire `redirect` à importer depuis le module `@sveltejs/kit`. Vous pouvez utiliser cette fonction dans les fonctions `load`, dans les `action`s de formulaire des fichiers `+page.server.ts`, ou dans les fonctions de endpoint des fichiers `+server.ts`.

```ts
// +page.server.ts de la route /user par exemple
import { redirect } from '@sveltejs/kit';

export function load() {
	// on suppose qu'on récupère des données sur l'utilisateur dans la variable `connected`
	if (!connected) {
		redirect(307, '/');
	}

	return {};
}
```

Vous devez fournir 2 choses à `redirect`:

- un code d'erreur (généralement `301`, `302`, `307` ou `308`)
- une URL cible

> Utiliser `redirect()` revient à utiliser `throw`.

> Notez que ces redirections sont des redirections serveur : la redirection se fait avant d'atteindre le navigateur. Il est également possible de rediriger depuis le routeur client (c'est-à-dire depuis le navigateur), mais il faut utiliser une autre méthode : [`goto`](https://kit.svelte.dev/docs/modules#$app-navigation-goto).

## À vous !

<section class='task'>

- Vider votre équipe de tous ses membres.

- Si l'équipe est vide, rediriger les tentatives d'accès à la page `/team` vers la page `/` (avec un code [`307`](https://developer.mozilla.org/fr/docs/Web/HTTP/Status/307))

</section>

[Plus d'infos sur ce chapitre](https://kit.svelte.dev/docs/load#redirects)
