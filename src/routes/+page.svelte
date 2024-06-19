<script lang="ts">
	import Pokemon from '$lib/components/Pokemon.svelte';

	const started = false;
</script>

<h1>Pokésvelte</h1>
<p>Gotta svelt'em all!</p>

{#if !started}
	<Pokemon />
{:else}
	<p>Work in progress</p>
{/if}
