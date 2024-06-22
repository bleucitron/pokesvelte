import { fetchPokemons } from '$lib/pokemons';

export async function load() {
	return {
		pokemons: await fetchPokemons()
	};
}
