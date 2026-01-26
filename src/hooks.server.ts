import db from '$lib/server/db';

export async function handle({ event, resolve }) {
	const cookie = event.cookies.get('session');

	const trainerId = await db.cookies.check(cookie);
	const trainer = trainerId ? await db.trainer.get(trainerId) : undefined;
	event.locals.trainer = trainer;

	const response = await resolve(event);
	return response;
}
