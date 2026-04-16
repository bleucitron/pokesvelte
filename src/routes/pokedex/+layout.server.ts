import { fetchPokemons, fetchPokemonTypes } from '$lib/pokemons';
import db from '$lib/server/db';

export async function load({params}) {
	const type = params.type;
	// const id = params.id;
	const types = await fetchPokemonTypes();

	const [pokemons, pokedex] = await Promise.all([fetchPokemons(), db.seen.get()]);

		const pokemonsToSend = type ?
			pokemons.filter(
				pokemon =>
				pokemon.types.find(
					t =>
						t.type.name === type
				)
			) : pokemons;

	return { pokemons : pokemonsToSend, pokedex, types };
}
