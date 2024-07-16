<script lang="ts">
	import Pokemon from '$lib/Pokemon.svelte';
	import { pokedex } from '$lib/stores/index.svelte.js';

	const { data } = $props();
	const { name, id, src } = $derived(data);
</script>

<Pokemon {name} id={parseInt(id)} {src} found={pokedex.found.includes(parseInt(id))} />
