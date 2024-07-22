import type { MarkdownItEnv } from '@mdit-vue/types';
import type { Node } from '$lib/typings';

import { parse as parseYaml } from 'yaml';
import { readFile, readdir, stat } from 'fs/promises';
import readline from 'readline';
import { dirname, join } from 'path';
import markdownit from 'markdown-it';
import anchor from 'markdown-it-anchor';
import { frontmatterPlugin } from '@mdit-vue/plugin-frontmatter';
import { titlePlugin } from '@mdit-vue/plugin-title';
import Shiki from '@shikijs/markdown-it';
import { normalizePath } from '$lib/helpers';
import { CONTENT_FOLDER } from '$lib/constants';
import { createReadStream } from 'fs';
import slugify from '@sindresorhus/slugify';

const md = markdownit({ html: true })
	.use(
		await Shiki({
			theme: 'material-theme'
		})
	)
	.use(titlePlugin)
	.use(frontmatterPlugin)
	.use(anchor, {
		slugify
	});

function formatFilePath(path: string) {
	if (!path.startsWith(CONTENT_FOLDER)) path = join(CONTENT_FOLDER, path);
	if (!path.endsWith('.md')) path = `${path}.md`;

	return path;
}
export async function parseMdFile(path: string) {
	try {
		const formattedPath = formatFilePath(path);
		const fileContent = (
			await readFile(formattedPath).catch(() => readFile(formatFilePath(`${path}/index.md`)))
		).toString();

		const env: MarkdownItEnv = {};

		const rendered = md.render(fileContent, env);
		const { content, frontmatter, ...rest } = env;

		const renderedWithoutTitle = rendered.replace(/<h1.+<\/h1>/g, '');
		const output = { ...rest, markup: renderedWithoutTitle, options: frontmatter };

		return output;
	} catch {
		return;
	}
}

// see https://stackoverflow.com/a/28749643
async function readMeta(path: string) {
	const { size } = await stat(path);

	if (!size) return Promise.resolve(null);

	const readable = createReadStream(path, { encoding: 'utf8' });
	const reader = readline.createInterface({ input: readable });

	const meta = await new Promise<{ title: string; [k: string]: string }>((resolve) => {
		let header: string;
		let title = '';
		let done = false;

		reader.on('line', (line) => {
			if (line.startsWith('# ')) {
				reader.close();
				title = line.replace('# ', '');
				const options = header ? parseYaml(header) : null;
				resolve({ title, ...options });
				return;
			}
			// careful, 'line' events keep getting fired even after reader.close()
			if (done) return;

			if (line.startsWith('---')) {
				if (header) {
					done = true;
					return;
				}
				header = '';
				return;
			}
			if (header !== undefined) {
				header += `\n${line}`;
			}
		});
	});
	readable.close();
	return meta;
}

export async function readDir(path: string): Promise<Node[]> {
	const dir = await readdir(path, { withFileTypes: true });

	const entries = await Promise.all(
		dir
			.filter((item) => item.name !== 'index.md')
			.filter((item) => !item.name.startsWith('XX'))
			.map(async (item, index) => {
				const { name, parentPath } = item;
				const path = join(parentPath, name);
				const isDirectory = item.isDirectory();

				const webPath = path.replace('.md', '').replace(CONTENT_FOLDER, '');
				const filePath = isDirectory ? join(path, 'index.md') : path;

				const [meta, files] = await Promise.all([
					readMeta(filePath),
					isDirectory ? readDir(path) : undefined
				]);

				const id = buildId(path, index + 1);
				return {
					...meta,
					id,
					name,
					path: webPath,
					files,
					isFolder: !!files?.length
				};
			})
	);

	return entries;
}

function buildId(path: string, position: number) {
	let match = path.match(/(\d\d)/g);

	if (match) return match.join('-');

	match = path.match(/(XX)/);
	if (match) return [match[0], position].join('-');

	return '';
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
