import { fail } from '@sveltejs/kit';
import { readTrainer, saveTrainer, checkTrainerPassword } from '$lib/server/trainer';

export async function load() {
	console.log('Loading trainer');
}

export const actions = {
	signup: async ({ request }) => {
		const data = await request.formData();

		const name = data.get('name');
		const password = data.get('password');
		const confirmationPassword = data.get('confirmationPassword');

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

		const existing = await readTrainer(name);
		if (existing) {
			return fail(401, { name, inputName: 'name', message: 'Ce nom est déjà utilisé.' });
		}

		const trainer = await saveTrainer(name, password);

		return { success: true, trainer };
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
