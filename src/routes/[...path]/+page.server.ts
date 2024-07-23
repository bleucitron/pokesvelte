import { parseMdFile } from '$lib/server';

export async function load({ params: { path } }) {
	const { content, options } = await parseMdFile(path);

	return {
		content,
		options
	};
}
