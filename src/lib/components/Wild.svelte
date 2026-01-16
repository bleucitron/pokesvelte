<script lang="ts">
	import { getRandomNb } from '$lib/utils';
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

	const MARGIN = 50;
	let top = $state(0);
	let left = $state(0);

	onMount(() => {
		if (!escape) return;

		const timeout = setTimeout(escape, 1000);

		top = getRandomNb(-MARGIN, height - MARGIN);
		left = getRandomNb(-MARGIN, width - MARGIN);

		return () => clearTimeout(timeout);
	});
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

<button
	class={['Wild', { 'in-grass': !!escape }]}
	style:top="{top}px"
	style:left="{left}px"
	onclick={catchPokemon}
>
	<img {src} alt="Un {name} sauvage apparaît !" />
</button>

<style>
	.Wild {
		width: 15rem;
		background: inherit;
	}

	.in-grass {
		position: fixed;
	}

	img {
		height: 15rem;
		object-fit: cover;
	}
	img:hover {
		filter: drop-shadow(0px 0px 10px #333);
	}
</style>
