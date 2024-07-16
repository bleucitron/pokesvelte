<script lang="ts">
	import Wild from '$lib/Wild.svelte';
	import { pokedex } from '$lib/stores/index.svelte';

	const { data } = $props();
	const { pokemons } = $derived(data);

	const found = $derived(pokedex.found);
	const started = $derived(found.length > 0);

	function catchPokemon(id: number, name?: string) {
		pokedex.discover(id);
		console.log('attrapé', name);
	}

	$inspect(found);
</script>

<h1>Pokésvelte</h1>
<p>Gotta svelt'em all!</p>

<p>Trouvés: {found.length}</p>

{#if !started}
	<div class="house">
		{#each [1, 4, 7] as wildId}
			{@const pokemon = pokemons[wildId - 1]}
			{@const src = pokemon?.sprites?.front_default}
			{@const name = pokemon?.name}

			<Wild {src} {name} catchPokemon={() => catchPokemon(wildId, name)} />
		{/each}
	</div>
{:else}
	<p>Le jeu est commencé</p>
{/if}

<style>
	.house {
		display: flex;
	}
</style>
