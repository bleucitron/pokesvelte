<script lang="ts">
	const { data } = $props();
	const { tree } = $derived(data);

	$inspect(tree);
</script>

{@html data.content}
