<script lang="ts">
	import Wild from '$lib/Wild.svelte';
	import { pokedex } from '$lib/stores/index.svelte';
	import { getRandomNb } from '$lib/utils';

	const { data } = $props();
	const { pokemons } = $derived(data);

	const found = $derived(pokedex.found);
	const started = $derived(found.length > 0);

	let wild = $state(25);

	$effect(() => {
		const intervalId = started
			? setInterval(() => {
					const randomId = getRandomNb(151) + 1;
					console.log('interval', randomId, pokemons?.[randomId - 1]?.name);

					wild = randomId;
				}, 2000)
			: undefined;

		return () => clearInterval(intervalId);
	});

	function catchPokemon(id: number, name?: string) {
		pokedex.discover(id);
		console.log('attrapé', name);
	}

	$inspect(found);
</script>

<h1>Pokésvelte</h1>
<p>Gotta svelt'em all!</p>

<p>Trouvés: {found.length}</p>

{#if !started}
	<div class="house">
		{#each [1, 4, 7] as starterId}
			{@const pokemon = pokemons[starterId - 1]}
			{@const src = pokemon?.sprites?.front_default}
			{@const name = pokemon?.name}

			<Wild {src} {name} catchPokemon={() => catchPokemon(starterId, name)} />
		{/each}
	</div>
{:else}
	{@const pokemon = pokemons[wild - 1]}
	{@const src = pokemon?.sprites?.front_default}
	{@const name = pokemon?.name}

	<Wild {src} {name} catchPokemon={() => catchPokemon(wild, name)} />
{/if}

<style>
	.house {
		display: flex;
	}
</style>
