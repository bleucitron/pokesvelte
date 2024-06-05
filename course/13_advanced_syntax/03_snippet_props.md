---
scope: svelte
subtitle: C'est valide au Scrabble ça ?
description: Fournir des snippets en tant que props à d'autres composants en Svelte 5
---

# "Snipprops"

Les snippets peuvent également être fournis en tant que props à d'autres composants. Cela peut
servir à personnaliser de l'"extérieur" l'affichage d'un composant, sans avoir besoin de lui passer
une multitude de props différentes.

```svelte
{#snippet bedroom()}
	<Bed />
	<Desk />
{/snippet}

{#snippet kitchen()}
	<Oven />
	<Fridge />
{/snippet}

<House {bedroom} {kitchen} />
```

Les snippets fournis en props sont accessibles comme n'importe quelle autre prop.

```svelte
<!-- House.svelte -->
<script>
	const { bedroom, kitchen } = $props();
</script>

<Wall>
	<Door />

	{@render kitchen()}

	<LivingRoom />

	{@render bedroom()}
</Wall>
```

Ainsi, je peux tout à fait décider de modifier ce que je mets dans `bedroom` ou `kitchen` sans avoir
à modifier `House`.

Vous pouvez également définir les snippets que vous souhaitez passer en props directement "au sein"
du markup de l'instance de votre composant. Vous n'aurez alors pas besoin de les passer en tant que
props, car cela sera fait automatiquement.

```svelte
<House>
	{#snippet bedroom()}
		<Bed />
		<Desk />
	{/snippet}

	{#snippet kitchen()}
		<Oven />
		<Fridge />
	{/snippet}
</House>
```

## Snippet `children`

Si vous le souhaitez, vous pouvez également fournir du markup directement en tant qu'"enfant" d'une
instance :

```svelte
<House>
	{#snippet bedroom()}
		<Bed />
		<Desk />
	{/snippet}

	{#snippet kitchen()}
		<Oven />
		<Fridge />
	{/snippet}

	<TV />
	<div>Painting</div>
</House>
```

Dans ce cas, Svelte considère que tout le markup "enfant" ne faisant pas partie explicitement d'un
`{#snippet}` fait partie d'un `{#snippet}` implicite s'appelant `children`, auquel vous pouvez
accéder en tant que props dans votre composant.

```svelte
<!-- House.svelte -->
<script>
	const { children, kitchen, bedroom } = $props();
</script>

<Wall>
	<Door />

	{@render kitchen()}

	{@render children()}

	<LivingRoom />

	{@render bedroom()}
</Wall>
```

Vous pouvez bien sûr ne pas fournir du tout de `{#snippet}` explicite et vous contenter de
`children` si c'est ce qui vous convient.

> Nous avons déjà rencontré `children`, lorsque nous avons étudié les layouts. C'est exactement
> cette mécanique de Svelte que SvelteKit utilise pour les fichiers `+layout.svelte`.

> Si vous utilisez TypeScript, vous avez accès au type `Snippet` pour typer les props de type
> snippet que vous pouvez importer du module `svelte`.

<fieldset class='task'>
<legend>À vous !</legend>

- Passer le markup du scanner en tant que `{#snippet}` nommé `infos` à `<Grass>`, et afficher-le
  dans `Grass`.

</fieldset>

---

[En savoir plus sur ce
chapitre](https://svelte-5-preview.vercel.app/docs/snippets#passing-snippets-to-components)
