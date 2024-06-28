import db from '$lib/server/db';
import { fetchPokemons } from '$lib/pokemons';

export async function load() {
	const pokemons = await fetchPokemons();

	const team = await db.team.get();
	const seen = await db.seen.get();

	return {
		total: pokemons.length,
		found: seen.length,
		teamSize: team.length
	};
}
