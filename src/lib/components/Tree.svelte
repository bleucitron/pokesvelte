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
	a {
		color: unset;
	}

	li {
		margin-block: 0.8rem;
		font-size: 0.9rem;
		text-transform: none;

		&:has(ol) {
			&:first-of-type {
				margin-top: 0;
			}
			&:last-of-type {
				margin-bottom: 0;
			}
		}

		:global {
			ol {
				padding-left: 1rem;
			}
			li {
				margin: 0;
			}
		}

		font-weight: normal;
		color: var(--dark-grey);
		transition-duration: 0.2s;
		transition-property: color, font-weight;

		&.previous {
			color: var(--grey);
		}

		&.current {
			color: var(--dark-blue);
		}

		&.folder {
			font-size: 1rem;

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
