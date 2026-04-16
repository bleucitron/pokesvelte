<script lang="ts">

	import Wild from '$lib/components/Wild.svelte';
	import { getRandomNb } from '$lib/utils';

	const { pokemons, catchPokemon } = $props();

	let wilds = $state< {id: number, appeared: number}[]>([]);

	$effect(() => {
		const interval =
			setInterval(() => {
				wilds.push({id: getRandomNb(1, 151), appeared: Date.now()});
				console.log('rencontre');
			}, 3000) ;

		return () => clearInterval(interval);
	});

	function escape(date:number) {

		wilds = wilds.filter((other) => {return other.appeared!==date})
	}

</script>

{#each wilds as wild }

		{@const pokemon = pokemons[wild.id - 1]}
		{#if pokemon}
			{@const { id, name, sprites } = pokemon}
			<Wild
				{name}
				src={sprites.front_default}
				catchPokemon={() => {
					catchPokemon(id)
					escape(wild.appeared)
					}
				}
				escape={() => { escape(wild.appeared)}}
			/>
		{/if}

{/each}