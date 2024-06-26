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
		recruit(member: TeamMember) {
			team.push(member);
		},
		release(uuid: number) {
			const position = team.findIndex((member) => member.uuid === uuid);
			team.splice(position, 1);
		}
	};
}

export const team = createTeam();
