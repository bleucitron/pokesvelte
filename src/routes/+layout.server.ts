import { fetchPokemons } from '$lib/pokemons';

export async function load() {
	const pokemons = await fetchPokemons();

	return {
		found: 12,
		total: pokemons.length,
		team: 4
	};
}
