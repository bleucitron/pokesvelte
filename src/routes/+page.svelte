<script lang="ts">
	import Pokemon from '$lib/components/Pokemon.svelte';

	let started = false;
</script>

<h1>Pokésvelte</h1>
<p>Gotta svelt'em all!</p>

{#if !started}
	<Pokemon
		id={133}
		name="Évoli"
		src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png"
	/>
{:else}
	<p>Work in progress...</p>
{/if}
