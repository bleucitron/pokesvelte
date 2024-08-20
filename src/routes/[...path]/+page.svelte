<script lang="ts">
	import Tree from '$lib/components/Tree.svelte';
	import type { Node } from '$lib/typings';

	const { data } = $props();
	const { current, prev, next, parent } = $derived(data);
	const { id, markup, title, name, files, isFolder } = $derived(current);

	$inspect(data);
</script>

{#snippet link(node: Node | undefined)}
	{#if node}
		{@const { id, isFolder, path, name, title } = node}
		{@const idText = title ? `${id.replaceAll('-', '/')}.` : ''}
		{@const text = title || name}

		<a class="nav-link" class:folder={isFolder} href={path}
			><span>{idText}</span>{text}{isFolder ? '/' : ''}</a
		>
	{:else}
		<span></span>
	{/if}
{/snippet}

{#snippet nav()}
	<nav>
		{@render link(prev)}
		{@render link(next)}
	</nav>
{/snippet}

{#snippet parentLink(parent: Node | undefined)}
	{@const path = parent?.path ?? '/'}
	{@const title = parent ? `${parent?.title}` : 'Table des matières'}

	<a class="parent" href={path}><span>{parent?.id}.</span>{title}/</a>
{/snippet}

{@render nav()}

<article>
	<!-- TODO: fil d'ariane -->
	{@render parentLink(parent)}

	{#if !title}
		<h1>{name}</h1>
	{/if}
	{#if markup}
		{@const text = isFolder ? `${title}/` : title}

		<h1 class:folder={isFolder}><span>{id.split('-').at(-1)}.</span>{text}</h1>
		{@html markup}
	{/if}

	{#if files?.length}
		<Tree folder={files} />
	{/if}
</article>

{@render nav()}

<style lang="postcss">
	nav {
		display: flex;
		justify-content: space-between;
		margin-block: 1rem;
	}

	.nav-link span,
	.parent span {
		font-size: 0.8rem;
	}

	article {
		margin-block: 3rem;
		flex: 1;
	}

	.nav-link,
	.parent {
		color: var(--light-grey);
	}

	.parent {
		display: block;
		margin-top: 3rem;
		margin-bottom: 0.5rem;
		font-weight: bold;
		text-align: center;
		text-transform: uppercase;
	}

	h1 {
		text-align: center;
		line-height: 1.2;

		span {
			font-size: 1.8rem;
			color: black;
		}
	}
</style>
