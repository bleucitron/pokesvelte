import type { MarkdownItEnv } from '@mdit-vue/types';

import { readFile, readdir } from 'fs/promises';
import { join } from 'path';
import markdownit from 'markdown-it';
import { frontmatterPlugin } from '@mdit-vue/plugin-frontmatter';
import { titlePlugin } from '@mdit-vue/plugin-title';
import Shiki from '@shikijs/markdown-it';
import { normalizePath } from '$lib/helpers';
import { CONTENT_FOLDER } from '$lib/constants';

const md = markdownit({ html: true })
	.use(
		await Shiki({
			theme: 'monokai'
		})
	)
	.use(titlePlugin)
	.use(frontmatterPlugin);

export async function parseMdFile(path: string, parser = md) {
	try {
		const content = (await readFile(join(CONTENT_FOLDER, `${path}.md`))).toString();

		const env: MarkdownItEnv = {};

		const rendered = parser.render(content, env);

		return { ...env, content: rendered };
	} catch {
		return null;
	}
}

export async function readDir(path: string): Promise<Node[]> {
	const dir = await readdir(path, { withFileTypes: true });

	const entries = await Promise.all(
		dir.map(async (item) => {
			const { name, parentPath } = item;
			const path = join(parentPath, name);
			const files = item.isDirectory() ? await readDir(path) : undefined;

			const webPath = path.replace('.md', '').replace(CONTENT_FOLDER, '');
			const parsed = await parseMdFile(webPath);

			return {
				name,
				path: webPath,
				files,
				title: parsed?.title || name
			};
		})
	);

	return entries;
}

export type Node = {
	name: string;
	path: string;
	title: string;
	files?: Node[];
};

function flatten(tree: Node[]): Node[] {
	return tree.flatMap((node) => (node.files ? [node, ...flatten(node.files)] : node));
}

export function findCurrent(path: string | undefined, tree: Node[]) {
	if (!path) return undefined;

	path = normalizePath(path);

	const flatMap = flatten(tree);

	const currentPosition = flatMap.findIndex((node) => node.path === path);

	let prev = flatMap[currentPosition - 1];
	const current = flatMap[currentPosition];
	const next = flatMap[currentPosition + 1];

	return { current, prev, next };
}
