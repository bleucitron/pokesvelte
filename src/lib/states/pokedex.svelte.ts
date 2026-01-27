class Pokedex {
    found = $state<number[]>([])
	discover = (id:number) => {
        if(!this.found.includes(id)) this.found.push(id);
	}

    has = (id:number) => {
        return this.found.includes(id);
    }
}

export const pokedex = new Pokedex(); 