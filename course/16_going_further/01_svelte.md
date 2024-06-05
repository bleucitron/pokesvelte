# Aller plus loin avec Svelte

Nous n'avons qu'effleuré la surface du possible avec Svelte.

Si vous souhaitez aller plus loin, voici une liste non exhaustive de sujets Svelte avancés qui
pourraient vous intéresser.

> Ces sujets sont listés dans le désordre.

## Styles globaux

On a vu que le style des composants est [scopé par
défaut](../03_svelte_components/01_syntax_basics.md).

Néanmoins il est possible de [rendre vos sélecteurs
globaux](https://svelte.dev/docs/svelte-components#style).

Quelques infos sur le sujet dans [cette annexe](../XX_global_styles.md).

## Motion

Une fonctionnalité de Svelte qui peut beaucoup simplifier l'animation d'éléments est
`svelte/motion`, qui contient des utilitaires pour faire évoluer des variables dans le temps selon
certains paramètres.

Voir [la documentation officielle](https://svelte.dev/docs/svelte-motion) et [les
exemples](https://learn.svelte.dev/tutorial/tweens).

## `bind:this`

Dans certains cas très particuliers, il est nécessaire d'avoir un accès direct aux éléments du DOM.
Svelte le permet grâce à la directive [`bind:this`](https://svelte.dev/docs/component-directives)

Il est également possible d'obtenir des références aux instances de composants [de la même
façon](https://svelte.dev/docs/component-directives#bind-this).

## `$bindable`

On a vu que l'on pouvait ["lier"](../09_bindings_and_co/01_form_elements.md) l'état interne d'un
élément du DOM avec un état Svelte.

Il est également possible de faire cela avec n'importe quelle props de composant, en la déclarant
comme [`$bindable`](https://svelte-5-preview.vercel.app/docs/runes#$bindable). À utiliser avec
précaution.

## `#key`

Il y a un [bloc logique](../03_svelte_components/02_logic_blocks.md) n'avons pas étudié :
[`#key`](https://svelte.dev/docs/logic-blocks#key). Il permet de forcer la recréation d'une instance
de composant.

## Contexte

Pour partager des données en "sautant" des étapes – c'est-à-dire sans les passer en tant que props
sur plusieurs niveaux – on peut utiliser le
[contexte](https://learn.svelte.dev/tutorial/context-api).

## Actions

Svelte possède une fonctionnalité appelée [_actions_](https://learn.svelte.dev/tutorial/actions)
permettant d'appliquer des comportements automatisés sur des éléments HTML.

> À ne pas confondre avec les actiosn de SvelteKit, qui concernent les formulaires.

## Composants spéciaux

Svelte possède un certain nombre de [composants spéciaux](https://svelte.dev/docs/special-elements)
utiles.

> Les `<slot>` sont l'équivalent des `{#snippet}` mais pour Svelte 4.
