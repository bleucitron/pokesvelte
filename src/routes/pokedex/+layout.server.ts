import { fetchPokemonTypes } from '$lib/pokemons';

import { readSeen } from '$lib/server/seen';
import { fetchPokemons } from '$lib/pokemons';

export async function load({ params }) {
	const [pokemons, seen, types] = await Promise.all([
		fetchPokemons(),
		readSeen(),
		fetchPokemonTypes()
	]);

	const pokemonsToDisplay = params.type
		? pokemons.filter((pokemon) => pokemon.types.find((t) => t.type.name === params.type))
		: pokemons;

	return {
		pokemons: pokemonsToDisplay,
		seen,
		types
	};
}
