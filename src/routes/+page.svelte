<script lang="ts">
	import Wild from '$lib/components/Wild.svelte';

	const choices = [1, 4, 7];

	const { data } = $props();

	let started = $state(false);
	let foundSpecies = $state<number[]>([]);

	function catchPokemon(id: number, name: string) {
		if (!foundSpecies.includes(id)) foundSpecies.push(id);
		console.log(`Vous avez capturé un ${name} (id: ${id}) !`);
	}
</script>

<h1>Pokésvelte</h1>
<p>Gotta svelt'em all!</p>

<button onclick={() => (started = !started)}>
	{#if !started}
		Start
	{:else}
		Restart
	{/if}
</button>

<div class="grass">
	{#if !started}
		<p>Choisissez un Pokémon</p>
		<ul>
			{#each choices as choice}
				{@const pokemon = data.pokemons[choice - 1]}
				{#if pokemon}
					{@const { id, name, sprites } = pokemon}
					<li>
						<Wild {name} src={sprites.front_default} catchPokemon={() => catchPokemon(id, name)} />
					</li>
				{/if}
			{/each}
		</ul>
		<p>Découverts : {foundSpecies.length}</p>
	{:else}
		<p>Work in progress</p>
	{/if}
</div>

<style>
	.grass {
		display: flex;
		flex-flow: column;
		justify-content: center;
		flex: 1 0;
	}

	ul {
		display: flex;
		justify-content: center;
	}
</style>
