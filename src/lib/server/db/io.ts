import { readFile, unlink, writeFile } from 'fs/promises';

export async function read<T>(path: string) {
	const json = (await readFile(`./data/generated/${path}.json`)).toString();
	const data = JSON.parse(json) as T;

	return data;
}

export function write(path: string, data: unknown) {
	return writeFile(`./data/generated/${path}.json`, JSON.stringify(data));
}

export function flush(path: string) {
	return unlink(`./data/generated/${path}.json`);
}
