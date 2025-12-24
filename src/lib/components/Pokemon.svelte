<script lang="ts">
	const id = 133;
	const name = 'Évoli';
	const image = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png';
</script>

<div class="Pokemon">
	<p>#{id}</p>
	<img src={image} />
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
