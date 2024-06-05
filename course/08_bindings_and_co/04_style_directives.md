# Directives de style

On a vu [ici](../03_svelte_components/04_class_directives.md) que l'on pouvait utiliser `class:truc={uneVariable}` pour donner des classes à des composants.

Il est également possible de la même manière d'impacter le style des éléments, en utilisant la directive de style `style:type={valeur}` (ou la version raccourcie `style:type`).

```svelte
<!-- comme d'habitude, vous pouvez utiliser des variables, ou simplement fournir du texte -->
<p style:color="blue" style:font-size={fontSize} style:padding>Coucou</p>
```

Vous avez accès à toutes les déclarations CSS que vous connaissez, et la plupart du temps, il vous faudra fournir des valeurs sous forme de texte.

> Définir du style ainsi revient à "inliner" le style sur les éléments HTML. Cette technique est généralement considérée comme une mauvaise pratique si utilisée à tout va. Il est plutôt recommandé d'utiliser des classes pour styliser votre HTML. Néanmoins, certaines situations imposent d'inliner du style, notamment lorsque le nombre de valeurs possibles est trop grand pour définir des classes à l'avance.

## À vous !

<section class='task'>

Dans notre application, le fait d'attraper des Pokémons sauvages est un peu trop facile, car ils apparaissent toujours au même endroit. Voyons comment rendre ça plus intéressant.

Dans le composant `Wild`, uniquement si l'individu possède une prop `escape` (pour les différencier des Pokémons de départ),

- définir deux nouveaux états `top` et `left`, qui seront des `number`.

- au montage, utiliser les largeur et hauteur de `window` pour définir les valeurs de `top` et `left` : `top` doit être entre 0 et `height` – `left` doit être entre 0 et `width`. Vous pouvez utiliser l'utilitaire `getRandomNumber` de `$lib/helpers`.

- utiliser ces deux états `top` et `left` pour positionner l'instance de Wild au hasard sur la page. Vous aurez probablement besoin d'utiliser `position: fixed` dans le `<style>`. Vous pouvez éventuellement utiliser une marge pour éviter que certains ne sortent de l'écran.
</section>

[Plus d'infos sur ce chapitre](https://svelte.dev/docs/element-directives#style-property)
