<script lang="ts">
	import Pokedex from '$lib/components/Pokedex.svelte';
	const { data } = $props();
	const { pokemons , pokedex} = $derived(data);
</script>

<Pokedex {pokemons} {pokedex} />