<script lang="ts">
	import { invalidate } from '$app/navigation';
	import Grass from '$lib/components/Grass.svelte';
	import Wild from '$lib/components/Wild.svelte';
	import type { TeamMember } from '$lib/server/team';
	import { recent } from '$lib/stores/index.svelte';

	const choices = [1, 4, 7];

	const { data } = $props();
	const { pokemons, teamSize, population } = $derived(data);

	const started = $derived(teamSize > 0);

	async function catchPokemon(id: number) {
		const member = (await fetch(`/team`, { method: 'POST', body: JSON.stringify({ id }) }).then(
			(r) => r.json()
		)) as TeamMember;

		recent.add({ id, uuid: member.uuid });
		invalidate('team:update');
		const name = pokemons[id - 1]?.name;
		if (name) {
			console.log(`Vous avez capturé un ${name} (id: ${id}) !`);
		}
	}
</script>

<h1>Pokésvelte</h1>
<p>Gotta svelt'em all!</p>

<div class="home">
	{#if !started}
		<p>Choisissez un Pokémon</p>
		<ul>
			{#each choices as choice}
				{@const pokemon = pokemons[choice - 1]}
				{#if pokemon}
					{@const { id, name, sprites } = pokemon}
					{@const sprite = sprites.front_default}
					<li>
						<Wild {name} src={sprite} catchPokemon={() => catchPokemon(id)} />
					</li>
				{/if}
			{/each}
		</ul>
	{:else}
		<Grass {pokemons} {catchPokemon} />
	{/if}
	<section>
		{#await population}
			<p>Scan de la zone...</p>
		{:then nb}
			<p>{nb} pokémons présents</p>
		{/await}
	</section>
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
