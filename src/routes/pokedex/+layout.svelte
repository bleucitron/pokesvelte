<script lang="ts">
	import { page } from '$app/stores';

	const { data, children } = $props();
	const { types } = $derived(data);
</script>

<h1>Pokédex</h1>

<nav>
	<ul>
		{#each types as type}
			{@const current = $page.params.type === type}
			{@const href = current ? '/pokedex' : `/pokedex/types/${type}`}

			<li>
				<a {href} class:current>{type}</a>
			</li>
		{/each}
	</ul>
</nav>

{@render children()}

<style>
	nav ul {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-bottom: 1rem;
	}
</style>
