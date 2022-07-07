export type Route = {
	size: number;
};

export type Config = {
	port: number;
	upstream: string;
	routes: { [key: string]: Route };
};
