<script lang="ts">
	const { data } = $props();
	import { resolve } from '$app/paths';
</script>

<h1>POKEDEX</h1>
<ul>
{#each data.pokemons as pokemon}

	{@const src = pokemon.sprites.front_default}
<li><a
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
    li:hover img {
        filter: drop-shadow(0px 0px 10px #333);
    }
</style>

