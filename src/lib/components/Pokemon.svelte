<script lang="ts">
	type PokemonProps = { id: number; name: string; src: string };

	const { id, name, src }: PokemonProps = $props();
</script>

<div class="Pokemon">
	<p>#{id}</p>
	<img {src} alt={name} />
	<p>{name}</p>
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
	}
</style>
