import { Config } from "./types/config.ts";

export const config: Config = {
	port: 8080,
	upstream: "https://ipfs.prodia.com/ipfs/",
	routes: {
		small: {
			size: 150,
		},
		medium: {
			size: 500,
		},
		large: {
			size: 1000,
		},
	},
};
