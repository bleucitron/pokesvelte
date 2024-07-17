<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import Wild from '$lib/Wild.svelte';
	import { getRandomNb } from '$lib/utils';

	const { data } = $props();
	const { pokemons, totalInZone } = $derived(data);

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

	async function catchPokemon(id: number, name?: string) {
		await fetch('/team/', {
			method: 'POST',
			body: JSON.stringify({ id })
		});
		invalidateAll();
		console.log('attrapé', name);
	}
</script>

<h1>Pokésvelte</h1>
<p>Gotta svelt'em all!</p>

<div class="grass">
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
	{#await totalInZone}
		<p class="scan">Scan de la zone...</p>
	{:then total}
		<p class="scan">{total} Pokémons dans la zone</p>
	{/await}
</div>

<style>
	.house {
		display: flex;
	}
	.grass {
		display: flex;
		justify-content: center;
		width: 100%;
		height: 100%;
		position: relative;
	}
	.scan {
		position: absolute;
		bottom: 0;
		right: 0;
	}
</style>
