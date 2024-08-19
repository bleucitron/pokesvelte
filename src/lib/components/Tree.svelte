<script lang="ts">
	import type { Node } from '$lib/typings';

	interface Props {
		folder: Node[];
		depth?: number;
	}
	const { folder, depth = 0 }: Props = $props();
	const start = parseInt(folder[0]?.id?.split('-')?.at(-1) ?? '');
</script>

<ol {start}>
	{#each folder as { name, path, files, title }}
		<li class:folder={depth === 0}><a href={path}>{title || name}</a></li>
		{#if files}
			<svelte:self folder={files} depth={depth + 1} />
		{/if}
	{/each}
</ol>

<style>
	li {
		font-size: 1.2rem;

		&.folder {
			font-size: 2rem;
		}
	}
</style>
