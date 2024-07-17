import { fetchPokemons, fetchTotalPopulation } from '$lib/server/pokemons';
import { readSeen } from '$lib/server/seen';

export async function load() {
	const pokemons = await fetchPokemons();
	const seen = await readSeen();
	const totalInZone = fetchTotalPopulation();

	return { pokemons, seen, totalInZone };
}
