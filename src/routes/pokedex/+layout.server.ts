import { error } from '@sveltejs/kit';

import { fetchPokemons, fetchPokemonTypes } from '$lib/server/pokemons';
import { readSeen } from '$lib/server/seen';

export async function load({ params }) {
	const type = params.type;

	const [pokemons, seen, types] = await Promise.all([
		fetchPokemons(),
		readSeen(),
		fetchPokemonTypes()
	]);

	if (type && !types.includes(type)) {
		error(404, { message: `Le type ${type} n'existe pas` });
	}

	const filtered = type
		? pokemons.filter((p) => p.types.find((t) => t.type.name === type))
		: pokemons;

	return { pokemons: filtered, found: seen, types };
}
