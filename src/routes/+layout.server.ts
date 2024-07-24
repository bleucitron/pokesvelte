import { CONTENT_FOLDER } from '$lib/constants';
import { readDir } from '$lib/server';

export async function load() {
	const tree = await readDir(CONTENT_FOLDER);
	return { tree };
}
