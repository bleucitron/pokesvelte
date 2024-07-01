import db from '$lib/server/db';
import { fetchPokemon } from '$lib/pokemons';

export async function load({ params }) {
	const [pokemon, seen] = await Promise.all([fetchPokemon(params.id), db.seen.get()]);

	const { id, name, sprites } = pokemon;
	const found = seen.includes(id);

	return { id, name, src: sprites.front_default, found };
}
