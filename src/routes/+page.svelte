<script lang="ts">
	import Wild from '$lib/components/Wild.svelte';

	let foundSpecies: number[] = $state([]);

	const started = $derived(foundSpecies.length > 0);
	const { data } = $props();

	$inspect(foundSpecies.length);
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
					if (!foundSpecies.includes(id)) foundSpecies.push(id);
				}}
			/>
		{/if}
	{/each}
{:else}
	<p>Le jeu a commencé !</p>
{/if}
<p>Nombre d'espèces trouvé : {foundSpecies.length}</p>
