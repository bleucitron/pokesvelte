import { readDir } from '$lib/server';

export async function load() {
	const tree = await readDir('course');
	return { tree };
}
