<script lang="ts">
	import { pokedex } from '$lib/stores/index.svelte';

	const { data } = $props();

	const pokemons = $derived(data.pokemons);
</script>

<h1>Pokédex</h1>

<ul>
	{#each pokemons as pokemon}
		{@const { id, name, sprites } = pokemon}
		{@const src = sprites.front_default}

		{@const found = pokedex.found.includes(id)}

		<li class:found>
			<a href="/pokedex/{id}"><img {src} alt={name} width="96" height="96" loading="lazy" /></a>
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
	li img {
		filter: contrast(0%) brightness(200%);
	}
	li:hover img {
		filter: contrast(0%) brightness(200%) drop-shadow(0px 0px 10px #333);
	}

	li.found img {
		filter: none;
	}
	li.found:hover img {
		filter: drop-shadow(0px 0px 10px #333);
	}
</style>
