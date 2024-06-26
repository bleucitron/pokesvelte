<script lang="ts">
	import { team } from '$lib/stores/index.svelte';

	const { data } = $props();

	const pokemons = $derived(data.pokemons);
</script>

<h1>Mon équipe</h1>

<ul>
	{#each team.members as member}
		{@const { id, uuid } = member}
		{@const { name, sprites } = pokemons[id - 1]}
		{@const src = sprites.front_default}

		<li>
			<img {src} alt={name} width="96" height="96" loading="lazy" />
			<p>{uuid}</p>
			<button onclick={() => team.release(uuid)}>x</button>
		</li>
	{/each}
</ul>

<style>
	ul {
		display: flex;
		flex-wrap: wrap;
		margin-block: 1rem;
		gap: 1rem;
	}

	li {
		display: flex;
		align-items: center;
	}
</style>
