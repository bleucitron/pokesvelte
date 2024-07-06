import db from '$lib/server/db';

export async function load() {
	console.log('Loading trainer');
}

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const name = data.get('name')?.toString();
		const password = data.get('password')?.toString();

		if (name && password) {
			await db.trainer.register(name, password);
		}
	}
};
