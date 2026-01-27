<script lang="ts">
	const { data } = $props();
	const { pokemons } = $derived(data);
	import { resolve } from '$app/paths';
</script>

<h1>POKEDEX</h1>
<ul>
	{#each pokemons as pokemon (pokemon.id)}
		{@const src = pokemon.sprites.front_default}
		{@const found = pokemon.id%2 === 0}
		<li class={{found}}>
			<a
				href={resolve('/pokedex/[id]', {
					id: pokemon.id.toString()
				})}><img {src} alt="pokémon img" /></a
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
