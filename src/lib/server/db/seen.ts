import { read, write, flush } from './io';

const SEEN_DB = 'seen';

export async function add(id: number) {
	const seen = await get();

	if (!seen.includes(id)) {
		seen.push(id);
		await write(SEEN_DB, seen);
	}

	return seen;
}

export async function clear() {
	return flush(SEEN_DB);
}

export async function get() {
	try {
		return await read<number[]>(SEEN_DB);
	} catch {
		return [] as number[];
	}
}

get().then((data) => {
	console.log('Initial seen size', data.length);
});
