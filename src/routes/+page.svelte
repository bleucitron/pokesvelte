<script lang="ts">
	import { invalidate } from '$app/navigation';
	import Grass from '$lib/components/Grass.svelte';
	import Wild from '$lib/components/Wild.svelte';

	const choices = [1, 4, 7];

	const { data } = $props();
	const { pokemons, teamSize, population } = $derived(data);

	const started = $derived(teamSize > 0);

	async function catchPokemon(id: number) {
		await fetch(`/team`, { method: 'POST', body: JSON.stringify({ id }) });
		invalidate('team:update');
		const name = pokemons[id - 1].name;
		console.log(`Vous avez capturé un ${name} (id: ${id}) !`);
	}
</script>

<h1>Pokésvelte</h1>
<p>Gotta svelt'em all!</p>

<div class="home">
	{#if !started}
		<p>Choisissez un Pokémon</p>
		<ul>
			{#each choices as choice}
				{@const { id, name, sprites } = pokemons[choice - 1]}
				{@const sprite = sprites.front_default}
				<li>
					<Wild {name} src={sprite} catchPokemon={() => catchPokemon(id)} />
				</li>
			{/each}
		</ul>
	{:else}
		<Grass {pokemons} {catchPokemon}>
			{#snippet infos()}
				<section>
					{#await population}
						<p>Scan de la zone...</p>
					{:then nb}
						<p>{nb} pokémons présents</p>
					{/await}
				</section>
			{/snippet}
		</Grass>
	{/if}
</div>

<style>
	.home {
		display: flex;
		flex-flow: column;
		flex: 1 0;
	}

	ul {
		display: flex;
		justify-content: center;
	}

	section {
		position: absolute;
		bottom: 1rem;
		right: 1rem;
	}
</style>
