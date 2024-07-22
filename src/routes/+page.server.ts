import { readdir } from 'fs/promises';
import { join } from 'path';

export type Node = {
	name: string;
	path: string;
	files?: Node[];
};

async function readDir(path: string): Promise<Node[]> {
	const dir = await readdir(path, { withFileTypes: true });

	const entries = await Promise.all(
		dir.map(async (item) => {
			console.log('ITEM', item);
			const { name, parentPath } = item;
			const path = join(parentPath, name);
			const files = item.isDirectory() ? await readDir(path) : undefined;

			return {
				name,
				path: path.replace('.md', '').replace('course', ''),
				files
			};
		})
	);

	return entries;
}

export async function load() {
	const tree = await readDir('course');
	return { tree };
}
