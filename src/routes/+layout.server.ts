import { fetchPokemons, fetchTotalPopulation } from '$lib/pokemons';
import db from '$lib/server/db';

export async function load({depends}) {
	depends('team:update');

	const [pokemons, team, pokedex] = await Promise.all([
		fetchPokemons(),
		db.team.get(),
		db.seen.get()
	]);

	return {
		nombrePokemonTotal: pokemons.length,
		teamSize: team.length,
		found: pokedex.length
	};
}