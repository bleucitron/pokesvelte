import { json } from '@sveltejs/kit';
import db from '$lib/db';

export async function GET() {
	const team = await db.team.get();

	console.log('Team', team);
	return json(team);
}

export async function DELETE({ params: { uuid } }) {
	await db.team.removeMember(uuid);

	return json({ uuid });
}
