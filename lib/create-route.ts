import LRU from "lru";
import { Config, Route } from "../types/config.ts";
import { createTransform } from "./create-transform.ts";

const oneMegabyte = 1000000;

export const createRoute = (config: Config, route: Route) => {
	const transform = createTransform(route);

	const cache = new LRU<string, Promise<ArrayBuffer>>({
		max: route.cache * oneMegabyte,
		length: () => route.size ** 2,
		maxAge: Infinity,
	});

	const retrive = (image: string) => {
		const retriveUpstream = async (image: string) => {
			const url = `${config.upstream}${image}`;

			const response = await fetch(url);

			const buffer = await response.arrayBuffer();

			return transform(buffer);
		};

		const result = cache.get(image);

		if (result !== undefined) {
			return result;
		}

		const resultPromise = retriveUpstream(image);

		cache.set(
			image,
			resultPromise,
		);

		return resultPromise;
	};

	return async (image: string) => {
		console.log(cache.keys().length, cache.keys());

		return new Response(await retrive(image), {
			headers: { "Content-Type": "image/jpeg" },
		});
	};
};
