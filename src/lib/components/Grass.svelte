<script lang="ts">

	import Wild from '$lib/components/Wild.svelte';
	import { getRandomNb } from '$lib/utils.ts';

	const { pokemons, catchPokemon } = $props();

	let wild = $state<number>();
	$effect(() => {
		const interval =
			setInterval(() => {
				wild = getRandomNb(1, 151);
				console.log('rencontre');
			}, 3000) ;

		return () => clearInterval(interval);
	});

</script>


{#if wild}
	{@const pokemon = pokemons[wild - 1]}
	{#if pokemon}
		{@const { id, name, sprites } = pokemon}
		<Wild
			{name}
			src={sprites.front_default}
			catchPokemon={() => catchPokemon(id)}
			escape={() => { wild = undefined }}
		/>
	{/if}
{/if}
