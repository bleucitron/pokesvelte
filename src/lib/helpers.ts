export function normalizePath(path: string) {
	return !path.startsWith('/') ? `/${path}` : path;
}
