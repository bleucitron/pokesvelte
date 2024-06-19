<script lang="ts">
	const { data } = $props();
</script>

<h1>Pokédex</h1>

<ul>
	{#each data.pokemons as pokemon}
		{@const { id, name, sprites } = pokemon}
		{@const src = sprites.front_default}

		<li>
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

	li:hover img {
		filter: drop-shadow(0px 0px 10px #333);
	}
</style>
