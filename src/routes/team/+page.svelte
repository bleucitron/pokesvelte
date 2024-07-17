<script lang="ts">
	import { invalidateAll } from '$app/navigation';

	const { data } = $props();
	const { team } = $derived(data);
	const mainMembers = $derived(team.filter((m) => m.main));
	const otherMembers = $derived(team.filter((m) => !m.main));

	async function fire(uuid: string) {
		await fetch('/team/' + uuid, {
			method: 'DELETE'
		});
		invalidateAll();
		console.log('Le pokemon a été supprimé');
	}
</script>

<h1>Team</h1>

<h2>Titulaires</h2>
<ul>
	{#each mainMembers as member}
		{@const { id, uuid, name } = member}
		{@const pokemon = data.pokemons[id - 1]}
		<li>
			<img src={pokemon?.sprites.front_default} alt={pokemon?.name} />
			<p>{name}</p>
			<button onclick={() => fire(uuid)}>x</button>
			<input type="checkbox" bind:checked={member.main} />
		</li>
	{/each}
</ul>

<h2>Remplaçants</h2>
<ul>
	{#each otherMembers as member}
		{@const { id, uuid, name } = member}
		{@const pokemon = data.pokemons[id - 1]}
		<li>
			<img src={pokemon?.sprites.front_default} alt={pokemon?.name} />
			<p>{name}</p>
			<button onclick={() => fire(uuid)}>x</button>
			<input type="checkbox" bind:checked={member.main} />
		</li>
	{/each}
</ul>

<style>
	ul {
		display: flex;
		gap: 1rem;
	}
	li {
		position: relative;
		display: flex;
		flex-flow: column;
		align-items: center;
	}
	button {
		position: absolute;
		top: 0;
		right: 0;
	}
</style>
