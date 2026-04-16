<script lang="ts">
	import Pokedex from '$lib/components/Pokedex.svelte';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	const { data } = $props();
	const { pokemons, pokedex, types } = $derived(data);
</script>

<ul>
	{#each types as unType(unType)}
		{@const isCurrent = page.params.type === unType}
		{@const lienArgs = isCurrent ? ["/pokedex"]: ['/pokedex/[type=pokemonType]', {
				type: unType
			}]
		}
		<a
			class={{current: !page?.params.type || isCurrent}}
			href={resolve(...lienArgs)}>{unType}</a
		>
	{/each}
</ul>
<Pokedex {pokemons} {pokedex} />


<style>
	a {
			padding: 10px;
	}
	a.current {
		color:black;
	}
</style>