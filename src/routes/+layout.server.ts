import { fetchPokemons } from '$lib/pokemons';
import db from '$lib/server/db';

export async function load({depends}) {

		depends("team:update")
    const pokemons = await fetchPokemons()
    return {
			nombrePokemonTotal: pokemons.length,
			teamSize: (await db.team.get()).length,
			found: (await db.seen.get()).length
		};
}