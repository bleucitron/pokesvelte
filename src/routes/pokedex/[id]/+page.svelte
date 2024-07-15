<script lang="ts">
	const { data } = $props();
</script>

<p>#{data.id}</p>

<img src={data.src} alt={data.name} />

<h1>{data.name}</h1>
