export type Route = {
	size: number;
	cache: number;
};

export type Config = {
	port: number;
	upstream: string;
	routes: { [key: string]: Route };
};
