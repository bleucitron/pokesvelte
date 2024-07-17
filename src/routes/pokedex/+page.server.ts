import { fetchPokemons } from '$lib/server/pokemons';
import { readSeen } from '$lib/server/seen';

export async function load() {
	const pokemons = await fetchPokemons();
	const seen = await readSeen();

	return { pokemons, found: seen };
}
