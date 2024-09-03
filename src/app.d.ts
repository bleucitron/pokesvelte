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
