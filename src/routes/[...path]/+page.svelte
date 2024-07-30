<script lang="ts">
	import type { Node } from '$lib/server';
	const { data } = $props();
	const { content, current, prev, next, localTree, parentLink } = $derived(data);

	const parentName = $derived(parentLink === '/' ? 'Table des matières' : parentLink);
</script>

{#snippet nav()}
	<nav>
		{#if prev}
			<a class:folder={!!prev.files} href={prev.path}>{prev.name}</a>
		{:else}
			<span></span>
		{/if}
		{#if next}
			<a class:folder={!!next.files} href={next.path}>{next.name}</a>
		{:else}
			<span></span>
		{/if}
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
				{#each folder as { name, path, files }}
					<li class:folder={!!files}><a href={path}>{name}</a></li>
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
