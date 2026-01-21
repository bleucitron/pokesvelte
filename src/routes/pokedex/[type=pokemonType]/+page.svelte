<script lang="ts">
	import Pokedex from '../Pokedex.svelte';

	const { data } = $props();

	const { pokedex, pokemons } = $derived(data);
</script>

<Pokedex {pokedex} {pokemons} />
