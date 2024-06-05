# S'échapper des layouts

Vous l'avez peut-être remarqué ou intuité, mais le fait d'avoir ajouté un niveau intermédiaire de layout a créé un problème : notre nouveau layout et sa fonction `load` concernent également la routes `/pokedex/[id=pokemonId]`, alors que cela ne nous arrange pas...

En effet, la fonction `load` charge un grand nombre de données (les Pokémons, les types) dont cette page n'a pas besoin, et de même, on affiche tous les types alors que sur cette page cela n'a pas vraiment de sens.

On pourrait sortir cette page du dossier `pokedex/` pour s'échapper de ce layout, mais on perdrait une certaine cohérence de nommage.

## Cibler un layout

Prenez l'architecture suivante :

```
src/routes/
├ a/
│ ├ b/
│ │ ├ c/
│ │ │ ├ d/
│ │ │ │ └ +page.svelte
│ │ │ └ +layout.svelte
│ │ └ +layout.svelte
│ └ +layout.svelte
└ +layout.svelte
```

Dans cette situation, la route `/a/b/c/d` hérite par défaut des 4 layouts `a`, `b`, `c` et racine (que l'on appellera `root`).

Il est possible de cibler un layout particulier, en renommant le fichier `+page.svelte` du dossier `a/b/c/d/` en `+page@b.svelte` par exemple. Alors, cette page s'appuiera sur le layout `b` (et sur ses éventuels parents, ici `a` et `root`), mais "esquivera" le layout `c`.

De même, on pourrait imaginer renommer le fichier en `+page@a.svelte`, ce qui lui ferait esquiver les layouts `b` et `c`.

Enfin, pour cibler le layout `root`, il faut renommer le fichier en `+page@.svelte`, et la page n'héritera que du layout racine, en esquivant tous les autres.

> Il est impossible d'esquiver le layout racine.

Le fait d'"esquiver" des layouts permet de ne plus hériter du markup ni de la fonction `load` des layouts esquivés.

Cette technique peut s'utiliser aussi sur des fichiers `+layout.svelte`, exactement de la même façon.

## À vous !

<section class='task'>

- Faites en sorte que la page `/pokedex/[id=pokemonId]/+page.svelte` ne dépende plus du layout `pokedex`.

</section>

[Plus d'infos sur ce chapitre](https://kit.svelte.dev/docs/advanced-routing#advanced-layouts-page)
