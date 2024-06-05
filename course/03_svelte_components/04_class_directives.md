---
scope: svelte
subtitle: Attribuer des classes n'a jamais été aussi simple
description: Utilisation de la directive de classe dans un composant Svelte
---

# Directives de classe

Les directives d'éléments sont des attributs spéciaux que vous pouvez utiliser sur vos éléments
HTML, et permettant certaines fonctionnalités de Svelte.

```svelte
<!-- Ici la directive de type "type" et de nom "nom" est appliquée à l'élément div avec la valeur
"valeur" -->
<div type:nom={valeur} />
```

La directive de classe est très utile pour définir facilement des classes sur nos éléments.

```svelte
<script>
	const isActive = true;
</script>

<!-- Ce qu'on écrit souvent -->
<div class={isActive ? 'active' : ''}>...</div>
<!-- Èquivalent utilisant la directive de classe -->
<div class:active={isActive}>...</div>
```

Si le nom de la classe est le même que celui de la variable, vous avez accès à un raccourci :

```svelte
<div class:active>...</div>
<!-- Le nom de classe est le même que celui de la variable -->
```

Vous pouvez tout à fait appliquer plusieurs classes sur un même élément de cette manière.

```svelte
<div class:active class:inactive={!active} class:isAdmin>...</div>
```

> Il existe d'autres directives utiles, on les verra plus tard.

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

[Plus de détails sur ce chapitre](https://svelte.dev/docs/element-directives#class-name)
