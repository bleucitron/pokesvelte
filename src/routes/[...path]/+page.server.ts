import { parseMdFile, findCurrent } from '$lib/server';
import { redirect } from '@sveltejs/kit';

export async function load({ params: { path }, parent }) {
	const [mdContent, { tree }] = await Promise.all([parseMdFile(path), parent()]);

	const found = findCurrent(path, tree);

	if (!found) redirect(307, '/');

	return {
		...mdContent,
		...found
	};
}
