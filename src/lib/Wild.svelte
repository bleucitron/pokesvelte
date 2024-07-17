<script lang="ts">
	type WildProps = {
		name: string | undefined;
		src: string | undefined;
		catchPokemon: () => void;
		escape?: () => void;
	};
	const { name, src, escape, catchPokemon }: WildProps = $props();

	let width = $state(0);
	let height = $state(0);
	$inspect(width, height);

	$effect(() => {
		const timeoutId = escape
			? setTimeout(() => {
					escape();
				}, 2000)
			: undefined;

		return () => clearTimeout(timeoutId);
	});
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

<button class="Wild" onclick={catchPokemon}>
	<img {src} alt={name} />
</button>

<style>
</style>
