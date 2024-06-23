<script lang="ts">
	import { pokedex } from '$lib/stores/index.svelte';

	import Pokemon from '$lib/components/Pokemon.svelte';

	const { data } = $props();

	const { id, name, src } = $derived(data);
</script>

<Pokemon {id} {name} {src} found={pokedex.found.includes(id)} />
