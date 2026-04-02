type Member = { id: number; uuid: number; name: string };
class Team {
	members = $state<Member[]>([]);
	addMember = (id: number) => {
		this.members.push({ id, uuid: Date.now(), name: Date.now().toString() });
	};
	removeMember = (uuid: number) => {
		this.members = this.members.filter((m) => m.uuid !== uuid);
	};
}

export const team = new Team();

