export function getRandomNb(a: number, b = 0) {
	return Math.floor(Math.min(a, b) + Math.random() * Math.abs(a - b));
}
