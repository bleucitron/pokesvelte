<script lang="ts">
	import { team } from '$lib/stores/index.svelte';

	const { data } = $props();

	async function fire(uuid: number) {
		await fetch('/team/' + uuid, {
			method: 'DELETE'
		});
		console.log('Le pokemon a été supprimé');
	}
</script>

<h1>Team</h1>

<ul>
	{#each team.members as { id, uuid }}
		{@const pokemon = data.pokemons[id - 1]}
		<li>
			<img src={pokemon?.sprites.front_default} alt={pokemon?.name} />
			<p>{uuid}</p>
			<button onclick={() => fire(uuid)}>x</button>
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
