import { fetchPokemon } from '$lib/pokemons';
import db from '$lib/server/db';

export async function load({ params }) {
	const [pokemon, pokedex] = await Promise.all([fetchPokemon(params.id), db.seen.get()]);

	const { id, name, sprites } = pokemon;
	const found = pokedex.includes(id);

	return { id, name, src: sprites.front_default, found };
}
