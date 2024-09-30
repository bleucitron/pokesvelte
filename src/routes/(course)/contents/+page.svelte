<script lang="ts">
	import Tag from '$lib/components/Tag.svelte';
	import type { Node } from '$lib/typings';

	const { data } = $props();
	const { tree } = $derived(data);

	const title = 'Table des matières';
</script>

<h1>{title}</h1>

{#snippet Tree(tree: Node[], depth: number)}
	{@const start = parseInt(tree[0]?.id?.split('-')?.at(-1) ?? '')}
	<ol {start}>
		{#each tree as { name, path, files, title, scope }}
			{@const isFolder = depth === 0}

			<li class:folder={isFolder} class={scope}>
				<a href={path}>{title || name}</a>
				{#if scope && isFolder}
					<Tag {scope} />
				{/if}

				{#if files?.length}
					{@render Tree(files, depth + 1)}
				{/if}
			</li>
		{/each}
	</ol>
{/snippet}

{@render Tree(tree, 0)}

<svelte:head>
	<title>{title}</title>

	<meta name="description" content="Programme complet du tutoriel" />
</svelte:head>

<style>
	ol {
		width: fit-content;

		&:has(ol) {
			margin: auto;
		}
		&:not(:has(ol)) {
			display: block;
		}

		:global {
			ol {
				padding-left: 2rem;

				li {
					margin: unset;
				}
			}
		}
	}

	li {
		flex: 1 0 50%;
		font-weight: normal;
		color: black;
		font-size: 1rem;
		transition-property: color, font-weight;
		margin-block: 1rem;

		&.folder {
			font-size: 1.2rem;
		}

		&:hover:has(li) {
			color: unset;
		}
	}

	ol,
	li {
		&:hover {
			color: black;
		}
	}
	@media (max-width: 1024px) {
		h1 {
			margin-bottom: 0;
		}
	}
</style>
