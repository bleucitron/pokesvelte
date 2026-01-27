<script lang="ts">
	type Props = {
		name: string;
		src: string;
		catchPokemon: () => void;
	};
	const { name, src, catchPokemon }: Props = $props();
</script>

<button class={['Wild']} onclick={catchPokemon}>
	<img {src} alt={name} />
</button>

