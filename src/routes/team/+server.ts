import { error, json } from '@sveltejs/kit';
import db from '$lib/server/db';

export async function POST({ request, locals }) {
	if (!locals.user) {
		error(403, "Vous n'avez pas le droit de faire ça");
	}
	const { id } = await request.json();

	const newMember = await db.team.addMember(id);
	return json(newMember);
}
