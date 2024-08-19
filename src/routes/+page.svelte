<script lang="ts">
	import Tree from '$lib/components/Tree.svelte';

	const { data } = $props();
	const { tree } = $derived(data);
</script>

<h1>Table des matières</h1>

<Tree folder={tree} />

<style>
	h1 {
		margin-top: 5rem;
	}
</style>
