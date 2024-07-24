<script lang="ts">
	import type { Node } from '$lib/server';
	const { data } = $props();
	const { content, current, prev, next, localTree, parentLink } = $derived(data);

	const parentName = $derived(parentLink === '/' ? 'Table des matières' : parentLink);
</script>

{#if current}
	<!-- TODO: fil d'ariane -->
	<a href={parentLink}>{parentName}</a>
{/if}

<nav>
	{#if prev}
		<a class:folder={!!prev.files} href={prev.path}>{prev.name}</a>
	{/if}
	{#if next}
		<a class:folder={!!next.files} href={next.path}>{next.name}</a>
	{/if}
</nav>
{#if content}
	{@html content}
{:else}
	{@const title = current?.name ?? 'Table des matières'}
	{#snippet step(folder: Node[])}
		<ul>
			{#each folder as { name, path, files }}
				<li><a href={path}>{name}</a></li>
				{#if files}
					{@render step(files)}
				{/if}
			{/each}
		</ul>
	{/snippet}

	<h1>{title}</h1>
	{@render step(localTree)}
{/if}

<style lang="postcss">
	.folder {
		font-weight: bold;
	}
</style>
