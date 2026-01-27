<script lang="ts">
	import Wild from '$lib/components/Wild.svelte';
	import { pokedex } from '$lib/states/pokedex.svelte.js';

	const started = $derived(pokedex.found.length > 0);
	const { data } = $props();

	$inspect(pokedex.found.length);
</script>

<h1>Pokésvelte</h1>
<p>Gotta svelt'em all!</p>

{#if !started}
	{#each [1, 4, 7] as idpokemon (idpokemon)}
		{@const pokemon = data.pokemons[idpokemon - 1]}
		{#if pokemon}
			{@const { id, name, sprites } = pokemon}
			<Wild
				{name}
				src={sprites.front_default}
				catchPokemon={() => {
					console.log(id, name);
					pokedex.discover(id)
				}}
			/>
		{/if}
	{/each}
{:else}
	<p>Le jeu a commencé !</p>
{/if}
<p>Nombre d'espèces trouvé : {pokedex.found.length}</p>
