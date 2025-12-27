<script lang="ts">
	import Pokemon from '$lib/components/Pokemon.svelte';
	import { pokedex } from '$lib/states/pokedex.svelte';

	const { data } = $props();

	const { id, name, src } = $derived(data);
</script>

<Pokemon {id} {name} {src} found={pokedex.found.includes(id)} />
