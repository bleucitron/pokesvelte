import { fetchPokemons } from '$lib/pokemons';

export async function load() {
    const pokemons = await fetchPokemons()
    return { 
        nombrePokemonDecouvert: 3, 
        nombrePokemonTotal: pokemons.length, 
        nombrePokemonEquipe: 2 
    };
}