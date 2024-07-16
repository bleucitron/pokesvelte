function createPokedex() {
	let found = $state<number[]>([]);

	function discover(id: number) {
		if (!found.includes(id)) {
			found.push(id);
		}
	}
	return {
		get found() {
			return found;
		},
		discover
	};
}

export const pokedex = createPokedex();
