import type { MarkdownItEnv } from '@mdit-vue/types';

import { readFile, readdir } from 'fs/promises';
import { join } from 'path';
import markdownit from 'markdown-it';
import { frontmatterPlugin } from '@mdit-vue/plugin-frontmatter';
import Shiki from '@shikijs/markdown-it';

import type { Node } from '$lib';

const md = markdownit({ html: true })
	.use(
		await Shiki({
			themes: {
				light: 'vitesse-light',
				dark: 'vitesse-dark'
			}
		})
	)
	.use(frontmatterPlugin);

export async function parseMdFile(path: string) {
	const content = (await readFile(join('course', `${path}.md`))).toString();
	const env: MarkdownItEnv = {};

	const rendered = md.render(content, env);

	return { content: rendered, options: env.frontmatter };
}

export async function readDir(path: string): Promise<Node[]> {
	const dir = await readdir(path, { withFileTypes: true });

	const entries = await Promise.all(
		dir.map(async (item) => {
			const { name, parentPath } = item;
			const path = join(parentPath, name);
			const files = item.isDirectory() ? await readDir(path) : undefined;

			const webPath = path.replace('.md', '').replace('course', '');
			return {
				name,
				path: webPath,
				files
			};
		})
	);

	return entries;
}
