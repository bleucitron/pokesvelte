<script lang="ts">
	import type { Node } from '$lib/server';
	const { data } = $props();
	const { content, current, prev, next, localTree, parentLink } = $derived(data);

	const parentName = $derived(parentLink === '/' ? 'Table des matières' : parentLink);
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

{@render nav()}

<article>
	{#if content}
		<a class="parent" href={parentLink}>{parentName}</a>
		{@html content}
	{:else}
		{@const title = current?.name ?? 'Table des matières'}

		{#if current}
			<!-- TODO: fil d'ariane -->
			<a class="parent" href={parentLink}>{parentName}</a>
		{/if}
		{#snippet step(folder: Node[])}
			<ol>
				{#each folder as { name, path, files, title }}
					<li class:folder={!!files}><a href={path}>{title ?? name}</a></li>
					{#if files}
						{@render step(files)}
					{/if}
				{/each}
			</ol>
		{/snippet}

		<h1>{title}</h1>
		{@render step(localTree)}
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
	li {
		font-size: 1.2rem;

		&.folder {
			font-size: 2rem;
		}
	}
</style>
