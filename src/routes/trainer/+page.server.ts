import { saveTrainer } from '$lib/server/trainer';

export async function load() {
	console.log('Loading trainer');
}

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const name = data.get('name');
		const password = data.get('password');

		await saveTrainer(name, password);
	}
};
