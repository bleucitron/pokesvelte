import { randomUUID } from 'crypto';

import pokemons from '../pokemons.json';
import { addToSeen } from './seen';
import { flush, read, write } from './io';

export type TeamMember = {
	id: number;
	uuid: string;
	name: string;
	main: boolean;
};

const TEAM_DB = 'team';

readTeam().then((data) => {
	console.log('Initial team size', data.length);
});

export async function addToTeam(id: number) {
	const uuid = randomUUID();

	const team = await readTeam();
	const siblings = team.filter((pokemon) => pokemon.id === id);

	const pokemon = pokemons[id - 1];
	if (!pokemon) {
		throw new Error(`Unknown species id: ${id} `);
	}
	const speciesName = pokemon.name;
	const name = siblings.length ? `${speciesName} ${siblings.length + 1}` : speciesName;

	const teamSize = team.filter((p) => p.main).length;

	team.push({
		id,
		uuid,
		name,
		main: teamSize < 6
	});
	await writeTeam(team);
	await addToSeen(id);

	return team;
}

export async function removeFromTeam(uuid: string) {
	const team = await readTeam();

	const updated = team.filter((pokemon) => pokemon.uuid !== uuid);
	await writeTeam(updated);

	return updated;
}

export async function rename(uuid: string, name: string) {
	const team = await readTeam();
	const pokemon = team.find((pokemon) => pokemon.uuid === uuid);

	if (pokemon) {
		pokemon.name = name;
		await writeTeam(team);
	}
}

export async function toggleFromTeam(uuid: string) {
	const team = await readTeam();

	const pokemon = team.find((pokemon) => pokemon.uuid === uuid);

	if (pokemon) {
		pokemon.main = !pokemon.main;
		await writeTeam(team);
	}
}

export async function readTeam() {
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

export function clearTeam() {
	return flush(TEAM_DB);
}
