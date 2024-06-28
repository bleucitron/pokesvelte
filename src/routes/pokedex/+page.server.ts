import db from '$lib/server/db';
import { fetchPokemons } from '$lib/pokemons';

export async function load() {
	return { pokemons: await fetchPokemons(), seen: await db.seen.get() };
}
