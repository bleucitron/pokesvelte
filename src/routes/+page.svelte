<script lang="ts">
	import Wild from '$lib/Wild.svelte';
	import { getRandomNb } from '$lib/utils';

	const { data } = $props();
	const { pokemons } = $derived(data);

	const started = $derived(data.seen.length > 0);

	let wild = $state<number | undefined>();

	$effect(() => {
		const intervalId = started
			? setInterval(() => {
					const randomId = getRandomNb(151) + 1;
					console.log('interval', randomId, pokemons?.[randomId - 1]?.name);

					wild = randomId;
				}, 3000)
			: undefined;

		return () => clearInterval(intervalId);
	});

	function catchPokemon(id: number, name?: string) {
		fetch('/team/', {
			method: 'POST',
			body: JSON.stringify({ id })
		});
		console.log('attrapé', name);
	}
</script>

<h1>Pokésvelte</h1>
<p>Gotta svelt'em all!</p>

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
