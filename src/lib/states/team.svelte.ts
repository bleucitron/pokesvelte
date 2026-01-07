type Member = { id: number; uuid: number; name: string };

class Team {
	members = $state<Member[]>([]);

	recruit = (id: number) => {
		const uuid = Date.now();
		const name = uuid.toString();

		this.members.push({ id, uuid, name });
	};

	release = (uuid: number) => {
		const position = this.members.findIndex((member) => member.uuid === uuid);
		team.members.splice(position, 1);
	};
}

export const team = new Team();
