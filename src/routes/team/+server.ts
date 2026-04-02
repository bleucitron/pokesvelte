import db from '$lib/db'
import { json, text } from '@sveltejs/kit';

export async function POST({request}) {

	const payload = await request.json();


	return json(await db.team.addMember(payload.id))
}