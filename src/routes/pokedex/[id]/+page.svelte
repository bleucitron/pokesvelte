<script lang="ts">
	const { data } = $props();
</script>

<h1>{data.name} (#{data.id})</h1>

<img src={data.src} />
