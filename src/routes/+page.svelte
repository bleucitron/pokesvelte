<script lang="ts">
	import Wild from '$lib/components/Wild.svelte';
	import { recent } from '$lib/states/recent.svelte';
	import { invalidate } from '$app/navigation';
	import Grass from '$lib/components/Grass.svelte';

	const { data } = $props();
	const started = $derived(data.teamSize > 0);

	async function catchPokemon(id:number)
	{
		console.log(id);
		await fetch("/team", {method:"POST", body: JSON.stringify({id: id})})
		recent.discover(id);
		invalidate("team:update");
	}


</script>

<h1>Pokésvelte</h1>
<p>Gotta svelt'em all!</p>
{#await data.scan}
	<p> Recherche des pokémons aux alentours ...</p>
{:then resultatScan}
	<p> {resultatScan} pokémons aux alentours.</p>
{/await}
{#if !started}
	{#each [1, 4, 7] as idpokemon (idpokemon)}
		{@const pokemon = data.pokemons[idpokemon - 1]}
		{#if pokemon}
			{@const { id, name, sprites } = pokemon}
			<Wild
				{name}
				src={sprites.front_default}
				catchPokemon={() => catchPokemon(id)}
			/>
		{/if}
	{/each}
{:else}
	<Grass pokemons={data.pokemons} {catchPokemon}>

	</Grass>
{/if}
