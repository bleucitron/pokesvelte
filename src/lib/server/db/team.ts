import { randomUUID } from 'crypto';

import { flush, read, write } from './io';
import * as seen from './seen';
import pokemons from '../../pokemons.json';

export type TeamMember = {
	id: number;
	uuid: string;
	name: string;
	main: boolean;
};

const TEAM_DB = 'team';

export async function addMember(id: number) {
	const uuid = randomUUID();

	const team = await get();
	const siblings = team.filter((pokemon) => pokemon.id === id);

	const pokemon = pokemons[id - 1];
	if (!pokemon) {
		throw new Error(`Unknown species id: ${id} `);
	}
	const speciesName = pokemon.name;
	const name = siblings.length ? `${speciesName} ${siblings.length + 1}` : speciesName;

	const teamSize = team.filter((p) => p.main).length;

	const newMember = {
		id,
		uuid,
		name,
		main: teamSize < 6
	};
	team.push(newMember);

	await writeTeam(team);
	await seen.add(id);

	return newMember;
}

export async function removeMember(uuid: string) {
	const team = await get();

	const updated = team.filter((pokemon) => pokemon.uuid !== uuid);
	await writeTeam(updated);

	return updated;
}

export async function renameMember(uuid: string, name: string) {
	const team = await get();
	const pokemon = team.find((pokemon) => pokemon.uuid === uuid);

	if (pokemon) {
		pokemon.name = name;
		await writeTeam(team);
	}
}

export async function toggleMember(uuid: string) {
	const team = await get();

	const pokemon = team.find((pokemon) => pokemon.uuid === uuid);

	if (pokemon) {
		pokemon.main = !pokemon.main;
		await writeTeam(team);
	}
}

export async function get() {
	try {
		return await read<TeamMember[]>(TEAM_DB);
	} catch {
		console.error('Could not read team');
		return [] as TeamMember[];
	}
}

function writeTeam(team: TeamMember[]) {
	return write(TEAM_DB, team);
}

export function clear() {
	return flush(TEAM_DB);
}

get().then((data) => {
	console.log('Initial team size', data.length);
});
