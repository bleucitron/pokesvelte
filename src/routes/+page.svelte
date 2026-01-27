<script lang="ts">
	const started = false;
	import Pokemon from '$lib/components/Pokemon.svelte';
</script>

<h1>Pokésvelte</h1>
<p>Gotta svelt'em all!</p>

{#if started === false}
<Pokemon id={25} name="Pikachu" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"/>
{:else }
	<p>Le jeu n'a pas commencé !</p>
{/if}
