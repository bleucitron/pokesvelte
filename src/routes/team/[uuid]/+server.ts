import { json } from '@sveltejs/kit';
import { readTeam, removeFromTeam } from '$lib/server/team';

export function GET() {
	const team = readTeam();

	console.log('Team', team);
	return json(team);
}

export function DELETE({ params: { uuid } }) {
	const updatedBag = removeFromTeam(uuid);

	return json(updatedBag);
}
