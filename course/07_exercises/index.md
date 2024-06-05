---
description: Chapitre d'exercices supplémentaires autour de Svelte et SvelteKit
---

# Exercices

Améliorons un peu notre application. Pour le moment nous ne faisons pas de distinction entre les
Pokémons découverts et ceux que nous possédons réellement. Mais en réalité, nous pouvons très bien
attraper un Pokémon (donc le découvrir), puis le relâcher. Le Pokémon ne sera donc plus dans notre
équipe, mais on l'aura déjà rencontré.

<fieldset class='task'>
<legend>À vous !</legend>

Dans le fichier `$lib/stores/index.svelte.ts`

- créer un nouvel état global `team`, sur le même modèle que `pokedex`. Les éléments de `team` sont
  des objets de cette forme `{ id: number, uuid: number }`. Le `uuid` représente l'identifiant
  unique de l'individu capturé (car on doit pouvoir identifier deux Pokémons de la même espèce).

Dans la page d'accueil

- lorsque vous capturez un Pokémon, pensez à mettre à jour `team` en même temps que `pokedex`.
  Donner au Pokémon que vous ajoutez à `team` un `uuid` égal à au timestamp actuel (utilisez
  `Date.now`).

Dans le header

- le lien vers "Team" doit maintenant afficher le nombre d'éléments dans `team`, et non celui fourni
  par `data`.

Dans la page `/team`

- affichez les infos des Pokémons de `team`.

- faites en sorte de pouvoir libérer les Pokémons en cliquant sur un bouton affiché sous chaque
  membre de l'équipe. Vous devrez avoir une méthode `release` sur votre store `team` permettant de
  supprimer des éléments du tableau.

Dans le composant `Wild`

- prévoir une nouvelle prop optionnelle `escape` représentant une fonction déterminant ce qu'il doit
  se passer lorsque le Pokémon s'enfuit.

- si un `Wild` possède une prop `escape` définie, mettez en place un `setTimeout` dont la durée est
  1000 au montage du composant (avec `onMount`). Lorsque le délai est écoulé exécuter `escape`.
  N'oubliez pas de nettoyer cet effet.

Dans la page d'accueil

- donner une fonction `escape` aux Pokémons `Wild`, sauf aux 3 Pokémons de départ.

- faites disparaître le Pokémon `Wild` qui exécute sa fonction `escape`. Les 3 Pokémons de départ
  n'utiliseront jamais `escape`.

</fieldset>
