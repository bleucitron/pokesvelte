import db from '$lib/server/db';

export async function handle({ event, resolve }) {
	const cookie = event.cookies.get('my-cookie');

	const idcookie = await db.cookies.check(cookie);
	const infoUser = await db.trainer.get(idcookie);

	event.locals.user = infoUser;

	const response = await resolve(event);
	return response;
}
