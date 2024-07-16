<script lang="ts">
	type WildProps = {
		name: string | undefined;
		src: string | undefined;
		catchPokemon: () => void;
	};
	const { name, src, catchPokemon }: WildProps = $props();
</script>

<button class="Wild" onclick={catchPokemon}>
	<img {src} alt={name} />
</button>

<style>
</style>
