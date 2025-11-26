---
scope: svelte
subtitle: Attribuer des classes n'a jamais été aussi simple
description: Attribution de classes CSS dans un composant Svelte
---

# Le pouvoir des classes

Avec ce qu'on a vu jusque là, vous devriez déjà être capables de définir des classes sur un élément
:

```svelte
<script>
	const active = true;
</script>

<div class={active ? 'active' : ''}>...</div>
```

Bien que plutôt pratique, cette syntaxe – classique dans tous les frameworks – a quelques
désavantages, notamment lorsque les conditions d'attribution des classes sont multiples et
complexes.

Pour simplifier ces situations, Svelte propose d'utiliser des objets pour attribuer plus facilement
nos classes :

```svelte
<div class={{ bleu: true, rouge: false, vert: true }}>...</div>
```

Tous les champs "truthy" de l'objet fourni sont alors appliqués en tant que classe à l'élément
concerné.

Vous pouvez bien sûr utiliser des variables :

```svelte
<script>
	const bleu = true;
	const rouge = false;
	const vert = true;
</script>

<div class={{ bleu, rouge, vert }}>...</div>
```

Svelte propose également possible d'utiliser des tableaux pour définir des classes. Seules les
valeurs "truthy" seront appliquées :

```svelte
<div class={[bleu && 'bleu', rouge && 'rouge', vert && 'vert']}>...</div>
```

Enfin, vous pouvez mélanger objets et tableaux, cela fonctionnera également :

```svelte
<div class={['ma-classe', { active }]}>...</div>
```

Le choix d'utiliser une forme ou une autre dépend de votre usage et des préférences de chacun•e.

> Tout cela vous rappelle peut-être [clsx](https://www.npmjs.com/package/clsx), c'est normal, c'est
> que Svelte utilise sous le capot pour gérer l'attribution des classes.

> Il est également possible d'utiliser une ["directive" de
> classe](https://svelte.dev/docs/svelte/class#The-class:-directive), mais cela n'est plus
> recommandé.

<fieldset class='task'>
<legend>À vous</legend>

- Simplifier l'écriture des classes `current` appliquées sur les liens du menu de navigation

- Dans le Pokédex, appliquer une classe `found` aux Pokémons dont l'`id` est pair. Cette classe
  représente les Pokémons que l'on découvert

- Styliser différemment les Pokémons trouvés de ceux encore inconnus

Si vous le souhaitez, vous pouvez utiliser ce style pour les `<li>` de la page `pokedex/` :

```css
li img {
	filter: contrast(0%) brightness(200%);
}
li:hover img {
	filter: contrast(0%) brightness(200%) drop-shadow(0px 0px 10px #333);
}
li.found img {
	filter: none;
}
li.found:hover img {
	filter: drop-shadow(0px 0px 10px #333);
}
```

- Faites la même chose pour la page `pokedex/[id]`, en rajoutant une classe `found` au composant
  `Pokemon`

Vous pouvez utiliser ce style pour le composant `Pokemon` :

```css
.Pokemon {
	display: flex;
	flex-flow: column;
	align-items: center;
	width: 15rem;
	margin: auto;
}
p {
	margin: 0;
	font-size: 1.5rem;
	text-transform: capitalize;
}
img {
	height: 15rem;
	object-fit: cover;
	filter: contrast(0%) brightness(200%);
}
.found img {
	filter: none;
}
```

</fieldset>

---

[Plus de détails sur ce chapitre](https://svelte.dev/docs/svelte/class)
