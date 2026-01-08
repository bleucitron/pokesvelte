import { fetchPokemon } from '$lib/pokemons';
import db from '$lib/server/db';

export async function load({ params }) {
	const { id, name, sprites } = await fetchPokemon(params.id);
	const pokedex = await db.seen.get();
	const found = pokedex.includes(id);

	return { id, name, src: sprites.front_default, found };
}
