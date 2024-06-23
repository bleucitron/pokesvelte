<script lang="ts">
	import Pokemon from '$lib/components/Pokemon.svelte';

	const { data } = $props();

	const { id, name, src } = $derived(data);
</script>

<Pokemon {id} {name} {src} found={id % 2 === 1} />
