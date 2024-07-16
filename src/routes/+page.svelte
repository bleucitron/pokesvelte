<script>
	import Pokemon from '$lib/Pokemon.svelte';

	let started = false;
</script>

<h1>Pokésvelte</h1>
<p>Gotta svelt'em all!</p>

{#if !started}
	<Pokemon />
{:else}
	<p>Le jeu est commencé</p>
{/if}
