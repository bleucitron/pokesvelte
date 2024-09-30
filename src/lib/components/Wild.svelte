<script lang="ts">
	import { getRandomNb } from '$lib/utils';
	import { onMount } from 'svelte';

	type WildProps = {
		name: string;
		src: string;
		catchPokemon: () => void;
		escape?: () => void;
	};

	const { name, src, escape, catchPokemon }: WildProps = $props();

	const MARGIN = 30;

	let width = $state(0);
	let height = $state(0);
	let top = $state(0);
	let left = $state(0);

	onMount(() => {
		const lifespan = getRandomNb(1_000, 3_000);
		const timeout = escape && setTimeout(escape, lifespan);

		if (escape) {
			top = getRandomNb(MARGIN, height - MARGIN);
			left = getRandomNb(MARGIN, width - MARGIN);
		}

		return () => clearTimeout(timeout);
	});
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

<button class:inGrass={!!escape} style:top="{top}px" style:left="{left}px" onclick={catchPokemon}>
	<img {src} alt="Un {name} sauvage apparaît !" />
</button>

<style>
	.inGrass {
		position: fixed;
	}
	button:hover {
		background: inherit;
	}
	img:hover {
		filter: drop-shadow(0px 0px 10px #333);
	}
</style>
