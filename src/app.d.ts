// See https://svelte.dev/docs/kit/types#app

import type { Trainer } from '$lib/server/db/trainer';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			trainer?: Trainer | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
