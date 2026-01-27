<script lang="ts">
	let started = $state(false);
	const { data } = $props();
	import Wild from '$lib/components/Wild.svelte';
	let foundSpecies: number[] = $state([]);
</script>

<h1>Pokésvelte</h1>
<p>Gotta svelt'em all!</p>

<button onclick={()=> started= !started}>
	{!started? 'commencer': 'arreter'}
</button>

{#if started}
	{#each [1, 4, 7] as idpokemon (idpokemon)}
		{@const pokemon = data.pokemons[idpokemon - 1]}
		{#if pokemon}
			{@const { id, name, sprites } = pokemon}
			<Wild
				{name}
				src={sprites.front_default}
				catchPokemon={() => {
					console.log(id, name);
					if (!foundSpecies.includes(id))
						foundSpecies.push(id);
				}}
			/>
		{/if}
	{/each}
{:else}
	<p>Le jeu n'a pas commencé !</p>
{/if}
<p> Nombre d'espèces trouvé : {foundSpecies.length}</p>
