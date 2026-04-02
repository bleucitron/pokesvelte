import { fetchPokemon } from '$lib/pokemons';
import db from '$lib/server/db';
export async function load({params}) {
	const id = params.id;
	const [pokedex, pokemon] = await  Promise.all([db.seen.get(), fetchPokemon(id)]);
	const found = pokedex.includes(parseInt(id));

	return { pokemon, found };
}
