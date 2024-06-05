# Validation de paramètres de routes

Supposons une route dynamique telle que `/name/[name]`.

Nous avons vu [précédemment](../01_sveltekit_basics/08_dynamic_routing.md) que cette route sera utilisée pour des URLs telles que `/name/romain` ou `/name/justine`.

De plus, dans les fichiers de routes (`+page.server.ts`, `+page.svelte`, `+server.ts`, etc.), nous avons accès au paramètre de route `name` dont la valeur vaut `'romain'`, `'justine'`, ou bien une autre valeur correspondante.

Ça c'est dans le cas où tout se passe bien.

Mais cette route `/name/[name]` va aussi être utilisée si j'essaie d'accéder à `/name/1` ou `/name/ererwtwtwe`. En réalité, une route dynamique n'a par défaut pas de critère défini pour décider si le paramètre est valide. **Par défaut, tout paramètre dynamique est valide**.

## Matching

SvelteKit propose une méthode pour restreindre les paramètres dynamiques possibles à certaines valeurs que vous pouvez définir.

Pour cela, vous devez définir une fonction `match` dans un fichier se situant dans le dossier `src/params/`.

Par exemple, si je veux m'assurer que le paramètre fourni est un prénom, je peux créer le fichier `src/params/prenom.ts` ...

```ts
export function match(param: string) {
	return ['romain', 'justine', 'sarah', 'yusuke', 'ahmed'].includes(param);
}
```

... et renommer le dossier de la route `/name/[name]` en `/name/[name=prenom]`.

Toutes les routes ne satisfaisant pas la condition retournée par la fonction `match` correspondante seront retournées en erreur 404 (page non trouvée), et ne passeront pas du tout par nos fichiers de routes.

> Dans cet exemple, la liste de prénoms est bien sûr restreinte, il faudrait une liste plus complète pour être réaliste.

## À vous !

<section class='task'>

Nous renvoyons actuellement une 404 spécifique si l'`id` du Pokémon n'est pas trouvé dans notre base. Mais on peut tout de même mettre n'importe quel `id`, comme `'xyz'`, qui est une string, et non un nombre. Dans notre cas, ce n'est pas très grave, mais vérifions tout de même qu'il s'agit d'un nombre positif. Si le paramètre `id` est valide, il peut tout de même ne correspondre à aucun Pokémon. Nous continuerons de vérifier que le Pokémon existe au sein de la function `load`, comme nous l'avons fait [au chapitre précédent](./02_errors.md).

- Créer une vérification de paramètre pour vérifier que le paramètre `id` de la route `/pokedex/[id]` est un nombre strictement plus grand que 0.

</section>

[Plus d'infos sur ce chapitre](https://kit.svelte.dev/docs/advanced-routing#matching)
