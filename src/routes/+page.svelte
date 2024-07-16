<script>
	import Pokemon from '$lib/Pokemon.svelte';

	let started = false;
</script>

<h1>Pokésvelte</h1>
<p>Gotta svelt'em all!</p>

{#if !started}
	<Pokemon
		name="Pikachu"
		id={25}
		src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
	/>
{:else}
	<p>Le jeu est commencé</p>
{/if}
