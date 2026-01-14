import { fetchPokemons } from '$lib/pokemons';
import db from '$lib/server/db';

export async function load() {
	const [pokemons, pokedex] = await Promise.all([fetchPokemons(), db.seen.get()]);

	return { pokemons, pokedex };
}
