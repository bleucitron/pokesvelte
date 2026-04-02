import { fetchPokemon } from '$lib/pokemons';
import db from '$lib/server/db';
export async function load({params}) {

	const id = params.id
	const found = (await db.seen.get()).includes(parseInt(id));

	const pokemon = await fetchPokemon(id);
	return { pokemon, found };
}
