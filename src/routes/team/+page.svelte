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
		{@const { id, uuid, main, name } = member}
		{@const { sprites, name: speciesName } = pokemons[id - 1]}
		{@const src = sprites.front_default}

		<li>
			<img {src} alt={speciesName} width="96" height="96" loading="lazy" />
			<form action="?/rename" method="POST">
				<input name="name" value={name} />
				<input name="uuid" type="hidden" value={uuid} />
				<button>Renommer</button>
				<button class:main formaction="?/toggle">Titulariser</button>
			</form>
			<button onclick={() => release(uuid)}>x</button>
		</li>
	{/each}
</ul>
<h2>Remplaçants</h2>
<ul>
	{#each other as member}
		{@const { id, uuid, main, name } = member}
		{@const { sprites, name: speciesName } = pokemons[id - 1]}
		{@const src = sprites.front_default}

		<li>
			<img {src} alt={speciesName} width="96" height="96" loading="lazy" />
			<form action="?/rename" method="POST">
				<input name="name" value={name} />
				<input name="uuid" type="hidden" value={uuid} />
				<button>Renommer</button>
				<button class:main formaction="?/toggle">Titulariser</button>
			</form>
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
	li > button {
		position: absolute;
		top: 0;
		right: 0;
	}

	form {
		display: flex;
		flex-flow: column;
	}

	form > button.main {
		background: #888;
		color: white;
	}

	input:not([type='checkbox']) {
		width: 12rem;
		text-align: center;
	}
</style>
