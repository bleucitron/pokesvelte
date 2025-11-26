---
scope: kit
subtitle: Un peu comme les cailloux du Petit Poucet
description: Résoudre des routes SvelteKit pour ne jamais malformer ses liens
---

# Résoudre des routes

Vous avez peut-être remarqué des messages dans votre éditeurs au niveau de vos liens.

Il est temps de résoudre ces problèmes !

## Valider les routes

Nous commençons à avoir quelques routes dans notre application :

- `/`
- `/faq`
- `/pokedex`
- `/pokedex/[id]`
- `/team`

De même, nous avons quelques liens permettant de connecter ces routes entre elles.

C'est encore peu, mais plus nous allons ajouter de routes et de liens à notre application, plus le
risque de créer des "liens cassés" va augmenter, en faisant des typos lors de l'écriture d'un lien
par exemple.

```svelte
<!-- ce lien est cassé, mais je peux ne pas m'en rendre compte... -->
<a href="/pokebex">Oh la belle 404 !</a>
```

Pour éviter ça, SvelteKit vous incite à vérifier que chaque lien vers une route de votre application
est valide, grâce à l'utilitaire `resolve`, importé depuis `$app/paths` :

```svelte
<script>
	import { resolve } from '$app/paths';
</script>

<a href={resolve('/pokebex')}>Oh la belle 404 !</a> <!-- j'ai maintenant un message d'erreur -->
```

Et si vous faites une erreur en pointant vers une route qui n'existe pas, SvelteKit vous préviendra,
et vous pourrez alors la corriger :

```svelte
<script>
	import { resolve } from '$app/paths';
</script>

<a href={resolve('/pokedex')}>Voilà un lien fonctionnel !</a>
```

## Valider les routes dynamiques

Cela fonctionne également pour les routes dynamiques, à condition de fournir les paramètres de route
en option :

```svelte
<script>
	import { resolve } from '$app/paths';
</script>

<a
	href={resolve('/pokedex/[id]', {
		id: '1'
	})}>Ce lien est valide</a
>
```

> Notez que c'est bien le nom de la route qu'il faut fournir en premier argument, `/pokedex/[id]`
> dans ce cas.

<fieldset class='task'>
<legend>À vous !</legend>

- Utilisez `resolve` pour valider les liens de votre application

</fieldset>

---

[Plus de détails sur ce chapitre](https://svelte.dev/docs/kit/$app-paths#resolve)
