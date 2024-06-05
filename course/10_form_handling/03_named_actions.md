---
scope: kit
---

# Actions nommées

Il est possible d'avoir plusieurs formulaires différents sur une même page, mais aussi différentes actions associées.

Pour cela il faut être capable de différencier les actions que chaque `<form>` cible. Jusque là, nous n'avions qu'un seul formulaire par page, et nous n'avons donc pas eu besoin de préciser quelle `action` celui-ci devait cibler : il cible l'action `default` par défaut.

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

> Si vous définissez plus d'une action par page, vous ne pourrez plus utiliser `default` comme nom d'action. Il faudra la renommer.

> Faites bien attention à différencier les attributs `name` de chaque `<form>` pour éviter de les mélanger.

## `formaction`

Parfois, nous voudrions profiter des données d'un `<form>` donné pour faire une `action` différente, sans créer un nouveau `<form>`. Pour cela, nous pouvons utiliser un `<button>` possédant un attribut `formaction` ayant pour valeur le nom de l'action désirée :

```svelte
<form action="?/inscription" method="POST">
	<input name="email" />
	<input name="password" type="password" />
	<button>Inscription</button>
	<button formaction="?/connexion">Connexion</button>
</form>
```

Un même `<form>` peut donc envoyer ses données à des actions différentes !

## À vous !

<section class='task'>

Dans la page `/trainer`

- Ajouter un formulaire de login permettant de lire les données de l'utilisateur avec `db.trainer.get` de `$lib/server/db`.

- Ajouter une action `login`, en pensant bien à renommer celle qui s'appelait jusque là `default`.

- Valider le formulaire, et renvoyer les informations du trainer.

Dans la page `/team`

- Ajouter un `<form>` pour chaque Pokémon de l'équipe permettant de renommer le Pokémon. Vous pouvez utiliser l'utilitaire `db.team.renameMember` de `$lib/server/db`.

Sur cette page, nous pouvons titulariser un Pokémon, mais cette information n'est pas envoyée au serveur. Corrigeons cela en utilisant une nouvelle action de formulaire :

- Supprimer le HTML `<label>` et `<input type="checkbox" />` de chaque Pokémon.

- Ajouter dans chaque `<form>` de Pokémon un nouveau `<button>` permettant d'envoyer les mêmes données de formulaire à une action `toggle` définie sur la même page. Vous pouvez utiliser l'utilitaire `db.team.toggleMember` du module `$lib/server/db`.

- Styliser différemment les `<button>` de toggle en fonction de si le Pokémon est titulaire ou non.

> Noter que sur cette page, nous utilisons plusieurs méthodes d'envoi de données au serveur : `action` (pour renommer), `formaction` (pour titulariser ou non), et un endpoint (pour libérer). Il serait tout à fait pertinent de tout faire via des `action` ou `formaction` uniquement.

</section>

[Plus d'infos sur ce chapitre](https://kit.svelte.dev/docs/form-actions#named-actions)
