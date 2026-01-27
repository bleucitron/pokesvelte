
<script lang="ts">
	const { data } = $props();
	const { pokemon } = $derived(data);
	import Pokemon from '$lib/components/Pokemon.svelte';
</script>
{#if pokemon}
{@const { id, name, sprites } = pokemon}
<Pokemon {id} {name} src={sprites.front_default} />
{/if}
