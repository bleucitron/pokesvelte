---
scope: kit
---

# Amélioration progressive

Nous l'avons déjà vu, mais surtout nous l'avons subi : par défaut, la soumission d'un formulaire entraîne le rechargement la page par le navigateur.

C'est pratique car on peut envoyer des données au serveur sans avoir besoin de JavaScript, en utilisant les fonctionnalités natives du navigateur, mais c'est aussi pénible car notre page est complètement détruite par le rechargement, ce qui implique au mieux un "flash", au pire une perte des états de la page.

> Les états pouvant être perdus sont les états des composants Svelte, mais aussi les états internes des éléments HTML: positions de scroll, valeurs d'`<input>`, etc.).

SvelteKit utilisant par défaut un routing client, donc utilisant JavaScript, les pages ne sont pas rechargées lors des navigations, [comme nous l'avons vu](../01_sveltekit_basics/09_navigation_philosophy.md). Mais elles le seront donc lors de la soumission de formulaires.

À moins de surcharger cette fonctionnalité.

L'"amélioration progressive" a pour objectif de faire marcher les fonctionnalités de formulaire quoi qu'il arrive, mais de les augmenter avec JavaScript si disponible pour profiter des technologies web modernes.

SvelteKit permet d'améliorer les formulaire en utilisant `use:enhance` en tant qu'attribut de `<form>`, en ayant importé `enhance` du module `"$app/forms"` :

```svelte
<script>
	import { enhance } from '$app/forms';
</script>

<form method="POST" use:enhance></form>
```

Ainsi, SvelteKit va reproduire le comportement par défaut du navigateur, mais en faisant en sorte de ne pas recharger la page. Et si JavaScript plante ou n'est pas disponible, votre formulaire pourra assurer un service minimum.

> Il est possible de personnaliser le comportement de soumission des formulaires – notamment pour pimper l'interface au moment de la soumission – mais cela sort du cadre de cette formation.

## À vous !

<section class='task'>

Dans les pages `/trainer` et `/teams`

- Améliorer progressivement les formulaires.
</section>

Plus d'infos sur ce chapitre :

- [Amélioration progressive](https://kit.svelte.dev/docs/form-actions#progressive-enhancement)
- [Personnaliser les soumissions de formulaire](https://kit.svelte.dev/docs/form-actions#progressive-enhancement-customising-use-enhance)
