<script lang="ts">
	const { data } = $props();
</script>

<h1>Pokédex</h1>

<img src={data.pokemons[0]?.sprites.front_default} />
<img src={data.pokemons[1]?.sprites.front_default} />
<img src={data.pokemons[2]?.sprites.front_default} />
