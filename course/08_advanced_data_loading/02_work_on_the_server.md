---
scope: kit
subtitle: Rejoins le côté serveur de la force
description: Quelques conseils lorsqu'on travaille sur le serveur d'un projet SvelteKit
---

# Travailler sur le serveur

SvelteKit nous permet donc de travailler sur le serveur. Mais cela peut se révéler dangereux.

## Fichiers de serveur

Le code qui s'exécute sur le serveur est souvent du code sensible. Il permet notamment de lire les
fichiers se trouvant sur votre serveur, et donc d'accéder à votre base de données, ainsi que **vos
différents tokens ou clés d'accès, qui ne doivent jamais être accessibles sur le client**.

SvelteKit vous aide à protéger ces informations, en vous permettant de créer des fichiers qui ne
pourront pas être importés dans du code devant être exécuté sur le client.

Ces fichiers protégés sont :

- tous les fichiers se trouvant dans le dossier `$lib/server/`
- tous les fichiers se terminant par `.server.ts`

## States globaux et serveur

Nous sommes capables de créer des états globaux grâce à la rune `$state`. Ceci est
pratique car cela permet de partager de l'état au travers d'une application. Mais cela peut s'avérer
problématique.

En effet, mettre à jour la valeur d'un état global sur le serveur va rendre cette valeur accessible
potentiellement par tous les clients se connectant au serveur. Or les fichiers `.svelte` de page
étant construits sur le serveur avant d'être envoyés au client (c'est ce qu'on appelle le SSR), il
est très facile de créer un état global accessible sur le serveur sans s'en rendre compte.

De manière générale, **les états globaux devraient se cantonner à des données non sensibles et
uniquement mises à jour sur le client**, n'ayant pas d'incidence sur le serveur.

Nous détaillerons [plus tard](../14_auth/02_global_states_on_the_server) pourquoi les états
globaux sur le serveur peuvent être problématiques.

> Vous pouvez bien sûr tout à fait utiliser des état globaux sur le serveur, mais en sachant ce que
> vous faites.

<fieldset class='task'>
<legend>À vous !</legend>

- Déplacer le dossier `$lib/db` dans le dossier `$lib/server`
- Ajuster les paths des imports concernés (notamment l'import de `pokemons.json` du fichier
  `team.ts`)
- Essayer d'importer `$lib/server/db` dans un fichier `+page.svelte`, constater que c'est impossible

_Dans le layout_

- Charger les données `teamSize` et `found` en tant que données de layout dans
  `+layout.server.ts` en utilisant les utilitaires `db.team.get()` et `db.seen.get()` de
  `$lib/server/db`.

- Utiliser les données de layout à la place des données des états globaux `pokedex` et `team` pour
  afficher le nombre de Pokémons découverts et la taille de l'équipe dans le header

_Dans la page `/team`_

- Faire de même pour charger et afficher les données `team` venant du serveur sur cette page

_Dans les pages `/pokedex` et `/pokedex/[id]`_

- Faire de même pour charger et utiliser les données `seen` venant du serveur sur ces pages

_Dans la page d'accueil_

- Modifier le code pour que `started` ne dépende plus de l'état global `pokedex` mais bien de
  `teamSize`, venant des données de layout.

> Vous devriez constater que, malgré le fait que vos endpoints fonctionnent, l'interface ne se met
> plus correctement à jour, notamment les informations du layout. Il est nécessaire de recharger la
> page pour voir les données de header se mettre à jour. C'est tout à fait normal, nous règlerons ça
> dans le prochain chapitre.

### Bonus

À ce stade, les différents fichiers du dossier `$lib/states` ne devraient plus être utilisés. Nous
allons nous les remodeler pour tenir à jour une liste des nouvelles espèces découvertes et nouveaux
Pokémons attrapés lors de la session en cours.

> Ces données n'ont pas besoin d'être manipulées sur le serveur, ce qui nous permet d'utiliser des
> états globaux sans risque.

- Fusionner les états globaux `pokedex` et `team` en une instance `recent`, possédant 2 `$state` :
  `members` qui représente une liste de `uuid` des membres récemment ajoutés à notre équipe, et
  `found` qui représente les `id` des espèces récemment découvertes.

- Mettre à jour `recent` lorsqu'un nouveau Pokémon est attrapé, en utilisant les données renvoyées
  par le endpoint.

- Faire en sorte de différencier les nouvelles espèces sur les pages `/pokedex` et les nouveaux
  membres d'équipe sur la page `/team`.

- Ajouter également un marqueur sur les liens vers `/pokedex` et `/team` du header lorsque les états
  globaux `recent.species` et `recent.members` ne sont pas vides.

</fieldset>

---

[Plus de détails sur ce chapitre](https://svelte.dev/docs/kit/routing#server)
