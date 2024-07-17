<script lang="ts">
	const { data } = $props();
	const { pokemons } = $derived(data);

	let search = $state('');
	const filtered = $derived(search ? pokemons.filter((p) => p.name.includes(search)) : pokemons);
</script>

<h1>Pokédex</h1>

<input bind:value={search} />
<ul>
	{#each filtered as pokemon}
		{@const found = data.found.includes(pokemon.id)}

		<li class:found>
			<a href="/pokedex/{pokemon.id}"
				><img src={pokemon?.sprites.front_default} alt={pokemon.name} /></a
			>
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
