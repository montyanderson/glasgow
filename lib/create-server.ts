import { Config } from "../types/config.ts";
import { createRoute } from "./create-route.ts";

export const createServer = (config: Config) => {
	const handlers: {
		[key: string]: ReturnType<typeof createRoute>;
	} = {};

	for (const id in config.routes) {
		handlers[id] = createRoute(config, config.routes[id]);
	}

	return (request: Request): Response | Promise<Response> => {
		const { pathname } = new URL(request.url);

		const [, action, cid] = pathname.split("/");

		console.log({ action, cid });

		for (const route in handlers) {
			if (action === route) {
				return handlers[route](cid);
			}
		}

		return new Response("Not Found", {
			status: 404,
		});
	};
};
