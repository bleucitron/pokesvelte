---
scope: kit
description: Créer des layouts imbriqués dans une application SvelteKit
---

# Layouts imbriqués

On a vu qu'on pouvait créer un layout pour mutualiser les éléments d'interface – et les données –
qui sont communs à notre application.

> On rappelle que les données chargées par la fonction `load` du fichier `+layout.server.ts` sont
> accessibles dans toutes les pages des routes enfant dans la prop `data`.

Il est également possible de créer des sous-layouts, qui vont venir se cumuler aux éventuels layouts
précédents (se trouvant plus haut dans la hiérarchie de routes).

```
my-project/
└ src/
  └ routes/
    ├ +layout.svelte
    ├ a/
    │ ├ +layout.svelte
    │ ├ b/
    │ │ └ +page.svelte
    │ └ +page.svelte
    └ +page.svelte
```

Ici les pages `/a` et `/b` vont bénéficier des layouts `/+layout.svelte` et `/a/+layout.svelte`.

De même, si plusieurs fichiers `+layout.server.ts` concernent une route, toutes les fonctions `load`
correspondantes vont être exécutées à chaque fois que nécessaire pour charger les données de chaque
layout.

```
my-project/
└ src/
  └ routes/
    ├ +layout.server.ts
    ├ +layout.svelte
    ├ a/
    │ ├ +layout.server.ts
    │ ├ +layout.svelte
    │ ├ b/
    │ │ ├ +page.server.ts
    │ │ └ +page.svelte
    │ ├ +page.server.ts
    │ └ +page.svelte
    └ +page.svelte
```

Il est important de noter que si l'affichage d'une route nécessite le chargement de plusieurs `load`
de layout en plus de sa propre `load` de page, toutes ces fonctions sont exécutées en parallèle pour
optimiser les chargements.

> Pour rappel, les `load` de layout ne sont jouées qui si nécessaire, c'est-à-dire si on navigue
> vers une route concernée par un nouveau layout.

> Il est possible de synchroniser les chargements de `load`, mais cela ralentira le chargement de la
> page et est généralement déconseillé.

<fieldset class='task'>
<legend>À vous !</legend>

Nous allons créer une page affichant les Pokémons d'un certain type, sur le même modèle que la page
`/pokedex`.

- Créer une route `/pokedex/[type=pokemonType]` qui affiche uniquement les Pokémons du type associé.
  Vous devriez pouvoir vous servir du markup de la route `/pokedex` tel quel (voire même faire un
  composant pour mutualiser le markup).

- Créer la function de `match` dans `src/params/pokemonType.ts` permettant au routeur de ne pas
  confondre avec `[id=pokemonId]`.

Les données des ces deux pages peuvent être chargées par une fonction `load` commune.

### `load`

- Créer un fichier `/pokedex/+layout.server.ts` sur le modèle de `/pokedex/+page.server.ts`.

Dans la fonction `load` de `pokedex/+layout.server.ts`

- renvoyer les types de Pokémons `types`. `types` est un tableau contenant tous les types de Pokémon
  existant, que vous pouvez récupérer avec `fetchPokemonTypes` à importer de `$lib/pokemons`.

- extraire le `type` des paramètres de page `params` (à extraire des arguments de `load`).

- différencier le cas où `type` existe. S'il existe, renvoyer les `pokemons` filtrés pour ne garder
  que les Pokémons du type concerné. Vous pouvez vérifier le type d'un Pokémon avec
  `pokemon.types.find(t => t.type.name === type)`. Si `type` n'existe pas, renvoyer tous les
  Pokémons.

- rediriger vers une 404 si `type` existe mais n'est pas dans la liste `types`.

### Markup

- Créer un fichier de `/pokedex/+layout.svelte` en vous inspirant de `/+layout.svelte`

Dans le fichier `/pokedex/+layout.svelte`

- utiliser `types` de la prop `data` pour afficher les liens vers les différentes pages de
  type.

- donner une classe `current` au `<a>` s'il correspond à la page en cours, en vous servant de
  `$page.params.type`. Le lien `current` devrait pointer vers `/pokedex` pour pouvoir revenir à la
  page complète.

### Clean

- Supprimer le `/pokedex/+page.server.ts`, qui ne sert plus à rien.

</fieldset>

---

[Plus d'infos sur ce chapitre](https://kit.svelte.dev/docs/routing#layout-layout-svelte)

[Voir aussi comment attendre le chargement de layouts
parent](https://kit.svelte.dev/docs/load#using-parent-data)
