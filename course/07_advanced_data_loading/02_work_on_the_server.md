# Travailler sur le serveur

SvelteKit nous permet donc de travailler sur le serveur. Mais cela peut se révéler dangereux.

## Fichiers de serveur

Le code qui s'exécute sur le serveur est souvent du code sensible. Il permet notamment de lire les fichiers se trouvant sur votre serveur, et donc d'accéder à votre base de données, ainsi que **vos différents tokens d'accès, qui ne doivent jamais être accessibles sur le client**.

SvelteKit vous aide à protéger ces informations, en vous permettant de créer des fichiers qui ne pourront pas être importés dans du code devant être exécuté sur le client.

Ces fichiers protégés sont :

- tous les fichiers se trouvant dans le dossier `$lib/server/`
- tous les les fichiers se terminant par `.server.ts`

## Stores et serveur

Nous sommes capables de créer des stores (des états globaux) grâce à la rune `$state`. Ceci est pratique car cela permet de partager de l'état au travers d'une application. Mais cela peut s'avérer problématique.

En effet, mettre à jour la valeur d'un store sur le serveur va rendre cette valeur accessible potentiellement par tous les clients se connectant au serveur. Or les fichiers `.svelte` de page étant construits sur le serveur avant d'être envoyés au client (c'est ce qu'on appelle le SSR), il est très facile de créer un store accessible sur le serveur sans s'en rendre compte.

De manière générale, **les stores devraient se cantonner à des données uniquement mises à jour sur le client**, et n'ayant pas d'incidence sur le serveur.

> Vous pouvez bien sûr tout à fait utiliser des stores sur le serveur, mais en sachant ce que vous faites.

## À vous !

<section class='task'>

- Déplacer les fichiers `$lib/team.ts`, `$lib/pokemons.ts`, `$lib/seen.ts`, `$lib/cookies.ts` et `$lib/io.ts` dans le dossier `$lib/server`
- Ajuster les paths des imports concernés.
- Essayer d'importer un des fichiers dans un fichier `+page.svelte`

Dans le layout

- Charger les données `teamSize` et `found` en tant que données de layout dans `+layout.server.ts` en utilisant l'utilitaire `readTeam` de `$lib/server/team` et `readSeen` de `$lib/server/seen`.
- Utiliser les données de layout à la place des données de store pour afficher les nombre de Pokémon dans le header

Dans la page `/team`

- Faire de même pour charger et afficher les données de `team` sur cette page

Dans la page `/pokedex`

- Faire de même pour charger et utiliser les données de `seen` sur cette page

Dans la page d'accueil

- Modifier le code pour que `started` ne dépende plus du store `pokedex` mais bien de `teamSize`, venant des données de layout.

À ce stade, vous ne devriez plus avoir de besoin du code du fichier `$lib/stores/index.svelte.ts`.

- Supprimer le dossier `$lib/stores/` et son contenu.
</section>

> Vous devriez constater que, malgré le fait que vos endpoints fonctionnent, l'interface ne se met plus correctement à jour, notamment les informations du layout. C'est tout à fait normal, nous règlerons ça dans le prochain chapitre.

[Plus de détails sur ce chapitre](https://kit.svelte.dev/docs/routing#server)
