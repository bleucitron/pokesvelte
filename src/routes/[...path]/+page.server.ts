import { findCurrent } from '$lib/server';
import { redirect } from '@sveltejs/kit';

export async function load({ params: { path }, parent }) {
	const { tree } = await parent();
	const found = findCurrent(path, tree);

	if (!found) redirect(307, '/');

	return found;
}
