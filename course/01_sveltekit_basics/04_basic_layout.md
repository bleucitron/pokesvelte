---
scope: kit
subtitle: Mutualiser, c'est bien
description: Partager un layout commun entre plusieurs pages dans une application SvelteKit
---

# Layouts basiques

Notre application possède maintenant 4 pages (4 fichiers `+page.svelte` répartis dans différents
dossiers du dossier `routes`), mais nous ne pouvons pas naviguer de l'une à l'autre facilement.

Pour permettre cela, nous pouvons ajouter un élément `<nav>` contenant des liens vers les
différentes pages de notre application. Ce menu de navigation sera très certainement le même pour
toutes les pages, et il serait fastidieux de l'ajouter manuellement à chaque page.

SvelteKit résout ce problème avec un système de "layouts" basé sur des fichiers `+layout.svelte`.

> Nous avons déjà vu les fichiers spéciaux `+page.svelte`. De manière générale, tous les fichiers se
> trouvant dans le dossier `routes` et commençant par `+` ont un sens pour SvelteKit.

Un fichier `+layout.svelte` est un fichier spécial de SvelteKit permettant de réutiliser un même
markup pour toutes les pages concernées.

```
my-project/
└ src/
  └ routes/
    ├ +layout.svelte
    ├ articles/
    │ └ +page.svelte
    ├ profil/
    │ └ +page.svelte
    └ +page.svelte
```

> Ici, les routes `/articles` et `/profil` vont bénéficier du layout fourni par le fichier
> `+layout.svelte`.

## Construction du layout

Pour cela, il faut utiliser la `prop` spéciale `children`, représentant le contenu des pages, de la
manière suivante :

```svelte
<!-- +layout.svelte -->
<script lang="ts">
	const { children } = $props(); // nous verrons plus tard ce que $props signifie
</script>

<!-- nous verrons plus tard ce que @render signifie -->
{@render children()}
```

Ce layout permet d'afficher correctement le contenu de toutes nos pages, mais rien de plus. Nous
pouvons ajouter du contenu commun à toutes nos pages en rajoutant des éléments HTML avant, après, ou
autour de notre `@render`.

Par exemple :

```svelte
<!-- +layout.svelte -->
<script lang="ts">
	const { children } = $props(); // encore un peu de patience
</script>

<header>Mon header</header>

<main>
	<!-- encore un peu de patience -->
	{@render children()}
</main>

<footer>Mon footer</footer>
```

> Nous verrons plus tard qu'il est possible de créer des layouts différents pour des contextes
> différents.

<fieldset class='task'>
<legend>À vous !</legend>

- Créer un `header` permettant de naviguer entre nos différentes pages, ainsi qu'un `footer`
  contenant les crédits de notre application

- Utiliser ces nouveaux éléments sur toutes nos pages.

</fieldset>

---

[Plus de détails sur ce chapitre](https://kit.sveltefr.dev/docs/routing#layout)
