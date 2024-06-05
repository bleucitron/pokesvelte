---
scope: svelte
---

# Flux de données

Comme nous l'avons mentionné dans [un des premiers chapitres](../00_introduction/01_frameworks.md),
le flux de données dans une application Svelte – comme pour la plupart des frameworks de composants
modernes – est un **flux unidirectionnel descendant**, en opposition aux flux bi-directionnels
(_two-way data binding_).

## Dans les deux sens

Historiquement, les premiers frameworks front-end utilisaient des flux de données bi-directionnels,
ou _two-way data binding_, ce qui permettait de faire circuler la donnée du parent vers l'enfant et
de l'enfant vers le parent.

<!-- TODO: schema -->

Bien que pratique, cette architecture de flux a apporté son lot de problématiques, rendant difficile
le suivi du parcours des données dans une application un peu complexe. On ne sait plus qui est
responsable d'une mise-à-jour, ce qui rend compliqué le debug.

## Sens unique vers le bas

En gros, ça veut dire que les données se déplacent dans une seule direction, vers le "bas".

Vers le "bas" signifie : **du parent vers l'enfant**. Les données ne peuvent pas remonter de
l'enfant vers le parent.

Cette convention a été massivement popularisée par [React et son architecture
Flux](https://legacy.reactjs.org/blog/2014/05/06/flux.html), en réponse aux problématiques liées
l'architecture _two-way data binding_.

Dans une application à flux unidirectionnel descendant, les données circulent donc vers le bas, et
les évènements circulent vers le haut, sans quoi il serait alors impossible pour les composants
parents de réagir aux évènements qui se produisent dans leurs enfants.

Ce principe de flux de données descendant et d'évènements montant crée un parcours circulaire
clarifiant les différentes responsabilités de chaque composant en termes d'évènements et de données.

<!-- TODO: schema -->

Dans certains frameworks comme React, ce principe de flux unidirectionnel descendant est immuable –
on ne peut s'y soustraire – et dans d'autres comme Svelte, c'est un principe appliqué par défaut,
mais il est possible de ponctuellement y déroger, comme nous allons le voir dans les prochains
chapitres.
