# C'est quoi Svelte(Kit) ?

## Rich Harris

Svelte (puis SvelteKit) sont les créations de [Rich Harris](https://x.com/Rich_Harris).

Rich Harris est un ancien journaliste, qui a notamment travaillé pour le Guardian et le New York Times. Puisqu'il était parmi les plus à l'aise avec "internet", il fut vite chargé d'aider à la création d'expériences interactives permettant d'afficher des toutes sortes d'informations graphiques. C'est comme ça qu'il est "tombé" dans le développement web.

Après avoir pratiqué les standards de l'époque (jQuery, Angular, React...), il se rend compte que tous sont notamment limités lorsqu'il s'agit d'orchestrer un très grand nombre d'éléments à l'écran en fonction de données qui changent régulièrement, ce qui est le cas lorsqu'on construit des visualisations de données.

Il décide alors de créer son propre framework de composant, Svelte.

> Il a également créé [Rollup](https://github.com/rollup/rollup) un bundler encore apprécié aujourd'hui.

Depuis 2021, il est employé par [Vercel](https://vercel.com/home) à plein temps sur le développement de Svelte et SvelteKit, avec 3 autres personnes.

## Svelte

[Svelte](https://svelte.dev/) est un framework de composants créé en 2016.

Il se démarque à l'époque (et encore aujourd'hui) par le fait que c'est avant tout un compilateur qui permet d'**écrire au moment de build les relations entre données et interface**.

> À l'époque, le standard était plutôt de se baser sur une boucle de rendu couplée à un Virtual DOM, le tout intégralement géré à runtime par le navigateur.

Svelte est sorti de l'anonymat en 2019, notamment [grâce à cette conférence](https://www.youtube.com/watch?v=AdNJ3fydeao), et a grandement gagné en popularité depuis. Il est régulièrement cité comme l'[un des frameworks les plus agréables à utiliser](https://2023.stateofjs.com/en-US/libraries/front-end-frameworks/).

Sa [version 5](https://svelte-5-preview.vercel.app/docs/introduction) (en Release Candidate à l'heure où sont écrites ces lignes), embrasse la philosophie de réactivité par signaux via l'introduction des [Runes](https://svelte.dev/blog/runes).

> Les signaux sont un concept de programmation remis sur le devant de la scène par [Ryan Carniato et son framework Solid](https://www.youtube.com/watch?v=Jp7QBjY5K34) permettant de faire de la réactivité de manière très efficace.

Nous allons uniquement étudier Svelte 5 dans cette formation.

> Si vous le souhaitez, vous pouvez utiliser la syntaxe Svelte 4 dans un projet Svelte 5, tant que vous ne mélangez pas les 2 syntaxes dans un même fichier.

## SvelteKit

[SvelteKit](https://kit.svelte.dev/) est le framework d'application officiel de Svelte.

Il s'est construit sur les cendres de [Sapper](https://sapper.svelte.dev/), qui n'est jamais sorti en version 1.0.

Ses caractéristiques principales sont :

- un routeur basé sur le système de fichiers
- des chargements de données par layout et page
- la possibilité d'appliquer des stratégies de rendu différentes (SSR, CSR, SSG...) selon les pages
