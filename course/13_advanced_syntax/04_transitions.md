---
scope: svelte
description: Utiliser les transitions Svelte pour animer les apparitions ou disparations d'éléments
---

# Transitions

Une des fonctionnalités de Svelte les plus appréciées est les transitions, car elles sont très
simples à mettre en place.

Une "transition" est une petite animation jouée lorsqu'un élément entre ou sort du HTML, et
uniquement dans l'un de ces deux cas-là.

> Si un élément se déplace d'un endroit vers l'autre, on parlera plutôt d'"animation", ou de
> "motion".

Par exemple, le cas suivant permet d'afficher ou de cacher un élément lorsqu'on clique sur le
`<button>` :

```svelte
<script>
	let displayed = $state(true);

	function toggle() {
		displayed = !displayed;
	}
</script>

{#if displayed}
	<p>Coucou</p>
{/if}

<button onclick={toggle}>On/Off</button>
```

Pour ajouter une transition, par exemple de type `fade`, il suffit de rajouter `transition:fade` en
"attribut" à l'élément concerné, en ayant auparavant importé `fade` depuis `svelte/transition` :

```svelte
<script>
	import { fade } from 'svelte/transition';

	let displayed = $state(true);

	function toggle() {
		displayed = !displayed;
	}
</script>

{#if displayed}
	<p transition:fade>Coucou</p>
{/if}

<button onclick={toggle}>On/Off</button>
```

> Notez que si vous interrompez la transition au milieu, l'élément inverse sa course depuis
> l'endroit où il était au moment où vous avez cliqué sur l'interrupteur, et non depuis l'une des
> extrémités de son parcours.

Il existe 7 transitions différentes prêtes à l'emploi : `fade`, `slide`, `blur`, `fly`, `scale`,
`draw` et `crossfade`. Elles ne fonctionnent pas toutes de la même façon, mais sont toutes
relativement simples à utiliser.

> Vous pouvez également créer vos propres transitions personnalisées, mais cela sort du cadre de ce
> cours.

## `in` et `out`

Utiliser `transition` signifie appliquer la même transition en entrée qu'en sortie. Mais vous pouvez
différencier la transition d'entrée et de sortie sur un même élément, en utilisant `in` et `out` à
la place :

```svelte
{#if displayed}
	<p in:fade out:slide>Coucou</p>
{/if}
```

## Paramètres de transition

Vous pouvez paramétrer vos transitions avec différentes valeurs, selon la transition que vous
choisissez.

Toutes ont a minima les paramètres `duration` (durée, en millisecondes), et `delay` (délai, en
millisecondes). D'autres comme `fly` ont également un `x` et `y` représentant le point de départ de
la transition.

Par défaut, `duration` vaut `400` et `delay` vaut `0`, mais vous pouvez les modifier de cette façon
:

```svelte
{#if displayed}
	<p transition:fade={{ duration: 1000, delay: 500 }}>Coucou</p>
{/if}

<button onclick={toggle}>On/Off</button>
```

> Vous pouvez paramètrer les transitions `in` et `out` de la même façon.

> Vous pouvez aussi jouer avec [la courbe de lissage de la
> transition](https://svelte.dev/docs/svelte-easing), appelée `ease`.

## Transitions globales

Les transitions sont par défaut locales, ce qui signifie qu'elles ne sont jouées qui si le bloc
`{#if}`, `{#each}`, ou autre le plus proche déclenche l'apparition ou la disparition de l'élément
concerné.

[Un exemple plus explicite est disponible
ici](https://learn.svelte.dev/tutorial/global-transitions).

Pour pouvoir tout de même utiliser les transitions dans ce genre de cas, vous devez déclarer la
transition comme étant globale en utilisant `|global`.

```svelte
<p transition:fade|global>Coucou</p>
```

## Contraintes

L'usage de `transition`, de `in` ou `out` est contraint par quelques règles :

- les transitions ne sont pas jouées lors du montage initial d'une page
- vous ne pouvez pas utiliser `transition`, `in` ou `out` directement sur un composant

<fieldset class='task'>
<legend>À vous !</legend>

- Utiliser des transitions de votre choix sur les Pokémons sauvages ainsi que sur les membres de
  l'équipe, ou les pastilles "nouveautés".

- Explorer les différentes transitions et leurs paramètres.

</fieldset>

---

[En savoir plus sur ce chapitre](https://svelte.dev/docs/svelte-transition)

Vous pouvez aussi apprendre comment créer vos transitions personnalisées en
[CSS](https://learn.svelte.dev/tutorial/custom-css-transitions) ou
[JS](https://learn.svelte.dev/tutorial/custom-js-transitions)
