import db from '$lib/server/db';

export function load() {
	console.log('MissingNo est passé par la');
}

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const nom = data.get('nom');
		const mdp = data.get('password');

		let inscription = await db.trainer.register(nom,mdp)

	}
};