---
scope: svelte
subtitle: Au matin de ta vie sur la planète...
description: Description générale du cycle de vie d'un composant
---

# Le cycle de vie

Avant de parler des effets à proprement parler, intéressons-nous au concept de cycle de vie.

Le cycle de vie d'un composant décrit les étapes importantes auquel un composant Svelte est soumis
au cours de sa vie.

## Hydratation

L'hydratation est un processus qui permet la "vie" des composants.

Une fois le HTML arrivé sur le navigateur, l'interface n'est pas encore interactive. Pour cela, il
faut que le code Javascript de Svelte soit téléchargé, puis exécuté : l'hydratation se produit à ce
moment là.

Le processus d'hydratation va "remplacer" les éléments HTML par les instances de composants
correspondantes, et de créer toutes les liaisons réactives permettant de réagir aux éventuelles
interactions à venir.

Une fois l'hydratation terminée, l'application Svelte est fonctionnelle, et l'interface est
interactive.

> Le concept d'hydratation est commun à la plupart des frameworks de composants modernes.

> La "vie" d'un composant n'est possible que si Javascript est disponible côté client.
>
> En effet, le concept de "vie" d'un composant suppose qu'il y ait de l'interaction possible avec ce
> composant, et qui dit "interaction" dit "Javascript". Il n'y a donc pas d'hydratation sur une page
> sur laquelle on aurait désactivé Javascript.

## Montage

Quand un composant "arrive" dans le DOM, on dit qu'il est _monté_.

Cela se produit lors de l'hydratation initiale, mais également lorsqu'un nouveau composant est
introduit à la suite d'évènements, comme lors d'un ajout d'un produit dans un panier.

Les éléments de DOM correspondants sont créés, et ajoutés au DOM. Puis les liaisons réactives liant
ces éléments au moteur du framework sont créés, permettant ainsi l'interactivité. Enfin, les
opérations ayant été déclarées comme devant se produire au montage – `onMount` – sont exécutées. Le
montage du composant est alors terminé.

## Mises à jour

Le composant vit ensuite sa meilleure vie, au gré des mises à jour qui lui sont demandées, soit par
des évènements extérieurs – des props mises à jour lui seront fournies – soit via des évènements
internes – dans ce cas le composant va mettre son état à jour.

Dans tous les cas, grâce à la chaîne de réactivité se propageant depuis un évènement jusqu'au DOM,
les éléments le nécessitant sont mis à jour.

## Démontage

Quand un composant "sort" du DOM, on dit qu'il est _démonté_ ou détruit.

Cela se produit lorsqu'un élément d'interface n'est plus affiché, par exemple lorsque l'on filtre
des listes, ou lorsqu'une modale est fermée.

Dans ce cas, les liaisons réactives sont supprimées, les éléments du DOM corresdants au composant
sont supprimés. Puis, les opérations ayant été déclarées comme devant se produire au démontage –
`onDestroy` – sont exécutées. Le démontage du composant est alors terminé.

> Sans hydratation – donc si Javascript est désactivé par exemple – ni le montage, ni les mises à
> jour ni le démontage ne sont seront exécutés.
