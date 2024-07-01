import { readSeen } from '$lib/server/seen';
import { fetchPokemons } from '$lib/pokemons';

export async function load() {
	const [pokemons, seen] = await Promise.all([fetchPokemons(), readSeen()]);

	return { pokemons, seen };
}
