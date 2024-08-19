<script lang="ts">
	import type { Node } from '$lib/typings';

	interface Props {
		folder: Node[];
	}
	const { folder }: Props = $props();
</script>

<ol>
	{#each folder as { name, path, files, title }}
		<li class:folder={!!files}><a href={path}>{title ?? name}</a></li>
		{#if files}
			<svelte:self folder={files} />
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
