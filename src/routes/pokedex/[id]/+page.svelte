<script lang="ts">
	import Pokemon from '$lib/components/Pokemon.svelte';

	const { data } = $props();
</script>

<Pokemon id={data.id} name={data.name} src={data.src} />
