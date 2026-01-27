
<script lang="ts">
	const { data } = $props();
</script>

<img src={data.pokemon?.sprites.front_default} alt="pokémon img">
<div>{data.pokemon?.id}</div>
<div>{data.pokemon?.name}</div>

