<script lang="ts">
	const { data } = $props();
	const { pokemons } = $derived(data);
	import { team } from '$lib/states/team.svelte.js';
</script>

<h1>TEAM</h1>
<ul>
	{#each team.members as member (member.uuid)}
		{@const p = pokemons[member.id - 1]}
		{#if p}
			{@const src = p.sprites.front_default}
			<li>
				<img {src} alt="pokémon img" />
				<p>{member.name}</p>
				<button
					onclick={() => {
						// team.removeMember(member.uuid);
								fetch("/team/"+ member.uuid, {method:"DELETE"})

					}}>Free</button
				>
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
</style>

