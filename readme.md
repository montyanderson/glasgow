<div align="center">
	<img src="./logo.svg" alt="glasgow" width="100%">

> Lean image-resizing service built with Deno + TypeScript. Created for IPFS.

</div>

## about

Glasgow was built to transform large, high-quality images from an upstream
service into fast, digestable smaller ones, on the fly.

We use an in-process cache to avoid needlessly recompressing images and
increasing latency. The cache stores the `Promise` to a result, so two requests
in short succession will only hit the upstream service once.

## assumptions

The motivation for Glasgow was to run quietly over an IPFS gateway. Accordingly,
Glasgow assumes that image paths are immutable, that `monty.jpg` will only ever
resolve to one image. This means that the service will never re-request an image
from upstream if it exits in the cache and is only suitable for use cases where
the content of a path does not change.

## usage

Create `config.ts` and add your configuration.

```typescript
export const config: Config = {
	port: 8000,
	upstream: "https://ipfs.prodia.com/ipfs/",
	routes: {
		small: {
			size: 150,
			cache: 50, // maximum cache size in megabytes
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
```

Run.

```
deno task start
```

`http://localhost:8000/small/monty.jpg` now shows a resized version of
`http://my-server/my-images/monty.jpg`.
