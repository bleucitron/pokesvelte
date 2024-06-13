<script lang="ts">
	const { data } = $props();
</script>

<h1>Pokédex</h1>

<img src={data.pokemons[0].sprites.front_default} alt={data.pokemons[0].name} />
<img src={data.pokemons[1].sprites.front_default} alt={data.pokemons[1].name} />
<img src={data.pokemons[2].sprites.front_default} alt={data.pokemons[2].name} />
