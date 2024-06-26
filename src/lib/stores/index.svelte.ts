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

export type TeamMember = {
	id: number;
	uuid: number;
};

function createTeam() {
	let team = $state<TeamMember[]>([]);

	return {
		get members() {
			return team;
		},
		recruit(id: number) {
			team.push({ id, uuid: Date.now() });
		},
		release(uuid: number) {
			const position = team.findIndex((member) => member.uuid === uuid);
			team.splice(position, 1);
		}
	};
}

export const team = createTeam();
