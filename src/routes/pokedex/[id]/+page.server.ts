import { fetchPokemon } from '$lib/pokemons';
import db from '$lib/server/db';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const [pokemon, pokedex] = await Promise.all([fetchPokemon(params.id), db.seen.get()]);

	if (!pokemon) {
		error(404, { message: `Le Pokémon avec l'id ${params.id} n'existe pas.` });
	}

	const { id, name, sprites } = pokemon;
	const found = pokedex.includes(id);

	return { id, name, src: sprites.front_default, found };
}
