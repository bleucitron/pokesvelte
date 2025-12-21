<script lang="ts">
	import { resolve } from '$app/paths';

	const { data } = $props(); // l'heure n'est pas encore venue d'en apprendre plus sur $props
</script>

<h1>Pokédex</h1>

<a href={resolve('/pokedex/[id]', { id: '1' })}>
	<img src={data.pokemons[0]?.sprites.front_default} />
</a>
<a href={resolve('/pokedex/[id]', { id: '2' })}>
	<img src={data.pokemons[1]?.sprites.front_default} />
</a>
<a href={resolve('/pokedex/[id]', { id: '3' })}>
	<img src={data.pokemons[2]?.sprites.front_default} />
</a>
