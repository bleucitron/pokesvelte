<script lang="ts">
	import { onMount } from 'svelte';

	type WildProps = {
		name: string;
		src: string;
		catchPokemon: () => void;
		escape?: () => void;
	};

	const { name, src, escape, catchPokemon }: WildProps = $props();

	onMount(() => {
		const timeout = escape && setTimeout(escape, 1000);
		return () => clearTimeout(timeout);
	});
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
