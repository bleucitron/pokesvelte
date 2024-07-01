import { readTeam } from '$lib/server/team';
import { readSeen } from '$lib/server/seen';
import { fetchPokemons } from '$lib/pokemons';

export async function load({ depends }) {
	depends('team:update');

	const [pokemons, team, seen] = await Promise.all([fetchPokemons(), readTeam(), readSeen()]);

	return {
		total: pokemons.length,
		found: seen.length,
		teamSize: team.length
	};
}
