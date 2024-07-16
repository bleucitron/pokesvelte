<script lang="ts">
	type PokemonProps = {
		name: string | undefined;
		id: number;
		src: string | undefined;
		found?: boolean;
	};
	const { name, id, src, found = false }: PokemonProps = $props();
</script>

<div class="Pokemon" class:found>
	<p>#{id}</p>

	<img {src} />

	<h1>{found ? name : '???'}</h1>
</div>

<style>
	.Pokemon {
		display: flex;
		flex-flow: column;
		align-items: center;
		width: 15rem;
		margin: auto;
	}
	p {
		margin: 0;
		font-size: 1.5rem;
		text-transform: capitalize;
	}
	img {
		height: 15rem;
		object-fit: cover;
		filter: contrast(0%) brightness(200%);
	}
	.found img {
		filter: none;
	}
</style>
