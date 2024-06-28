import { readTeam } from '$lib/server/team';
import { readSeen } from '$lib/server/seen';
import { fetchPokemons } from '$lib/pokemons';

export async function load() {
	const pokemons = await fetchPokemons();

	const team = await readTeam();
	const seen = await readSeen();

	return {
		total: pokemons.length,
		found: seen.length,
		teamSize: team.length
	};
}
