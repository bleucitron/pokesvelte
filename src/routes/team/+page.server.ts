import { fetchPokemons } from '$lib/pokemons';
import { readTeam } from '$lib/server/team';

export async function load({ depends }) {
	depends('team:update');

	const [pokemons, team] = await Promise.all([fetchPokemons(), readTeam()]);

	return { pokemons, team };
}
