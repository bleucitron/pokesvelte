import type { MarkdownItEnv } from '@mdit-vue/types';
import type { Node } from '$lib/typings';

import { readFile, readdir } from 'fs/promises';
import { dirname, join } from 'path';
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

export async function parseMdFile(path: string) {
	try {
		if (!path.startsWith(CONTENT_FOLDER)) path = join(CONTENT_FOLDER, path);
		if (!path.endsWith('.md')) path = `${path}.md`;

		const fileContent = (await readFile(path)).toString();

		const env: MarkdownItEnv = {};

		const rendered = md.render(fileContent, env);
		const { content, ...rest } = env;

		const output = { ...rest, markup: rendered };

		return output;
	} catch {
		return;
	}
}

export async function readDir(path: string): Promise<Node[]> {
	const dir = await readdir(path, { withFileTypes: true });

	const entries = await Promise.all(
		dir
			.filter((item) => item.name !== 'index.md')
			.map(async (item) => {
				const { name, parentPath } = item;
				const path = join(parentPath, name);
				const isDirectory = item.isDirectory();
				const files = isDirectory ? await readDir(path) : undefined;

				const webPath = path.replace('.md', '').replace(CONTENT_FOLDER, '');
				const parsed = await parseMdFile(isDirectory ? join(path, 'index.md') : webPath);

				const id = path.match(/(\d\d)/g)?.join('-');
				return {
					id,
					name,
					path: webPath,
					files,
					...parsed
				};
			})
	);

	return entries;
}

function flatten(tree: Node[]): Node[] {
	return tree.flatMap((node) => (node.files ? [node, ...flatten(node.files)] : node));
}

function cleanNode(node: Node | undefined) {
	if (!node) return;

	const { files, markup, excerpt, frontmatter, ...cleaned } = node;
	return cleaned;
}

export function findCurrent(
	path: string | undefined,
	tree: Node[]
):
	| {
			current: Node;
			prev?: Node;
			next?: Node;
			parent?: Node;
	  }
	| undefined {
	if (!path) return undefined;

	path = normalizePath(path);

	const flatMap = flatten(tree);

	const currentPosition = flatMap.findIndex((node) => node.path === path);

	const current = flatMap[currentPosition];
	if (!current) return undefined;

	const prev = flatMap[currentPosition - 1];
	const next = flatMap[currentPosition + 1];

	const parentPath = dirname(path);
	const parent = parentPath !== '/' ? findCurrent(parentPath, tree) : undefined;

	return {
		current,
		prev: cleanNode(prev),
		next: cleanNode(next),
		parent: cleanNode(parent?.current)
	};
}
