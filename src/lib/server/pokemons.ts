import { getRandomNb } from '../utils';
import pokemons from '../pokemons.json';

export function fetchPokemon(id: number) {
	return Promise.resolve(pokemons[id - 1]);
}

export function fetchPokemons() {
	return Promise.resolve(pokemons);
}

export function fetchPokemonTypes() {
	const types = pokemons.flatMap((pokemon) => pokemon.types.map((t) => t.type.name));

	return Promise.resolve([...new Set(types)]);
}

export function fetchTotalPopulation() {
	const duration = getRandomNb(500, 4_000);
	const population = getRandomNb(10_000);

	return new Promise<number>((resolve) => setTimeout(() => resolve(population), duration));
}
