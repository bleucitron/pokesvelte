---
scope: svelte
subtitle: Le laisser-passer A-38 !
description: Travailler avec des éléments de formulaire en Svelte
---

# Éléments de formulaire

De manière générale donc, le flux de données dans une application Svelte – et plus largement dans
une application architecturée par composants – est descendant : du parent vers l'enfant.

Cette règle, qu'il faut considérer comme primordiale, peut amener dans certains cas de la
complexité non nécessaire. Et dans ces cas-là, il vaut mieux la contourner.

C'est le cas des éléments de formulaire.

## Inputs et flux descendant

Si on applique à la lettre la règle du flux de données descendant, la gestion de la valeur d'un
`<input>` se fait de la manière suivante :

```svelte
<script>
	let text = $state('');

	function updateText(e) {
		text = e.target.value;
	}
</script>

<input value={text} oninput={updateText} />
```

Le flux dans ce cas est bien descendant : on fournit `text` en tant que prop `value` à `<input />`,
qui nous remonte l'évènement `input` lorsqu'il se produit. On met alors notre `text` à jour à l'aide
de l'état interne de l'élément HTML (`e.target.value`).

## Bindings d'inputs

L'exemple ci-dessus fonctionnement parfaitement, et on pourrait tout à fait se satisfaire de cette
écriture, un peu verbeuse mais acceptable.

Mais souvent, vous avez plusieurs inputs sur une même page, et cette écriture peut vite se révéler
fastidieuse.

Pour éviter cela, Svelte propose une syntaxe permettant de faire "remonter" le flux de données : les
bindings.

```svelte
<script>
	let text = $state('');
</script>

<input bind:value={text} />
```

Dans ce cas, plus besoin d'écouter l'évènement `input` : le `bind:value={text}` garantit que lorsque
l'élément HTML `<input>` change de valeur interne, on met à jour la variable `text`. Autrement dit,
on fait "remonter" la valeur `value` de l'`<input>` dans son parent. Le flux de données est donc
bien bi-directionnel.

On dit que la variable `value` est **liée** à l'état interne de l'`<input>`.

Il existe une syntaxe raccourcie lorsque vous choisissez de nommer votre état de la même façon que
la props utilisée sur l'élément – dans ce cas `value` :

```svelte
<script>
	let value = $state('');
</script>

<input bind:value />
```

## Radio et Checkbox

Les `<input>` de type radio ou checkbox sont un exemple intéressant d'usage des inputs avec Svelte.

Dans les 2 cas, l'attribut `value` ne correspond pas à l'état de l'`<input>`, mais plutôt son
attribut `checked`, qui indique si oui ou non l'`<input>` est coché. L'attribut `value` représente
alors plutôt la valeur représentée par l'`<input>`.

Svelte propose la direction `bind:group` pour gérer ces cas.

Pour les `<input type="radio" />`, `bind:group` permet de s'assurer de n'avoir qu'une seule valeur
choisie, les radio qui fonctionnent ensemble étant mutuellement exclusifs.

```svelte
<script>
	let color = 'blue';
</script>

<!-- Ces inputs radio sont mutuellement exclusifs -->
<input type="radio" bind:group={color} value="blue" />
<input type="radio" bind:group={color} value="red" />
<input type="radio" bind:group={color} value="green" />
```

Pour les `<input type="checkbox" />`, `bind:group` permet de remplir un tableau contenant toutes les
valeurs cochées.

```svelte
<script>
	let games = [];
</script>

<!-- Ces inputs checkbox remplissent un même tableau -->
<input type="checkbox" bind:group={games} value="A link to the past" />
<input type="checkbox" bind:group={games} value="Link's awakening" />
<input type="checkbox" bind:group={games} value="Ocarina of time" />
<input type="checkbox" bind:group={games} value="Breath of the wild" />
```

Vous pouvez aussi utiliser `bind:checked` sur un `<input type="checkbox">` notamment lorsque vous
souhaitez représenter une valeur booléenne (comme "actif" ou non). Dans ce cas `bind:group` n'a pas
beaucoup de sens.

```svelte
<script>
	let active = true;
</script>

<input type="checkbox" bind:checked={active} />
```

> Il existe plein d'autres types d'éléments de formulaire avec parfois leurs spécificités. Le
> fonctionnement avec Svelte peut être un peu différent parfois, mais reste globalement le même.

<fieldset class='task'>
<legend>À vous !</legend>

Dans la page `/pokedex`

- Ajouter un élément `<input>`.

- Lier cet `<input>` à un état `search`, dont la valeur initiale est `''`.

- Afficher la valeur `search` dans un `<p>` pour vérifier que tout fonctionne bien lorsque vous
  tapez dans l'`<input>`

- Supprimer le `<p>`

- Créer un état dérivé qui contient un tableau de Pokémons dont le nom inclut la valeur `search`.
  Utiliser `pokemons.filter()`.

- Si `search` est non vide, afficher les Pokémons filtrés plutôt que tous les Pokémons.

</fieldset>

---

Plus de détails sur ce chapitre :

- [La directive `bind:`](https://svelte.dev/docs/element-directives#bind-property)
- [`<select>`](https://svelte.dev/docs/element-directives#binding-select-value)
- [`bind:group`](https://svelte.dev/docs/element-directives#bind-group)
