---
scope: kit
subtitle: Toujours savoir où on se trouve
description: Obtenir des informations sur la page actuelle dans une application SvelteKit
---

# Informations de page

Nos liens de navigation sont fonctionnels, mais ils pourraient être encore plus utiles : ils
pourraient nous informer de la page sur laquelle nous nous trouvons, en appliquant un style
particulier sur le lien correspondant à la page actuelle.

Mais comment obtenir l'information de l'identité de la page actuelle ?

## Le _store_ de page

SvelteKit vous fournit cette information dans le _store_ de page, auquel vous pouvez accéder de la
manière suivante :

```ts
function a() {
	console.log();
}
```

```svelte
<!-- +layout.svelte -->
<script lang="ts">
	import { page } from '$app/stores';
</script>
```

Vous pouvez lire la valeur d'un store en le préfixant avec `$`.

> Les _stores_ sont une feature de Svelte 4, intégrée dans SvelteKit, notamment pour stocker les
> informations de page. Nous n'allons pas détailler leur fonctionnement dans ce tutoriel.
> Svelte 5 proposant une autre approche aux stores, il est probable que SvelteKit fournisse les
> informations de page d'une autre manière dans le futur.

Le store de page contient plein de choses, et notamment des informations sur l'URL courante. Le path
de la page actuelle s'obtient en écrivant `$page.url.pathname`.

```svelte
<!-- +layout.svelte -->
<script lang="ts">
	import { page } from '$app/stores';
</script>

<div>{$page.url.pathname}</div>
```

> Vous pouvez intégrer des calculs dans votre markup en les entourant de `{}`.

<fieldset class='task'>
<legend>À vous !</legend>

- Ajouter la classe 'current' à chaque `<a>` si le chemin de la page correspond à son `href`

</fieldset>

> Ne vous inquiétez pas si vous avez le sentiment que le code que nous écrivons actuellement n'est
> pas incroyable. C'est le cas. Nous l'améliorerons quand nous aurons appris plus de choses sur la
> syntaxe spécifique à Svelte.

---

[Plus de détails sur ce chapitre](https://kit.svelte.dev/docs/modules#$app-stores-page)
