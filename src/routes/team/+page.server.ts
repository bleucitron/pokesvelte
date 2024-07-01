import { fetchPokemons } from '$lib/pokemons';
import db from '$lib/server/db';

export async function load({ depends }) {
	depends('team:update');

	const pokemons = await fetchPokemons();
	const team = await db.team.get();

	return { pokemons, team };
}
