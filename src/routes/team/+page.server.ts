import { fetchPokemons } from '$lib/pokemons';
import { readTeam } from '$lib/server/team';

export async function load() {
	const pokemons = await fetchPokemons();
	const team = await readTeam();

	return { pokemons, team };
}
