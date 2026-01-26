import { fetchPokemons } from '$lib/pokemons';
import db from '$lib/server/db';

export async function load({ depends, locals }) {
	depends('team:update');

	const { trainer } = locals;

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
