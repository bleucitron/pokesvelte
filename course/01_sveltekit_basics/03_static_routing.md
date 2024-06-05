# Routing statique

SvelteKit utilise un système de routing basé sur l'arborescence de fichiers de votre dossier `src/routes/`. Cela signifie que la hiérarchie des pages de votre application reflète l'arborescence de votre dossier `src/routes/`, si vous suivez ces quelques règles:

- une page est représentée par un fichier `+page.svelte`
- le nom du dossier parent au fichier `+page.svelte` correspond au nom de la route de la page

Ainsi, pour créer une page `/bonjour` dans un projet SvelteKit, il suffit de créer un dossier `src/routes/bonjour`, puis un fichier `+page.svelte` dans ce même dossier.

```
my-project/
└ src/
  └ routes/
    └ bonjour/
      └ +page.svelte
```

Vous pouvez bien sûr créer des pages sur plusieurs niveaux de profondeurs, chaque niveau de dossier représentant un niveau de profondeur de page.

Ainsi, si vous souhaitez créer la route `/a/b/c`, vous devez créer la structure suivante :

```
my-project/
└ src/
  └ routes/
    └ a/
      └ b/
        └ c/
          └ +page.svelte
```

> Nous verrons plus tard d'autres fonctionnalités liées au routing de SvelteKit.

Nous n'avons pas encore vu ce qu'est un fichier `.svelte`, mais vous pouvez considérer pour le moment que c'est un fichier HTML, et donc y écrire du markup comme vous avez l'habitude de faire.

## À vous !

<section class='task'>
Créer les pages

- `/pokedex` (la page d'encyclopédie des Pokémons)

- `/team` (la page listant les Pokémons que vous possédez)

- `/faq` (la page Foire à questions)
</section>

[Plus de détails sur ce chapitre](https://kit.sveltefr.dev/docs/routing)
