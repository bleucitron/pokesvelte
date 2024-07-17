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

type TeamMember = { id: number; uuid: number };

function createTeam() {
	let team = $state<TeamMember[]>([]);

	function recruit(id: number) {
		const member = {
			id,
			uuid: Date.now()
		};
		team.push(member);
	}
	function fire(uuid: number) {
		team = team.filter((member) => member.uuid !== uuid);
	}

	return {
		get members() {
			return team;
		},
		recruit,
		fire
	};
}

export const pokedex = createPokedex();
export const team = createTeam();
