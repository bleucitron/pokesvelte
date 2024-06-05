---
scope: svelte
---

# Bindings de boucle

Parfois, votre formulaire contient plusieurs items, et plusieurs éléments `<input>` pour un même
item. C'est le cas de la todo-list suivante :

```svelte
<script>
	let items = $state([
		{ done: false, text: 'Peindre le studio' },
		{ done: false, text: 'Tondre la pelouse' },
		{ done: false, text: 'Dominer le monde' }
	]);
</script>

{#each items as item}
	<div>
		<input type="checkbox" bind:checked={item.done} />

		<input placeholder="Que reste t'il à faire ?" bind:value={item.text} disabled={item.done} />
	</div>
{/each}
```

Dans ce cas, vous pouvez utiliser `bind:` pour lier les valeurs des `<input>` aux champs des items
correspondants.

## À vous !

<section class='task'>

Dans la page `/team`

- En utilisant `$derived` et `.filter` sur la variable `team`, faites en sorte d'afficher les
  Pokémons titulaires de l'équipe (ceux avec `main`) en premier dans la liste, suivis des autres.

- Utiliser un binding de boucle pour modifier le champ `main` des Pokémons de l'équipe.

</section>

[Un exemple plus complet](https://svelte.dev/examples/each-block-bindings)
