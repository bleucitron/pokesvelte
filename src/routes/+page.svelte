<script lang="ts">
	import Wild from '$lib/components/Wild.svelte';

	const choices = [1, 4, 7];

	const { data } = $props();

	let started = $state(false);
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
					<Wild
						{name}
						src={sprites.front_default}
						catchPokemon={() => {
							console.log(`Vous avez capturé un ${name} (id: ${id}) !`);
						}}
					/>
				</li>
			{/each}
		</ul>
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
