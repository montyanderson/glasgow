import jimp from "jimp";

import { Route } from "../types/config.ts";

export const createTransform = (
	route: Route,
) => (async (buffer: ArrayBuffer) => {
	const image = await jimp.read(buffer);

	await image.resize(route.size, jimp.AUTO);

	return await image.getBufferAsync(jimp.MIME_JPEG);
});
