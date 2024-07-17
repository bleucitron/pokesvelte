import { addToTeam } from '$lib/server/team';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const { id } = await request.json();

	const updatedTeam = await addToTeam(id);

	return json(updatedTeam);
}
