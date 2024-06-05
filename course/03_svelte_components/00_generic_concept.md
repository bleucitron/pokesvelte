---
scope: svelte
subtitle: Vous voyez les Lego ? Bah c'est pareil
description: Description du concept de composant dans le cadre d'un framework front-end
---

# Concept générique de composant

Le concept est de **créer des "morceaux" d'interface personnalisables et réutilisables** que l'on va
organiser sous forme d'arbre, avec des parents et des enfants.

Ce sont ces "éléments" que l'on appelle "composants".

React n'a pas inventé le modèle d'architecture par composants, mais l'a très largement popularisé.

## Définition

En pratique, **un composant est une fonction, qui, à partir de données, crée des morceaux
d'interfaces**, que l'on appelle des instances de composant.

```
MonComposant: (data) => instance;
```

C'est un concept similaire aux classes de la Programmation Orientée Objet.

Une comparaison simple est l'être humain. On peut considérer que "Humain" est un composant à partir
duquel on va créer des instances d'Humains, des individus. Les individus possèdent les
caractéristiques communes aux Humains, mais ont des caractéristiques qui leur sont propres, comme le
nom, la taille, le poids...

Une fois défini, un composant va donc permettre de créer des instances de ce composant, qui
permettront de générer des éléments HTML équivalents.

En général, pour les différencier, on écrit:

- `MonComposant` pour le composant
- `<MonComposant>` pour une instance

Il est courant de désigner à l'oral une instance de composant par le terme "composant". Cet amalgame
n'est pas important si on a bien saisi la nuance.

## Arbre de composants

**Un modèle par composants est structuré en arbre**. Des composants parents ont des composants
enfants, et ainsi de suite.

Comme dans tout arbre, un parent peut avoir un ou plusieurs enfants, mais en revanche un enfant n'a
qu'un seul parent.

L'arbre de composants ainsi créé va correspondre à l'arbre HTML.

## Composants standards

Il est courant de comparer les composants aux Lego. Un composant serait alors un moule, tandis que
l'instance du composant serait la pièce fabriquée avec ce moule.

Avec cette image, chaque instance est une brique à partir de laquelle on construit des briques plus
complexes, jusqu'à obtenir un bateau pirate complet - notre application.

De même que pour les Lego, **Svelte fournit des composants standards, des "briques de base", à
partir desquels on va construire des composants plus complexes**.

Pour chaque élément HTML standard (`div`, `p`, `h1`, `section`, ...), Svelte fournit le composant
équivalent.

## Composants personnalisés

Tout l'intérêt du modèle par composants est de pouvoir combiner les briques pour créer de nouvelles
briques plus complexes.

C'est ce qu'on appelle les composants personnalisés.

**Un composant personnalisé peut être construit à partir de composants standards et/ou d'autres
composants personnalisés**.
