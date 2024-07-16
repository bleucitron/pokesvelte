<script lang="ts">
	const { data } = $props();
</script>

<h1>Pokédex</h1>

<ul>
	{#each data.pokemons as pokemon}
		<li><a href="/pokedex/{pokemon.id}"><img src={pokemon?.sprites.front_default} /></a></li>
	{/each}
</ul>

<style>
	ul {
		display: flex;
		flex-wrap: wrap;
		margin-block: 1rem;
		gap: 1rem;
	}

	li:hover img {
		filter: drop-shadow(0px 0px 10px #333);
	}
</style>
