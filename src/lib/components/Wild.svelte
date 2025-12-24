<script lang="ts">
	type WildProps = {
		name: string;
		src: string;
		catchPokemon: () => void;
	};
	const { name, src, catchPokemon }: WildProps = $props();
</script>

<button class="Wild" onclick={catchPokemon}>
	<img {src} alt="Un {name} sauvage apparaît !" />
</button>

<style>
	.Wild {
		width: 15rem;
		background: inherit;
	}

	img {
		height: 15rem;
		object-fit: cover;
	}
	img:hover {
		filter: drop-shadow(0px 0px 10px #333);
	}
</style>
