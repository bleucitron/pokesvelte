import { readTeam } from '$lib/server/team';
import { readSeen } from '$lib/server/seen';
import { fetchPokemons } from '$lib/server/pokemons';

export async function load() {
	const [pokemons, seen, team] = await Promise.all([fetchPokemons(), readSeen(), readTeam()]);

	return {
		found: seen.length,
		total: pokemons.length,
		teamSize: team.length
	};
}
