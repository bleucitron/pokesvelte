<script lang="ts">
	import Pokedex from '$lib/components/Pokedex.svelte';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	const { data } = $props();
	const { pokemons, pokedex, types } = $derived(data);
</script>

<ul>
	{#each types as unType (unType)}
		{@const isCurrent = page.params.type === unType}
		{#if isCurrent}
			<a class={{ current: isCurrent }} href={resolve('/pokedex')}>{unType}</a>
		{:else}
			<a
				class={{ current: !page?.params.type }}
				href={resolve('/pokedex/[type=pokemonType]', { type: unType })}>{unType}</a
			>
		{/if}
	{/each}
</ul>
<Pokedex {pokemons} {pokedex} />

<style>
	a {
		padding: 10px;
	}
	a.current {
		color: black;
	}
</style>

