<script lang="ts">
	const { data } = $props(); // l'heure n'est pas encore venue d'en apprendre plus sur $props
</script>

<h1>Pokédex</h1>

<a href="/pokedex/1">
	<img src={data.pokemons[0]?.sprites.front_default} />
</a>
<a href="/pokedex/2">
	<img src={data.pokemons[1]?.sprites.front_default} />
</a>
<a href="/pokedex/3">
	<img src={data.pokemons[2]?.sprites.front_default} />
</a>
