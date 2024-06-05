# Historique du développement web

# L'évangile selon St. Brendan

Au 10ème jour, [Dieu créa Javascript](https://fr.wikipedia.org/wiki/Brendan_Eich), pour pouvoir manipuler le [DOM](https://fr.wikipedia.org/wiki/Document_Object_Model) programmatiquement.

- JS vanille (1995)

Mais comme **c'était un peu le bordel**, des initiatives offrant des utilitaires plus pratiques sont apparues au fur et à mesure.

La populaire d'entre elles est jQuery.

- [jQuery](https://jquery.com/) (2006)

jQuery offre des outils utilitaires sur plein de fronts, dépassant même la simple manipulation du DOM, mais ne propose **pas de réelle réflexion sur comment architecturer** une application web.

C'est ce que vont proposer des projets tels que Angular, Backbone, ou Ember.

- [Angular 1](https://angularjs.org/) (2009)
- [Backbone](https://backbonejs.org/) (2010)
- [Ember 1](https://emberjs.com/) (2011)

En 2011 une proposition de standard émerge pour apporter la notion de **modèle de composants** au web, permettant de créer des balises HTML personnalisées et réutilisables. C'est ce qu'on appelle les Web Components.

- [Web components specification](https://fr.wikipedia.org/wiki/Composants_web) (2011)

Cette proposition a mis longtemps à être standardisée, et ne fait toujours pas l'unanimité. Mais elle a inspiré de nouvelles initiatives à proposer des librairies de modèle de composants.

Celle qui a émergé comme la nouvelle référence du développement web front-end est React.

- [React](https://reactjs.org/) (2013)

Depuis, plusieurs projets similaires sont apparus, comme Vue, ou ont évolués. Tous reprennent en partie des grands principes de React.

- [Vue](https://vuejs.org/) (2014)
- Ember 2 (2015)
- [Angular 2](https://angular.io/) (2016)

Quelques uns de ces projets commencent même à remettre en cause certains piliers de la philosophie React. Svelte est le plus connu d'entre eux.

- [Svelte](https://svelte.dev/) (2016)
- [Solid](https://www.solidjs.com/) (2019)
- [Qwik](https://qwik.dev) (2021)

Les composants sont pratiques pour construire des interfaces, mais ils ne proposent pas réellement d'outils pour résoudre les problématiques liées à la nature même d'une application web.

Alors, depui 2016 commencent à apparaître une nouvelle classe d'outils : les meta-frameworks (ou frameworks d'application), qui s'appuient sur des composants tout en proposant des utilitaires pour simplifier le développement d'applications web.

- [Next](https://nextjs.org/) (2016)
- [Nuxt](https://v2.nuxt.com/) (2016)
- [Sapper](https://sapper.svelte.dev/) (2017)
- [SvelteKit](https://kit.svelte.dev/) (2022)
