// See https://kit.svelte.dev/docs/types#app

import type { Trainer } from '$lib/server/trainer';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: Trainer | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
