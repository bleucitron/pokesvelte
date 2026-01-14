<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { recent } from '$lib/states/recent.svelte';

	const { data } = $props();
	const { pokemons, team } = $derived(data);

	async function release(uuid: string) {
		await fetch(`/team/${uuid}`, { method: 'DELETE' });

		invalidate('team:update');
	}
</script>

<h1>Équipe</h1>

<ul>
	{#each team as member}
		{@const { id, uuid, name } = member}
		{@const pokemon = pokemons[id - 1]}
		{@const isRecent = recent.members.includes(uuid)}

		{#if pokemon}
			{@const { sprites } = pokemon}
			{@const src = sprites.front_default}
			<li>
				<img {src} width="96" height="96" loading="lazy" alt={name} />
				<p>{name}</p>
				<button onclick={() => release(uuid)}>x</button>{#if isRecent}
					<div class="new">new</div>
				{/if}
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
		position: relative;
		display: flex;
		align-items: center;
	}
	li .new {
		position: absolute;
		content: 'new';
		top: 0;
		left: 0;
		background: orange;
		border-radius: 8px;
		padding: 0.2rem;
		padding-top: 0.4rem;
		font-size: 0.7rem;
		border: 2px solid #888;
		line-height: 0.8rem;
	}
</style>
