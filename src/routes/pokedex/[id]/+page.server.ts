import type { PageServerLoad } from './$types';

import { fetchPokemon } from '$lib/server/pokemons';
import { readSeen } from '$lib/server/seen';

export const load: PageServerLoad = async ({ params }) => {
	const id = parseInt(params.id);

	const pokemon = await fetchPokemon(id);
	const seen = await readSeen();

	return {
		id,
		name: pokemon?.name,
		src: pokemon?.sprites?.front_default,
		found: seen.includes(id)
	};
};
