<script lang="ts">
	import { onMount } from 'svelte';
	import { getRandomNb } from '$lib/utils';


	type Props = {
		name: string;
		src: string;
		catchPokemon: () => void;
		escape?: () => void;
	};
	const { name, src, catchPokemon, escape }: Props = $props();


	let top = $state(0)
	let left = $state(0)

	let innerHeight = $state(0)
	let innerWidth = $state(0)


$inspect(innerHeight,innerWidth)

	onMount(() => {
		if(escape) {


			top = getRandomNb(0,innerHeight)
			left = getRandomNb(0,innerWidth)

			const time = setTimeout(() => {
				escape();
			}, 2000)
			return () => clearTimeout(time);
		}
	})



</script>

<button class={['Wild']} onclick={catchPokemon} style:top={top+"px"} style:left={left+"px"}>
	<img {src} alt={name} />
</button>

<svelte:window bind:innerWidth bind:innerHeight />

<style>
	button {
			position: fixed;
	}

</style>