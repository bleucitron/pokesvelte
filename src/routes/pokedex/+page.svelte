<script lang="ts">
	const { data } = $props();
	import { resolve } from '$app/paths';
</script>

<h1>POKEDEX</h1>

<a href={resolve('/pokedex/[id]', {
	id: data.pokemons[0].id
})}><img src={data.pokemons[0]?.sprites.front_default} alt="pokémon img"></a>
<a href={resolve('/pokedex/[id]', {
	id: data.pokemons[1].id
})}><img src={data.pokemons[1]?.sprites.front_default} alt="pokémon img"></a>
<a href={resolve('/pokedex/[id]', {
	id:data.pokemons[2].id
})}><img src={data.pokemons[2]?.sprites.front_default} alt="pokémon img"></a>