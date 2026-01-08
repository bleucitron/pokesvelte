import db from '$lib/db';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
	const { uuid } = params;

	const team = await db.team.get();

	if (uuid === 'all') return json({ team });

	const member = team.find((m) => m.uuid === uuid);
	return json({ member });
}

export async function DELETE({ params }) {
	const { uuid } = params;

	await db.team.removeMember(uuid);

	return json({ uuid });
}
