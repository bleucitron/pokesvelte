---
scope: svelte
subtitle: Il serait grand temps de rendre nos apps accessibles
description: Comment Svelte nous aide à améliorer l'accessibilité de nos applications web
---

# Warnings d'accessibilité

Vous avez peut-être des warnings d'affichés au niveau d'une `<img />` ou d'un `onclick`.

C'est le compilateur de Svelte qui vous aide à améliorer l'accessibilité de votre composant.

De manière générale, c'est une bonne chose de ne pas ignorer ces warnings et d'essayer de les
corriger. Cela permet à votre application d'être plus accessible pour les personnes utilisant des
logiciels d'assistance.

<fieldset class='task'>!
<legend>À vous !</legend>

Vous avez peut-être oublié un attribut `alt` sur une `<img />`. Cet attribut sert à donner une
description à l'image. S'il vous en manque, ajoutez-les.

Vous avez peut-être utilisé `onclick` sur un élément n'étant pas supposé interactif. Pour corriger
ça, vous pouvez :

- soit utiliser un élément interactif comme `<button>`
- soit déclarer votre élément comme interactif en ajoutant les attributs `role="button"
tabindex="0"`

</fieldset>

---

[Plus de détails sur ce chapitre](https://svelte.dev/docs/accessibility-warnings)
