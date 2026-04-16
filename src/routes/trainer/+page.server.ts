import db from '$lib/server/db';
import { fail } from '@sveltejs/kit';

export function load() {
	console.log('MissingNo est passé par la');
}

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const nom = data.get('nom')?.toString();
		const mdp = data.get('password')?.toString();
		const mdpConf = data.get('passwordConf')?.toString();

		if(!nom) {
			return fail(400, {nom, champ: "nom", message: "Le nom est manquant." });
		}
		if(!mdp) {
			return fail(400, {nom, champ: 'password', message: 'Le mot de passe est manquant.' });
		}
		if(mdp.length < 3) {
			return fail(400, {nom, champ: 'password', message: 'Le mot de passe est trop court.' });
		}
		if(mdp !== mdpConf) {
			return fail(400, {
				nom,
				champ: 'passwordConf',
				message: 'Les mots de passe sont différents.'
			});
		}

		const utilisateurExistant = await db.trainer.get(nom);
		if (utilisateurExistant) {
			return fail(400, {nom, champ: 'nom', message: "L'utilisateur existe déjà." });
		}

		await db.trainer.register(nom,mdp);

		return { success: true };
	}
};