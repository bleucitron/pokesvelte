import db from '$lib/server/db';
import { fetchPokemons } from '$lib/pokemons';

export async function load() {
	const [pokemons, seen] = await Promise.all([fetchPokemons(), db.seen.get()]);

	return { pokemons, seen };
}
