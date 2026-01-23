<script lang="ts">
	import Wild from '$lib/components/Wild.svelte';
	import type { Pokemon } from '$lib/types';
	import { getRandomNb } from '$lib/utils';

	type Props = { pokemons: Pokemon[]; catchPokemon: (id: number) => Promise<void> };

	const { pokemons, catchPokemon }: Props = $props();

	type WildPokemon = { id: number; appeared: number; name: string; sprite: string };
	let wilds = $state<WildPokemon[]>([]);

	$effect(() => {
		const interval = setInterval(() => {
			const id = getRandomNb(1, 151);
			const pokemon = pokemons[id - 1];

			if (pokemon) {
				const {
					name,
					sprites: { front_default }
				} = pokemon;

				console.log(`Un ${name} sauvage apparaît`);
				wilds.push({
					id,
					appeared: Date.now(),
					name,
					sprite: front_default
				});
			}
		}, 2000);

		return () => clearInterval(interval);
	});

	function escape(appeared: number) {
		wilds = wilds.filter((wild) => wild.appeared !== appeared);
	}
</script>

<div class="grass">
	{#each wilds as { id, name, sprite, appeared }}
		<Wild
			{name}
			src={sprite}
			catchPokemon={async () => {
				await catchPokemon(id);
				escape(appeared);
			}}
			escape={() => escape(appeared)}
		/>
	{/each}
</div>

<style>
	.grass {
		display: flex;
		flex-flow: column;
		justify-content: center;
		flex: 1 0;
	}
</style>
