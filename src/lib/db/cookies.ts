import { randomBytes } from 'crypto';

import { read, write } from './io';

const COOKIE_DB = 'userIdByCookie';

function createRandomCookie() {
	const buffer = randomBytes(48);
	var token = buffer.toString('hex');
	return token;
}

export async function check(cookie?: string) {
	if (!cookie) return;

	const idByCookie = await readIdByCookie();
	return idByCookie[cookie];
}

export async function register(id: string) {
	const idByCookie = await readIdByCookie();
	const cookie = createRandomCookie();

	idByCookie[cookie] = id;

	await write(COOKIE_DB, idByCookie);

	return cookie;
}

async function readIdByCookie() {
	try {
		const idByCookie = await read<Record<string, string>>(COOKIE_DB);
		return idByCookie;
	} catch {
		return {};
	}
}
