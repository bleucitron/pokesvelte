<script lang="ts">
	import { invalidate } from '$app/navigation';
	import Wild from '$lib/components/Wild.svelte';
	import type { TeamMember } from '$lib/server/db/team';
	import { recent } from '$lib/states/recent.svelte';
	import { getRandomNb } from '$lib/utils';

	const { data } = $props();

	let wild = $state<number | undefined>(25);

	const { pokemons, teamSize } = $derived(data);
	const started = $derived(!!teamSize);

	$effect(() => {
		const interval = started
			? setInterval(() => {
					wild = getRandomNb(1, 151);
					console.log(data.pokemons[wild - 1]?.name);
				}, 2000)
			: undefined;

		return () => clearInterval(interval);
	});

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

	function escape() {
		wild = undefined;
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
					<Wild {name} src={sprites.front_default} catchPokemon={() => catchPokemon(id)} />
				{/if}
			{/each}
		</ul>
	{:else if wild}
		{@const wildPokemon = data.pokemons[wild - 1]}
		{#if wildPokemon}
			{@const { id, name, sprites } = wildPokemon}
			<Wild {name} src={sprites.front_default} catchPokemon={() => catchPokemon(id)} {escape} />
		{/if}
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
