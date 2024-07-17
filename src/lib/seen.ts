import { read, write, flush } from './io';

readSeen().then((data) => {
	console.log('Initial seen size', data.length);
});

const SEEN_DB = 'seen';

export async function addToSeen(id: number) {
	const seen = await readSeen();

	if (!seen.includes(id)) {
		seen.push(id);
		await write(SEEN_DB, seen);
	}

	return seen;
}

export async function clearSeen() {
	return flush(SEEN_DB);
}

export async function readSeen() {
	try {
		return await read<number[]>(SEEN_DB);
	} catch {
		return [] as number[];
	}
}
