import { readTeam, removeFromTeam } from '$lib/server/team';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
	const uuid = params.uuid;

	const team = await readTeam();

	const output = uuid === 'all' ? team : team.find((member) => member.uuid === uuid);
	return json(output);
}

export async function DELETE({ params }) {
	const uuid = params.uuid;

	const updatedTeam = await removeFromTeam(uuid);
	return json(updatedTeam);
}
