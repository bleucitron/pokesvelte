---
scope: kit
description: Utiliser les actions de formulaire dans une application SvelteKit
---

# Actions de formulaire

Nous avons vu comment gérer des éléments `<input>` avec Svelte, mais Svelte tout seul n'intègre pas
vraiment de notion de serveur.

Nous pouvons bien sûr créer des formulaires complets avec Svelte...

```svelte
<form method="POST">
	<label>
		Nom
		<input name="familyName" />
	</label>
	<label>
		Prénom
		<input name="firstName" />
	</label>
	<button>Envoyer</button>
</form>
```

...mais Svelte ne pourra pas aider pour faciliter l'envoi ou traiter les données de formulaire. Pour
cela, il faut utiliser un serveur, et c'est donc SvelteKit qui rentre en jeu.

## Définir une action

Vous vous souvenez des fichiers `+page.server.ts` qui permettent de charger les données d'une page
`+page.svelte` en exportant une fonction `load` ? Eh bien il y a d'autres choses que vous pouvez
exporter de ce `+page.server.ts` : des `actions`.

```ts
export const actions = {
	default: async (event) => {
		// traitement des données de formulaire
	}
};
```

L'objet `actions` permet de définir les différentes actions d'une page, et le plus souvent il n'y en
a qu'une par page. Dans ce cas, il est recommandé de la nommer `default`.

> Si la `method` est `"GET"` ou si vous ne définissez pas d'attribut `method`, la soumission du
> formulaire sera traitée comme un clic sur un lien. Aucune `action` ne sera utilisée dans ce cas –
> c'est `load` qui sera exécutée.

## Utiliser les données de formulaire

Vous pouvez récupérer tout plein d'informations sur la requête envoyée et l'URL utilisée, un peu à
la manière de `load`, ou d'un endpoint SvelteKit. Et notamment vous pouvez récupérer les
informations contenues dans le formulaire en utilisant `event.request.formData()`, comme dans
l'exemple ci-dessous :

```ts
export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const familyName = data.get('familyName');
		const name = data.get('firstName');
	}
};
```

> Nous pourrions tout à fait utiliser les [endpoints
> SvelteKit](../07_advanced_data_loading/01_building_an_api) pour faire quelque chose de
> similaire, mais nous ne profiterions pas des avantages des formulaires. De même, les exercices
> précédents utilisant des endpoints pourraient très certainement être adaptés pour utiliser des
> formulaires.
>
> Le choix entre l'une ou l'autre des stratégies dépend des situations.

<fieldset class='task'>
<legend>À vous !</legend>

_Dans la page `/trainer`_

- Supprimer le `throw` dans la fonction `load`, et remplacer temporairement par un `console.log()`
  de votre choix.

- Ajouter un formulaire d'inscription demandant simplement :
  - Nom
  - Mot de passe

- Créer une action permettant d'utiliser ces données pour inscrire un joueur en utilisant
  `db.trainer.register()` de `$lib/server/db`.

> Nous n'allons pas implémenter de connexion dans ce chapitre, nous le ferons [plus
> tard](./03_named_actions).

> Ce cours n'est pas un cours sur la sécurité des applications web. Notamment, les utilitaires de
> gestion de base de données fournis d'avance, comme `db.trainer.register`, sont naïvement simples,
> et stockent les mots de passe utilisateur en clair par souci de simplicité.
> Il est évidemment plus que recommandé de ne pas faire ceci dans la vraie vie.

</fieldset>

---

[Plus d'infos sur ce chapitre](https://svelte.dev/docs/kit/form-actions)
