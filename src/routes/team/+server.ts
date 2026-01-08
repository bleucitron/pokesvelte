import db from '$lib/db';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const { id } = await request.json();

	const member = await db.team.addMember(id);

	return json(member);
}
