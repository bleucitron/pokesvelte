import type { Trainer } from '$lib/server/trainer';

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
