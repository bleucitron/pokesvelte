<script lang="ts">
	import type { Pokemon } from '$lib/types';

	import Wild from '$lib/components/Wild.svelte';
	import { getRandomNb } from '$lib/utils';

	type GrassProps = { pokemons: Pokemon[]; catchPokemon: (id: number) => void };
	type WildType = { id: number; appeared?: number; name: string; sprite: string };

	const { pokemons, catchPokemon }: GrassProps = $props();

	let wilds = $state<WildType[]>([]);

	$effect(() => {
		const interval = setInterval(() => {
			const id = getRandomNb(pokemons.length) + 1;
			const pokemon = pokemons[id - 1];
			const name = pokemon.name;
			const sprite = pokemon.sprites.front_default;
			wilds.push({
				id,
				appeared: Date.now(),
				name,
				sprite
			});
			console.log(`Un ${name} sauvage apparaît`);
		}, 2_000);

		return () => clearInterval(interval);
	});

	function removeFromWildList(appeared = 0) {
		wilds = wilds.filter((wild) => wild.appeared !== appeared);
	}
</script>

<div class="Grass">
	<p>Attrapez les Pokémons !!!</p>
	{#each wilds as { id, name, appeared, sprite }}
		<Wild
			{name}
			src={sprite}
			catchPokemon={() => {
				removeFromWildList(appeared);
				catchPokemon(id);
			}}
			escape={() => removeFromWildList(appeared)}
		/>
	{/each}
</div>

<style>
	.Grass {
		display: flex;
		flex-flow: column;
		flex: 1 0;
	}
</style>
