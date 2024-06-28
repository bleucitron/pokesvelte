import { readSeen } from '$lib/server/seen';
import { fetchPokemon } from '$lib/pokemons';

export async function load({ params }) {
	const { id, name, sprites } = await fetchPokemon(params.id);
	const seen = await readSeen();
	const found = seen.includes(id);

	return { id, name, src: sprites.front_default, found };
}
