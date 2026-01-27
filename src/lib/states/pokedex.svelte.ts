class Pokedex {
    found = $state<number[]>([])
	discover = (id:number) => {
        if(!this.found.includes(id)) this.found.push(id);
	}
}

export const pokedex = new Pokedex(); 