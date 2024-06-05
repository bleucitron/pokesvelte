# Exercices II

Nos herbes hautes sont un peu trop prévisibles : les Pokémons n'apparaissent que 1 par 1 et ont
toujours la même durée d'apparition ... Changeons cela, et faisons en sorte d'avoir plusieurs
Pokémons potentiellement à l'écran au même instant, chacun ayant sa propre durée d'apparition.

De plus, notre page d'accueil commence à être un peu complexe. Créons un composant `Grass` dont le
rôle est d'afficher des Pokémons à intervalles réguliers.

> Attention, il est possible qu'il y ait du code à refactoriser.

## À vous !

<section class='task'>

- Créer un nouveau composant `Grass` qui va récupérer de la page d'accueil la logique et le markup
  lié à l'affichage des Pokémons lorsque le jeu est lancé. `Grass` doit être avoir comme props
  `pokemons` et `catchPokemon`, et comme état `wildId`.

- Utiliser `<Grass />` sur la page d'accueil.

Dans `Grass`

- Remplacer l'état `wildId` par un état `wilds` qui est un tableau de `{id: number, appeared:
number, name: string, sprite: string}`. La valeur `appeared` correspond au moment précis de son
  apparition (utilisez `Date.now()`).

- Lorsqu'un Pokémon apparaît, ajouter ce Pokémon dans le tableau `wilds`.

- Lorsqu'un Pokémon s'échappe, supprimer ce Pokémon du tableau `wilds` avec `.filter()`, en vous
  servant de `appeared` pour identifier l'individu.

- Lorsque vous attrapez un Pokémon, pensez aussi à le faire disparaître de l'écran.

- Ajustez les valeurs d'intervalle d'apparition et de disparition de Pokémons sauvages pour éviter
  que les Pokémons ne s'accumulent trop. Vous pouvez utiliser `getRandomNumber()` de `$lib/utils` pour
  donner des durées de vie différentes à chaque Pokémon.

Dans les pages `/team` et `/pokedex`,

- Faites en sorte de supprimer les pastilles "nouveauté" au survol des éléments concernés.

</section>
