<script lang="ts">
	import Wild from '$lib/components/Wild.svelte';

	const choices = [1, 4, 7];

	const { data } = $props();

	let started = $state(false);
	let found = $state<number[]>([]);

	$inspect(found);

	function catchPokemon(id: number, name: string) {
		if (!found.includes(id)) found.push(id);
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
				{@const { id, name, sprites } = data.pokemons[choice - 1]}
				<li>
					<Wild {name} src={sprites.front_default} catchPokemon={() => catchPokemon(id, name)} />
				</li>
			{/each}
		</ul>
		<p>Découverts : {found.length}</p>
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
