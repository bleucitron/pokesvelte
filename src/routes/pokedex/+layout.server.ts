import { fetchPokemons, fetchPokemonTypes } from '$lib/pokemons';
import db from '$lib/server/db';

export async function load({ params }) {
	const type = params.type;

	const [pokemons, pokedex, types] = await Promise.all([
		fetchPokemons(),
		db.seen.get(),
		fetchPokemonTypes()
	]);

	const pokemonsToSend = type
		? pokemons.filter((pokemon) => pokemon.types.find((t) => t.type.name === type))
		: pokemons;

	return { pokemons: pokemonsToSend, pokedex, types };
}
