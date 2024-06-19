import { fetchPokemons } from '$lib/pokemons';

export async function load() {
	const pokemons = await fetchPokemons();

	return {
		found: 0,
		total: pokemons.length,
		teamSize: 0
	};
}
