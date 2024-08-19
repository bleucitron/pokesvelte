import type { MarkdownItEnv } from '@mdit-vue/types';

export interface Node extends MarkdownItEnv {
	id?: string;
	name: string;
	path: string;
	markup?: string;
	files?: Node[];
}
