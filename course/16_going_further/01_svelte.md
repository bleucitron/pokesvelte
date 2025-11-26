---
scope: svelte
description: Des recommandations de sujets à creuser pour approfondir ses connaissances en Svelte
---

# Aller plus loin avec Svelte

Nous n'avons fait qu'effleurer la surface du possible avec Svelte.

Si vous souhaitez aller plus loin, voici une liste non exhaustive de sujets Svelte avancés qui
pourraient vous intéresser.

> Ces sujets sont listés sans ordre particulier.

## Styles globaux

On a vu que le style des composants est [scopé par
défaut](../03_svelte_components/01_syntax_basics).

Néanmoins il est possible de [rendre vos sélecteurs
globaux](https://svelte.dev/docs/svelte/global-styles).

## Motion

`svelte/motion` est une fonctionnalité de Svelte qui peut beaucoup simplifier l'animation
d'éléments. Elle contient des utilitaires pour faire évoluer des variables dans le temps selon
certains paramètres.

Voir [la documentation officielle](https://svelte.dev/docs/svelte/svelte-motion) et [les
exemples](https://svelte.dev/tutorial/svelte/tweens).

## `bind:this`

Dans certains cas très particuliers, il est nécessaire d'avoir un accès direct aux éléments du DOM.
Svelte le permet grâce à la directive [`bind:this`](https://svelte.dev/docs/svelte/bind#bind:this)

Il est également possible d'obtenir des références aux instances de composants [de la même
façon](https://svelte.dev/docs/svelte/bind#bind:property-for-components).

## `$bindable`

On a vu que l'on pouvait ["lier"](../09_bindings_and_co/01_form_elements) l'état interne d'un
élément du DOM avec un état Svelte.

Il est également possible de faire cela avec n'importe quelle props de composant, en la déclarant
comme [`$bindable`](https://svelte.dev/docs/svelte/$bindable). À utiliser avec
précaution.

## `#key`

Il y a un [bloc logique](../03_svelte_components/02_logic_blocks) n'avons pas étudié :
[`#key`](https://svelte.dev/docs/svelte/key). Il permet de forcer la re-création d'une
instance de composant.

## Contexte

Pour partager des données en "sautant" des étages – c'est-à-dire sans les passer en tant que props
sur plusieurs niveaux – on peut utiliser le [contexte](https://svelte.dev/docs/svelte/context).

## Attachements

Svelte possède une fonctionnalité appelée
[_attachments_](https://svelte.dev/docs/svelte/@attach) permettant d'appliquer des
comportements automatisés sur des éléments HTML.

## Composants spéciaux

Svelte possède un certain nombre de composants spéciaux :

- [`svelte:window`](https://svelte.dev/docs/svelte/svelte-window)
- [`svelte:document`](https://svelte.dev/docs/svelte/svelte-document)
- [`svelte:body`](https://svelte.dev/docs/svelte/svelte-body)
- [`svelte:head`](https://svelte.dev/docs/svelte/svelte-head)
- [`svelte:element`](https://svelte.dev/docs/svelte/svelte-element)
