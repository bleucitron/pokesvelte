<script lang="ts">
	import type { Node } from '$lib/typings';
	import { slide } from 'svelte/transition';

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
		{@const current = isFolder ? id && currentId.startsWith(id) : id === currentId}
		{@const previous = !current && id && id < currentId}
		{@const next = id > currentId}

		<li class:folder={isFolder} class:current class:previous class:next>
			<a href={path}>{title || name}</a>

			{#if current && files?.length}
				<div transition:slide={{ duration: 300 }}>
					<svelte:self current={currentId} folder={files} depth={depth + 1} />
				</div>
			{/if}
		</li>
	{/each}
</ol>

<style>
	li {
		font-weight: normal;
		color: var(--dark-grey);
		font-size: 1.2rem;
		transition-duration: 0.2s;
		transition-property: color, font-weight;

		&.previous {
			color: var(--grey);
		}

		&.current {
			color: var(--dark-blue);
		}

		&.folder {
			font-size: 1.5rem;

			&.current {
				&:has(.current) {
					color: inherit;
					font-weight: inherit;
				}

				&:not(:has(ol)) {
					font-weight: bold;
				}
			}
		}
	}
</style>
