<script lang="ts">
	import { recent } from '$lib/stores/index.svelte';

	const { data } = $props();

	const { pokemons, team } = $derived(data);
</script>

<h1>Mon équipe</h1>

<ul>
	{#each team as member}
		{@const { id, uuid } = member}
		{@const pokemon = pokemons[id - 1]}
		{@const recentMember = recent.members.includes(uuid)}
		{#if pokemon}
			{@const { name, sprites } = pokemon}
			{@const src = sprites.front_default}

			<li>
				<img {src} alt={name} width="96" height="96" loading="lazy" />
				<p>{uuid}</p>
				<button onclick={() => fetch(`/team/${uuid}`, { method: 'DELETE' })}>x</button>
				{#if recentMember}
					<div class="new">new</div>
				{/if}
			</li>
		{/if}
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
