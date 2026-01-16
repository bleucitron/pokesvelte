import db from '$lib/server/db';
import { fail } from '@sveltejs/kit';

export async function load() {
	console.log('TRAINER');
}

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const name = data.get('name')?.toString();
		const password = data.get('password')?.toString();
		const passwordConfirmation = data.get('password-confirmation')?.toString();

		if (!name) {
			return fail(400, {
				values: { name },
				errorFields: ['signup_name'],
				message: 'Le nom est manquant'
			});
		}
		if (!password) {
			return fail(400, {
				values: { name },
				errorFields: ['password'],
				message: 'Le mot de passe est manquant'
			});
		}
		if (password.length < 8) {
			return fail(400, {
				values: { name },
				errorFields: ['password'],
				message: 'Le mot de passe est trop court'
			});
		}
		if (password !== passwordConfirmation) {
			return fail(400, {
				values: { name },
				errorFields: ['password', 'password-confirmation'],
				message: 'Les mots de passe ne correspondent pas'
			});
		}
		const alreadyExists = await db.trainer.get(name);
		if (alreadyExists) {
			return fail(400, {
				values: { name },
				errorFields: ['name'],
				message: 'Le nom est déjà utilisé'
			});
		}

		const trainer = await db.trainer.register(name, password);

		return { success: true, trainer };
	}
};
