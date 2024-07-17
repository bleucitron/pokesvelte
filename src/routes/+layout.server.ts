import { readTeam } from '$lib/server/team';
import { readSeen } from '$lib/server/seen';
import { fetchPokemons } from '$lib/server/pokemons';

export async function load() {
	const pokemons = await fetchPokemons();
	const seen = await readSeen();
	const team = await readTeam();

	return {
		found: seen.length,
		total: pokemons.length,
		teamSize: team.length
	};
}
