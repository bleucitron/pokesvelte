<script lang="ts">
	import { page } from '$app/stores';
	import { findCurrent } from '$lib';

	const { data } = $props();
	const { tree } = $derived(data);

	const found = $derived(findCurrent($page.params.path, tree));
</script>

{#if found}
	{@const { prev, next } = found}
	<nav>
		{#if prev}
			<a href={prev.path}>{prev.name}</a>
		{/if}
		{#if next}
			<a href={next.path}>{next.name}</a>
		{/if}
	</nav>
{/if}
{@html data.content}
