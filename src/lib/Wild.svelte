<script lang="ts">
	type WildProps = {
		src: string | undefined;
		catchPokemon: () => void;
	};
	const { src, catchPokemon }: WildProps = $props();
</script>

<button class="Wild" onclick={catchPokemon}>
	<img {src} />
</button>

<style>
</style>
