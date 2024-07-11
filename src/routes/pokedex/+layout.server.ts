import { fetchPokemonTypes } from '$lib/pokemons';

import db from '$lib/server/db';
import { fetchPokemons } from '$lib/pokemons';

export async function load({ params }) {
	const [pokemons, types, seen] = await Promise.all([
		fetchPokemons(),
		fetchPokemonTypes(),
		db.seen.get()
	]);

	const pokemonsToDisplay = params.type
		? pokemons.filter((pokemon) => pokemon.types.find((t) => t.type.name === params.type))
		: pokemons;

	return {
		pokemons: pokemonsToDisplay,
		types,
		seen
	};
}
