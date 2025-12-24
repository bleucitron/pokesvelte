<script lang="ts">
	import Wild from '$lib/components/Wild.svelte';

	const { data } = $props();

	let started = false;

	const choices = [1, 4, 7];
</script>

<h1>Pokésvelte</h1>
<p>Gotta svelt'em all!</p>

<div class="grass">
	{#if !started}
		<p>Choisissez un Pokémon</p>

		<ul>
			{#each choices as choice}
				{@const pokemon = data.pokemons[choice - 1]}
				{#if pokemon}
					{@const { id, name, sprites } = pokemon}
					<Wild
						src={sprites.front_default}
						catchPokemon={() => {
							console.log(`Vous avez capturé un ${name} (id: ${id}) !`);
						}}
					/>
				{/if}
			{/each}
		</ul>
	{:else}
		<p>Work in progress...</p>
	{/if}
</div>

<style>
	.grass {
		display: flex;
		flex-flow: column;
		justify-content: center;
		flex: 1 0;
	}

	p {
		text-align: center;
	}

	ul {
		display: flex;
		justify-content: center;
	}
</style>
