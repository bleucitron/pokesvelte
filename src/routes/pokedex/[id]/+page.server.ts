import { readSeen } from '$lib/server/seen';
import { fetchPokemon } from '$lib/pokemons';

export async function load({ params }) {
	const [pokemon, seen] = await Promise.all([fetchPokemon(params.id), readSeen()]);

	const { id, name, sprites } = pokemon;
	const found = seen.includes(id);

	return { id, name, src: sprites.front_default, found };
}
