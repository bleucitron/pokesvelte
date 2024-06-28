import { json } from '@sveltejs/kit';
import db from '$lib/db';

export async function POST({ request }) {
	const { id } = await request.json();

	const newMember = await db.team.addMember(id);
	return json(newMember);
}
