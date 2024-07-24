<script lang="ts">
	import type { Node } from '$lib/server';
	const { data } = $props();
	const { current, prev, next, localTree, parentLink } = $derived(data);
</script>

<a href={parentLink}>Parent</a>
{#if current}
	<nav>
		{#if prev}
			<a href={prev.path}>{prev.name}</a>
		{/if}
		{#if next}
			<a href={next.path}>{next.name}</a>
		{/if}
	</nav>
	{@html data.content}
{:else}
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

	{@render step(localTree)}
{/if}

<style lang="postcss">
</style>
