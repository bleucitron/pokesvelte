type Member = {id:number, uuid: number, name:string};
class Team {
	members = $state<Member[]>([]);
	addMember = (id: number) => {
		this.members.push({ id, uuid: Date.now(), name: Date.now().toString() });
	};
}


export const team = new Team();