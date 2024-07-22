<script lang="ts">
	const { data } = $props();

	$inspect(data);
</script>

{@html data.content}
