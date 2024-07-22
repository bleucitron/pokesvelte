<script lang="ts">
	import type { Node } from './+page.server.ts';
	const { data } = $props();
	const { tree } = $derived(data);
	$inspect(tree);
</script>

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

{@render step(tree)}

<style lang="postcss">
</style>
