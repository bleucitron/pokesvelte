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

## Stores et serveur

Nous sommes capables de créer des stores (des états globaux) grâce à la rune `$state`. Ceci est
pratique car cela permet de partager de l'état au travers d'une application. Mais cela peut s'avérer
problématique.

En effet, mettre à jour la valeur d'un store sur le serveur va rendre cette valeur accessible
potentiellement par tous les clients se connectant au serveur. Or les fichiers `.svelte` de page
étant construits sur le serveur avant d'être envoyés au client (c'est ce qu'on appelle le SSR), il
est très facile de créer un store accessible sur le serveur sans s'en rendre compte.

De manière générale, **les stores devraient se cantonner à des données non sensibles et uniquement
mises à jour sur le client**, n'ayant pas d'incidence sur le serveur.

Nous détaillerons [plus tard](../14_auth/02_stores_on_the_server.md) pourquoi les stores sur le
serveur peuvent être problématiques.

> Vous pouvez bien sûr tout à fait utiliser des stores sur le serveur, mais en sachant ce que vous
> faites.

<fieldset class='task'>
<legend>À vous !</legend>

- Déplacer le dossier `$lib/db` dans le dossier `$lib/server`
- Ajuster les paths des imports concernés.
- Essayer d'importer `$lib/server/db` dans un fichier `+page.svelte`, constater que c'est impossible

Dans le layout

- Charger les données `teamSize` et `found` en tant que données de layout dans
  `+layout.server.ts` en utilisant les utilitaires `db.team.get()` et `db.seen.get()` de
  `$lib/server/db`.

- Utiliser les données de layout à la place des données de store pour afficher le nombre de
  Pokémon dans le header

Dans la page `/team`

- Faire de même pour charger et afficher les données de `team` sur cette page

Dans la page `/pokedex`

- Faire de même pour charger et utiliser les données de `seen` sur cette page

Dans la page d'accueil

- Modifier le code pour que `started` ne dépende plus du store `pokedex` mais bien de
  `teamSize`, venant des données de layout.

> Vous devriez constater que, malgré le fait que vos endpoints fonctionnent, l'interface ne
> se met plus correctement à jour, notamment les informations du layout. C'est tout à fait
> normal, nous règlerons ça dans le prochain chapitre.

À ce stade, le code du fichier `$lib/stores/index.svelte.ts` ne devrait plus être utilisé. Nous
allons nous en servir pour tenir à jour une liste des nouvelles espèces découvertes et nouveaux
Pokémons attrapés lors de la session en cours.

> Ces données n'ont pas besoin d'être stockées sur le serveur, ce qui nous permet d'utiliser
> uniquement le concept de store pour les manipuler.

- Renommer le store `pokedex` en `recentSpecies`.
- Renommer le store `team` en `recentMembers` et modifier son code pour qu'il représente des
  `uuid`s de Pokémons et non des `TeamMember`.
- Faites en sorte de différencier les nouvelles espèces sur la page `/pokedex` et les
  nouveaux membres d'équipe sur la page `/team`.
- Ajouter également un marqueur sur les liens vers `/pokedex` et `/team` du header lorsque
  les stores `recentSpecies` et `recentMembers` ne sont pas vides.

</fieldset>

---

[Plus de détails sur ce chapitre](https://kit.svelte.dev/docs/routing#server)
