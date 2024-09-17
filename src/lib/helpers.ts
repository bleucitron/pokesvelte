export function normalizePath(path: string) {
	path = path === '.' ? '' : path;

	return !path.startsWith('/') ? `/${path}` : path;
}
