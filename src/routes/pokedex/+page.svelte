<script lang="ts">
	import { resolve } from '$app/paths';

	const { data } = $props(); // l'heure n'est pas encore venue d'en apprendre plus sur $props
</script>

<h1>Pokédex</h1>

<ul>
	{#each data.pokemons as pokemon}
		{@const { id, sprites, name } = pokemon}
		{@const src = sprites.front_default}
		<li class={{ found: id % 2 === 0 }}>
			<a href={resolve('/pokedex/[id]', { id: id.toString() })}>
				<img {src} width="96" height="96" loading="lazy" alt="Un {name}" />
			</a>
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
</style>
