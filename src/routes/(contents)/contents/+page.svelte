<script lang="ts">
	import type { Node } from '$lib/typings';

	const { data } = $props();
	const { tree } = $derived(data);
</script>

<h1>Table des matières</h1>

{#snippet Tree(tree: Node[], depth: number)}
	<ol start={0}>
		{#each tree as { name, path, files, title }}
			{@const isFolder = depth === 0}

			<li class:folder={isFolder}>
				<a href={path}>{title || name}</a>

				{#if files?.length}
					{@render Tree(files, depth + 1)}
				{/if}
			</li>
		{/each}
	</ol>
{/snippet}

{@render Tree(tree, 0)}

<style>
	h1 {
		margin-top: 5rem;
	}

	a {
		color: inherit;

		&:focus,
		&:hover {
			color: var(--orange);
		}
	}
	ol {
		margin-block: 1rem 4rem;
		margin-inline: auto;
	}

	li {
		font-weight: normal;
		color: var(--dark-grey);
		font-size: 1rem;
		transition-duration: 0.2s;
		transition-property: color, font-weight;

		&.folder {
			font-size: 1.2rem;
		}

		:global(ol) {
			margin: 0;
		}
	}
</style>
