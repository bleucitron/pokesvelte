<script lang="ts">
	type WildProps = {
		name: string;
		src: string;
		catchPokemon: () => void;
	};

	const { name, src, catchPokemon }: WildProps = $props();
</script>

<button onclick={catchPokemon}>
	<img {src} alt="Un {name} sauvage apparaît !" />
</button>

<style>
	button:hover {
		background: inherit;
	}
	img:hover {
		filter: drop-shadow(0px 0px 10px #333);
	}
</style>
