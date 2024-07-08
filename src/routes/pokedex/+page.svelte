<script lang="ts">
	import { recent } from '$lib/stores/index.svelte';

	const { data } = $props();

	const { pokemons, seen } = $derived(data);
	let search = $state('');

	const filtered = $derived(pokemons.filter((pokemon) => pokemon.name.includes(search)));
	const toDisplay = $derived(search ? filtered : pokemons);
</script>

<input bind:value={search} placeholder="recherche..." />
<ul>
	{#each toDisplay as pokemon}
		{@const { id, name, sprites } = pokemon}
		{@const src = sprites.front_default}

		{@const found = seen.includes(id)}
		{@const recentSpecies = recent.species.includes(id)}

		<li class:found>
			<a href="/pokedex/{id}"
				><img
					{src}
					alt={name}
					width="96"
					height="96"
					loading="lazy"
					onmouseenter={() => recent.check(id)}
				/></a
			>
			{#if recentSpecies}
				<div class="new">new</div>
			{/if}
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
		position: relative;
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
	li .new {
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

	input {
		margin-block: 1rem;
	}
</style>
