import { parse } from '$lib';

export async function load({ params: { path } }) {
	console.log('PATH', path);
	const { content, options } = await parse(path);
	return {
		content,
		options
	};
}
