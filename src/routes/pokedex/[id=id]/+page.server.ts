import { fetchPokemon } from '$lib/pokemons';
import db from '$lib/server/db';
import { error } from '@sveltejs/kit';

export async function load({params}) {
	const id = params.id;
	const [pokedex, pokemon] = await  Promise.all([db.seen.get(), fetchPokemon(id)]);
	const found = pokedex.includes(parseInt(id));

	if (!pokemon)
	{
		error(404, { message: "Aucun pokemon trouvé"});
	}

	return { pokemon, found };
}
