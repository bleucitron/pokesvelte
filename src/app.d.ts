import type { Node } from '$lib/typings';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			current?: Node;
			prev?: Node;
			next?: Node;
			parent?: Node;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

declare module '*.md' {
	import type { SvelteComponent } from 'svelte';

	export default class Comp extends SvelteComponent {}

	export const metadata: Record<string, unknown>;
}
