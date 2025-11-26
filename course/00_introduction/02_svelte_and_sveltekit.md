---
subtitle: '"Web development for the rest of us"'
description: Introduction à Svelte et SvelteKit
---

# C'est quoi Svelte(Kit) ?

## Rich Harris

Svelte (puis SvelteKit) sont les créations de [Rich Harris](https://x.com/Rich_Harris).

Rich Harris est un ancien journaliste, qui a notamment travaillé pour le Guardian et le New York
Times. Puisqu'il était parmi les plus à l'aise avec "internet", il fut vite chargé d'aider à la
création d'expériences interactives permettant d'afficher toutes sortes d'informations graphiques.
C'est comme ça qu'il est "tombé" dans le développement web.

En pratiquant régulièrement les standards de l'époque (jQuery, Angular, React...), il se rend compte
assez vite de leurs limitations, notamment lorsqu'il s'agit d'orchestrer un très grand nombre
d'éléments à l'écran en fonction de données qui changent régulièrement, ce qui est souvent le cas
lorsqu'on construit des visualisations de données.

Il décide alors de créer son propre framework de composants, d'abord avec
[RactiveJS](https://github.com/ractivejs/ractive), une première tentative faisant office de
brouillon, puis avec celui qui nous intéresse ici, Svelte.

> Il a également créé [Rollup](https://github.com/rollup/rollup) un bundler encore apprécié
> aujourd'hui et notamment utilisé par [Vite](https://vite.dev/).

Depuis 2021, il est employé par [Vercel](https://vercel.com/home) à plein temps sur le développement
de Svelte et SvelteKit, avec 2 autres personnes.

> Même s'ils sont principalement sortis de l'esprit de Rich Harris, Svelte et SvelteKit ont tous les
> deux été portés à leurs débuts par une petite équipe de contributeurs passionnés. Merci à eux !

## Svelte

[Svelte](https://svelte.dev/) est un framework de composants créé en 2016.

Il se démarque à l'époque (et encore aujourd'hui) par le fait que c'est avant tout un compilateur,
ce qui permet de faire une bonne partie du travail en avance de phase, à la compilation.

> À l'époque, le standard imposé de facto par React consistait à re-exécuter en permanence tout le
> code d'un composant lorsque l'une seule de ses données d'entrée changeait, puis à utiliser un
> [Virtual DOM](https://youtu.be/AdNJ3fydeao?si=Tu7FbDHORTy13U5z&t=248) pour essayer d'optimiser le
> travail du navigateur en ce qui concerne le HTML. Tout cela étant assumé par le navigateur au
> moment de la consommation de la page. C'est encore comme ça que fonctionne React aujourd'hui,
> majoritairement.

Svelte est sorti de l'anonymat en 2019, notamment [grâce à cette
conférence](https://www.youtube.com/watch?v=AdNJ3fydeao) – déjà mentionnée juste au-dessus –, et a
grandement gagné en popularité depuis. Il est régulièrement cité comme l'[un des frameworks les plus
agréables à utiliser](https://2023.stateofjs.com/en-US/libraries/front-end-frameworks/).

Sa version la plus récente, Svelte 5.0, embrasse la philosophie de réactivité par signaux via
l'introduction des [Runes](https://svelte.dev/blog/runes), ce qui introduit une syntaxe radicalement
différente des versions 3 et 4.

> Les signaux sont un concept de programmation remis sur le devant de la scène par [Ryan Carniato et
> son framework Solid](https://www.youtube.com/watch?v=Jp7QBjY5K34) permettant de faire de la
> réactivité de manière très efficace.

**Nous allons uniquement étudier Svelte 5 dans cette formation**.

> Si vous le souhaitez, vous pouvez utiliser la syntaxe Svelte 4 dans un projet Svelte 5, tant que
> vous ne mélangez pas les 2 syntaxes dans un même fichier. Cette pratique n'est toutefois pas
> recommandée, et ne devrait être utilisée temporairement que lors de migrations de Svelte 4 vers
> Svelte 5.

## SvelteKit

[SvelteKit](https://svelte.dev/docs/kit/) est le framework d'application officiel de Svelte.

Sorti en 2021, il s'est construit sur les cendres de [Sapper](https://sapper.svelte.dev/), qui n'est
jamais sorti en version 1.0.

Ses caractéristiques principales sont :

- un routeur basé sur le système de fichiers
- des chargements de données par layout et page
- la possibilité d'appliquer des stratégies de rendu différentes (SSR, CSR, SSG...) selon les pages

> SvelteKit a récemment introduit une nouvelle manière de charger ses données : les [fonctions
> distantes](https://svelte.dev/docs/kit/remote-functions). Ces outils sont néanmoins encore
> expérimentaux, et ne seront pas traités dans cette formation.
