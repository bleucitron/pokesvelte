import { fetchPokemons } from '$lib/pokemons';
import { readTeam, rename, toggleFromTeam } from '$lib/server/team';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	rename: async ({ request }) => {
		const data = await request.formData();
		const uuid = data.get('uuid');
		const name = data.get('name');

		if (!uuid || !name) {
			return fail(400, { uuid, name, missing: true });
		}

		await rename(uuid, name);
	},
	toggle: async ({ request }) => {
		const data = await request.formData();
		const uuid = data.get('uuid');

		if (!uuid) {
			return fail(400, { uuid, missing: true });
		}

		await toggleFromTeam(uuid);
	}
};

export async function load({ depends }) {
	depends('team:update');

	const [pokemons, team] = await Promise.all([fetchPokemons(), readTeam()]);
	if (!team.length) {
		redirect(307, '/');
	}

	return { pokemons, team };
}
