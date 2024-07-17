<script lang="ts">
	import Wild from '$lib/Wild.svelte';
	import { pokedex, team } from '$lib/stores/index.svelte';
	import { getRandomNb } from '$lib/utils';

	const { data } = $props();
	const { pokemons } = $derived(data);

	const found = $derived(pokedex.found);
	const started = $derived(found.length > 0);

	let wild = $state<number | undefined>();

	$effect(() => {
		const intervalId = started
			? setInterval(() => {
					const randomId = getRandomNb(151) + 1;
					console.log('interval', randomId, pokemons?.[randomId - 1]?.name);

					wild = randomId;
				}, 4000)
			: undefined;

		return () => clearInterval(intervalId);
	});

	function catchPokemon(id: number, name?: string) {
		pokedex.discover(id);
		team.recruit(id);
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
{:else if wild}
	{@const pokemon = pokemons[wild - 1]}
	{@const src = pokemon?.sprites?.front_default}
	{@const name = pokemon?.name}

	<Wild
		{src}
		{name}
		escape={() => {
			wild = undefined;
		}}
		catchPokemon={() => catchPokemon(wild, name)}
	/>
{/if}

<style>
	.house {
		display: flex;
	}
</style>
