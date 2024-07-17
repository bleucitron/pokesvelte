import { fetchPokemon } from '$lib/server/pokemons';
import { readSeen } from '$lib/server/seen';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const id = parseInt(params.id);

	const pokemon = await fetchPokemon(id);
	if (!pokemon) {
		error(404, { message: 'Pokémon introuvable' });
	}
	const seen = await readSeen();

	return {
		id,
		name: pokemon?.name,
		src: pokemon?.sprites?.front_default,
		found: seen.includes(id)
	};
}
