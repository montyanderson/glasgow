import { Config } from "./types/config.ts";

export const config: Config = {
	port: 8000,
	upstream: "https://ipfs.prodia.com/ipfs/",
	routes: {
		small: {
			size: 150,
			cache: 50,
		},
		medium: {
			size: 500,
			cache: 50,
		},
		large: {
			size: 1000,
			cache: 50,
		},
	},
};
