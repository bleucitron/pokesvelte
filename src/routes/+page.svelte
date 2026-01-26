<script lang="ts">
	import { invalidate } from '$app/navigation';
	import Grass from '$lib/components/Grass.svelte';
	import Wild from '$lib/components/Wild.svelte';
	import type { TeamMember } from '$lib/server/db/team';
	import { recent } from '$lib/states/recent.svelte';

	const { data } = $props();

	const { pokemons, teamSize, population } = $derived(data);
	const started = $derived(!!teamSize);

	const choices = [1, 4, 7];

	async function catchPokemon(id: number) {
		const pokemon = data.pokemons[id - 1];

		if (pokemon) {
			const member = (await fetch('/team', { method: 'POST', body: JSON.stringify({ id }) }).then(
				(r) => r.json()
			)) as TeamMember;
			invalidate('team:update');
			recent.add(member.id, member.uuid);

			console.log(`Vous avez capturé un ${pokemon.name} (id: ${id}) !`);
		}
	}
</script>

<h1>Pokésvelte</h1>
<p>Gotta svelt'em all!</p>

<div class="home">
	{#if !started}
		<p>Choisissez un Pokémon</p>

		<ul>
			{#each choices as choice (choice)}
				{@const pokemon = pokemons[choice - 1]}
				{#if pokemon}
					{@const { id, name, sprites } = pokemon}
					<Wild {name} src={sprites.front_default} catchPokemon={() => catchPokemon(id)} />
				{/if}
			{/each}
		</ul>
	{:else}
		<Grass {pokemons} {catchPokemon}>
			<aside>
				{#await population}
					<p>Scanning...</p>
				{:then nb}
					<p>{nb} Pokémons dans les environs</p>
				{/await}
			</aside>
		</Grass>
	{/if}
</div>

<style>
	.home {
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

	aside {
		position: absolute;
		bottom: 1rem;
		right: 1rem;
	}
</style>
