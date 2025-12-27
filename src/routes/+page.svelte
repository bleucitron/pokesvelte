<script lang="ts">
	import Wild from '$lib/components/Wild.svelte';
	import { pokedex } from '$lib/states/pokedex.svelte';
	import { getRandomNb } from '$lib/utils';

	const { data } = $props();

	let wild = $state(25);

	const { pokemons } = $derived(data);
	const started = $derived(!!pokedex.found.length);

	$effect(() => {
		const interval = started
			? setInterval(() => {
					wild = getRandomNb(1, 151);
					console.log(data.pokemons[wild - 1]?.name);
				}, 2000)
			: undefined;

		return () => clearInterval(interval);
	});

	const choices = [1, 4, 7];

	function catchPokemon(id: number) {
		const pokemon = data.pokemons[id - 1];

		if (pokemon) {
			console.log(`Vous avez capturé un ${pokemon.name} (id: ${id}) !`);
			pokedex.discover(id);
		}
	}
</script>

<h1>Pokésvelte</h1>
<p>Gotta svelt'em all!</p>

<div class="grass">
	{#if !started}
		<p>Choisissez un Pokémon</p>

		<ul>
			{#each choices as choice}
				{@const pokemon = pokemons[choice - 1]}
				{#if pokemon}
					{@const { id, name, sprites } = pokemon}
					<Wild {name} src={sprites.front_default} catchPokemon={() => catchPokemon(id)} />
				{/if}
			{/each}
		</ul>
	{:else}
		{@const wildPokemon = data.pokemons[wild - 1]}
		{#if wildPokemon}
			<Wild
				name={wildPokemon.name}
				src={wildPokemon.sprites.front_default}
				catchPokemon={() => catchPokemon(wild)}
			/>
		{/if}
	{/if}
</div>

<style>
	.grass {
		display: flex;
		flex-flow: column;
		justify-content: center;
		flex: 1 0;
	}

	p {
		text-align: center;
	}

	ul {
		display: flex;
		justify-content: center;
	}
</style>
