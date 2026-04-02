import { fetchPokemons, fetchTotalPopulation } from '$lib/pokemons';

export async function load() {
	const pokemons = await fetchPokemons();
	const scan = fetchTotalPopulation();
  return { pokemons, scan };
}