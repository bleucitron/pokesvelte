import db from '$lib/server/db';
import { fetchPokemons } from '$lib/pokemons';

export async function load({ depends, locals }) {
	depends('team:update');

	const [pokemons, team, seen] = await Promise.all([fetchPokemons(), db.team.get(), db.seen.get()]);

	return {
		total: pokemons.length,
		found: seen.length,
		teamSize: team.length,
		user: locals.user
	};
}
