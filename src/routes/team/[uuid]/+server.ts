import db from '$lib/server/db';
import { json, text } from '@sveltejs/kit';

export async function DELETE({ params }) {
	return json(await db.team.removeMember(params.uuid));
}

export async function GET({ params }) {
	if(params.uuid ==='all') {
		return json(await db.team.get());

	} else {
		let team = await db.team.get();

		const member = team.find((m)=>{params.uuid === m.uuid})

		return json(member);
	}

}
