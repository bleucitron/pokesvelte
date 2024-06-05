---
scope: svelte
description: Présentation de quelques liaisons possibles avec Svelte
---

# Autres bindings

Svelte propose plein d'autres bindings dans diverses situations, permettant notamment d'accéder à
des informations sur les "vrais" éléments du DOM.

## Images

Vous pouvez obtenir des informations sur les dimensions d'une image après son chargement :

```svelte
<img bind:naturalWidth bind:naturalHeight />
```

> Il faut bien sûr prévoir des états `naturalWidth` et `naturalHeight` dans votre `<script>`.

## Medias

Vous pouvez obtenir des informations sur l'état interne des éléments HTML `<audio>` ou `<video>` .
Certaines de ces informations sont modifiables, d'autres non.

```svelte
<video <!-- ou audio -->
	src={clip}
	<!-- non modifiables -->
	bind:duration
	bind:played
	bind:ended
	<!-- modifiables -->
	bind:currentTime
	bind:paused
	bind:volume
	bind:muted
/>
```

> Pensez à définir les états correspondants aux bindings que vous souhaitez utiliser.

> Il existe d'autres informations accessibles, non présentées ici pour ne pas alourdir.

## Éléments de type "block"

Il est également possible d'obtenir des informations sur les dimensions de tout élément DOM dont le
`display` est `"block"`.

```svelte
<div bind:clientWidth bind:clientHeight bind:offsetWidth={width} bind:offsetHeight={height}>
	Contenu
</div>
```

> Ici nous avons choisi arbitrairement d'utiliser `width` et `height` comme noms de variables pour
> `offsetWidth` et `offsetHeight`.

## `<svelte:window>`

Svelte met à disposition un composant spécial, `<svelte:window>`, que vous pouvez utiliser pour
récupérer des informations sur l'élément DOM `window`, notamment ses dimensions.

```svelte
<svelte:window bind:innerWidth bind:innerHeight bind:scrollX bind:scrollY />
```

> De manière générale, toutes les informations concernant les dimensions des éléments, quels qu'ils
> soient, ne sont pleinement disponibles qu'après le montage de l'instance concernée. Il est souvent
> utile d'utiliser `onMount` dans ce cas là.

Accessoirement, vous pouvez aussi écouter certains évènements de `window` en utilisant ce composant
spécial.

```svelte
<svelte:window onvisibilitychange={doSomething} />
```

> Il existe d'autres composants spéciaux comme `<svelte:document>` ou `<svelte:body>`, qui
> fonctionnent un peu différemment.

<fieldset class='task'>
<legend>À vous !</legend>

- Dans le composant `Wild`, afficher au moment du montage du composant les informations concernant
  la hauteur et largeur de la fenêtre, en utilisant `console.log()`. N'oubliez pas de déclarer les
  états associés en amont.

</fieldset>

Plus de détails sur ce chapitre :

- [Images](https://svelte.dev/docs/element-directives#image-element-bindings) et
  [media](https://svelte.dev/docs/element-directives#media-element-bindings)
- [Éléments de type block](https://svelte.dev/docs/element-directives#block-level-element-bindings)
- [`<svelte:window>`](https://svelte.dev/docs/special-elements#svelte-window)
