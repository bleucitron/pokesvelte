import { fetchPokemon } from '$lib/pokemons';

export async function load({params}) {

	const id = params.id

	const pokemon = await fetchPokemon(id);
	return { pokemon };
}
