<script lang="ts">
	import type { Pokemon } from '$lib/types';

	import Wild from '$lib/components/Wild.svelte';
	import { getRandomNb } from '$lib/utils';
	import type { Snippet } from 'svelte';
	import { fade } from 'svelte/transition';

	type GrassProps = { pokemons: Pokemon[]; catchPokemon: (id: number) => void; infos: Snippet };
	type WildType = { id: number; appeared?: number; name: string; sprite: string };

	const { pokemons, catchPokemon, infos }: GrassProps = $props();

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
		}, 1_000);

		return () => clearInterval(interval);
	});

	function removeFromWildList(appeared = 0) {
		wilds = wilds.filter((wild) => wild.appeared !== appeared);
	}
</script>

<div class="Grass">
	<p>Attrapez les Pokémons !!!</p>
	{#each wilds as { id, name, appeared, sprite } (appeared)}
		<div transition:fade>
			<Wild
				{name}
				src={sprite}
				catchPokemon={() => {
					removeFromWildList(appeared);
					catchPokemon(id);
				}}
				escape={() => removeFromWildList(appeared)}
			/>
		</div>
	{/each}
	{@render infos()}
</div>

<style>
	.Grass {
		position: relative;
		display: flex;
		flex-flow: column;
		flex: 1 0;
	}
</style>
