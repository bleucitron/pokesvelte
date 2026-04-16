import db from '$lib/server/db';
import { fail } from '@sveltejs/kit';

export function load() {
	console.log('MissingNo est passé par la');
}

export const actions = {
	inscription: async ({ request }) => {
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
	},
	connexion: async ({ request }) => {
		const data = await request.formData();
		const nomCnx = data.get('nom')?.toString();
		const mdpCnx = data.get('password')?.toString();

		if (!nomCnx) {
			return fail(400, { nomCnx, champ: 'nomCnx', message: 'Le nom est manquant.' });
		}
		if (!mdpCnx) {
			return fail(400, { nomCnx, champ: 'passwordCnx', message: 'Le mot de passe est manquant.' });
		}


		const utilisateurValide = await db.trainer.checkPassword(nomCnx,mdpCnx);
		if (!utilisateurValide) {
			return fail(400, { nomCnx, champ: 'nomCnx', message: 'La connexion a échoué' });
		}
		const utilisateurExistant = await db.trainer.get(nomCnx);

		return { success: true, user: utilisateurExistant };
	}
};