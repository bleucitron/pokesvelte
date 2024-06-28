import { readSeen } from '$lib/server/seen';
import { fetchPokemons } from '$lib/pokemons';

export async function load() {
	return { pokemons: await fetchPokemons(), seen: await readSeen() };
}
