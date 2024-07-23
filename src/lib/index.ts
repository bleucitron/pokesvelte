export type Node = {
	name: string;
	path: string;
	files?: Node[];
};

function flatten(tree: Node[]): Node[] {
	return tree.flatMap((node) => (node.files ? flatten(node.files) : node));
}

export function findCurrent(path: string | undefined, tree: Node[]) {
	if (!path) return undefined;

	path = !path.startsWith('/') ? `/${path}` : path;

	const flatMap = flatten(tree);
	console.log(path, flatMap);

	const current = flatMap.findIndex((node) => node.path === path);

	return { current: flatMap[current], prev: flatMap[current - 1], next: flatMap[current + 1] };
}
