import { fail } from '@sveltejs/kit';

import db from '$lib/server/db';

export async function load() {
	console.log('Loading trainer');
}

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const name = data.get('name')?.toString();
		const password = data.get('password')?.toString();
		const confirmationPassword = data.get('confirmationPassword')?.toString();

		if (!name) {
			return fail(400, { name, inputName: 'name', message: 'Des champs sont manquants.' });
		}
		if (!password) {
			return fail(400, { name, inputName: 'password', message: 'Des champs sont manquants.' });
		}
		if (password.length < 8) {
			return fail(400, {
				name,
				inputName: 'password',
				message: 'Le mot de passe doit faire au moins 8 caractères.'
			});
		}
		if (password !== confirmationPassword) {
			return fail(400, {
				name,
				inputName: 'confirmationPassword',
				message: 'Les mots de passe ne correspondent pas.'
			});
		}

		const existing = await db.trainer.get(name);
		if (existing) {
			return fail(401, { name, inputName: 'name', message: 'Ce nom est déjà utilisé.' });
		}

		const trainer = await db.trainer.register(name, password);

		return { success: true, trainer };
	}
};
