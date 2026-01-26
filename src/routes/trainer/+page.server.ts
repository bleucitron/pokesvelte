import db from '$lib/server/db';

import { fail } from '@sveltejs/kit';

export async function load() {
	console.log('TRAINER');
}

export const actions = {
	signup: async ({ request, cookies }) => {
		const data = await request.formData();

		const name = data.get('signup_name')?.toString();
		const password = data.get('signup_password')?.toString();
		const passwordConfirmation = data.get('signup_password-confirmation')?.toString();

		if (!name) {
			return fail(400, {
				signup_name: name,
				errorFields: ['signup_name'],
				message: 'Le nom est manquant'
			});
		}
		if (!password) {
			return fail(400, {
				signup_name: name,
				errorFields: ['signup_password'],
				message: 'Le mot de passe est manquant'
			});
		}
		if (password.length < 8) {
			return fail(400, {
				signup_name: name,
				errorFields: ['signup_password'],
				message: 'Le mot de passe est trop court'
			});
		}
		if (password !== passwordConfirmation) {
			return fail(400, {
				signup_name: name,
				errorFields: ['signup_password', 'signup_password-confirmation'],
				message: 'Les mots de passe ne correspondent pas'
			});
		}
		const alreadyExists = await db.trainer.get(name);
		if (alreadyExists) {
			return fail(400, {
				signup_name: name,
				errorFields: ['signup_name'],
				message: 'Le nom est déjà utilisé'
			});
		}

		const trainer = await db.trainer.register(name, password);
		const cookie = await db.cookies.register(trainer.id);

		cookies.set('session', cookie, { path: '/' });

		return {
			success: true,
			trainer,
			message: `Utilisateur ${trainer?.name} (${trainer?.id}) créé avec succès !`
		};
	},
	login: async ({ request }) => {
		const data = await request.formData();

		const name = data.get('login_name')?.toString();
		const password = data.get('login_password')?.toString();

		if (!name) {
			return fail(400, {
				login_name: name,
				errorFields: ['login_name'],
				message: 'Le nom est manquant'
			});
		}
		if (!password) {
			return fail(400, {
				login_name: name,
				errorFields: ['login_password'],
				message: 'Le mot de passe est manquant'
			});
		}

		const valid = await db.trainer.checkPassword(name, password);

		if (!valid) {
			return fail(400, {
				login_name: name,
				errorFields: ['login_name', 'login_password'],
				message: "Nom d'utilisateur ou mot de passe incorrect"
			});
		}

		const trainer = await db.trainer.get(name);
		return { success: true, trainer, message: 'Connexion réussie !' };
	}
};
