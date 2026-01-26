<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	const { children, data } = $props();

	const { types } = $derived(data);
	const {
		params: { type: currentType }
	} = $derived(page);
</script>

<h1>Pokédex</h1>

<nav>
	<ul>
		{#each types as type (type)}
			{@const current = currentType === type}
			<li>
				{#if current}
					<a href={resolve('/pokedex')} class={{ current }}>{type}</a>
				{:else}
					<a href={resolve('/pokedex/[type=pokemonType]', { type })} class={{ current }}>{type}</a>
				{/if}
			</li>
		{/each}
	</ul>
</nav>

<main>
	{@render children()}
</main>

<style>
	h1 {
		margin-bottom: 1rem;
	}
	nav {
		width: 90%;
	}
	ul {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		justify-content: center;
	}
</style>
