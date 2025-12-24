<script lang="ts">
	type Pokemon = {
		id: number;
		name: string;
		src: string;
	};
	const { id, name, src }: Pokemon = $props();
</script>

<div class="Pokemon">
	<p>#{id}</p>
	<img {src} />
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
