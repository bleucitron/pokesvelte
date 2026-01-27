<script lang="ts">
	const started = false;
	const { data } = $props();
	import Wild from '$lib/components/Wild.svelte';
</script>

<h1>Pokésvelte</h1>
<p>Gotta svelt'em all!</p>

{#if started === false}
	{#each [1, 4, 7] as idpokemon (idpokemon)}
		{@const pokemon = data.pokemons[idpokemon - 1]}
		{#if pokemon}
			{@const { id, name, sprites } = pokemon}
			<Wild
				{name}
				src={sprites.front_default}
				catchPokemon={() => {
					console.log(id, name);
				}}
			/>
		{/if}
	{/each}
{:else}
	<p>Le jeu n'a pas commencé !</p>
{/if}
