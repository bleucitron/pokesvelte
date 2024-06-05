---
scope: svelte
subtitle: Sni-quoi ?
description: Utiliser les snippets de Svelte 5 pour mutualiser du markup sans créer de composant
---

# Snippets

Lorsque le code commence à mécaniquement grossir, on voit apparaître du code dupliqué, qui – en
grande quantité – rend tout projet difficile à maintenir. On commence alors naturellement à se poser
la question de créer des fonctions utilitaires pour mutualiser du code ou des composants pour
mutualiser du markup.

```svelte
<!-- UnComposant.svelte, il n'y a qu'ici que le markup des <figure> est utilisé de cette manière -->
{#each images as image}
	{#if image.href}
		<a href={image.href}>
			<figure>
				<img src={image.src} alt={image.caption} width={image.width} height={image.height} />
				<figcaption>{image.caption}</figcaption>
			</figure>
		</a>
	{:else}
		<figure>
			<img src={image.src} alt={image.caption} width={image.width} height={image.height} />
			<figcaption>{image.caption}</figcaption>
		</figure>
	{/if}
{/each}
```

Dans cet exemple, on pourrait tout à fait créer un composant `<Figure>` pour mutualiser le markup
des `<figure>`.

Mais parfois, créer un composant juste pour mutualiser du markup n'est pas toujours idéal, notamment
lorsqu'on ne réutilise jamais ce markup ailleurs.

## `{#snippet}` et `{@render}`

Svelte propose la syntaxe des `{#snippet}` pour créer du markup réutilisable au sein d'un même
composant. Une fois défini, un snippet s'utiliser en utilisant `{@render personne()}`.

Un snippet est conceptuellement similaire à composant local. Vous pouvez donc lui prévoir des
paramètres (similaires à des "props"), et lui en fournir lors de l'utilisation de `{@render
personne(data)}`.

```svelte
{#snippet figure(image)}
	<figure>
		<img src={image.src} alt={image.caption} width={image.width} height={image.height} />
		<figcaption>{image.caption}</figcaption>
	</figure>
{/snippet}

{#each images as image}
	{#if image.href}
		<a href={image.href}>
			{@render figure(image)}
		</a>
	{:else}
		{@render figure(image)}
	{/if}
{/each}
```

> Notez qu'en réalité les snippets sont des fonctions, et doivent être exécutées lorsqu'utilisées
> avec `{@render}`.

À l'intérieur d'un snippet, vous pouvez utiliser toute la syntaxe Svelte que vous connaissez déjà,
notamment déstructurer...

```svelte
{#snippet figure({ src, caption, width, height })}
	<figure>
		<img {src} alt={caption} {width} {height} />
		<figcaption>{caption}</figcaption>
	</figure>
{/snippet}
```

...ou encore `{@const}` :

```svelte
{#snippet figure(image)}
	{@const { src, caption, width, height } = image}
	<figure>
		<img {src} alt={caption} {width} {height} />
		<figcaption>{caption}</figcaption>
	</figure>
{/snippet}
```

<fieldset class='task'>
<legend>À vous !</legend>

Dans la page `/team`, nous avons du markup dupliqué : l'affichage des membres de l'équipe utilise
exactement le même markup pour les membres titulaires que pour les remplaçants.

- Créer un `{#snippet}` représentant un membre de notre équipe.

- Utiliser ce snippet pour mutualiser le markup de cette page.

</fieldset>

---

[En savoir plus sur ce chapitre](https://svelte-5-preview.vercel.app/docs/snippets)
