<script lang="ts">
	import { page } from '$app/stores';

	const { children, data } = $props();
	const { types } = $derived(data);
</script>

<h1>Pokédex</h1>

<nav>
	<ul>
		{#each types as type}
			{@const current = $page.params.type === type}
			{@const href = current ? '/pokedex' : `/pokedex/${type}`}

			<li><a {href} class:current>{type}</a></li>
		{/each}
	</ul>
</nav>

{@render children()}

<style>
	h1 {
		margin-bottom: 1rem;
	}
	nav {
		width: 70%;
	}
	ul {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		justify-content: center;
	}
</style>
