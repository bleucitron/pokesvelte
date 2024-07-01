<script lang="ts">
	import { invalidate } from '$app/navigation';
	import Wild from '$lib/components/Wild.svelte';
	import { getRandomNb } from '$lib/utils';

	const choices = [1, 4, 7];

	const { data } = $props();
	const { pokemons, teamSize } = $derived(data);

	const started = $derived(teamSize > 0);

	let wildId = $state<number | undefined>(25);
	$effect(() => {
		const interval = started
			? setInterval(() => {
					const id = getRandomNb(pokemons.length) + 1;
					wildId = id;
					console.log(`Un ${pokemons[id - 1].name} sauvage apparaît`);
				}, 2_000)
			: undefined;

		return () => clearInterval(interval);
	});

	async function catchPokemon(id: number, name: string) {
		await fetch(`/team`, { method: 'POST', body: JSON.stringify({ id }) });
		invalidate('team:update');
		console.log(`Vous avez capturé un ${name} (id: ${id}) !`);
	}
</script>

<h1>Pokésvelte</h1>
<p>Gotta svelt'em all!</p>

<div class="grass">
	{#if !started}
		<p>Choisissez un Pokémon</p>
		<ul>
			{#each choices as choice}
				{@const { id, name, sprites } = pokemons[choice - 1]}
				<li>
					<Wild {name} src={sprites.front_default} catchPokemon={() => catchPokemon(id, name)} />
				</li>
			{/each}
		</ul>
	{:else}
		<p>Attrapez les Pokémons !!!</p>
		{#if wildId}
			{@const wildPokemon = pokemons[wildId - 1]}
			{@const { id, name, sprites } = wildPokemon}
			{@const src = sprites.front_default}
			<Wild
				{name}
				{src}
				catchPokemon={() => catchPokemon(id, name)}
				escape={() => (wildId = undefined)}
			/>
		{/if}
	{/if}
</div>

<style>
	.grass {
		display: flex;
		flex-flow: column;
		flex: 1 0;
	}

	ul {
		display: flex;
		justify-content: center;
	}
</style>
