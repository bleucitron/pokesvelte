import db from '$lib/server/db';
import { fetchPokemons } from '$lib/pokemons';

export async function load({ depends, cookies }) {
	depends('team:update');

	const session = cookies.get('session');
	const id = await db.cookies.check(session);

	const [pokemons, team, seen, user] = await Promise.all([
		fetchPokemons(),
		db.team.get(),
		db.seen.get(),
		db.trainer.get(id)
	]);

	return {
		total: pokemons.length,
		found: seen.length,
		teamSize: team.length,
		user
	};
}
