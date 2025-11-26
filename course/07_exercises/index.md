---
description: Chapitre d'exercices supplémentaires autour de Svelte et SvelteKit
---

# Exercices

Améliorons un peu notre application. Pour le moment nous ne faisons pas de distinction entre les
Pokémons découverts et ceux que nous possédons réellement. Mais en réalité, nous pouvons très bien
attraper un Pokémon (donc le découvrir), puis le relâcher. Le Pokémon ne sera donc plus dans notre
équipe, mais on l'aura déjà rencontré.

Il est donc important de pouvoir distinguer les Pokémons que l'on a découvert lors de notre aventure
des Pokémons qui sont encore dans notre équipe.

<fieldset class='task'>
<legend>À vous !</legend>

_Dans le dossier `$lib/states`_

- créer un nouveau fichier `$lib/states/team.svelte.ts`.

- créer une nouvelle classe `Team`, sur le même modèle que `Pokedex`, instanciez-la et exportez
  cette instance en tant que `team`.

> Les éléments de `team` sont des objets de cette forme `type Member = { id: number, uuid: number
name: string}`. Le `uuid` représente l'identifiant unique de l'individu capturé (car on doit pouvoir
> identifier deux Pokémons différents de la même espèce).

_Dans la page d'accueil_

- lorsque vous capturez un Pokémon, pensez à mettre à jour `team` en même temps que `pokedex`.
  Donner au Pokémon que vous ajoutez à `team` un `uuid` égal à au timestamp actuel (utilisez
  `Date.now()`). Vous pouvez utilisez le `uuid` stringifié avec `toString()` pour le nom.

_Dans le header_

- le lien vers la page "Équipe" doit maintenant afficher le nombre d'éléments dans `team`, et non
  celui fourni par `data`.

_Dans la page `/team`_

- affichez les infos des Pokémons de `team`.

- faites en sorte de pouvoir libérer les Pokémons en cliquant sur un bouton affiché sous chaque
  membre de l'équipe. Vous devrez avoir une méthode `release` sur votre classe `Team` permettant de
  supprimer des éléments du tableau.

_Dans le composant `Wild`_

- prévoyez une nouvelle prop optionnelle `escape` représentant une fonction déterminant ce qu'il
  doit se passer lorsque le Pokémon s'enfuit.

- si un `Wild` possède une prop `escape` définie, mettez en place un `setTimeout` dont la durée est
  1000 (1 seconde) au montage du composant (avec `onMount`). Lorsque le délai est écoulé, exécuter
  `escape`. Ne pas oublier de nettoyer cet effet avec `clearTimeout`.

_Dans la page d'accueil_

- donnez une fonction `escape` aux Pokémons `Wild`, sauf aux 3 Pokémons de départ.

- faites disparaître les Pokémons `Wild` lorsqu'ils exécutent leur fonction `escape` (sauf pour les
  3 Pokémons `Wild` de départ, à qui on choisit de ne pas fournir de méthode `escape`)

</fieldset>
