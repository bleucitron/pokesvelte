<script lang="ts">
	import Pokemon from '$lib/Pokemon.svelte';

	const { data } = $props();
	const { name, id, src, found } = $derived(data);
</script>

<Pokemon {name} {id} {src} {found} />
