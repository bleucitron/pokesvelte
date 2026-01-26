import db from '$lib/server/db';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	// INFO: intentionnellement laissé ouvert même s'il n'y a pas de user connecté par souci de
	// simplicité et pour ne pas bloquer le jeu et devoir forcer la connection. Il peut être
	// intéressant néanmoins de gérer cette situation pour pousser l'application un peu plus loin

	const { id } = await request.json();

	const member = await db.team.addMember(id);

	return json(member);
}
