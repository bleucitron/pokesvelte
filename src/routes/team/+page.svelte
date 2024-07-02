<script lang="ts">
	import { recent } from '$lib/stores/index.svelte';
	import { invalidate } from '$app/navigation';

	const { data } = $props();

	const { pokemons, team } = $derived(data);

	const main = $derived(team.filter((p) => p.main));
	const other = $derived(team.filter((p) => !p.main));

	async function release(uuid: string) {
		await fetch(`/team/${uuid}`, { method: 'DELETE' });
		invalidate('team:update');
	}
</script>

<h1>Mon équipe</h1>

<h2>Titulaires</h2>
<ul>
	{#each main as member}
		{@const { id, uuid } = member}
		{@const pokemon = pokemons[id - 1]}
		{@const recentMember = recent.members.includes(uuid)}
		{#if pokemon}
			{@const { name, sprites } = pokemon}
			{@const src = sprites.front_default}

			<li>
				<img {src} alt={name} width="96" height="96" loading="lazy" />
				<input bind:value={member.name} />
				<label>Sélection<input type="checkbox" bind:checked={member.main} /></label>
				<button onclick={() => release(uuid)}>x</button>
			</li>
		{/if}
	{/each}
</ul>
<h2>Remplaçants</h2>
<ul>
	{#each other as member}
		{@const { id, uuid } = member}
		{@const pokemon = pokemons[id - 1]}
		{#if pokemon}
			{@const { name, sprites } = pokemon}
			{@const src = sprites.front_default}

			<li>
				<img {src} alt={name} width="96" height="96" loading="lazy" />
				<input bind:value={member.name} />
				<label>Sélection<input type="checkbox" bind:checked={member.main} /></label>
				<button onclick={() => release(uuid)}>x</button>

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
		gap: 2rem;
	}

	li {
		position: relative;
		display: flex;
		flex-flow: column;
		align-items: center;
		gap: 0.5rem;
	}
	li button {
		position: absolute;
		top: 0;
		right: 0;
	}

	input:not([type='checkbox']) {
		width: 12rem;
		text-align: center;
	}

	label {
		display: flex;
		gap: 0.5rem;
		align-items: baseline;
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
