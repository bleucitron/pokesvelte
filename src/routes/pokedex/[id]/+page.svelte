<script lang="ts">
	import Pokemon from '$lib/Pokemon.svelte';

	const { data } = $props();
	const { name, id, src } = $derived(data);
</script>

<Pokemon {name} id={parseInt(id)} {src} found={parseInt(id) % 2 === 0} />
