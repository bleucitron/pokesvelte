import { fetchPokemonTypes } from '$lib/pokemons';
type PokemonType =
	| 'grass'
	| 'poison'
	| 'fire'
	| 'flying'
	| 'water'
	| 'bug'
	| 'normal'
	| 'electric'
	| 'ground'
	| 'fairy'
	| 'fighting'
	| 'psychic'
	| 'rock'
	| 'steel'
	| 'ice'
	| 'ghost'
	| 'dragon ';
const types = await fetchPokemonTypes();

export function match(param: string): param is PokemonType {
	return types.includes(param);
}
