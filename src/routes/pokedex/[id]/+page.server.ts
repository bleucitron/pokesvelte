import { fetchPokemon } from '$lib/pokemons';

export async function load({ params }) {
	const { id, name, sprites } = await fetchPokemon(params.id);

	return { id, name, src: sprites.front_default };
}
