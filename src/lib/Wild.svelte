<script lang="ts">
	type WildProps = {
		name: string | undefined;
		src: string | undefined;
		catchPokemon: () => void;
		escape?: () => void;
	};
	const { name, src, escape, catchPokemon }: WildProps = $props();

	$effect(() => {
		const timeoutId = escape
			? setTimeout(() => {
					escape();
				}, 2000)
			: undefined;

		return () => clearTimeout(timeoutId);
	});
</script>

<button class="Wild" onclick={catchPokemon}>
	<img {src} alt={name} />
</button>

<style>
</style>
