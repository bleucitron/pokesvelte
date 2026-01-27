<script lang="ts">
	const started = false;
	import Pokemon from '$lib/components/Pokemon.svelte';
</script>

<h1>Pokésvelte</h1>
<p>Gotta svelt'em all!</p>

{#if started === false}
<Pokemon />
{:else }
	<p>Le jeu n'a pas commencé !</p>
{/if}
