<script lang="ts">
	import Wild from '$lib/components/Wild.svelte';
	import { getRandomNb } from '$lib/utils';
	import { fade, blur } from 'svelte/transition';

	const { pokemons, catchPokemon, scanner } = $props();

	let wilds = $state<{ id: number; appeared: number }[]>([]);

	$effect(() => {
		const interval = setInterval(
			() => {
				wilds.push({ id: getRandomNb(1, 151), appeared: Date.now() });
				console.log('rencontre');
			},
			getRandomNb(500, 3000)
		);

		return () => clearInterval(interval);
	});

	function escape(date: number) {
		wilds = wilds.filter((other) => {
			return other.appeared !== date;
		});
	}
</script>

{@render scanner()}

{#each wilds as wild (wild.appeared)}
	{@const pokemon = pokemons[wild.id - 1]}
	<span in:fade out:blur>
		{#if pokemon}
			{@const { id, name, sprites } = pokemon}
			<Wild
				{name}
				src={sprites.front_default}
				catchPokemon={() => {
					catchPokemon(id);
					escape(wild.appeared);
				}}
				escape={() => {
					escape(wild.appeared);
				}}
			/>
		{/if}
	</span>
{/each}

