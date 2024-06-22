<script lang="ts">
	type WildProps = {
		src: string;
		catchPokemon: () => void;
	};

	const { src, catchPokemon }: WildProps = $props();
</script>

<button onclick={catchPokemon}>
	<img {src} />
</button>

<style>
	button:hover {
		background: inherit;
	}
	img:hover {
		filter: drop-shadow(0px 0px 10px #333);
	}
</style>
