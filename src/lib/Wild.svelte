<script lang="ts">
	import { onMount } from 'svelte';
	import { getRandomNb } from './utils';

	type WildProps = {
		name: string | undefined;
		src: string | undefined;
		catchPokemon: () => void;
		escape?: () => void;
	};
	const { name, src, escape, catchPokemon }: WildProps = $props();

	let width = $state(0);
	let height = $state(0);
	let top = $state('');
	let left = $state('');

	onMount(() => {
		top = `${getRandomNb(height - 50)}px`;
		left = `${getRandomNb(width - 50)}px`;

		const timeoutId = escape
			? setTimeout(() => {
					escape();
				}, 2000)
			: undefined;

		return () => clearTimeout(timeoutId);
	});
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

<button class="Wild" style:top style:left onclick={catchPokemon}>
	<img {src} alt={name} />
</button>

<style>
	.Wild {
		position: fixed;
	}
</style>
