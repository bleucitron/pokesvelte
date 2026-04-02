<script lang="ts">
	import { onMount } from 'svelte';

	type Props = {
		name: string;
		src: string;
		catchPokemon: () => void;
		escape?: () => void;
	};
	const { name, src, catchPokemon, escape }: Props = $props();

	onMount(() => {
		if(escape) {
			const time = setTimeout(() => {
				escape();
			}, 2000)
			return () => clearTimeout(time);
		}
	})
</script>

<button class={['Wild']} onclick={catchPokemon}>
	<img {src} alt={name} />
</button>

