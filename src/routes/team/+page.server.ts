import { fetchPokemons } from '$lib/pokemons';
import db from '$lib/server/db';
import { fail, redirect } from '@sveltejs/kit';

export async function load({ depends, locals }) {
	if (!locals.trainer) redirect(307, '/trainer');

	depends('team:update');

	const [pokemons, team] = await Promise.all([fetchPokemons(), db.team.get()]);

	return { team, pokemons };
}

export const actions = {
	rename: async ({ request, locals }) => {
		if (!locals.trainer) return fail(403);

		const data = await request.formData();

		const name = data.get('name')?.toString();
		const uuid = data.get('uuid')?.toString();

		if (!uuid || !name) {
			return fail(400);
		}

		await db.team.renameMember(uuid, name);
	},
	toggle: async ({ request, locals }) => {
		if (!locals.trainer) return fail(403);

		const data = await request.formData();

		const uuid = data.get('uuid')?.toString();

		if (!uuid) {
			return fail(400);
		}

		await db.team.toggleMember(uuid);
	}
};
