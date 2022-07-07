# glasgow

Lean image-resizing service built with Deno + TypeScript. Originally created for IPFS.

## usage

Create `config.ts` and add your configuration.

```typescript
import { Config } from "./types/config.ts";

export const config: Config = {
	port: 8000,
	upstream: "https://my-server/my-images/",
	routes: {
		microscopic: {
			size: 5,
		},
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
```

Run.

```
deno task start
```

`http://localhost:8000/microscopic/monty.jpg` now shows a resized version of `http://my-server/my-images/monty.jpg`.
