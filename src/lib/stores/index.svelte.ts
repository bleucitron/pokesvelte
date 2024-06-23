function createPokedex() {
	let found = $state<number[]>([]);

	return {
		get found() {
			return found;
		},
		discover(id: number) {
			found.push(id);
		}
	};
}

export const pokedex = createPokedex();
