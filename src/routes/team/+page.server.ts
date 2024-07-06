import { fetchPokemons } from '$lib/pokemons';
import db from '$lib/server/db';
import { fail } from '@sveltejs/kit';

export const actions = {
	rename: async ({ request }) => {
		const data = await request.formData();
		const uuid = data.get('uuid')?.toString();
		const name = data.get('name')?.toString();

		if (!uuid || !name) {
			return fail(400, { uuid, name, missing: true });
		}

		await db.team.renameMember(uuid, name);
	},
	toggle: async ({ request }) => {
		const data = await request.formData();
		const uuid = data.get('uuid')?.toString();

		if (!uuid) {
			return fail(400, { uuid, missing: true });
		}

		await db.team.toggleMember(uuid);
	}
};

export async function load({ depends }) {
	depends('team:update');

	const [pokemons, team] = await Promise.all([fetchPokemons(), db.team.get()]);

	return { pokemons, team };
}
