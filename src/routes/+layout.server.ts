import { fetchPokemons } from '$lib/pokemons';

export async function load() {
	const pokemons = await fetchPokemons();

	return {
		total: pokemons.length
	};
}
