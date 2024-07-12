import { error, json } from '@sveltejs/kit';
import db from '$lib/server/db';

export async function GET() {
	const team = await db.team.get();

	console.log('Team', team);
	return json(team);
}

export async function DELETE({ params: { uuid }, locals }) {
	if (!locals.user) {
		error(403, "Vous n'avez pas le droit de faire ça");
	}

	await db.team.removeMember(uuid);

	return json({ uuid });
}
