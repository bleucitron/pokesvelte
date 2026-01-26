import { fetchPokemons } from '$lib/pokemons';
import db from '$lib/server/db';

export async function load({ depends, cookies }) {
	depends('team:update');

	const cookie = cookies.get('session');
	const trainerId = await db.cookies.check(cookie);

	const trainer = trainerId ? await db.trainer.get(trainerId) : undefined;

	const [pokemons, team, pokedex] = await Promise.all([
		fetchPokemons(),
		db.team.get(),
		db.seen.get()
	]);

	return {
		total: pokemons.length,
		teamSize: team.length,
		found: pokedex.length,
		trainer
	};
}
