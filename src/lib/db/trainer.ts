import { randomUUID } from 'crypto';
import { read, write } from './io';
import * as cookies from './cookies';

export type Trainer = {
	id: string;
	name: string;
	password?: string;
};

const TRAINER_DB = 'trainerByLogin';

export async function get(nameOrUUID?: string) {
	if (!nameOrUUID) return null;

	try {
		const trainerById = await readTrainerById();

		const trainer =
			trainerById[nameOrUUID] ?? Object.values(trainerById).find((t) => t.name === nameOrUUID);

		if (!trainer) {
			return null;
		}

		delete trainer.password;

		return trainer ?? null;
	} catch {
		return null;
	}
}

export async function register(name: string, password: string) {
	const id = randomUUID();
	await cookies.register(id);

	// caution, in a real world example, password should not be stored in plain text
	const trainer = { id, name, password };

	const trainerById = await readTrainerById();

	if (Object.values(trainerById).find((t) => t.name === name)) {
		throw new Error(`Trainer with name : ${name} already exists`);
	}

	trainerById[id] = trainer;

	await writeTrainerById(trainerById);

	console.log(`Trainer ${name} (id ${id}) correctly saved`);

	return trainer;
}

export async function remove(uuid: string) {
	const trainerById = await readTrainerById();
	delete trainerById[uuid];

	await writeTrainerById(trainerById);
}

export async function checkPassword(name: string, password: string) {
	const trainerById = await readTrainerById();

	const trainer = Object.values(trainerById).find((t) => t.name === name);

	// in a real world application, this would be done much more securely
	return trainer?.password === password;
}

async function readTrainerById() {
	try {
		const trainerById = await read<Record<string, Trainer>>(TRAINER_DB);

		return trainerById;
	} catch {
		return {};
	}
}
function writeTrainerById(trainerById: Record<string, Trainer>) {
	return write(TRAINER_DB, trainerById);
}

readTrainerById().then((data) => {
	console.log('Initial trainerById size', Object.keys(data).length);
	// do not do this at home
	console.log('Trainers:');
	Object.values(data).forEach((value) => {
		console.log(value.name, value.password);
	});
});
