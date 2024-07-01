import { fetchPokemons, fetchTotalPopulation } from '$lib/pokemons';

export async function load() {
	const population = fetchTotalPopulation();

	return {
		pokemons: await fetchPokemons(),
		population
	};
}
