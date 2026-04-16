<script lang="ts">
	import { recent } from '$lib/states/recent.svelte';
	const { pokemons , pokedex} = $props();
	import { resolve } from '$app/paths'

	let valeurRecherche = $state('');
	const pokemonRechercher = $derived(pokemons.filter((valeur) => valeur.name.includes(valeurRecherche)))
</script>

<h1>POKEDEX</h1>
<input bind:value={valeurRecherche} placeholder="Rechercher un pokémon" />

<ul>
	{#each pokemonRechercher as pokemon (pokemon.id)}
		{@const src = pokemon.sprites.front_default}
		{@const found = pokedex.includes(pokemon.id)}
		{@const pokemonRecent = recent.found.includes(pokemon.id)}
		<li class={{found}} onmouseenter={() => {recent.found = recent.found.filter((pkmn) => pkmn !== pokemon.id)}}>
			<a
				href={resolve('/pokedex/[id=id]', {
					id: pokemon.id.toString()
				})}><img {src} alt="pokémon img" /></a
			>
			{#if pokemonRecent}
				<div class="pastille"></div>
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
    .pastille {
        position: absolute;
        top: 20px;
        width: 15px;
        height: 15px;
        background-color: red;
    }
</style>
