import { fetchPokemons, fetchPokemonTypes } from '$lib/pokemons';
import db from '$lib/server/db';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const { type } = params;

	const [pokemons, types, pokedex] = await Promise.all([
		fetchPokemons(),
		fetchPokemonTypes(),
		db.seen.get()
	]);

	if (type && !types.includes(type)) {
		error(404, { message: `Le type ${type} n'existe pas` });
	}

	const filteredPokemons = type
		? pokemons.filter((pokemon) => pokemon.types.find((t) => t.type.name === type))
		: pokemons;

	return { pokemons: filteredPokemons, pokedex, types };
}
