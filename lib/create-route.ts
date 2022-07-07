import { Config, Route } from "../types/config.ts";
import { createTransform } from "./create-transform.ts";

export const createRoute = (config: Config, route: Route) => {
	const transform = createTransform(route);

	const tasks: {
		[cid: string]: Promise<ArrayBuffer>;
	} = {};

	return async (image: string) => {
		if (!(image in tasks)) {
			const url = `${config.upstream}${image}`;

			const response = await fetch(url);

			const buffer = await response.arrayBuffer();

			tasks[image] = transform(buffer);
		}

		return new Response(await tasks[image], {
			headers: { "Content-Type": "image/jpeg" },
		});
	};
};
