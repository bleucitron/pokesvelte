import { json } from '@sveltejs/kit';
import { addToTeam } from '$lib/server/team';

export async function POST({ request }) {
	const { id } = await request.json();

	const updatedBag = addToTeam(id);

	return json(updatedBag);
}
