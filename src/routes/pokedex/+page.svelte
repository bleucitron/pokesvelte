<script lang="ts">
	const { data } = $props();
</script>

<h1>Pokédex</h1>

<ul>
	{#each data.pokemons as pokemon}
		<li class:found={pokemon.id % 2 === 0}>
			<a href="/pokedex/{pokemon.id}"><img src={pokemon?.sprites.front_default} /></a>
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
