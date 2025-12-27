type Member = { id: number; uuid: number };

class Team {
	members = $state<Member[]>([]);

	recruit = (member: Member) => {
		this.members.push(member);
	};

	release = (uuid: number) => {
		const position = this.members.findIndex((member) => member.uuid === uuid);
		team.members.splice(position, 1);
	};
}

export const team = new Team();
