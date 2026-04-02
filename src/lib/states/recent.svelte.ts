class Recent {
	found = $state<number[]>([]);
	members = $state<number[]>([]);
	discover = (id: number) => {
		if (!this.found.includes(id)) this.found.push(id);
		if (!this.members.includes(id)) this.members.push(id);
	};
}
export const recent = new Recent();
