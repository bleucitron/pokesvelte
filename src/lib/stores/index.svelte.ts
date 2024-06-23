function createPokedex() {
	let foundSpecies = $state<number[]>([]);

	return {
		get found() {
			return foundSpecies;
		},
		discover(id: number) {
			foundSpecies.push(id);
		}
	};
}

export const pokedex = createPokedex();
