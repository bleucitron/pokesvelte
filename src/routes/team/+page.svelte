<script lang="ts">
	import { enhance } from '$app/forms';
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

{#snippet memberList(members)}
	<ul>
		{#each members as member}
			{@const { id, uuid, main, name } = member}
			{@const { sprites, name: speciesName } = pokemons[id - 1]}
			{@const src = sprites.front_default}

			<li>
				<img {src} alt={speciesName} width="96" height="96" loading="lazy" />
				<form action="?/rename" method="POST" use:enhance>
					<input name="name" value={name} />
					<input name="uuid" type="hidden" value={uuid} />
					<button>Renommer</button>
					<button class:main formaction="?/toggle">Titulariser</button>
				</form>
				<button onclick={() => release(uuid)}>x</button>
			</li>
		{/each}
	</ul>
{/snippet}

<h2>Titulaires</h2>
{@render memberList(main)}

<h2>Remplaçants</h2>
{@render memberList(other)}

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
