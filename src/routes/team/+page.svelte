<script lang="ts">
	import { team } from '$lib/states/team.svelte';

	const { data } = $props();
	const { pokemons } = $derived(data);
</script>

<h1>Équipe</h1>

<ul>
	{#each team.members as member}
		{@const { id, uuid, name } = member}
		{@const pokemon = pokemons[id - 1]}

		{#if pokemon}
			{@const { sprites } = pokemon}
			{@const src = sprites.front_default}
			<li>
				<img {src} width="96" height="96" loading="lazy" alt={name} />
				<p>{name}</p>
				<button
					onclick={() => {
						fetch(`/team/${uuid}`, { method: 'DELETE' });
					}}>x</button
				>
			</li>
		{/if}
	{:else}
		<p>Aucun membre</p>
	{/each}
</ul>

<style>
	ul {
		display: flex;
		flex-wrap: wrap;
		margin-block: 1rem;
		gap: 1rem;
	}

	li {
		display: flex;
		align-items: center;
	}
</style>
