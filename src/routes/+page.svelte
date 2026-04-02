<script lang="ts">
	import Wild from '$lib/components/Wild.svelte';
	import { pokedex } from '$lib/states/pokedex.svelte.js';
	import { team } from '$lib/states/team.svelte.js';
	import { getRandomNb } from '$lib/utils';

	const started = $derived(pokedex.found.length > 0);
	const { data } = $props();

	$inspect(pokedex.found.length);

	let wild = $state<number>();
	$effect(() => {
		const interval = started ?

			setInterval(() => {
				wild = getRandomNb(1, 151);
				console.log('rencontre');
			}, 3000) : undefined;

		return () => clearInterval(interval);
	});

	function catchPokemon(id:number)
	{
		console.log(id);
		fetch("/team", {method:"POST", body: JSON.stringify({id: id})})
		pokedex.discover(id);
		wild = undefined;
	}


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
				catchPokemon={() => catchPokemon(id)}
			/>
		{/if}
	{/each}
{:else}
	{#if wild}
		{@const pokemon = data.pokemons[wild - 1]}
		{#if pokemon}
			{@const { id, name, sprites } = pokemon}
			<Wild
				{name}
				src={sprites.front_default}
				catchPokemon={() => catchPokemon(id)}
				escape={() => { wild = undefined }}
			/>
		{/if}
	{/if}
{/if}
