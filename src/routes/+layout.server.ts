import { fetchPokemons, fetchTotalPopulation } from '$lib/pokemons';
import db from '$lib/server/db';

export async function load({depends, cookies}) {
	const cookie = cookies.get('my-cookie');


	const idcookie = await db.cookies.check(cookie);

	const infoUser = await db.trainer.get(idcookie);

	depends('team:update');

	const [pokemons, team, pokedex] = await Promise.all([
		fetchPokemons(),
		db.team.get(),
		db.seen.get()
	]);

	return {
		nombrePokemonTotal: pokemons.length,
		teamSize: team.length,
		found: pokedex.length,
		user:infoUser
	};
}