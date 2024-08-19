export type Node = {
	id?: string;
	name: string;
	path: string;
	title: string;
	files?: Node[];
};
