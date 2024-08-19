<script lang="ts">
	import Tree from '$lib/components/Tree.svelte';
	import type { Node } from '$lib/typings';

	const { data } = $props();
	const { current, prev, next, parent } = $derived(data);
	const { markup, title, name, files } = $derived(current);

	$inspect(data);
</script>

{#snippet link(node: Node | undefined)}
	{#if node}
		{@const { files, path, name, title } = node}
		<a class:folder={!!files} href={path}>{title ?? name}</a>
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
	{@const title = parent?.title ?? 'Table des matières'}

	<a class="parent" href={path}>{title}</a>
{/snippet}

{@render nav()}

<article>
	<!-- TODO: fil d'ariane -->
	{@render parentLink(parent)}

	{#if !title}
		<h1>{name}</h1>
	{/if}
	{#if markup}
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
	}

	article {
		margin-block: 5rem;
		flex: 1;
	}

	.parent {
		display: inline-block;
		margin-top: 3rem;
	}

	a.folder {
		font-weight: bold;
	}
</style>
