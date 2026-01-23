class Recent {
	members = $state<string[]>([]);
	species = $state<number[]>([]);

	add = (id: number, uuid: string) => {
		this.members.push(uuid);

		if (!this.species.includes(id)) {
			// there is a subtle bug here, since an already discovered species could be considered as recent.
			// we consider it ok to leave it as is, but you can try to fox it!
			this.species.push(id);
		}
	};

	remove = (id: number | string) => {
		if (typeof id === 'number') {
			this.species = this.species.filter((i) => i !== id);
		} else {
			this.members = this.members.filter((i) => i !== id);
		}
	};
}

export const recent = new Recent();
