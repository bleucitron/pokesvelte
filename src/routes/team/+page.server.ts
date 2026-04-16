import { fetchPokemons } from '$lib/pokemons';
import db from '$lib/server/db';
import { fail } from '@sveltejs/kit';

export async function load({depends}) {
	depends('team:update');
	const [pokemons, team] = await Promise.all([fetchPokemons(), db.team.get()]);
	return { pokemons, team };
}


export const actions = {
	rename: async ({request})=> {
		const data = await request.formData();

		const nom = data.get('nomPkm')?.toString()
		const uuid = data.get('uuid')?.toString()



		if (!nom) {
			return fail(400, {  message: 'Le nom est manquant.' });
		}
		if (!uuid) {
			return fail(400, {  message: 'Le uuid est manquant.' });
		}

		const renameResult = await db.team.renameMember(uuid, nom);



	}
};