import { checkCookie } from '$lib/server/cookies';
import { readTrainer } from '$lib/server/trainer';

export async function handle({ event, resolve }) {
	const cookie = event.cookies.get('session');

	const trainerId = cookie ? await checkCookie(cookie) : null;
	const user = trainerId ? await readTrainer(trainerId) : null;

	event.locals.user = user;

	const response = await resolve(event);
	return response;
}
