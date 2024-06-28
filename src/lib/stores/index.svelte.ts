// we could have created two different functions to handle
// these, but since these two arrays work together, it makes
// a lot of sense to handle them in the same instance
function createRecentStore() {
	let species = $state<number[]>([]);
	let members = $state<string[]>([]);

	return {
		get species() {
			return species;
		},
		get members() {
			return members;
		},
		add({ id, uuid }: { id: number; uuid: string }) {
			if (!species.includes(id)) {
				// there is a subtle bug here, since an already discovered species could be considered as recent
				species.push(id);
			}
			if (!members.includes(uuid)) {
				members.push(uuid);
			}
		}
	};
}

export const recent = createRecentStore();
