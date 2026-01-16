<script lang="ts">
	import { onMount } from 'svelte';

	type WildProps = {
		name: string;
		src: string;
		catchPokemon: () => void;
		escape?: () => void;
	};

	const { name, src, catchPokemon, escape }: WildProps = $props();

	let height = $state(0);
	let width = $state(0);

	onMount(() => {
		const timeout = escape ? setTimeout(escape, 1000) : undefined;

		console.log({ height, width });

		return () => clearTimeout(timeout);
	});
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

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
