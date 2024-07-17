import { fetchPokemons } from '$lib/server/pokemons';
import { readTeam } from '$lib/server/team';
import { redirect } from '@sveltejs/kit';

export async function load() {
	const pokemons = await fetchPokemons();
	const team = await readTeam();

	if (team.length === 0) {
		redirect(307, '/');
	}
	return { pokemons, team };
}
