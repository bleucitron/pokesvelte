import { fetchPokemons, fetchTotalPopulation } from '$lib/pokemons';

export async function load() {
	const pokemons = await fetchPokemons();

	const population = fetchTotalPopulation();

	return { pokemons, population };
}
