
<script lang="ts">
	const { data } = $props();
	import Pokemon from '$lib/components/Pokemon.svelte';
</script>
{#if data.pokemon}
<Pokemon id={data.pokemon.id} name={data.pokemon.name} src={data.pokemon.sprites.front_default} />
{/if}
