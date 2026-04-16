import { fetchPokemons } from '$lib/pokemons';
import db from '$lib/server/db';
import { fail } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export async function load({depends}) {

	depends('team:update');
	const [pokemons, team] = await Promise.all([fetchPokemons(), db.team.get()]);

	if (team.length === 0) {
		redirect(307, '/');
	}

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

		await db.team.renameMember(uuid, nom);
	},
	titulaire: async ({request})=> {
		const data = await request.formData();
		const uuid = data.get('uuid')?.toString();

		if (!uuid) {
			return fail(400, { message: 'Le uuid est manquant.' });
		}

		await db.team.toggleMember(uuid);
	}
};