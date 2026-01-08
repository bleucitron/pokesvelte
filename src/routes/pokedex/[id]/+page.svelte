<script lang="ts">
	import Pokemon from '$lib/components/Pokemon.svelte';
	import { recent } from '$lib/states/recent.svelte';

	const { data } = $props();

	const { id, name, src, found } = $derived(data);

	const isRecent = $derived(recent.species.includes(id));
</script>

<div>
	<Pokemon {id} {name} {src} {found} />
	{#if isRecent}
		<div class="new">new</div>
	{/if}
</div>

<style>
	div {
		position: relative;
		margin-block: auto;
	}
	div .new {
		position: absolute;
		top: 0;
		left: 0;
		background: orange;
		border-radius: 8px;
		padding: 0.2rem;
		padding-top: 0.4rem;
		font-size: 0.7rem;
		border: 2px solid #888;
		line-height: 0.8rem;
	}
</style>
