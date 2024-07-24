import { CONTENT_FOLDER } from '$lib/constants';
import { normalizePath } from '$lib/helpers';
import { parseMdFile, findCurrent, readDir } from '$lib/server';
import { dirname, join } from 'path';

export async function load({ params: { path }, parent }) {
	const [mdContent, { tree }] = await Promise.all([parseMdFile(path), parent()]);

	const found = findCurrent(path, tree);
	const localTree = await readDir(join(CONTENT_FOLDER, mdContent ? dirname(path) : path));

	return {
		...mdContent,
		...found,
		localTree,
		parentLink: normalizePath(dirname(path))
	};
}
