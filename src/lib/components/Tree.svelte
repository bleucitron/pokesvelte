<script lang="ts">
	import type { Node } from '$lib/typings';

	interface Props {
		folder: Node[];
		current?: string;
		depth?: number;
	}
	const { folder, current: currentId = '', depth = 0 }: Props = $props();
	const start = parseInt(folder[0]?.id?.split('-')?.at(-1) ?? '');
</script>

<ol {start}>
	{#each folder as { id, name, path, files, title }}
		{@const isFolder = depth === 0}
		{@const current = isFolder ? currentId.startsWith(id) : id === currentId}
		{@const previous = !current && id < currentId}
		{@const next = id > currentId}

		<li class:folder={isFolder} class:current class:previous class:next>
			<a href={path}>{title || name}</a>

			{#if files}
				<svelte:self current={currentId} folder={files} depth={depth + 1} />
			{/if}
		</li>
	{/each}
</ol>

<style>
	ol {
		width: max-content;
		margin: auto;
	}

	li {
		font-weight: normal;
		color: var(--dark-grey);
		font-size: 1.2rem;
		transition-duration: 0.4s;
		transition-property: color, font-weight;

		&.previous {
			color: var(--grey);
		}

		&.current {
			font-weight: bold;
		}

		&.folder {
			font-size: 1.5rem;

			&.current {
				font-weight: inherit;

				&:not(:has(ol)) {
					font-weight: bold;
				}
			}
		}
	}
</style>
