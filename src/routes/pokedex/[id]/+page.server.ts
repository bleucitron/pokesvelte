import { fetchPokemon } from '$lib/pokemons';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;

	const pokemon = await fetchPokemon(parseInt(id));

	return {
		name: pokemon?.name,
		id,
		src: pokemon?.sprites?.front_default
	};
};
