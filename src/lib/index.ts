import type { MarkdownItEnv } from '@mdit-vue/types';

import { readFile } from 'fs/promises';
import markdownit from 'markdown-it';
import { frontmatterPlugin } from '@mdit-vue/plugin-frontmatter';
import Shiki from '@shikijs/markdown-it';
import { join } from 'path';

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

export async function parse(path: string) {
	const content = (await readFile(join('course', `${path}.md`))).toString();
	const env: MarkdownItEnv = {};

	const rendered = md.render(content, env);

	return { content: rendered, options: env.frontmatter };
}
