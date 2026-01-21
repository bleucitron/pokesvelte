<script lang="ts">
	import { resolve } from '$app/paths';
	import { recent } from '$lib/states/recent.svelte';
	import type { Pokemon } from '$lib/types';

	let search = $state('');

	type Props = {
		pokedex: number[];
		pokemons: Pokemon[];
	};
	const { pokedex, pokemons }: Props = $props();

	const cleanSearch = $derived(search.toLowerCase());
	const pokemonsToDisplay = $derived(
		cleanSearch ? pokemons.filter((p) => p.name.includes(cleanSearch)) : pokemons
	);
</script>

<input bind:value={search} placeholder="recherche..." />

<ul>
	{#each pokemonsToDisplay as pokemon}
		{@const { id, sprites, name } = pokemon}
		{@const found = pokedex.includes(id)}
		{@const isRecent = recent.species.includes(id)}
		{@const src = sprites.front_default}

		<li class={{ found, recent: isRecent }}>
			<a href={resolve('/pokedex/[id=pokemonId]', { id: id.toString() })}>
				<img {src} width="96" height="96" loading="lazy" alt="Un {name}" />
			</a>
			{#if isRecent}
				<div class="new">new</div>
			{/if}
		</li>
	{/each}
</ul>

<style>
	ul {
		display: flex;
		flex-wrap: wrap;
		margin-block: 1rem;
		gap: 1rem;
	}

	li {
		position: relative;
	}
	li img {
		filter: contrast(0%) brightness(200%);
	}
	li:hover img {
		filter: contrast(0%) brightness(200%) drop-shadow(0px 0px 10px #333);
	}
	li.found img {
		filter: none;
	}
	li.found:hover img {
		filter: drop-shadow(0px 0px 10px #333);
	}
	li .new {
		position: absolute;
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
