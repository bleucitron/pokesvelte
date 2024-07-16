<script lang="ts">
	import Pokemon from '$lib/Pokemon.svelte';

	const { data } = $props();
</script>

<Pokemon
	name={data.name}
	id={parseInt(data.id)}
	src={data.src}
	found={parseInt(data.id) % 2 === 0}
/>
