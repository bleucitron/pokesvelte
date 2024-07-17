import { checkTrainerPassword, readTrainer, saveTrainer } from '$lib/server/trainer';
import { fail } from '@sveltejs/kit';

export const actions = {
	signup: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name');
		const password = data.get('password');
		const confirmPassword = data.get('confirmPassword');

		if (!name) {
			return fail(400, {
				inputName: 'name',
				name,
				password,
				confirmPassword,
				message: 'Nom manquant'
			});
		}
		if (!password) {
			return fail(400, {
				inputName: 'password',
				name,
				password,
				confirmPassword,
				message: 'Mot de passe manquant'
			});
		}
		if (password.length < 8) {
			return fail(400, {
				inputName: 'password',
				name,
				password,
				confirmPassword,
				message: 'Trop court'
			});
		}
		if (password !== confirmPassword) {
			return fail(400, {
				inputName: 'confirmPassword',
				name,
				password,
				confirmPassword,
				message: 'Les mots de passe ne correspondent pas'
			});
		}

		saveTrainer(name, password);

		return {
			success: true
		};
	},
	login: async ({ request }) => {
		const data = await request.formData();

		const login = data.get('login');
		const password = data.get('pass');

		if (!login) {
			return fail(400, { login, inputName: 'login', message: 'Des champs sont manquants.' });
		}
		if (!password) {
			return fail(400, { login, inputName: 'pass', message: 'Des champs sont manquants.' });
		}

		const isValid = await checkTrainerPassword(login, password);

		if (!isValid) {
			return fail(401, { login, message: 'Mot de passe invalide.' });
		}

		const trainer = await readTrainer(login);

		return { success: true, trainer };
	}
};
