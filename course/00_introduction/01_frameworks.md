---
subtitle: Mais nom d'un schtroumpf c'est quoi un framework ?
description: Définitions succintes de framework de composants et de framework d'application
---

# WTF is a framework?

On peut catégoriser les frameworks JavaScript modernes en 2 grandes familles :

- les frameworks de composants
- les frameworks d'application

## Frameworks de composants

Svelte est un **framework de composants**.

> Hey Michel, c'est quoi un framework de composants ?

Un composant est une brique d'interface réplicable permettant d'afficher de la donnée de manière
consistente.

Un framework de composants orchestre la manière dont la donnée est distribuée au sein des
composants.

### Pourquoi a t'on besoin de composants ?

Au milieu des années 2000, le web était bien différent d'aujourd'hui, et l'importance des données
n'était pas encore évidente pour tout le monde.

Quelques entreprises ont été confrontées avant les autres aux problématiques liées à **l'affichage
massif de données dans une interface web**: Google (Angular) et Facebook (React).

La complexité des données à afficher ainsi que les besoins fréquents de maintenance liés au volume
d'utilisateurs mettent en valeur le fait que les pratiques de développement de l'époque ne sont pas
adaptées à ce nouveau contexte.

La problématique principale est **comment rendre une application réactive de manière claire et
efficace** ?

> La **réactivité** est le nerf de la guerre des frameworks de composants. Il s'agit d'être capable
> de réagir automatiquement aux changements de valeur des variables.

Plus concrètement, 3 grands problèmes émergent lorsqu'on cherche à rendre une application réactive :

- l'**architecture des éléments d'interface** est complexe à comprendre
- le **parcours des données** est complexe à orchestrer
- les **performances d'exécution** sont difficiles à maitriser

Plusieurs approches ont émergé pour tenter de répondre à ces problématiques, mais les frameworks
dits "de composants" sont devenus particulièrement populaires depuis le milieu des années 2010:
Angular, React, Vue. React, qui a popularisé massivement le concept de composants, est aujourd'hui
le framework de composants le plus populaire.

### Architecture par composants

**L'application est découpée en briques d'interface unitaires**, permettant de bien compartimenter
les rôles et les designs.

### Flux de données uni-directionnel descendant

Pour clarifier le parcours des données au sein de l'app, et éviter de perdre de vue qui a le
contrôle sur la donnée, on a généralisé (voir imposé) le principe de flux unidirectionnel descendant
: **les données vont (presque) toujours du parent vers les enfants**.

### Performances

La manipulation du DOM peut s'avérer coûteuse pour le navigateur. Il s'agit alors d **faire faire le
moins travail possible au navigateur**.

> Plusieurs approches existent : Virtual DOM, compilation, signaux...

### Quelques exemples

- [React](https://react.dev/)
- [Angular](https://angular.dev/)
- [Vue](https://vuejs.org/)
- [Svelte](https://svelte.dev/)
- [Solid](https://www.solidjs.com/)
- [Qwik](https://qwik.dev/)

## Frameworks d'application

Les frameworks de composants – ou meta-frameworks – sont pratiques pour créer des interfaces
interactives. Mais ils ne répondent pas réellement aux problématiques inhérentes au contexte
d'application web :

- comment associer les pages à des routes ?
- comment charger mes données efficacement ?
- comment avoir un bon référencement ?
- comment améliorer la fluidité de la navigation ?
- ...

Les frameworks d'application tentent de répondre à ces questions avec différentes approches, tout en
se basant le plus souvent sur un framework de composant.

Ainsi, parmi les fonctionalités les plus courantes des frameworks d'application, on retrouve :

- routing basé sur l'architecture de fichiers
- rendu côté serveur (SSR) pour le référencement
- rendu côté client (CSR) pour l'interactivité
- rendu des pages au build (SSG)
- chargement de données par layout, page ou composant
- contrôle de la quantité de JS nécessaire

> Il n'est pas vraiment pertinent de qualifier les frameworks d'application de "front-end", car une
> grande partie de leurs fonctionnalités se trouvent sur le serveur. Il est probablement plus juste
> de les qualifier de "full-stack".

### Quelques exemples

- [Next](https://nextjs.org/) (basé sur React)
- [Analog](https://analogjs.org/) (basé sur Angular)
- [Nuxt](https://v2.nuxt.com/) (basé sur Vue)
- [SvelteKit](https://kit.svelte.dev/) (basé sur Svelte)
- [SolidStart](https://start.solidjs.com/) (basé sur Solid)
- [Qwik City](https://qwik.dev/docs/qwikcity) (basé sur Qwik)
- [Astro](https://astro.build/) (basé sur React/Vue/Svelte/...)
- [Fresh](https://fresh.deno.dev/)

> Vous devriez commencer à être ressentir la [JavaScript
> fatigue](https://dev.to/nicozerpa/are-you-suffering-from-javascript-fatigue-f5e)... c'est normal
> :) ça va bien passer, personne ne vous demande de maîtriser tous ces outils, qui font peu ou prou
> tous la même chose.
