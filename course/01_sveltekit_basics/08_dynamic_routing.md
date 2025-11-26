---
scope: kit
subtitle: Un même modèle de page peut afficher des données différentes
description: Créer des routes dynamiques dans une application SvelteKit
---

# Routing dynamique

Nous avançons dans notre aventure : nous sommes capables d'afficher les informations résumées des
Pokémons sur une page. Mais nous souhaitons aller plus loin : afficher le détail d'un Pokémon sur sa
page dédiée !

Nous avons tous les outils pour cela :

- nous savons créer une page
- nous savons charger les données d'une page
- nous savons afficher les données sur une page

Il ne nous reste plus qu'à créer une page pour chacun des... 151 (\o/) Pokémons de base !... Donc
créer 151 fichiers. Cela risque de nous prendre un certain temps, d'autant que plus le temps passe,
et plus [on découvre de nouveaux Pokémons](https://fr.wikipedia.org/wiki/Liste_des_Pok%C3%A9mon).

Il se trouve que toutes ces pages vont se ressembler, puisqu'on veut afficher un format de page
similaire pour tous les Pokémons. La seule chose qui change entre ces pages, c'est la donnée
représentant le Pokémon de la page. Et cette donnée peut être retrouvée grâce à l'identifiant (`id`)
du Pokémon concerné. Le problème est que le routing que nous connaissons actuellement est _statique_
: chaque route est liée à une et une seule page.

Avec SvelteKit, il est possible de **créer des routes dynamiques**, permettant de créer une seule
route représentant plusieurs pages similaires à l'aide de paramètres.

## Créer une route dynamique

Pour créer une route dynamique, il faut ajouter un fichier de page `+page.svelte` dans un dossier
parent dont le nom est paramétrique. Par exemple :

```
my-project/
└ src/
  └ routes/
    └ departements/
      └ [departement]/
        └ +page.svelte
```

Ici `[departement]` est le nom du dossier de la route dynamique : les crochets signalent que la
route a un paramètre dont le nom est `departement`. Ce paramètre peut avoir n'importe quelle valeur.

Dans ce cas les pages `/departements/33`, `/departements/67`, `/departements/13`, etc. vont toutes
être représentées par le même fichier de route, mais avec une valeur de paramètre différente.

> Je pourrais aussi choisir d'avoir `/departements/gironde`, `/departements/alsace`,
> `/departements/finistere`.

Comme pour les routes statiques, il est possible de charger des données pour une route dynamique à
l'aide d'un fichier `+page.server.ts` :

```
my-project/
└ src/
  └ routes/
    └ departements/
      └ [departement]/
        ├ +page.svelte
        └ +page.server.ts
```

Je peux récupérer la valeur du paramètre de route en récupérant le champ `params` de l'argument de
la fonction `load` (par exemple en déstructurant). Puis faire des traitements à partir de ce
paramètre, et renvoyer les données nécessaires à la construction de ma page :

```ts
export async function load({ params }) {
	// notez que j'ai déstructuré juste au-dessus
	const id = params.id;

	return {
		id,
		name: await getName(id) // par exemple
	};
}
```

Il ne reste plus qu'à construire le markup de la page, comme nous l'avons déjà fait plusieurs fois.

<fieldset class='task'>
<legend>À vous !</legend>

- Créer la route dynamique `pokedex/[id]`

_Dans la page `pokedex/[id]`_

- Charger les données d'un Pokémon dans une fonction `load` à l'aide de la fonction `fetchPokemon`
  dans `$lib/pokemons.ts`

- Afficher l'id, le nom et l'image (`sprites.front_default`) du Pokémon

_Dans la page `pokedex`_

- Ajouter des liens vers la page de détail de chacun des 3 Pokemons affichés

### Bonus

Un léger bug est apparu : lorsque nous sommes sur une page `/pokedex/[id]`, plus aucun lien n'est
actif dans le header, alors que nous sommes techniquement dans une sous-page de `/pokedex`.

_Dans le layout_

- Ajuster la condition permettant de donner la classe `current` au lien vers `/pokedex`, afin de
  prendre aussi en compte les pages `/pokedex/[id]`.

> Vous aurez probablement des erreurs dans votre éditeur mentionnant l'absence de `resolve`. Nous
> règlerons ça dans [le chapitre suivant](./09_resolving_routes).

</fieldset>

---

[Plus de détails sur ce chapitre](https://svelte.dev/docs/kit/load#page-data)
