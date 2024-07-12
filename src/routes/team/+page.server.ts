import { fetchPokemons } from '$lib/pokemons';
import db from '$lib/server/db';
import { error, fail, redirect } from '@sveltejs/kit';

export const actions = {
	rename: async ({ request, locals }) => {
		if (!locals.user) {
			error(403, "Vous n'avez pas le droit de faire ça");
		}

		const data = await request.formData();
		const uuid = data.get('uuid')?.toString();
		const name = data.get('name')?.toString();

		if (!uuid || !name) {
			return fail(400, { uuid, name, missing: true });
		}

		await db.team.renameMember(uuid, name);
	},
	toggle: async ({ request, locals }) => {
		if (!locals.user) {
			error(403, "Vous n'avez pas le droit de faire ça");
		}

		const data = await request.formData();
		const uuid = data.get('uuid')?.toString();

		if (!uuid) {
			return fail(400, { uuid, missing: true });
		}

		await db.team.toggleMember(uuid);
	}
};

export async function load({ depends, locals }) {
	if (!locals.user) {
		redirect(307, '/');
	}

	depends('team:update');

	const [pokemons, team] = await Promise.all([fetchPokemons(), db.team.get()]);

	return { pokemons, team };
}
