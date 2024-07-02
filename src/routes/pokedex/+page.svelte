<script lang="ts">
	const { data } = $props();

	const { pokemons, seen } = $derived(data);
	let search = $state('');

	const filtered = $derived(pokemons.filter((pokemon) => pokemon.name.includes(search)));
	const toDisplay = $derived(search ? filtered : pokemons);
</script>

<h1>Pokédex</h1>

<input bind:value={search} placeholder="recherche..." />
<ul>
	{#each toDisplay as pokemon}
		{@const { id, name, sprites } = pokemon}
		{@const src = sprites.front_default}

		{@const found = seen.includes(id)}

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
