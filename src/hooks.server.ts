import db from '$lib/server/db';

export async function handle({ event, resolve }) {
	const session = event.cookies.get('session');
	const id = await db.cookies.check(session);

	const user = await db.trainer.get(id);
	event.locals.user = user;

	const response = await resolve(event);
	return response;
}
