<script lang="ts">
	import Tree from '$lib/components/Tree.svelte';
	import type { Node } from '$lib/typings';

	const { data } = $props();
	const { content, current, prev, next, parent, tree } = $derived(data);
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
	{#if content}
		{@render parentLink(parent)}
		{@html content}
	{:else}
		{@const title = current?.title ?? 'Table des matières'}

		{#if current}
			<!-- TODO: fil d'ariane -->
			{@render parentLink(parent)}
		{/if}

		<h1>{title}</h1>

		<Tree folder={current?.files ?? tree} />
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
