---
scope: kit
description: Utiliser l'amélioration progressive sur les formulaires dans une application SvelteKit
---

# Amélioration progressive

Nous l'avons déjà vu, mais surtout nous l'avons subi : par défaut, la soumission d'un formulaire
entraîne le rechargement la page par le navigateur.

C'est pratique car on peut envoyer des données au serveur sans avoir besoin de JavaScript, en
utilisant les fonctionnalités natives du navigateur ; mais c'est aussi pénible car notre page est
complètement détruite par le rechargement, ce qui implique au mieux un "flash", au pire une perte
des états de la page.

> Les états pouvant être perdus sont les états des composants Svelte, mais aussi les états internes
> des éléments HTML: positions de scroll, valeurs d'`<input>`, etc.).

SvelteKit utilisant par défaut un routing client, donc utilisant JavaScript, les pages ne sont pas
rechargées lors des navigations, [comme nous l'avons
vu](../01_sveltekit_basics/10_navigation_philosophy). Mais elles le seront donc lors de la
soumission de formulaires.

À moins de surcharger cette fonctionnalité.

L'"amélioration progressive" a pour objectif de fournir les informations et fonctionnalités
principales d'une page même dans les conditions les plus dégradées, et d'améliorer la page en
fonction des fonctionnalités disponibles. Typiquement, **une page HTML sans CSS ni JavaScript
devrait être capable de fournir toutes les informations et fonctionnalités essentielles**, même si
elle est moche et dure à utiliser.

Les formulaires sont un exemple d'amélioration progressive : les fonctionnalités de formulaire
devraient être disponibles sans JavaScript, l'expérience utilisateur dégradée mais pas impossible.
Mais si JavaScript est disponible, il est alors possible de les augmenter pour fournir une
expérience utilisateur moderne et plus agréable.

SvelteKit permet d'améliorer les formulaires en utilisant `use:enhance` en tant qu'attribut de
`<form>`, en ayant importé `enhance` du module `$app/forms` :

```svelte
<script>
	import { enhance } from '$app/forms';
</script>

<form method="POST" use:enhance></form>
```

Ainsi, SvelteKit va reproduire le comportement par défaut du navigateur, mais en faisant en sorte de
ne pas recharger la page. Et si JavaScript plante ou n'est pas disponible, votre formulaire pourra
assurer un service minimum.

> Il est possible de personnaliser le comportement de soumission des formulaires – notamment pour
> pimper l'interface au moment de la soumission — mais cela sort du cadre de cette formation.

<fieldset class='task'>
<legend>À vous !</legend>

_Dans les pages `/trainer` et `/teams`_

- Améliorer progressivement les formulaires.

</fieldset>

---

Plus d'infos sur ce chapitre :

- [Amélioration progressive](https://svelte.dev/docs/kit/form-actions#progressive-enhancement)
- [Personnaliser les soumissions de
  formulaire](https://svelte.dev/docs/kit/form-actions#progressive-enhancement-customising-use-enhance)
