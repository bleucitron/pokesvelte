<script lang="ts">
	import Wild from '$lib/components/Wild.svelte';
	import type { TeamMember } from '$lib/server/team';
	import { recent } from '$lib/stores/index.svelte';
	import { getRandomNb } from '$lib/utils';

	const choices = [1, 4, 7];

	const { data } = $props();
	const { pokemons, teamSize } = $derived(data);

	const started = $derived(teamSize > 0);

	let wildId = $state<number | undefined>(25);
	$effect(() => {
		const interval = started
			? setInterval(() => {
					const id = getRandomNb(pokemons.length) + 1;
					wildId = id;
					console.log(`Un ${pokemons[id - 1]?.name} sauvage apparaît`);
				}, 2_000)
			: undefined;

		return () => clearInterval(interval);
	});

	async function catchPokemon(id: number, name: string) {
		const member = (await fetch(`/team`, { method: 'POST', body: JSON.stringify({ id }) }).then(
			(r) => r.json()
		)) as TeamMember;

		recent.add({ id, uuid: member.uuid });
		console.log(`Vous avez capturé un ${name} (id: ${id}) !`);
	}
</script>

<h1>Pokésvelte</h1>
<p>Gotta svelt'em all!</p>

<div class="grass">
	{#if !started}
		<p>Choisissez un Pokémon</p>
		<ul>
			{#each choices as choice}
				{@const pokemon = pokemons[choice - 1]}
				{#if pokemon}
					{@const { id, name, sprites } = pokemon}
					<li>
						<Wild {name} src={sprites.front_default} catchPokemon={() => catchPokemon(id, name)} />
					</li>
				{/if}
			{/each}
		</ul>
	{:else}
		<p>Attrapez les Pokémons !!!</p>
		{#if wildId}
			{@const wildPokemon = pokemons[wildId - 1]}
			{#if wildPokemon}
				{@const { id, name, sprites } = wildPokemon}
				{@const src = sprites.front_default}
				<Wild
					{name}
					{src}
					catchPokemon={() => catchPokemon(id, name)}
					escape={() => (wildId = undefined)}
				/>
			{/if}
		{/if}
	{/if}
</div>

<style>
	.grass {
		display: flex;
		flex-flow: column;
		flex: 1 0;
	}

	ul {
		display: flex;
		justify-content: center;
	}
</style>
