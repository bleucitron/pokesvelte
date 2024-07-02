<script lang="ts">
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
		{@const { name, sprites } = pokemons[id - 1]}
		{@const src = sprites.front_default}

		<li>
			<img {src} alt={name} width="96" height="96" loading="lazy" />
			<input bind:value={member.name} />
			<label>Sélection<input type="checkbox" bind:checked={member.main} /></label>
			<button onclick={() => release(uuid)}>x</button>
		</li>
	{/each}
</ul>
<h2>Remplaçants</h2>
<ul>
	{#each other as member}
		{@const { id, uuid } = member}
		{@const { name, sprites } = pokemons[id - 1]}
		{@const src = sprites.front_default}

		<li>
			<img {src} alt={name} width="96" height="96" loading="lazy" />
			<input bind:value={member.name} />
			<label>Sélection<input type="checkbox" bind:checked={member.main} /></label>
			<button onclick={() => release(uuid)}>x</button>
		</li>
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
</style>
