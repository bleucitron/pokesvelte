import { fetchPokemons } from '$lib/pokemons';
import db from '$lib/server/db';

export async function load() {
    const pokemons = await fetchPokemons();
		const pokedex = await db.seen.get();
    return { pokemons, pokedex };
}