---
scope: kit
description: Créer plusieurs actions de formulaire sur une même page dans une application SvelteKit
---

# Actions nommées

Il est possible d'avoir plusieurs formulaires différents sur une même page, mais aussi différentes
actions associées.

Pour cela il faut être capable de différencier les actions que chaque `<form>` cible. Jusque là,
nous n'avions qu'un seul formulaire par page, et nous n'avons donc pas eu besoin de préciser quelle
`action` celui-ci devait cibler : il cible l'action `default` par défaut.

```svelte
<!-- cible l'action `default` -->

<form method="POST"></form>
```

Mais si on veut plusieurs actions, il est nécessaire de les cibler explicitement :

```svelte
<form action="?/inscription" method="POST"></form>

<form action="?/connexion" method="POST"></form>
```

> Oui, le `?/` est nécessaire.

Et dans ce cas, vous pouvez définir plusieurs actions dans le fichier `+page.server.ts` :

```ts
export const actions = {
	inscription: async (event) => {},
	connexion: async (event) => {}
};
```

> Si vous définissez plus d'une action par page, vous ne pourrez plus utiliser `default` comme nom
> d'action. Il faudra la renommer.

> Faites bien attention à différencier les attributs `name` de chaque `<input>` pour éviter de les
> mélanger.

## `formaction`

Parfois, nous voudrions profiter des données d'un `<form>` donné pour faire une `action` différente,
sans créer un nouveau `<form>`. Pour cela, nous pouvons utiliser un `<button>` possédant un attribut
`formaction` ayant pour valeur le nom de l'action désirée :

```svelte
<form action="?/inscription" method="POST">
	<input name="email" />
	<input name="password" type="password" />
	<button>Inscription</button>
	<button formaction="?/connexion">Connexion</button>
</form>
```

Un même `<form>` peut donc envoyer ses données à des actions différentes !

> N'oubliez pas : la soumission d'un formulaire HTML entraîne par défaut le rechargement de la
> page. Avec SvelteKit, cela implique mécaniquement la ré-exécution des fonctions `load`
> correspondantes, et donc la mise à jour automatique des données fournies par ces fonctions `load`.

<fieldset class='task'>
<legend>À vous !</legend>

_Dans la page `/trainer`_

- Ajouter un formulaire de login, sur la même base que le formulaire d'inscription.

- Ajouter une action `login`, permettant de lire les données de l'utilisateur avec `db.trainer.get`
  de `$lib/server/db`. Pensez bien à renommer celle qui s'appelait jusque là `default`.

- Valider le formulaire, et renvoyer les informations du trainer. Vous pouvez utilisez l'utilitaire
  `db.trainer.checkPassword` de `$lib/server/db`.

_Dans la page `/team`_

- Ajouter un `<form>` pour chaque Pokémon de l'équipe permettant de renommer le Pokémon. Utiliser
  une action de formulaire `rename` pour sauvegarder cette information sur le serveur. Vous pouvez
  utiliser l'utilitaire `db.team.renameMember` de `$lib/server/db`.

On souhaite de plus pouvoir titulariser un Pokémon, afin qu'il puisse prendre part aux combats.

- Remplacer l'unique liste affichant les Pokémons de l'équipe en deux listes distinctes affichant
  les Pokémons titulaires (ceux ayant la propriété `main` à `true`) et les Pokémons remplaçants. Les
  deux listes doivent être identiques en fonctionnalités et apparence.

- Ajouter dans chaque `<form>` de Pokémon un nouveau `<button>` permettant d'envoyer les données de
  formulaire à une action `toggle` définie sur la même page et dont l'objectif est de titulariser ou
  non un membre de l'équipe. Vous pouvez utiliser l'utilitaire `db.team.toggleMember` du module
  `$lib/server/db`.

- Styliser différemment les `<button>` de toggle en fonction de si le Pokémon est titulaire ou non.

> Noter que sur cette page, nous utilisons plusieurs méthodes d'envoi de données au serveur :
> `action` (pour renommer), `formaction` (pour titulariser ou non), et un endpoint (pour libérer).
> Il serait tout à fait pertinent de tout faire via des `action` ou `formaction` uniquement.

</fieldset>

---

[Plus d'infos sur ce chapitre](https://svelte.dev/docs/kit/form-actions#named-actions)
