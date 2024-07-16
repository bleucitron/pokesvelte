<script lang="ts">
	import Wild from '$lib/Wild.svelte';

	const { data } = $props();

	let started = $state(false);

	function logName(name?: string) {
		console.log('attrapé', name);
	}
</script>

<h1>Pokésvelte</h1>
<p>Gotta svelt'em all!</p>

<button onclick={() => (started = !started)}>Commencer</button>
{#if !started}
	<div class="house">
		{#each [1, 4, 7] as wildId}
			{@const pokemon = data.pokemons[wildId - 1]}
			{@const src = pokemon?.sprites?.front_default}
			{@const name = pokemon?.name}

			<Wild {src} {name} catchPokemon={() => logName(name)} />
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
