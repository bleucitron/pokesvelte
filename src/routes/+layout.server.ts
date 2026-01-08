import { fetchPokemons } from '$lib/pokemons';
import db from '$lib/server/db';

export async function load() {
	const pokemons = await fetchPokemons();
	const team = await db.team.get();
	const pokedex = await db.seen.get();

	return {
		total: pokemons.length,
		teamSize: team.length,
		found: pokedex.length
	};
}
