# Routing dynamique

Nous avançons dans notre aventure : nous sommes capables d'afficher les informations résumées des Pokémons sur une page. Mais nous souhaitons aller plus loin : afficher le détail d'un Pokémon sur sa page dédiée !

Nous avons tous les outils pour cela :

- nous savons créer une page
- nous savons charger la donnée d'une page
- nous savons afficher la donnée sur une page

Il ne nous reste plus qu'à créer une page pour chacun des... 151 (\o/) Pokémons de base !... Donc créer 151 fichiers. Cela risque de nous prendre un certain temps, d'autant que plus le temps passe, et plus [on découvre de nouveaux Pokémons](https://fr.wikipedia.org/wiki/Liste_des_Pok%C3%A9mon).

Il se trouve que toutes ces pages vont se ressembler, puisqu'on veut afficher un format de page similaire pour tous les Pokémons. Ce qui change entre ces pages, c'est la donnée représentant le Pokémon de la page. Et cette donnée peut être retrouvée grâce à l'identifiant (`id`) du Pokémon concerné. Le problème est que le routing que nous connaissons actuellement est _statique_ : chaque route est liée à une et une seule page.

Avec SvelteKit, il est possible de **créer des routes dynamiques**, permettant de créer une route représentant plusieurs pages similaires à l'aide de paramètres.

## Créer une route dynamique

Pour créer une route dynamique, il faut ajouter un fichier de page `+page.svelte` dans un dossier parent dont le nom est paramétrique. Par exemple :

```
my-project/
└ src/
  └ routes/
    └ departements/
      └ [departement]/
        └ +page.svelte
```

Ici `[departement]` est le nom du dossier de la route dynamique : les crochets signalent que la route a un paramètre dont le nom est `departement`. Ce paramètre peut avoir n'importe quelle valeur.

Dans ce cas les pages `/departements/33`, `/departements/67`, `/departements/13`, etc. vont toutes être représentées par le même fichier de route, mais avec une valeur de paramètre différente.

> Je pourrais aussi choisir d'avoir `/departements/gironde`, `/departements/alsace`, `/departements/finistere`.

Comme pour les routes statiques, il est possible de charger des données pour une route dynamique à l'aide d'un fichier `+page.server.ts` :

```
my-project/
└ src/
  └ routes/
    └ departements/
      └ [departement]/
        ├ +page.svelte
        └ +page.server.ts
```

Je peux récupérer la valeur du paramètre de route en récupérant le champ `params` de l'argument de la fonction `load` (par exemple en déstructurant). Puis faire des traitements à partir de ce paramètre, et renvoyer les données nécessaires à la construction de ma page :

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

## À vous !

<section class='task'>

- Créer la route dynamique `pokedex/[id]`

- Charger les données d'un Pokémon sur sa page à l'aide de la fonction `fetchPokemon` dans `$lib/pokemons.ts`

- Afficher sur sa page l'id, le nom et l'image (`sprites.front_default`) du Pokémon
</section>

[Plus de détails sur ce chapitre](https://kit.sveltefr.dev/docs/load#donn-es-de-page)
