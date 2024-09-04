import { findCurrent, parseMdFile } from '$lib/server';
import { redirect } from '@sveltejs/kit';

export async function load({ params: { path }, parent }) {
	const content = await parseMdFile(path);

	const { tree } = await parent();
	const found = findCurrent(path, tree);

	if (!found) redirect(307, '/contents');

	return { ...content, ...found };
}
